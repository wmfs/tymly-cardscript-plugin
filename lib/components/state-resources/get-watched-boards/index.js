class GetWatchedBoards {
  init (resourceConfig, env, callback) {
    this.watchedBoards = env.bootedServices.storage.models['tymly_watchedBoards']
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

    // this.watchedBoards.find({ where: { userId: { equals: context.userId } } })
    //   .then(results => {
    //     const ctx = {
    //       watchCategories: {}
    //     }
    //
    //     const categories = new Set()
    //     results.forEach(r => categories.add(r.category))
    //     categories.forEach(c => {
    //       ctx.watchCategories[c] = {}
    //     })
    //
    //     results.forEach(r => {
    //       if (!Object.keys(ctx.watchCategories[r.category]).includes(r.categoryLabel)) {
    //         ctx.watchCategories[r.category][r.categoryLabel] = {
    //           total: 0,
    //           subscriptions: []
    //         }
    //       }
    //
    //       r.launches.forEach(l => { l.input.subscriptionId = r.id })
    //
    //       ctx.watchCategories[r.category][r.categoryLabel].total++
    //       ctx.watchCategories[r.category][r.categoryLabel].subscriptions.push(
    //         {
    //           subscriptionId: r.id,
    //           feedName: r.feedName,
    //           title: r.title,
    //           description: r.description,
    //           startedWatching: r.startedWatching,
    //           launches: r.launches
    //         }
    //       )
    //     })
    //
    //     context.sendTaskSuccess(ctx)
    //   })
    //   .catch(err => context.sendTaskFailure({ error: 'getWatchedBoardsFail', cause: err }))
  }
}

module.exports = GetWatchedBoards
