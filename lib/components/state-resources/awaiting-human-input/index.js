const jp = require('jsonpath')
const _ = require('lodash')

const getFromObject = (obj, path, defaultValue) => {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj)
  return (result === undefined || result === obj) ? defaultValue : result
}

class AwaitingHumanInput {
  init (resourceConfig, env, callback) {
    this.uiName = resourceConfig.uiName
    this.uiType = resourceConfig.uiType
    this.uiRefresh = resourceConfig.uiRefresh
    this.dataPath = resourceConfig.dataPath
    this.defaults = resourceConfig.defaults
    this.watchedBoards = env.bootedServices.storage.models['tymly_watchedBoards']
    this.cards = env.bootedServices.cards.cards
    callback(null)
  }

  /**
   * Holds a statebox execution to allow the user to have some input e.g. Form filling
   * @param {Object} event The event of the current Tymly execution
   * @param {Object} context The current Tymly context object
   * @param {Function} done Callback fn
   * @returns {Object} executionDescription
   * @example
   * const executionDescription = await statebox.startExecution(
   {},
   HEARTBEAT_STATE_MACHINE,
   {
      sendResponse: 'AFTER_RESOURCE_CALLBACK.TYPE:awaitingHumanInput'
    }
   )
   * */
  async run (event, context, done) {
    let data = {}
    if (this.dataPath) data = jp.value(event, this.dataPath) || {}
    if (this.defaults) data = _.defaults(data, this.defaults)

    Object.keys(data).forEach(key => (data[key] === null) && delete data[key])

    const requiredHumanInput = {
      uiName: this.uiName,
      uiType: this.uiType,
      uiRefresh: this.uiRefresh,
      data
    }

    const cardTemplate = Object.values(this.cards).find(card => this.uiName === `${card.namespace}_${card.name}`)

    if (cardTemplate) {
      const isWatchable = getFromObject(cardTemplate, 'templateMeta.ui.controls.subscription', false)

      if (isWatchable) {
        requiredHumanInput.boardKeys = event.boardKeys || {}
        const feedName = [context.stateMachineMeta.name]
        Object.keys(requiredHumanInput.boardKeys).sort().map(k => feedName.push(requiredHumanInput.boardKeys[k]))

        try {
          const subscription = await this.watchedBoards.findOne({
            where: {
              userId: { equals: context.userId },
              feedName: { equals: feedName.join('|') }
            }
          })

          if (subscription) {
            requiredHumanInput.watchBoardSubscriptionId = subscription.id
            requiredHumanInput.feedName = subscription.feedName
          }
        } catch (err) {
          context.sendTaskFailure(err)
        }
      }
    } else {
      console.warn(`Cannot get card template for uiName: ${this.uiName}`)
    }

    const executionDescription = await context.sendTaskHeartbeat({ requiredHumanInput })
    if (this.uiType === 'info') {
      context.sendTaskSuccess()
    }
    done(executionDescription)
  } // run
} // class AwaitingHumanInput

module.exports = AwaitingHumanInput
