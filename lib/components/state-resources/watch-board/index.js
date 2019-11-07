class WatchBoard {
  init (resourceConfig, env, callback) {
    this.watchedBoards = env.bootedServices.storage.models['tymly_watchedBoards']
    callback(null)
  }

  async run (event, context) {
    const { stateMachineName, boardKeys, title, description, category, categoryLabel } = event

    let feedName = [stateMachineName]
    if (boardKeys) Object.keys(boardKeys).sort().map(k => feedName.push(boardKeys[k]))
    feedName = feedName.join('|')

    const launches = [{ stateMachineName, input: { boardKeys } }]

    const startedWatching = new Date().toISOString()

    try {
      const doc = await this.watchedBoards.upsert(
        {
          userId: context.userId,
          feedName,
          title,
          description,
          startedWatching,
          launches,
          category,
          categoryLabel
        },
        {}
      )

      context.sendTaskSuccess({ subscriptionId: doc.idProperties.id, feedName, startedWatching })
    } catch (err) {
      context.sendTaskFailure(err)
    }
  }
}

module.exports = WatchBoard
