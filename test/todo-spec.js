/* eslint-env mocha */

'use strict'

const tymly = require('@wmfs/tymly')
const path = require('path')
const expect = require('chai').expect
const process = require('process')
const sqlScriptRunner = require('./fixtures/sql-script-runner.js')

const CREATE_TO_DO_ENTRY = 'tymly_createTodoEntry_1_0'
const REMOVE_TODO_STATE_MACHINE = 'tymly_removeTodoEntries_1_0'
const REASSIGN_TODO_STATE_MACHINE = 'tymly_reassignTodoEntries_1_0'

const findTodos = require('../lib/components/state-resources/get-todo-changes/findTodos')

describe('todo tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  before(function () {
    if (process.env.PG_CONNECTION_STRING && !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(process.env.PG_CONNECTION_STRING)) {
      console.log(`Skipping tests due to unsafe PG_CONNECTION_STRING value (${process.env.PG_CONNECTION_STRING})`)
      this.skip()
    }
  })

  let statebox, todos, tymlyService, client, userInfo, membershipModel, rbac

  const user1 = 'test-user-1'
  const user2 = 'test-user-2'
  const user3 = 'test-user-3'
  const teamName1 = 'test-team-1'
  const teamName2 = 'test-team-2'

  it('Boot tymly', async () => {
    const tymlyServices = await tymly.boot({
      pluginPaths: [
        path.resolve(__dirname, './../lib'),
        require.resolve('@wmfs/tymly-test-helpers/plugins/allow-everything-rbac-plugin'),
        require.resolve('@wmfs/tymly-test-helpers/plugins/mock-user-info-plugin'),
        require.resolve('@wmfs/tymly-pg-plugin'),
        require.resolve('@wmfs/tymly-solr-plugin')
      ]
    })

    statebox = tymlyServices.statebox
    todos = tymlyServices.storage.models.tymly_todos
    membershipModel = tymlyServices.storage.models.tymly_roleMembership
    tymlyService = tymlyServices.tymly
    userInfo = tymlyServices.userInfo
    rbac = tymlyServices.rbac
    client = tymlyServices.storage.client
  })

  it('set up users', async () => {
    for (const userId of [user1, user2, user3]) {
      userInfo.addUser(userId, `${userId}@tymly-test.com`)
    }

    await membershipModel.create({ roleId: teamName1, memberId: user1, memberType: 'user' })
    await membershipModel.create({ roleId: teamName2, memberId: user3, memberType: 'user' })
  })

  // todo: create some roles - rbacAdmin.createRole(...)
  // todo: assign some user to the roles - await this.membershipModel.upsert({ roleId, memberId, memberType }, {})

  describe('creating a todo without providing anything (user id of person logged in)', function () {
    // Logged in as user1

    const todo = {
      todoTitle: 'ToDo Expense Claim',
      stateMachineTitle: 'Process expense claim for User',
      stateMachineCategory: 'Expenses',
      description: 'Claiming $12 for A pack of Duff Beer'
    }

    it('create todo', async () => {
      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      todo.id = executionDescription.ctx.idProperties.id
    })

    it('check todo is present', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user1)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(1)
      expect(todosUser1[todo.id].description).to.eql(todo.description)
    })

    it('update todo', async () => {
      todo.description = 'User is claiming $12 for A pack of Duff Beer'

      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('check todo is updated', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user1)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('re-assign todo entry to user2', async () => {
      const executionDescription = await statebox.startExecution(
        {
          property: 'userId',
          value: user2,
          todoIds: [todo.id]
        },
        REASSIGN_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('ReassignTodoEntries')
      expect(executionDescription.currentResource).to.eql('module:reassignTodoEntries')
      expect(executionDescription.stateMachineName).to.eql(REASSIGN_TODO_STATE_MACHINE)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('find todos after re-assigning', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(1)
      expect(todosUser2[todo.id].description).to.eql(todo.description)
    })

    it('check todo has been re-assigned', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user2)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
    })

    it('remove todo', async () => {
      await statebox.startExecution(
        {
          todoId: todo.id
        },
        REMOVE_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )
    })

    it('check todo has been removed', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc).to.eql(undefined)

      const count = await todos.findCount()
      expect(count).to.eql(0)
    })

    it('find todos after removal', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(0)
    })
  })

  describe('creating a todo providing a specific user ID', function () {
    // Logged in as user1, assigning to user2

    const todo = {
      userId: user2,
      todoTitle: 'ToDo Expense Claim',
      stateMachineTitle: 'Process expense claim for User',
      stateMachineCategory: 'Expenses',
      description: 'Claiming $12 for A pack of Duff Beer'
    }

    it('create todo', async () => {
      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      todo.id = executionDescription.ctx.idProperties.id
    })

    it('check todo is present', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user2)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('update todo', async () => {
      todo.description = 'User is claiming $12 for A pack of Duff Beer'

      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('check todo is updated', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user2)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(1)
      expect(todosUser2[todo.id].description).to.eql(todo.description)
    })

    it('remove todo', async () => {
      await statebox.startExecution(
        {
          todoId: todo.id
        },
        REMOVE_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )
    })

    it('find todos after removing', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(0)
    })
  })

  describe('creating a todo providing a team role', function () {
    // Logged in as user1, assigning to teamName1

    const todo = {
      role: teamName1,
      todoTitle: 'ToDo Expense Claim',
      stateMachineTitle: 'Process expense claim for User',
      stateMachineCategory: 'Expenses',
      description: 'Claiming $12 for A pack of Duff Beer'
    }

    it('create todo', async () => {
      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')

      todo.id = executionDescription.ctx.idProperties.id
    })

    it('check todo is present', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(null)
      expect(doc.teamName).to.eql(teamName1)
      expect(doc.description).to.eql(todo.description)
    })

    it('update todo', async () => {
      todo.description = 'User is claiming $12 for A pack of Duff Beer'

      const executionDescription = await statebox.startExecution(
        todo,
        CREATE_TO_DO_ENTRY,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('CreateTodoEntry')
      expect(executionDescription.currentResource).to.eql('module:createTodoEntry')
      expect(executionDescription.stateMachineName).to.eql(CREATE_TO_DO_ENTRY)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('check todo is updated', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(null)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(teamName1)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(1)
      expect(todosUser1[todo.id].description).to.eql(todo.description)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(0)
    })

    it('re-assign todo entry to teamName2', async () => {
      const executionDescription = await statebox.startExecution(
        {
          property: 'teamName',
          value: teamName2,
          todoIds: [todo.id]
        },
        REASSIGN_TODO_STATE_MACHINE,
        {
          sendResponse: 'COMPLETE',
          userId: user1
        }
      )

      expect(executionDescription.currentStateName).to.eql('ReassignTodoEntries')
      expect(executionDescription.currentResource).to.eql('module:reassignTodoEntries')
      expect(executionDescription.stateMachineName).to.eql(REASSIGN_TODO_STATE_MACHINE)
      expect(executionDescription.status).to.eql('SUCCEEDED')
    })

    it('find todos after re-assigning', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac)
      expect(Object.keys(todosUser2).length).to.eql(0)

      const todosUser3 = await findTodos(user3, todos, rbac)
      expect(Object.keys(todosUser3).length).to.eql(1)
      expect(todosUser3[todo.id].description).to.eql(todo.description)
    })
  })

  // describe('creating a todo providing a user email', function () {
  //
  // })

  after(async () => {
    await sqlScriptRunner('./db-scripts/cleanup.sql', client)
    await tymlyService.shutdown()
  })
})

/*
describe('todo changes tymly-cardscript-plugin tests', function () {
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
*/
