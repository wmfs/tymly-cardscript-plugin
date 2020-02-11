class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTaskNames = findTasks(env)
  }

  async run (_, context) {
    const runningTasks = await this.findTasks(
      context,
      'RUNNING'
    )
    const completedTasks = await this.findTasks(
      context,
      ['SUCCEEDED', 'FAILED'],
      3
    )

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: completedTasks
    })
  }

  async findTasks (context, status, limit = 100) {
    const allTasks = []
    for (const taskName of this.longRunningTaskNames) {
      const tasks = await this.executions
        .find({
          fields: ['executionName', 'stateMachineName', 'created'],
          where: {
            status: { equals: status },
            stateMachineName: { equals: taskName },
            createdBy: { equals: context.userId }
          },
          orderBy: ['-modified'],
          limit: limit
        })
      allTasks.push(...tasks)
    } // for ...
    return allTasks
  }
}

function findTasks (env) {
  const tasks = Object.entries(env.blueprintComponents.stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => definition.instigators.includes('user'))
    .filter(([, definition]) => isProgress(definition))
    .map(([name]) => name)
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
