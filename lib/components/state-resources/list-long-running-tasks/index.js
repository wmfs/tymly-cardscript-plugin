class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.storage = env.bootedServices.storage
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTasks = env.bootedServices.tasks.longRunningTasks
    this.longRunningTaskNames = [...Object.keys(this.longRunningTasks)]
  }

  async run (_, context) {
    if (this.longRunningTaskNames.length === 0) {
      return context.sendTaskSuccess({
        running: [],
        complete: []
      })
    }

    const runningTasks = await this.findTasks(
      context,
      'RUNNING'
    )
    const completedTasks = await this.findTasks(
      context,
      ['SUCCEEDED', 'FAILED', 'STOPPED']
    )

    await this.clearTasks(completedTasks.filter(t => t.clearable))

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

    tasks.forEach(t => {
      const task = this.longRunningTasks[t.stateMachineName]
      t.title = task.title
      t.clearable = task.clearable
    })

    return tasks
  }

  async clearTasks (tasks) {
    return Promise.all(
      tasks.map(({ executionName }) => this.executions.destroyById(executionName))
    )
  }
}

module.exports = ListLongRunningTasks
