/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const assert = require('chai').assert
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const GET_NOTIFICATIONS_STATE_MACHINE = 'tymly_getNotifications_1_0'
const ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE = 'tymly_acknowledgeNotifications_1_0'
const CREATE_NOTIFICATIONS_STATE_MACHINE = 'tymly_createNotification_1_0'

describe('notifications tymly-cardscript-plugin tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  const limit = '10'
  const startFrom = '2017-10-21T14:20:30.414Z'
  const notificationsToMark = []
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
    return sqlScriptRunner('./db-scripts/notifications/setup.sql', client)
  })

  it('should start the state resource execution to retrieve some notifications for a specified user', async () => {
    const executionDescription = await statebox.startExecution(
      {
        limit
      },
      GET_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetNotifications')
    expect(executionDescription.currentResource).to.eql('module:getNotifications')
    expect(executionDescription.stateMachineName).to.eql(GET_NOTIFICATIONS_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(executionDescription.ctx.userNotifications.totalNotifications).to.eql(2)
    expect(executionDescription.ctx.userNotifications.notifications[0].title).to.eql('Expense claim #2')
    expect(executionDescription.ctx.userNotifications.notifications[1].title).to.eql('Employee Info #3')
  })

  it('should check the context returned when passing a \'startFrom\'', async () => {
    const executionDescription = await statebox.startExecution(
      {
        startFrom,
        limit
      },
      GET_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetNotifications')
    expect(executionDescription.currentResource).to.eql('module:getNotifications')
    expect(executionDescription.stateMachineName).to.eql(GET_NOTIFICATIONS_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    assert.isAtLeast(Date.parse(executionDescription.ctx.userNotifications.notifications[0].created),
      Date.parse(startFrom), 'Notification is more recent than startFrom')
    notificationsToMark.push(executionDescription.ctx.userNotifications.notifications[0].id)
  })

  it('should acknowledge one notification', async () => {
    const executionDescription = await statebox.startExecution(
      {
        notificationsToMark
      },
      ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('AcknowledgeNotifications')
    expect(executionDescription.currentResource).to.eql('module:acknowledgeNotifications')
    expect(executionDescription.stateMachineName).to.eql(ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })

  it('should check the notification is acknowledged', async () => {
    const result = await client.query(`select * from tymly.notifications where id = '${notificationsToMark[0]}'`)
    expect(result.rows[0].acknowledged).to.not.eql(null)
    expect(result.rows[0].user_id).to.eql('test-user')
    expect(result.rows[0].title).to.eql('Employee Info #3')
  })

  it('should reset the acknowledged notification for later use', async () => {
    await client.query(`update tymly.notifications set acknowledged = null where id = '${notificationsToMark[0]}'`)
  })

  it('should manually create a new notification', async () => {
    const executionDescription = await statebox.startExecution(
      {
        title: 'testNotification',
        description: 'This is a notification used for testing',
        category: 'test'
      },
      CREATE_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user-1'
      }
    )

    expect(executionDescription.currentStateName).to.eql('CreateNotification')
    expect(executionDescription.currentResource).to.eql('module:createNotification')
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })

  it('should check the notification has been manually created', async () => {
    const result = await client.query('select * from tymly.notifications where user_id = \'test-user-1\'')

    expect(result.rows[0].user_id).to.eql('test-user-1')
    expect(result.rows[0].description).to.eql('This is a notification used for testing')
    expect(result.rows[0].category).to.eql('test')
    notificationsToMark.push(result.rows[0].id)
  })

  it('should acknowledge multiple notifications', async () => {
    const executionDescription = await statebox.startExecution(
      {
        notificationsToMark
      },
      ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('AcknowledgeNotifications')
    expect(executionDescription.currentResource).to.eql('module:acknowledgeNotifications')
    expect(executionDescription.stateMachineName).to.eql(ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
  })

  it('should check the first notification has been acknowledged', async () => {
    const result = await client.query(`select * from tymly.notifications where id = '${notificationsToMark[0]}'`)

    expect(result.rows[0].acknowledged).to.not.eql(null)
  })

  it('should check the second notification has been acknowledged', async () => {
    const result = await client.query(`select * from tymly.notifications where id = '${notificationsToMark[1]}'`)

    expect(result.rows[0].acknowledged).to.not.eql(null)
  })

  it('should attempt to acknowledge notifications that do not exist', async () => {
    const executionDescription = await statebox.startExecution(
      {
        notificationsToMark: [1, 2, 3, 4]
      },
      ACKNOWLEDGE_NOTIFICATIONS_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.status).to.eql('FAILED')
  })

  it('should attempt to create a notification without passing anything in', async () => {
    const executionDescription = await statebox.startExecution(
      {},
      CREATE_NOTIFICATIONS_STATE_MACHINE,
      { sendResponse: 'COMPLETE' }
    )

    expect(executionDescription.status).to.eql('FAILED')
  })

  it('should clean up the test resources', () => {
    return sqlScriptRunner('./db-scripts/cleanup.sql', client)
  })

  it('should shut down Tymly nicely', async () => {
    await tymlyService.shutdown()
  })
})
