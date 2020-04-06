const Archived = 'ARCHIVED-'

class ArchiveExecution {
  init (resourceConfig, env) {
    this.statebox = env.bootedServices.statebox
    this.executions = env.bootedServices.storage.models.tymly_execution
  }

  async run (event, context) {
    try {
      const { executionName } = event
      const status = await this.executionStatus(executionName)

      if (!alreadyArchived(status)) {
        const execution = await this.executions.findOne({
          where: { executionName: { equals: executionName } }
        })
        execution.status = `${Archived}${status}`
        await this.executions.update(execution, { })
      }

      context.sendTaskSuccess()
    } catch (err) {
      context.sendTaskFailure({
        error: 'archiveExecutionFail',
        cause: err
      })
    }
  } // run

  async executionStatus(executionName) {
    const { status } = await this.statebox.describeExecution(executionName)
    const isRunning = (status === 'RUNNING')
    if (isRunning) {
      throw new Error(`Execution ${executionName} is still running`)
    }
    return status
  } // executionStatus
} // class ArchiveExecution

function alreadyArchived(status) {
  return status.startsWith(Archived)
} // alreadyArchived

module.exports = ArchiveExecution
