class ActiveLongRunningTasks {
  init (resourceConfig, env) {
    this.executions = env.bootedServices.storage.models.execution
  }

  run (_, context) {
    return context.sendTaskSuccess([ ])
  }
}

module.exports = ActiveLongRunningTasks
