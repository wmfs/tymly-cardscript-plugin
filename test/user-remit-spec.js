/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const GET_USER_REMIT_STATE_MACHINE = 'tymly_getUserRemit_1_0'

describe('user-remit tymly-cardscript-plugin tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, tymlyService, client

  before(async () => {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      this.skip()
    }

    const tymlyServices = await tymly.boot({
      blueprintPaths: [
        path.resolve(__dirname, './../test/fixtures/test-blueprint')
      ],
      pluginPaths: [
        path.resolve(__dirname, './../lib'),
        require.resolve('@wmfs/tymly-pg-plugin'),
        require.resolve('@wmfs/tymly-solr-plugin'),
        require.resolve('@wmfs/tymly-rbac-plugin')
      ]
    })

    statebox = tymlyServices.statebox
    tymlyService = tymlyServices.tymly
    client = tymlyServices.storage.client

    const rbacAdmin = tymlyServices.rbacAdmin
    await rbacAdmin.ensureUserRoles('test-team-member', 'test-team')

    await sqlScriptRunner('./db-scripts/settings/setup.sql', client)
    await sqlScriptRunner('./db-scripts/favourites/setup.sql', client)
    await sqlScriptRunner('./db-scripts/remit/setup.sql', client)
  })

  it('get user remit - whole remit because client doesn\'t contain anything', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')

    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.length).to.eql(5)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('gazetteer')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hr')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hydrants')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('incidents')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('expenses')).to.eql(true)

    expect(executionDescription.ctx.userRemit.favouriteStartableNames.length).to.eql(2)
    expect(executionDescription.ctx.userRemit.favouriteStartableNames.includes('notifications')).to.eql(true)
    expect(executionDescription.ctx.userRemit.favouriteStartableNames.includes('settings')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).length).to.eql(3)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('fire')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('gazetteer')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('water')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.todos).length).to.eql(1)
    expect(Object.keys(executionDescription.ctx.userRemit.add.todos)
      .includes('a69c0ac9-cde5-11e7-abc4-cec278b6b50a')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).includes('Fire Safety (North)')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).includes('Birmingham (Red watch)')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.cards).length).to.eql(1)
    expect(Object.keys(executionDescription.ctx.userRemit.add.cards)).to.eql(['test_simple'])

    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).length).to.eql(3)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentLogEntry')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentSafetyRecord')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_bookSomeoneSick')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).includes('test_personalDetails')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).includes('test_propertyViewer')).to.eql(true)

    // State machine with role: '$authenticated' should appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_justAStateMachine_1_0')).to.eql(true)
    // State machine with role: 'topSecretRole' should NOT appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_topSecretStateMachine_1_0')).to.eql(false)
    // State machine without 'user' as instigator should NOT appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_shouldNotBeOnRemit_1_0')).to.eql(false)

    expect(executionDescription.ctx.userRemit.remove).to.eql({})
  })

  it('get user with role remit - includes role todos', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-team-member'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')

    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.length).to.eql(5)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('gazetteer')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hr')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hydrants')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('incidents')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('expenses')).to.eql(true)

    expect(executionDescription.ctx.userRemit.favouriteStartableNames.length).to.eql(0)

    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).length).to.eql(3)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('fire')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('gazetteer')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('water')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.todos).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.todos)
      .includes('a69c0ae8-cde5-11e7-abc4-cec278b6b50a')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.todos)
      .includes('a69c0dcc-cde5-11e7-abc4-cec278b6b50a')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).includes('Fire Safety (North)')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.teams).includes('Birmingham (Red watch)')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.cards).length).to.eql(1)
    expect(Object.keys(executionDescription.ctx.userRemit.add.cards)).to.eql(['test_simple'])

    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).length).to.eql(3)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentLogEntry')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentSafetyRecord')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_bookSomeoneSick')).to.eql(true)

    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).includes('test_personalDetails')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards).includes('test_propertyViewer')).to.eql(true)

    // State machine with role: '$authenticated' should appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_justAStateMachine_1_0')).to.eql(true)
    // State machine with role: 'topSecretRole' should NOT appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_topSecretStateMachine_1_0')).to.eql(false)
    // State machine without 'user' as instigator should NOT appear in startable
    expect(Object.keys(executionDescription.ctx.userRemit.add.startable).includes('test_shouldNotBeOnRemit_1_0')).to.eql(false)

    expect(executionDescription.ctx.userRemit.remove).to.eql({})
  })

  it('what if the user only has settings and no favourites yet?', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user-3'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')

    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.length).to.eql(5)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('expenses')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('gazetteer')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hydrants')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('hr')).to.eql(true)
    expect(executionDescription.ctx.userRemit.settings.categoryRelevance.includes('incidents')).to.eql(true)

    expect(executionDescription.ctx.userRemit.favouriteStartableNames).to.eql([])
  })

  it('add fire, water and remove hr category names to the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: ['gazetteer', 'hr'],
          teams: [],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('fire')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.categories).includes('water')).to.eql(true)
    expect(executionDescription.ctx.userRemit.remove.categories)
      .to.eql(['hr'])
  })

  it('add/remove todo execution names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: ['a69c0ac9-cde5-11e7-abc4-cec278b6b50a', 'a69c0ad0-cde5-11e7-abc4-cec278b6b50a'],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')

    expect(Object.keys(executionDescription.ctx.userRemit.remove.todos).length).to.eql(1)
    expect(executionDescription.ctx.userRemit.remove.todos)
      .to.eql(['a69c0ad0-cde5-11e7-abc4-cec278b6b50a'])
  })

  it('add/remove team names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: ['Birmingham (Red watch)', 'Another team'],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx.userRemit.add.teams))
      .to.eql(['Fire Safety (North)'])
    expect(executionDescription.ctx.userRemit.remove.teams)
      .to.eql(['Another team'])
  })

  it('add/remove form names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: {
            'test_bookSomeoneSick': '33c8767d690f6c9c57b4b003f21d376b8d93dcf2',
            'processAnExpenseClaim': ''
          },
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).length).to.eql(2)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentLogEntry')).to.eql(true)
    expect(Object.keys(executionDescription.ctx.userRemit.add.forms).includes('test_addIncidentSafetyRecord')).to.eql(true)
    expect(executionDescription.ctx.userRemit.remove.forms)
      .to.eql(['processAnExpenseClaim'])
    expect(executionDescription.ctx.userRemit.add.forms['test_bookSomeoneSick']).to.eql(undefined)
    expect(executionDescription.ctx.userRemit.remove.forms['test_bookSomeoneSick']).to.eql(undefined)
  })

  it('add/remove board names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {
            'test_personalDetails': 'WRONGSHASUM',
            'test_expenses': ''
          },
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: [],
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards)).to.eql([
      'test_personalDetails',
      'test_propertyViewer'
    ])
    expect(executionDescription.ctx.userRemit.add.boards['test_personalDetails'].shasum).to.not.eql('WRONGSHASUM')
    expect(executionDescription.ctx.userRemit.remove.boards)
      .to.eql(['test_expenses'])
  })

  it('test shasum remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {
            'test_expenses': '',
            'test_personalDetails': '67080952b6c81abc1451f5dadd042e83040ded97'
          },
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: [],
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')
    expect(Object.keys(executionDescription.ctx.userRemit.add.boards)).to.eql(['test_propertyViewer'])
    expect(executionDescription.ctx.userRemit.add.boards['test_personalDetails']).to.eql(undefined)
    expect(executionDescription.ctx.userRemit.remove.boards)
      .to.eql(['test_expenses'])
  })

  it('remove all the todos in the database', () => {
    return sqlScriptRunner('./db-scripts/todos/setup2.sql', client)
  })

  it('expect empty todo object in remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          boardNames: {},
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          formNames: {},
          startable: []
        }
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(executionDescription.currentStateName).to.eql('GetUserRemit')
    expect(executionDescription.currentResource).to.eql('module:getUserRemit')
    expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
    expect(executionDescription.status).to.eql('SUCCEEDED')

    expect(Object.keys(executionDescription.ctx.userRemit.add.todos).length).to.eql(0)

    expect(executionDescription.ctx.userRemit.remove).to.eql({})
  })

  after(async () => {
    await sqlScriptRunner('./db-scripts/cleanup.sql', client)
    await tymlyService.shutdown()
  })
})
