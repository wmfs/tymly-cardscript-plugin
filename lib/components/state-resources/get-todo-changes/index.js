const _ = require('lodash')

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
      const userId = context.userId
      const roles = await this.userRoles(userId)
      const clientTodos = event.clientTodos

      const resultsObj = await this.findTodos(
        { userId: { equals: userId } }
      )

      if (roles.length) {
        await this.findTodos(
          { teamName: { equals: roles } },
          resultsObj
        )
      } // if ...

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

  async userRoles (userId) {
    const roles = await this.rbacService.listUserRoles(userId)
    return roles.filter(r => r[0] !== '$') // strip built-in roles
  }

  async findTodos(filter, resultsObj = {}) {
    const toDos = await this.todos.find({
      where: filter
    })
    toDos.map(r => { resultsObj[r['id']] = r })
    return resultsObj
  } // findTodos

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
