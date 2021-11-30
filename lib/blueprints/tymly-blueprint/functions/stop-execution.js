module.exports = function stopExecution () {
  return async function (event, env, context) {
    const logger = env.bootedServices.logger.addLogger('@wmfs/tymly-cardscript-plugin')
    const { userId } = context
    const { statebox } = env.bootedServices
    const { executionName } = event

    try {
      await statebox.stopExecution(
        'Execution stopped externally',
        'STOPPED',
        executionName,
        {
          userId,
          action: 'stopExecution',
          stateMachineName: executionName
        }
      )
    } catch (err) {
      logger.error(`Execution returned an error while attempting to stop (executionName='${executionName})'`)
    }
  }
}
