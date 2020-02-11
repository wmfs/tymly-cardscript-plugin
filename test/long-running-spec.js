/* eslint-env mocha */

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

describe('status of long running tasks', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, tymlyService, clockExecution, dbClient

  before('start Tymly', async () => {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      this.skip()
    }

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

    statebox = tymlyServices.statebox
    tymlyService = tymlyServices.tymly
    dbClient = tymlyServices.storage.client
  })

  it('start clock', async () => {
    const executionDescription = await statebox.startExecution(
      { },
      'clock_clockUi_1_0',
      {
        sendResponse: 'AFTER_RESOURCE_CALLBACK.TYPE:awaitingHumanInput',
        userId: 'test-user'
      }
    )

    expect(executionDescription.status).to.equal('RUNNING')
    clockExecution = executionDescription.executionName
  })

  it('list long running tasks by querying database', async () => {
    const result = await queryExecutionTable(dbClient)
    expect(result.rowCount).to.equal(2)

    const rows = result.rows
    expect(rows.map(r => r.state_machine_name)).to.contain(
      'clock_clock_1_0',
      'clock_clock_ui_1_0'
    )
  })

  it('active long running tasks by state-machine', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(1)
    expect(active.running[0].executionName).to.equal(clockExecution)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(0)
  })

  it('stop clock', async () => {
    statebox.sendTaskSuccess(
      clockExecution,
      { },
      {
        userId: 'test-user'
      }
    )

    const executionDescription = await statebox.waitUntilStoppedRunning(
      clockExecution
    )

    expect(executionDescription.status).to.equal('SUCCEEDED')
  })

  it('long running tasks list now empty', async () => {
    // we stopped the clock execution,
    // need to wait for the launched execution to notice
    // and stop itself
    await sleep()

    const result = await queryExecutionTable(dbClient)
    expect(result.rowCount).to.equal(0)
  })

  it('completed long running tasks by state-machine', async () => {
    const active = await activeTasks(statebox)

    expect(active.running).to.be.an('array')
    expect(active.running.length).to.equal(0)

    expect(active.complete).to.be.an('array')
    expect(active.complete.length).to.equal(1)

    const exec = active.complete[0]
    expect(exec.executionName).to.equal(clockExecution)
  })

  after('shut down Tymly', async () => {
    await sqlScriptRunner('./db-scripts/cleanup.sql', dbClient)

    await tymlyService.shutdown()
  })
})

async function activeTasks (statebox) {
  const executionDescription = await statebox.startExecution(
    { },
    'tymly_longRunningTasks_1_0',
    {
      sendResponse: 'COMPLETE',
      userId: 'test-user'
    }
  )

  expect(executionDescription.status).to.equal('SUCCEEDED')
  return executionDescription.ctx
}

function queryExecutionTable (client) {
  return client.query("SELECT execution_name, ctx, state_machine_name FROM tymly.execution WHERE status='RUNNING' AND _created_by='test-user' ORDER BY _modified DESC")
}

function sleep () {
  return new Promise(resolve => setTimeout(resolve, 2000))
}
