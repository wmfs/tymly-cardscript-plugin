class GetSettings {
  init (resourceConfig, env, callback) {
    this.settings = env.bootedServices.storage.models.tymly_settings
    this.categoryService = env.bootedServices.categories
    callback(null)
  } // init

  /**
   * Gets settings for a given user
   * @param {Object} event The event of the current Tymly execution
   * @param {Object} context The current Tymly context object
   * @returns {Object} executionDescription
   * @example
   * const executionDescription = await statebox.startExecution(
   {},
   GET_SETTINGS_STATE_MACHINE,
   {
      sendResponse: 'COMPLETE',
      userId: 'test-user'
    }
   )
   */
  async run (event, context) {
    const userId = context.userId

    try {
      const settings = await this.settings.findById(userId)

      const userSettings = settings || { userId }

      if (!userSettings.categoryRelevance) userSettings.categoryRelevance = this.categoryService.names

      context.sendTaskSuccess({ userSettings })
    } catch (err) {
      context.sendTaskFailure({ error: 'getSettingsFail', cause: err })
    }
  } // run
}

module.exports = GetSettings
