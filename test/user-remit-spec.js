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

  it('get user remit - only get counts', async () => {
    const execDesc = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
          startable: []
        },
        countsOnly: true
      },
      GET_USER_REMIT_STATE_MACHINE,
      {
        sendResponse: 'COMPLETE',
        userId: 'test-user'
      }
    )

    expect(execDesc.ctx.userRemit.add.todos).to.eql({ expenses: 1 })
  })

  it('get user remit - whole remit because client doesn\'t contain anything', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
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

    const { favouriteStartableNames, add, remove, settings } = executionDescription.ctx.userRemit
    const { categories, todos, teams, cards, startable } = add
    const { categoryRelevance } = settings

    expect(categoryRelevance.sort()).to.eql(['expenses', 'gazetteer', 'hr', 'hydrants', 'incidents'])
    expect(favouriteStartableNames.sort()).to.eql(['notifications', 'settings'])
    expect(Object.keys(categories).sort()).to.eql(['fire', 'gazetteer', 'help', 'system', 'water'])
    expect(Object.keys(todos).sort()).to.eql(['a69c0ac9-cde5-11e7-abc4-cec278b6b50a'])
    expect(Object.keys(teams).sort()).to.eql(['Birmingham (Red watch)', 'Fire Safety (North)'])
    expect(Object.keys(cards).sort()).to.eql(['test_pizzaDetails_1_0', 'test_pizzaForm_1_0', 'tymly_rbacGrantRoleMembership_1_0', 'tymly_removeRoleMembership_1_0', 'tymly_viewRoleMemberships_1_0'])

    // State machine with role: 'topSecretRole' should NOT appear in startable
    // State machine without 'user' as instigator should NOT appear in startable
    expect(Object.keys(startable).sort()).to.eql(['test_getBoards_1_0', 'test_justAStateMachine_1_0'])

    expect(remove).to.eql({})
  })

  it('get user with role remit - includes role todos', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
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

    const { favouriteStartableNames, add, remove, settings } = executionDescription.ctx.userRemit
    const { categories, todos, teams, cards, startable } = add
    const { categoryRelevance } = settings

    expect(categoryRelevance.sort()).to.eql(['expenses', 'gazetteer', 'hr', 'hydrants', 'incidents'])
    expect(favouriteStartableNames).to.eql([])
    expect(Object.keys(categories).sort()).to.eql(['fire', 'gazetteer', 'help', 'system', 'water'])
    expect(Object.keys(todos).sort()).to.eql(['a69c0ae8-cde5-11e7-abc4-cec278b6b50a', 'a69c0dcc-cde5-11e7-abc4-cec278b6b50a'])
    expect(Object.keys(teams).sort()).to.eql(['Birmingham (Red watch)', 'Fire Safety (North)'])
    expect(Object.keys(cards).sort()).to.eql(['test_pizzaDetails_1_0', 'test_pizzaForm_1_0', 'tymly_rbacGrantRoleMembership_1_0', 'tymly_removeRoleMembership_1_0', 'tymly_viewRoleMemberships_1_0'])

    // State machine with role: 'topSecretRole' should NOT appear in startable
    // State machine without 'user' as instigator should NOT appear in startable
    expect(Object.keys(startable).sort()).to.eql(['test_getBoards_1_0', 'test_justAStateMachine_1_0'])

    expect(remove).to.eql({})
  })

  it('what if the user only has settings and no favourites yet?', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
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

    const { settings, favouriteStartableNames } = executionDescription.ctx.userRemit
    const { categoryRelevance } = settings

    expect(categoryRelevance.sort()).to.eql(['expenses', 'gazetteer', 'hr', 'hydrants', 'incidents'])
    expect(favouriteStartableNames).to.eql([])
  })

  it('add fire, water and remove hr category names to the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: ['gazetteer', 'hr'],
          teams: [],
          todos: [],
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

    const { categories } = executionDescription.ctx.userRemit.add

    expect(Object.keys(categories).sort()).to.eql(['fire', 'help', 'system', 'water'])
  })

  it('add/remove todo execution names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: ['a69c0ac9-cde5-11e7-abc4-cec278b6b50a', 'a69c0ad0-cde5-11e7-abc4-cec278b6b50a'],
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

    const { todos } = executionDescription.ctx.userRemit.remove

    expect(todos.sort()).to.eql(['a69c0ad0-cde5-11e7-abc4-cec278b6b50a'])
  })

  it('add/remove team names to/from the remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: ['Birmingham (Red watch)', 'Another team'],
          todos: [],
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

    const { add, remove } = executionDescription.ctx.userRemit

    expect(Object.keys(add.teams).sort()).to.eql(['Fire Safety (North)'])
    expect(remove.teams.sort()).to.eql(['Another team'])
  })

  // it('test shasum remit', async () => {
  //   const executionDescription = await statebox.startExecution(
  //     {
  //       clientManifest: {
  //         cardNames: {},
  //         categoryNames: [],
  //         teams: [],
  //         todos: [],
  //         startable: []
  //       }
  //     },
  //     GET_USER_REMIT_STATE_MACHINE,
  //     {
  //       sendResponse: 'COMPLETE',
  //       userId: 'test-user'
  //     }
  //   )
  //
  //   expect(executionDescription.currentStateName).to.eql('GetUserRemit')
  //   expect(executionDescription.currentResource).to.eql('module:getUserRemit')
  //   expect(executionDescription.stateMachineName).to.eql(GET_USER_REMIT_STATE_MACHINE)
  //   expect(executionDescription.status).to.eql('SUCCEEDED')
  //   expect(Object.keys(executionDescription.ctx.userRemit.add.boards)).to.eql(['test_propertyViewer'])
  //   expect(executionDescription.ctx.userRemit.add.boards['test_personalDetails']).to.eql(undefined)
  //   expect(executionDescription.ctx.userRemit.remove.boards)
  //     .to.eql(['test_expenses'])
  // })

  it('remove all the todos in the database', () => {
    return sqlScriptRunner('./db-scripts/todos/setup2.sql', client)
  })

  it('expect empty todo object in remit', async () => {
    const executionDescription = await statebox.startExecution(
      {
        clientManifest: {
          cardNames: {},
          categoryNames: [],
          teams: [],
          todos: [],
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
