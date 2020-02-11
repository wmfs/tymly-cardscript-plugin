class ActiveLongRunningTasks {
  init (resourceConfig, env) {
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTaskNames = findTasks(env)
  }

  async run (_, context) {
    const runningTasks = await this.executions
      .find({
        fields: ['executionName', 'stateMachineName', 'created' ],
        where: {
          status: { equals: 'RUNNING' },
          stateMachineName: { equals: this.longRunningTaskNames },
          createdBy: { equals: context.userId }
        }
      })

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: []
    })
  }
}

function findTasks(env) {
  const tasks = Object.entries(env.blueprintComponents.stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => definition.instigators.includes('user'))
    .filter(([, definition]) => isProgressOrInfo(definition))
    .map(([name]) => name)
  return tasks
}

function isProgressOrInfo(definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => ['progress', 'info'].includes(state.ResourceConfig.uiType))
  return progressOrInfo.length !== 0
}

module.exports = ActiveLongRunningTasks
