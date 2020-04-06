class ArchiveExecution {
  init (resourceConfig, env) {
    this.statebox = env.bootedServices.statebox
    this.executions = env.bootedServices.storage.models.execution
  }

  run (event, context) {
    context.sendTaskFailure(
      new Error("Not implemented yet")
    )
  }
}

module.exports = ArchiveExecution
