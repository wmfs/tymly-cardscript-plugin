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
      ['SUCCEEDED', 'FAILED', 'STOPPED']
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

    tasks.forEach(t => { t.title = this.longRunningTasks[t.stateMachineName] })

    return tasks
  }
}

function findLongRunningTasks (env) {
  const tasks = { }

  Object.entries(env.blueprintComponents.stateMachines)
    .filter(([, definition]) => definition.instigatorGroup === 'app')
    .filter(([, definition]) => isProgress(definition))
    .forEach(([name, definition]) => { tasks[name] = taskTitle(definition, env) })

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
  for (const template of Object.values(env.blueprintComponents.cardTemplates))
    if (templateName === `${template.namespace}_${template.name}`)
      return template
  return null
}

module.exports = ListLongRunningTasks
