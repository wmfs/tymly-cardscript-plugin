async function getWatchedBoards (userId, model, statebox) {
  const stateMachineName = 'tymly_search_1_0'
  const stateMachineExists = statebox.listStateMachines().find(r => r.name === stateMachineName)

  if (stateMachineExists) {
    const execDesc = await statebox.startExecution(
      { author: userId, docType: 'tymly_watchedBoards' },
      stateMachineName,
      { sendResponse: 'COMPLETE', userId }
    )

    if (execDesc.status !== 'SUCCEEDED') return []

    return execDesc.ctx.searchResults.results
  } else {
    return model.find({ where: { userId: { equals: userId } } })
  }
}

class GetWatchedBoards {
  init (resourceConfig, env) {
    this.watchedBoards = env.bootedServices.storage.models.tymly_watchedBoards
    this.statebox = env.bootedServices.statebox
  }

  async run (event, context) {
    try {
      const watchedBoards = await getWatchedBoards(context.userId, this.watchedBoards, this.statebox)

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
