/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const GET_TODO_CHANGES_STATE_MACHINE = 'tymly_getTodoChanges_1_0'
const CREATE_TO_DO_ENTRY = 'tymly_createTodoEntry_1_0'
const REMOVE_TODO_STATE_MACHINE = 'tymly_removeTodoEntries_1_0'
const REASSIGN_TODO_STATE_MACHINE = 'tymly_reassignTodoEntries_1_0'

describe('todo changes tymly-cardscript-plugin tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)
  let statebox, todos, tymlyService, client

  before(async () => {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      return this.skip()
    }

    const tymlyServices = await tymly.boot({
      pluginPaths: [
        path.resolve(__dirname, './../lib'),
        path.resolve(__dirname, './fixtures/mock-rbac-plugin'),
        require.resolve('@wmfs/tymly-pg-plugin'),
        require.resolve('@wmfs/tymly-solr-plugin')
      ]
    })

    statebox = tymlyServices.statebox
    todos = tymlyServices.storage.models.tymly_todos
    tymlyService = tymlyServices.tymly
    client = tymlyServices.storage.client
  })

  describe('user todo entry', () => {
    let userTodoId = null

    it('create a user todo entry', async () => {
      const executionDescription = await statebox.startExecution(
        {
          todoTitle: 'ToDo Expense Claim',
          stateMachineTitle: 'Process expense claim for User',
          stateMachineCategory: 'Expenses',
          description: 'Claiming $12 for A pack of Duff Beer'
        },
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      userTodoId = executionDescription.ctx.idProperties.id
    })

    it('todo is present', async () => {
      const doc = await todos.findById(userTodoId)
      expect(doc.userId).to.eql('todo-user')
      expect(doc.description).to.eql('Claiming $12 for A pack of Duff Beer')
    })

    it('update user todo entry', async () => {
      const executionDescription = await statebox.startExecution(
        {
          todoTitle: 'ToDo Expense Claim',
          stateMachineTitle: 'Process expense claim for User',
          stateMachineCategory: 'Expenses',
          description: 'User is claiming $12 for A pack of Duff Beer',
          id: userTodoId
        },
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('todo is updated', async () => {
      const doc = await todos.findById(userTodoId)
      expect(doc.userId).to.eql('todo-user')
      expect(doc.description).to.eql('User is claiming $12 for A pack of Duff Beer')
    })

    it('re-assign todo entry to another user', async () => {
      const executionDescription = await statebox.startExecution(
        {
          property: 'userId',
          value: 'other-user',
          todoIds: [userTodoId]
        },
        REASSIGN_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('ReassignTodoEntries')
      expect(executionDescription.currentResource).to.eql('module:reassignTodoEntries')
      expect(executionDescription.stateMachineName).to.eql(REASSIGN_TODO_STATE_MACHINE)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      const doc = await todos.findById(userTodoId)
      expect(doc.userId).to.eql('other-user')
      expect(doc.teamName).to.eql(null)
    })

    it('remove the todo', async () => {
      await statebox.startExecution(
        {
          todoId: userTodoId
        },
        REMOVE_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )
    })

    it('todo is removed', async () => {
      const doc = await todos.findById(userTodoId)
      expect(doc).to.eql(undefined)
    })
  })

  describe('role todo entry', () => {
    let roleTodoId = null

    it('create a role todo entry', async () => {
      const executionDescription = await statebox.startExecution(
        {
          role: 'role_MonkeyPunk',
          todoTitle: 'ToDo Expense Claim',
          stateMachineTitle: 'Process expense claim for User',
          stateMachineCategory: 'Expenses',
          description: 'Claiming $12 for A pack of Duff Beer'
        },
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      roleTodoId = executionDescription.ctx.idProperties.id
    })

    it('todo is present', async () => {
      const doc = await todos.findById(roleTodoId)
      expect(doc.userId).to.eql(null)
      expect(doc.teamName).to.eql('role_MonkeyPunk')
      expect(doc.description).to.eql('Claiming $12 for A pack of Duff Beer')
    })

    it('update role todo entry', async () => {
      const executionDescription = await statebox.startExecution(
        {
          role: 'role_MonkeyPunk',
          todoTitle: 'ToDo Expense Claim',
          stateMachineTitle: 'Process expense claim for User',
          stateMachineCategory: 'Expenses',
          description: 'User is claiming $12 for A pack of Duff Beer',
          id: roleTodoId
        },
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('todo is updated', async () => {
      const doc = await todos.findById(roleTodoId)
      expect(doc.userId).to.eql(null)
      expect(doc.teamName).to.eql('role_MonkeyPunk')
      expect(doc.description).to.eql('User is claiming $12 for A pack of Duff Beer')
    })

    it('re-assign todo entry to another team', async () => {
      const executionDescription = await statebox.startExecution(
        {
          property: 'teamName',
          value: 'other-team',
          todoIds: [roleTodoId]
        },
        REASSIGN_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )

      expect(executionDescription.currentStateName).to.eql('ReassignTodoEntries')
      expect(executionDescription.currentResource).to.eql('module:reassignTodoEntries')
      expect(executionDescription.stateMachineName).to.eql(REASSIGN_TODO_STATE_MACHINE)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      const doc = await todos.findById(roleTodoId)
      expect(doc.teamName).to.eql('other-team')
      expect(doc.userId).to.eql(null)
    })

    it('remove the todo', async () => {
      await statebox.startExecution(
        {
          todoId: roleTodoId
        },
        REMOVE_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: 'todo-user'
        }
      )
    })

    it('todo is removed', async () => {
      const doc = await todos.findById(roleTodoId)
      expect(doc).to.eql(undefined)
    })
  })

  describe('get todo changes', () => {
    before(async () => {
      await sqlScriptRunner('./db-scripts/settings/setup.sql', client)
      await sqlScriptRunner('./db-scripts/favourites/setup.sql', client)
      await sqlScriptRunner('./db-scripts/todos/setup.sql', client)
    })

    describe('user id without role', () => {
      it('get todos', async () => {
        const executionDescription = await statebox.startExecution(
          {
            clientTodos: [] // for getTodos
          },
          GET_TODO_CHANGES_STATE_MACHINE,
          {
            sendResponse: 'COMPLETE',
            userId: 'test-user'
          }
        )

        expect(executionDescription.currentStateName).to.eql('GetTodoChanges')
        expect(executionDescription.currentResource).to.eql('module:getTodoChanges')
        expect(executionDescription.stateMachineName).to.eql(GET_TODO_CHANGES_STATE_MACHINE)
        expect(executionDescription.status).to.eql('SUCCEEDED')
        expect(Object.keys(executionDescription.ctx.todoChanges.add).length).to.eql(2)
        expect(Object.keys(executionDescription.ctx.todoChanges.add)
          .includes('5200987c-bb03-11e7-abc4-cec278b6b50a')).to.eql(true)
        expect(Object.keys(executionDescription.ctx.todoChanges.add)
          .includes('0d625558-ce99-11e7-b7e3-c38932399c15')).to.eql(true)
        expect(executionDescription.ctx.todoChanges.remove).to.eql([])
      })

      it('get todo changes', async () => {
        const executionDescription = await statebox.startExecution(
          {
            clientTodos: [
              '5200987c-bb03-11e7-abc4-cec278b6b50a',
              '52009d36-bb03-11e7-abc4-cec278b6b50a',
              '52009e4e-bb03-11e7-abc4-cec278b6b50a',
              '52009f20-bb03-11e7-abc4-cec278b6b50a',
              '52009ff2-bb03-11e7-abc4-cec278b6b50a'
            ] // for getTodos
          },
          GET_TODO_CHANGES_STATE_MACHINE,
          {
            sendResponse: 'COMPLETE',
            userId: 'test-user'
          }
        )

        expect(executionDescription.currentStateName).to.eql('GetTodoChanges')
        expect(executionDescription.currentResource).to.eql('module:getTodoChanges')
        expect(executionDescription.stateMachineName).to.eql(GET_TODO_CHANGES_STATE_MACHINE)
        expect(executionDescription.status).to.eql('SUCCEEDED')
        expect(Object.keys(executionDescription.ctx.todoChanges.add)).to.eql([
          '0d625558-ce99-11e7-b7e3-c38932399c15'
        ])
        expect(executionDescription.ctx.todoChanges.remove.length).to.eql(4)
        expect(executionDescription.ctx.todoChanges.remove
          .includes('52009d36-bb03-11e7-abc4-cec278b6b50a')).to.eql(true)
        expect(executionDescription.ctx.todoChanges.remove
          .includes('52009e4e-bb03-11e7-abc4-cec278b6b50a')).to.eql(true)
        expect(executionDescription.ctx.todoChanges.remove
          .includes('52009f20-bb03-11e7-abc4-cec278b6b50a')).to.eql(true)
        expect(executionDescription.ctx.todoChanges.remove
          .includes('52009ff2-bb03-11e7-abc4-cec278b6b50a')).to.eql(true)
      })
    })

    describe('user id with "test-team" role', () => {
      it('get todos', async () => {
        const executionDescription = await statebox.startExecution(
          {
            clientTodos: [] // for getTodos
          },
          GET_TODO_CHANGES_STATE_MACHINE,
          {
            sendResponse: 'COMPLETE',
            userId: 'test-team-member'
          }
        )

        expect(executionDescription.currentStateName).to.eql('GetTodoChanges')
        expect(executionDescription.currentResource).to.eql('module:getTodoChanges')
        expect(executionDescription.stateMachineName).to.eql(GET_TODO_CHANGES_STATE_MACHINE)
        expect(executionDescription.status).to.eql('SUCCEEDED')
        expect(Object.keys(executionDescription.ctx.todoChanges.add).length).to.eql(2)
        expect(Object.keys(executionDescription.ctx.todoChanges.add)
          .includes('77777777-ce99-11e7-b7e3-c38932399c15')).to.eql(true)
        expect(Object.keys(executionDescription.ctx.todoChanges.add)
          .includes('88888888-ce99-11e7-b7e3-c38932399c15')).to.eql(true)
        expect(executionDescription.ctx.todoChanges.remove).to.eql([])
      })
    })
  })

  // describe('bad todos', () => {
  //   it('fail to find a todo that doesn\'t exist', async () => {
  //     const executionDescription = await statebox.startExecution(
  //       {
  //         todoId: 'FAILHERE'
  //       },
  //       REMOVE_TODO_STATE_MACHINE,
  //       {
  //         sendResponse: 'COMPLETE',
  //         userId: 'test-user'
  //       }
  //     )
  //
  //     expect(executionDescription.status).to.eql('FAILED')
  //     expect(executionDescription.errorCode).to.eql('removeTodoFail')
  //   })
  // })

  after(async () => {
    await sqlScriptRunner('./db-scripts/cleanup.sql', client)
    await tymlyService.shutdown()
  })
})
