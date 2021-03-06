/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const GET_FAVOURITE_STATE_MACHINE = 'tymly_getFavouriteStartableNames_1_0'
const SET_FAVOURITE_STATE_MACHINE = 'tymly_setFavouriteStartableNames_1_0'

describe('favourites tymly-cardscript-plugin tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, tymlyService, client

  before(function () {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      this.skip()
    }
  })

  it('should create some basic tymly services', async () => {
    const tymlyServices = await tymly.boot(
      {
        pluginPaths: [
          path.resolve(__dirname, './../lib'),
          require.resolve('@wmfs/tymly-pg-plugin'),
          require.resolve('@wmfs/tymly-solr-plugin'),
          require.resolve('@wmfs/tymly-test-helpers/plugins/allow-everything-rbac-plugin')
        ]
      }
    )

    statebox = tymlyServices.statebox
    tymlyService = tymlyServices.tymly
    client = tymlyServices.storage.client
  })

  it('should create the test resources', () => {
    return sqlScriptRunner('./db-scripts/favourites/setup.sql', client)
  })

  it('should get test-user\'s favourites', async () => {
    const executionDescription = await statebox.startExecution(
      {},
      GET_FAVOURITE_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetFavouriteStartableNames')
    expect(executionDescription.currentResource).to.eql('module:getFavouriteStartableNames')
    expect(executionDescription.stateMachineName).to.eql(GET_FAVOURITE_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(executionDescription.ctx.results.includes('notifications')).to.eql(true)
    expect(executionDescription.ctx.results.includes('settings')).to.eql(true)
  })

  it('should update test-user\'s favourites', async () => {
    const executionDescription = await statebox.startExecution(
      {
        stateMachineNames: '["wmfs_claimAnExpense_1_0", "wmfs_reportHydrantDefect_1_0", "notifications"]'
      },
      SET_FAVOURITE_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('SetFavouriteStartableNames')
    expect(executionDescription.currentResource).to.eql('module:setFavouriteStartableNames')
    expect(executionDescription.stateMachineName).to.eql(SET_FAVOURITE_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })
  it('should ensure test-user\'s applied favourites are present in DB', async () => {
    const executionDescription = await statebox.startExecution(
      {},
      GET_FAVOURITE_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetFavouriteStartableNames')
    expect(executionDescription.currentResource).to.eql('module:getFavouriteStartableNames')
    expect(executionDescription.stateMachineName).to.eql(GET_FAVOURITE_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(executionDescription.ctx.results.length).to.eql(3)
    expect(executionDescription.ctx.results.includes('wmfs_claimAnExpense_1_0')).to.eql(true)
    expect(executionDescription.ctx.results.includes('wmfs_reportHydrantDefect_1_0')).to.eql(true)
    expect(executionDescription.ctx.results.includes('notifications')).to.eql(true)
  })

  it('should tear down the test resources', () => {
    return sqlScriptRunner('./db-scripts/cleanup.sql', client)
  })

  it('should shut down Tymly nicely', async () => {
    await tymlyService.shutdown()
  })
})
