class TasksService {
  boot (options) {
    this.stateMachines = options.blueprintComponents.stateMachines || { }
    this.cardTemplates = options.blueprintComponents.cardTemplates || { }
    this.executions = options.bootedServices.storage.models.tymly_execution
  } // boot

  get longRunningTasks () {
    if (!this.longRunningTasks_) {
      this.longRunningTasks_ = findLongRunningTasks(
        this.stateMachines,
        this.cardTemplates
      )
    }

    return this.longRunningTasks_
  } // longRunningTasks

  findRunningTasks (userId) {
    return this.findTasks(
      'RUNNING',
      userId ? 100 : null,
      userId
    )
  } // findRunningTasks

  findCompletedTasks (userId) {
    return this.findTasks(
      ['SUCCEEDED', 'FAILED', 'STOPPED'],
      userId ? 100 : null,
      userId
    )
  } // findCompletedTasks

  async findTasks (status = [], limit, userId) {
    const longRunningTaskNames = [...Object.keys(this.longRunningTasks)]

    const opts = {
      fields: ['executionName', 'stateMachineName', 'created', 'modified'],
      where: {
        status: { equals: status },
        stateMachineName: { equals: longRunningTaskNames }
      },
      orderBy: ['-modified']
    }

    if (limit) opts.limit = limit
    if (userId) opts.where.createdBy = { equals: userId }

    const tasks = await this.executions.find(opts)

    tasks.forEach(t => {
      const task = this.longRunningTasks[t.stateMachineName]
      t.title = task.title
      t.clearable = task.clearable
    })

    return tasks
  } // findTasks

  async clearTasks (executionNames) {
    return Promise.all(executionNames.map(this.executions.destroyById))
  } // clearTasks
} // class TasksService

function findLongRunningTasks (stateMachines, cardTemplates) {
  const tasks = { }

  Object.entries(stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => isProgress(definition))
    .forEach(([name, definition]) => {
      tasks[name] = {
        title: taskTitle(definition, cardTemplates),
        clearable: isClearable(definition)
      }
    })

  return tasks
} // findLongRunningTasks

function taskTitle (definition, cardTemplates) {
  const templateName = cardTemplateName(definition)
  if (!templateName) return definition.name

  const template = findTemplate(templateName, cardTemplates)
  if (!template) return definition.name

  const titleCandidate = template.body[0].title
  const titleIsGood = (titleCandidate && (titleCandidate.indexOf('{') === -1))
  return titleIsGood ? titleCandidate : definition.name
} // taskTitle

function isClearable (definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => state.ResourceConfig.clearTaskAfterCompleted)
  return progressOrInfo.length !== 0
} // isClearable

function isProgress (definition) {
  const progressOrInfo = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .filter(state => state.ResourceConfig.uiType === 'progress')
  return progressOrInfo.length !== 0
} // isProgress

function cardTemplateName (definition) {
  const names = Object.values(definition.States)
    .filter(state => state.Type === 'Task')
    .filter(state => state.Resource === 'module:awaitingHumanInput')
    .filter(state => state.ResourceConfig)
    .map(state => state.ResourceConfig.uiName)
  return names.length ? names[0] : null
} // cardTemplateName

function findTemplate (templateName, cardTemplates) {
  for (const template of Object.values(cardTemplates)) {
    if (templateName === `${template.namespace}_${template.name}`) { return template }
  }
  return null
} // findTemplate

module.exports = {
  serviceClass: TasksService,
  bootBefore: ['statebox'],
  bootAfter: ['storage']
}
