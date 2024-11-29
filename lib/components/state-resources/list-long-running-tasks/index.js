class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.storage = env.bootedServices.storage
    this.executions = env.bootedServices.storage.models.tymly_execution
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

    const { allUsers = false } = event
    const limit = allUsers ? null : 100
    const userId = allUsers ? null : this.storage.currentUser()

    const [runningTasks, completedTasks] = await Promise.all(
      [
        'RUNNING',
        ['SUCCEEDED', 'FAILED', 'STOPPED']
      ].map(status => this.findTasks(context, status, limit, userId))
    )

    await this.clearTasks(completedTasks.filter(t => t.clearable))

    return context.sendTaskSuccess({
      running: runningTasks,
      complete: completedTasks
    })
  }

  async findTasks (context, status, limit, userId) {
    const opts = {
      fields: ['executionName', 'stateMachineName', 'created', 'modified'],
      where: {
        status: { equals: status },
        stateMachineName: { equals: this.longRunningTaskNames }
      },
      orderBy: ['-modified']
    }

    if (limit) opts.limit = limit
    if (userId) opts.where.createdBy = { equals: userId }

    const tasks = await this.executions.find(opts)

    return tasks.map(t => {
      const task = this.longRunningTasks[t.stateMachineName]
      t.title = task.title
      t.clearable = task.clearable
      return t
    })
  }

  async clearTasks (tasks) {
    return Promise.all(
      tasks.map(({ executionName }) => this.executions.destroyById(executionName))
    )
  }
}

module.exports = ListLongRunningTasks
