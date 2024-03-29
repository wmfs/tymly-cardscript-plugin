class TasksService {
  boot (options) {
    this.stateMachines = options.blueprintComponents.stateMachines || { }
    this.cardTemplates = options.blueprintComponents.cardTemplates || { }
  } // boot

  get longRunningTasks () {
    if (!this.longRunningTasks_) {
      this.longRunningTasks_ = findLongRunningTasks(
        this.stateMachines,
        this.cardTemplates
      )
    }

    return this.longRunningTasks_
  }
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
}

function taskTitle (definition, cardTemplates) {
  const templateName = cardTemplateName(definition)
  if (!templateName) return definition.name

  const template = findTemplate(templateName, cardTemplates)
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

function findTemplate (templateName, cardTemplates) {
  for (const template of Object.values(cardTemplates)) {
    if (templateName === `${template.namespace}_${template.name}`) { return template }
  }
  return null
}

module.exports = {
  serviceClass: TasksService,
  bootBefore: ['statebox']
}
