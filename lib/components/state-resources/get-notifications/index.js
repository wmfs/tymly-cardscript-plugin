'use strict'

class GetNotifications {
  init (resourceConfig, env, callback) {
    this.notifications = env.bootedServices.storage.models['tymly_notifications']
    callback(null)
  }

  /**
   * Gets notifications
   * @param {Object} event The event of the current Tymly execution
   * @param {Object} context The current Tymly context object
   * @returns {Object} executionDescription
   * @example
   * const executionDescription = await statebox.startExecution(
   {
      startFrom: startFrom,
      limit: limit
    },
   GET_NOTIFICATIONS_STATE_MACHINE,
   {
      sendResponse: 'COMPLETE',
      userId: 'test-user'
    }
   )
   */
  async run (event, context) {
    const payload = { notifications: [] }
    const findOptions = {
      where: {
        userId: { equals: context.userId }
      }
    }
    if (event.startFrom) findOptions.where.created = { moreThanEquals: new Date(event.startFrom).toISOString() }

    try {
      const notifications = await this.notifications.find(findOptions)

      for (const { id, title, description, category, created, acknowledged } of notifications) {
        if (!acknowledged) {
          payload.notifications.push({ id, title, description, category, created })
        }

        payload.totalNotifications = payload.notifications.length
        payload.limit = event.limit || 10
      }

      context.sendTaskSuccess({ userNotifications: payload })
    } catch (err) {
      context.sendTaskFailure({ error: 'getNotificationsFail', cause: err })
    }
  }
}

module.exports = GetNotifications
