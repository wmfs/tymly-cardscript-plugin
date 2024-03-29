/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const GET_WATCHED_BOARDS_STATE_MACHINE = 'tymly_getWatchedBoards_1_0'
const WATCH_BOARD_STATE_MACHINE = 'tymly_watchBoard_1_0'
const UNWATCH_BOARD_STATE_MACHINE = 'tymly_unwatchBoard_1_0'

describe('watched-boards tymly-cardscript-plugin tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, tymlyService, client, subscriptionId

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

  it('should watch the board', async () => {
    const executionDescription = await statebox.startExecution(
      {
        stateMachineName: 'wmfs_incidentSummary_1_0',
        title: 'Incident 1/1999',
        category: 'incidents',
        categoryLabel: 'Incident Summary',
        description: 'Fire with 0 casualties and 0 fatalities',
        boardKeys: {
          incidentNumber: 1,
          incidentYear: 1999
        }
      },
      WATCH_BOARD_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('WatchBoard')
    expect(executionDescription.currentResource).to.eql('module:watchBoard')
    expect(executionDescription.stateMachineName).to.eql(WATCH_BOARD_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx).includes('subscriptionId')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('startedWatching')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('feedName')).to.eql(true)
    expect(executionDescription.ctx.feedName).to.eql('wmfs_incidentSummary_1_0|1|1999')
  })

  it('should get the watched board to validate the previous test', async () => {
    const executionDescription = await statebox.startExecution(
      {},
      GET_WATCHED_BOARDS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetWatchedBoards')
    expect(executionDescription.currentResource).to.eql('module:getWatchedBoards')
    expect(executionDescription.stateMachineName).to.eql(GET_WATCHED_BOARDS_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(executionDescription.ctx.watchCategories.incidents['Incident Summary'].total).to.eql(1)
    expect(executionDescription.ctx.watchCategories.incidents['Incident Summary'].subscriptions[0].feedName).to.eql('wmfs_incidentSummary_1_0|1|1999')
    subscriptionId = executionDescription.ctx.watchCategories.incidents['Incident Summary'].subscriptions[0].subscriptionId
  })

  it('should watch another board in the same category', async () => {
    const executionDescription = await statebox.startExecution(
      {
        stateMachineName: 'wmfs_incidentSummary_1_0',
        title: 'Incident 12/2015',
        category: 'incidents',
        categoryLabel: 'Incident Summary',
        description: 'Fire with 0 casualties and 0 fatalities',
        boardKeys: {
          incidentNumber: 12,
          incidentYear: 2015
        }
      },
      WATCH_BOARD_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('WatchBoard')
    expect(executionDescription.currentResource).to.eql('module:watchBoard')
    expect(executionDescription.stateMachineName).to.eql(WATCH_BOARD_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx).includes('subscriptionId')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('startedWatching')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('feedName')).to.eql(true)
    expect(executionDescription.ctx.feedName).to.eql('wmfs_incidentSummary_1_0|12|2015')
  })

  it('should watch another board in another category', async () => {
    const executionDescription = await statebox.startExecution(
      {
        stateMachineName: 'wmfs_propertyViewer_1_0',
        title: 'URN #4',
        category: 'gazetteer',
        categoryLabel: 'Property Viewer',
        description: 'Tymly Kebabs, Streetly, B74 3RU',
        boardKeys: {
          urn: 4
        }
      },
      WATCH_BOARD_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('WatchBoard')
    expect(executionDescription.currentResource).to.eql('module:watchBoard')
    expect(executionDescription.stateMachineName).to.eql(WATCH_BOARD_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx).includes('subscriptionId')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('startedWatching')).to.eql(true)
    expect(Object.keys(executionDescription.ctx).includes('feedName')).to.eql(true)
    expect(executionDescription.ctx.feedName).to.eql('wmfs_propertyViewer_1_0|4')
  })

  it('should get multiple watched boards', async () => {
    const executionDescription = await statebox.startExecution(
      {},
      GET_WATCHED_BOARDS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetWatchedBoards')
    expect(executionDescription.currentResource).to.eql('module:getWatchedBoards')
    expect(executionDescription.stateMachineName).to.eql(GET_WATCHED_BOARDS_STATE_MACHINE)
    expect(executionDescription.ctx.watchCategories.incidents['Incident Summary'].total).to.eql(2)
    expect(executionDescription.ctx.watchCategories.gazetteer['Property Viewer'].total).to.eql(1)
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })

  it('should delete the watched board to validate the previous test', async () => {
    const executionDescription = await statebox.startExecution(
      {
        subscriptionId
      },
      UNWATCH_BOARD_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('UnwatchBoard')
    expect(executionDescription.currentResource).to.eql('module:unwatchBoard')
    expect(executionDescription.stateMachineName).to.eql(UNWATCH_BOARD_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })

  it('should check the board has been unwatched', async () => {
    const results = await client.query(`SELECT * FROM tymly.watched_boards where id = '${subscriptionId}'`)
    expect(results.rowCount).to.eql(0)
  })

  it('should tear down the test resources', () => {
    return sqlScriptRunner('./db-scripts/cleanup.sql', client)
  })

  it('should shut down Tymly nicely', async () => {
    await tymlyService.shutdown()
  })
})
