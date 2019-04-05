const _ = require('lodash')
const findTodos = require('./findTodos')

class GetTodoChanges {
  init (resourceConfig, env) {
    this.todos = env.bootedServices.storage.models['tymly_todos']
    this.bootedServices = env.bootedServices
  }

  get rbacService () { return this.bootedServices.rbac }

  /**
   * Gets a diff of todos compared to what is currently available
   * @param {Object} event The event of the current Tymly execution
   * @param {Object} context The current Tymly context object
   * @returns {Object} executionDescription
   * @example
   */
  async run (event, context) {
    try {
      const resultsObj = await findTodos(
        context.userId,
        this.todos,
        this.rbacService
      )

      const clientTodos = event.clientTodos

      const todoChanges = {
        add: {},
        remove: []
      }

      this.processComponents(todoChanges, resultsObj, clientTodos)
      context.sendTaskSuccess({ todoChanges })
    } catch (err) {
      context.sendTaskFailure({ error: 'getTodoChangesFail', cause: err })
    } // catch
  } // run

  processComponents (userRemit, components, alreadyInClientManifest) {
    Object.keys(components).forEach(componentId => {
      if (!alreadyInClientManifest.includes(componentId)) {
        userRemit.add[componentId] = components[componentId]
      }
    })

    const namesToRemove = _.difference(alreadyInClientManifest, Object.keys(components))
    if (namesToRemove.length > 0) {
      userRemit.remove = namesToRemove
    }

    return userRemit
  }
}

module.exports = GetTodoChanges
