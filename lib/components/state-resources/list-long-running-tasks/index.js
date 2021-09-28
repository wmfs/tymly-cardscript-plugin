class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.storage = env.bootedServices.storage
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.tasks = env.bootedServices.tasks
    this.longRunningTasks = env.bootedServices.tasks.longRunningTasks
    this.longRunningTaskNames = [...Object.keys(this.longRunningTasks)]
  }

  async run (event, context) {
    if (this.longRunningTaskNames.length === 0) {
      return context.sendTaskSuccess({
        running: [],
        complete: []
      })
    }

    const userId = event.allUsers === true ? null : this.storage.currentUser()

    const runningTasks = await this.tasks.findRunningTasks(userId)
    const completedTasks = await this.tasks.findCompletedTasks(userId)

    await this.tasks.clearTasks(completedTasks.filter(t => t.clearable).map(t => t.executionName))

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: completedTasks
    })
  }
}

module.exports = ListLongRunningTasks
