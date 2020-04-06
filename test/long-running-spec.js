/* eslint-env mocha */

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

describe('long running tasks', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, tymlyService, dbClient
  let firstClock, secondClock

  before('start Tymly', async () => {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      this.skip()
    }

    const up = await spinUp()
    statebox = up.statebox
    tymlyService = up.tymlyService
    dbClient = up.dbClient
  })

  it('start first clock', async () => {
    firstClock = await startClock(statebox)
  })

  it('one task running', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(1)
    expect(active.running[0].executionName).to.equal(firstClock)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(0)
  })

  it('start second clock', async () => {
    secondClock = await startClock(statebox)
  })

  it('two tasks running', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(2)
    const executionNames = active.running.map(e => e.executionName)
    expect(executionNames).to.contain(firstClock, secondClock)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(0)
  })

  it('stop first clock', async () => {
    await stopClock(statebox, firstClock)
  })

  it('one running, one completed', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(1)
    expect(active.running[0].executionName).to.equal(secondClock)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(1)
    expect(active.complete[0].executionName).to.equal(firstClock)
  })

  it('stop second clock', async () => {
    await stopClock(statebox, secondClock)
  })

  it('two tasks completed', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(0)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(2)
    const executionNames = active.complete.map(e => e.executionName)
    expect(executionNames).to.contain(firstClock, secondClock)
  })

  after('shut down Tymly', async () => {
    await cleanUp(tymlyService, dbClient)
  })
})

async function spinUp () {
  const tymlyServices = await tymly.boot({
    blueprintPaths: [
      path.resolve(__dirname, './../test/fixtures/clock-blueprint')
    ],
    pluginPaths: [
      path.resolve(__dirname, './../lib'),
      require.resolve('@wmfs/tymly-pg-plugin'),
      require.resolve('@wmfs/tymly-test-helpers/plugins/allow-everything-rbac-plugin')
    ]
  })

  return {
    statebox: tymlyServices.statebox,
    tymlyService: tymlyServices.tymly,
    dbClient: tymlyServices.storage.client
  }
}

async function cleanUp (tymlyService, dbClient) {
  await sqlScriptRunner('./db-scripts/cleanup.sql', dbClient)

  await tymlyService.shutdown()
}

async function activeTasks (statebox) {
  const executionDescription = await statebox.startExecution(
    { },
    'tymly_listLongRunningTasks_1_0',
    {
      sendResponse: 'COMPLETE',
      userId: 'test-user'
    }
  )

  expect(executionDescription.status).to.equal('SUCCEEDED')
  return executionDescription.ctx
}

async function startClock (statebox) {
  const executionDescription = await statebox.startExecution(
    { },
    'clock_clockUi_1_0',
    {
      sendResponse: 'AFTER_RESOURCE_CALLBACK.TYPE:awaitingHumanInput',
      userId: 'test-user'
    }
  )

  expect(executionDescription.status).to.equal('RUNNING')
  await sleep()
  return executionDescription.executionName
}

async function stopClock (statebox, executionName) {
  statebox.sendTaskSuccess(
    executionName,
    { },
    {
      userId: 'test-user'
    }
  )

  const executionDescription = await statebox.waitUntilStoppedRunning(
    executionName
  )

  expect(executionDescription.status).to.equal('SUCCEEDED')

  await sleep()
}

function sleep () {
  return new Promise(resolve => setTimeout(resolve, 2000))
}
