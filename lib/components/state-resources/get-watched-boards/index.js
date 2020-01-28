class GetWatchedBoards {
  init (resourceConfig, env, callback) {
    this.watchedBoards = env.bootedServices.storage.models.tymly_watchedBoards
    callback(null)
  }

  async run (event, context) {
    try {
      const watchedBoards = await this.watchedBoards.find({ where: { userId: { equals: context.userId } } })

      const ctx = { watchCategories: {} }

      for (const { id, category, categoryLabel, launches, startedWatching, description, title, feedName } of watchedBoards) {
        if (!ctx.watchCategories[category]) {
          ctx.watchCategories[category] = {}
        }

        if (!Object.keys(ctx.watchCategories[category]).includes(categoryLabel)) {
          ctx.watchCategories[category][categoryLabel] = { total: 0, subscriptions: [] }
        }

        const updatedLaunches = typeof launches === 'string' ? JSON.parse(launches) : launches

        updatedLaunches.forEach(launch => { launch.input.subscriptionId = id })

        ctx.watchCategories[category][categoryLabel].total++

        ctx.watchCategories[category][categoryLabel].subscriptions.push({
          subscriptionId: id,
          feedName,
          title,
          description,
          startedWatching,
          launches: updatedLaunches
        })
      }

      context.sendTaskSuccess(ctx)
    } catch (err) {
      context.sendTaskFailure({ error: 'getWatchedBoardsFail', cause: err })
    }
  }
}

module.exports = GetWatchedBoards
