class ReassignTodoEntries {
  init (resourceConfig, env) {
    this.todos = env.bootedServices.storage.models.tymly_todos
  }

  async run (event, context) {
    const {
      property,
      value,
      todoIds = []
    } = event

    if (!value) return context.sendTaskFailure({ error: 'ReassignTodoEntriesMissingValue', cause: 'No user id or team name provided as value' })
    if (!(property === 'userId' || property === 'teamName')) return context.sendTaskFailure({ error: 'ReassignTodoEntriesIncorrectProperty', cause: 'Property must be userId or teamName' })

    const todoIdsArr = Array.isArray(todoIds) ? todoIds : [todoIds]

    if (!todoIdsArr.length) return context.sendTaskFailure({ error: 'ReassignTodoEntriesNoTodoIds', cause: 'No todoIds have been provided' })

    for (const id of todoIdsArr) {
      const todo = await this.todos.findById(id)

      if (property === 'userId') delete todo.teamName
      if (property === 'teamName') delete todo.userId

      todo[property] = value
      await this.todos.update(todo)
    }

    return context.sendTaskSuccess()
  }
}

module.exports = ReassignTodoEntries
