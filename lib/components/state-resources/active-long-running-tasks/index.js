class ActiveLongRunningTasks {
  init (resourceConfig, env) {
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTaskNames = findTasks(env)
  }

  async run (_, context) {
    const runningTasks = await this.findTasks(
      'RUNNING',
      context
    )
    const completedTasks = await this.findTasks(
      ['SUCCEEDED', 'FAILED'],
      context
    )

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: completedTasks
    })
  }

  findTasks (status, context) {
    return this.executions
      .find({
        fields: ['executionName', 'stateMachineName', 'created'],
        where: {
          status: { equals: status },
          stateMachineName: { equals: this.longRunningTaskNames },
          createdBy: { equals: context.userId }
        }
      })
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

module.exports = ActiveLongRunningTasks
