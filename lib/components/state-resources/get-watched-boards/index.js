class GetWatchedBoards {
  init (resourceConfig, env) {
    this.watchedBoards = env.bootedServices.storage.models.tymly_watchedBoards
  }

  async run (event, context) {
    try {
      const { limit } = event

      const findOptions = { where: { userId: { equals: context.userId } } }
      if (limit) findOptions.limit = event.limit

      const watchedBoards = await this.watchedBoards.find(findOptions)

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
