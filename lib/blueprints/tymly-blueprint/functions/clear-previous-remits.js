module.exports = function clearPreviousRemits () {
  return async function (event, env, context) {
    const { userInfo, storage } = env.bootedServices
    const { userId } = context
    const email = userInfo
      ? await userInfo.emailFromUserId(userId)
      : userId

    const model = storage.models.tymly_execution

    const executions = await model.find({
      fields: ['executionName'],
      where: {
        stateMachineName: {
          equals: 'tymly_getUserRemit_1_0'
        },
        status: {
          equals: 'SUCCEEDED'
        },
        createdBy: {
          equals: email
        }
      }
    })

    await Promise.all(executions.map(e => model.destroyById(e.executionName)))
  }
}
