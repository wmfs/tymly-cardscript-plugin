'use strict'

const shasum = require('shasum')

class CardsService {
  /**
   * Boot function to expose Cards service class
   * @param {object} options
   */
  boot (options) {
    this.cardTemplates = options.blueprintComponents.cardTemplates
  }

  get cards () {
    const cards = {}

    for (const cardId of Object.keys(this.cardTemplates)) {
      cards[cardId] = {
        ...this.cardTemplates[cardId],
        shasum: shasum(this.cardTemplates[cardId])
      }
    }

    return cards
  }
}

module.exports = {
  serviceClass: CardsService,
  refProperties: {
    cardId: 'card-templates'
  },
  bootBefore: ['tymly', 'rbac']
}
