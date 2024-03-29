const { v1: uuid } = require('uuid')

class CreateTodoEntry {
  init (resourceConfig, env) {
    this.todos = env.bootedServices.storage.models.tymly_todos
  }

  /**
   * Creates a todo for use within Tymly
   * @param {Object} event The event of the current Tymly execution
   * @param {Object} context The current Tymly context object
   * @returns {Object} executionDescription
   * @example
   * const executionDescription = await statebox.startExecution(
   {
      todoTitle: 'ToDo Expense Claim',
      description: 'Claiming $12 for A pack of Duff Beer',
      stateMachineTitle: 'Process expense claim for User',
      stateMachineCategory: 'Expenses',
      id: ID_1
    },
   CREATE_TO_DO_ENTRY,
   {
      sendResponse: 'COMPLETE',
      userId: 'todo-user'
    }
   )
   */
  async run (event, context) {
    const teamName = event.role

    let userEmail = null

    if (event.userEmail && !teamName && !event.userId) {
      userEmail = event.userEmail.trim().toLowerCase()
    }

    let userId = null

    if (!teamName && !userEmail) {
      userId = event.userId || context.userId
    }

    const todoEntry = {
      userId,
      userEmail,
      teamName,
      stateMachineTitle: event.stateMachineTitle,
      stateMachineCategory: event.stateMachineCategory,
      requiredHumanInput: event.requiredHumanInput,
      description: event.description,
      launches: event.launches || [],
      todoTitle: event.todoTitle
    }

    todoEntry.id = event.id || uuid()

    todoEntry.launches = todoEntry.launches.map(l => {
      if (l.input) l.input.TODO_ENTRY_ID = todoEntry.id
      return l
    })

    try {
      const doc = await this.todos.upsert(todoEntry, {})
      context.sendTaskSuccess(doc)
    } catch (err) {
      context.sendTaskFailure(err)
    }
  }
}

module.exports = CreateTodoEntry
