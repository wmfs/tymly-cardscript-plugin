class ListLongRunningTasks {
  init (resourceConfig, env) {
    this.storage = env.bootedServices.storage
    this.executions = env.bootedServices.storage.models.tymly_execution
    this.longRunningTasks = findLongRunningTasks(env)
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

function findLongRunningTasks (env) {
  const tasks = { }

  Object.entries(env.blueprintComponents.stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => isProgress(definition))
    .forEach(([name, definition]) => {
      tasks[name] = {
        title: taskTitle(definition, env),
        clearable: isClearable(definition)
      }
    })

  return tasks
}

function taskTitle (definition, env) {
  const templateName = cardTemplateName(definition)
  if (!templateName) return definition.name

  const template = findTemplate(templateName, env)
  if (!template) return definition.name

  const titleCandidate = template.body[0].title
  const titleIsGood = (titleCandidate && (titleCandidate.indexOf('{') === -1))
  return titleIsGood ? titleCandidate : definition.name
}

function isClearable (definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => state.ResourceConfig.clearTaskAfterCompleted)
  return progressOrInfo.length !== 0
}

function isProgress (definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => state.ResourceConfig.uiType === 'progress')
  return progressOrInfo.length !== 0
}

function cardTemplateName (definition) {
  const names = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .map(state => state.ResourceConfig.uiName)
  return names.length ? names[0] : null
}

function findTemplate (templateName, env) {
  for (const template of Object.values(env.blueprintComponents.cardTemplates)) {
    if (templateName === `${template.namespace}_${template.name}`) { return template }
  }
  return null
}

module.exports = ListLongRunningTasks
