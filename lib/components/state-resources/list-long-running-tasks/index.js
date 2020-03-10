class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.storage = env.bootedServices.storage
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTasks = findLongRunningTasks(env)
    this.longRunningTaskNames = [...Object.keys(this.longRunningTasks)]
  }

  async run (_, context) {
    const runningTasks = await this.findTasks(
      context,
      'RUNNING'
    )
    const completedTasks = await this.findTasks(
      context,
      ['SUCCEEDED', 'FAILED', 'STOPPED'],
      3
    )

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: completedTasks
    })
  }

  async findTasks (context, status, limit = 100) {
    const tasks = await this.executions
      .find({
        fields: ['executionName', 'stateMachineName', 'created', 'modified'],
        where: {
          status: { equals: status },
          stateMachineName: { equals: this.longRunningTaskNames },
          createdBy: { equals: this.storage.currentUser() }
        },
        orderBy: ['-modified'],
        limit: limit
      })

    tasks.forEach(t => t.title = this.longRunningTasks[t.stateMachineName])

    return tasks
  }
}

function findLongRunningTasks (env) {
  const tasks = { }

  Object.entries(env.blueprintComponents.stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => definition.instigators.includes('user'))
    .filter(([, definition]) => isProgress(definition))
    .forEach(([name, definition]) => tasks[name] = definition.name)

  return tasks
}

function isProgress (definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => state.ResourceConfig.uiType === 'progress')
  return progressOrInfo.length !== 0
}

module.exports = ListLongRunningTasks
