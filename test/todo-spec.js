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

  describe('creating a todo without providing anything (user id of person logged in)', function () {
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

    it('check todo is present in model', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user1)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
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

    it('check todo is updated in model', async () => {
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
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(1)
      expect(todosUser2[todo.id].description).to.eql(todo.description)
    })

    it('check todo has been re-assigned in model', async () => {
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

    it('check todo has been removed from model', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc).to.eql(undefined)

      const count = await todos.findCount()
      expect(count).to.eql(0)
    })

    it('find todos after removal', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(0)
    })
  })

  describe('creating a todo providing a specific user ID', function () {
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

    it('check todo is present in model', async () => {
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

    it('check todo is updated in model', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(user2)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
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
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(0)
    })
  })

  describe('creating a todo providing a team role', function () {
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

    it('check todo is present in model', async () => {
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

    it('check todo is updated in model', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(null)
      expect(doc.userEmail).to.eql(null)
      expect(doc.teamName).to.eql(teamName1)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(1)
      expect(todosUser1[todo.id].description).to.eql(todo.description)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
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
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(0)

      const todosUser3 = await findTodos(user3, todos, rbac, userInfo)
      expect(Object.keys(todosUser3).length).to.eql(1)
      expect(todosUser3[todo.id].description).to.eql(todo.description)
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
  })

  describe('creating a todo providing a user email', function () {
    const todo = {
      userEmail: `${user1}@tymly-test.com`,
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

    it('check todo is present in model', async () => {
      const doc = await todos.findById(todo.id)
      expect(doc.userId).to.eql(null)
      expect(doc.userEmail).to.eql(todo.userEmail)
      expect(doc.teamName).to.eql(null)
      expect(doc.description).to.eql(todo.description)
    })

    it('find todos', async () => {
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(1)
      expect(todosUser1[todo.id].description).to.eql(todo.description)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(0)

      const todosUser3 = await findTodos(user3, todos, rbac, userInfo)
      expect(Object.keys(todosUser3).length).to.eql(0)
    })

    it('re-assign todo entry to user2', async () => {
      const executionDescription = await statebox.startExecution(
        {
          property: 'userEmail',
          value: `${user2}@tymly-test.com`,
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
      const todosUser1 = await findTodos(user1, todos, rbac, userInfo)
      expect(Object.keys(todosUser1).length).to.eql(0)

      const todosUser2 = await findTodos(user2, todos, rbac, userInfo)
      expect(Object.keys(todosUser2).length).to.eql(1)
      expect(todosUser2[todo.id].description).to.eql(todo.description)

      const todosUser3 = await findTodos(user3, todos, rbac, userInfo)
      expect(Object.keys(todosUser3).length).to.eql(0)
    })
  })

  after(async () => {
    await sqlScriptRunner('./db-scripts/cleanup.sql', client)
    await tymlyService.shutdown()
  })
})
