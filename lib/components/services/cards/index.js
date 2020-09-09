'use strict'

const shasum = require('shasum')

class CardsService {
  /**
   * Boot function to expose Cards service class
   * @param {object} options
   */
  boot (options) {
    this.cardTemplates = options.blueprintComponents.cardTemplates
    this.cardPreprocessors = options.blueprintComponents.cardPreprocessors
  } // boot

  get cards () {
    if (!this.cards_) {
      this.cards_ = processCards(
        this.cardTemplates,
        this.cardPreprocessors
      )
    }
    return this.cards_
  } // cards
} // class CardsService

function processCards (cardTemplates, cardPreprocessors) {
  const cards = {}

  const preprocessors = prepPreprocessors(cardPreprocessors)

  for (const [cardId, cardTemplate] of Object.entries(cardTemplates)) {
    if (preprocessors[cardId]) {
      preprocessors[cardId](cardTemplate)
    }

    cards[cardId] = {
      ...cardTemplate,
      shasum: shasum(cardTemplate)
    }
  }

  return cards
} // processCards

function prepPreprocessors (cardPreprocessors) {
  const processors = { }

  for (const cp of Object.values(cardPreprocessors)) {
    const appliesTo = Array.isArray(cp.appliesTo)
      ? cp.appliesTo
      : [cp.appliesTo]

    for (const name of appliesTo) {
      processors[name] = cp.function
    }
  }

  return processors
} // prepPreprocessors

module.exports = {
  serviceClass: CardsService,
  refProperties: {
    cardId: 'card-templates'
  },
  bootBefore: ['tymly', 'rbac']
}
