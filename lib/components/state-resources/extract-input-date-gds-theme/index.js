const moment = require('moment')

class ExtractInputDateGdsTheme {
  init (resourceConfig, env) {
    this.logger = env.bootedServices.logger.child('stateResource:extractInputDateGdsTheme')
  }

  run (date, context) {
    if (!date) {
      this.logger.warn('Failed to ExtractInputDateGdsTheme, no date supplied.')
      return context.sendTaskSuccess()
    }

    const mDate = moment(date)

    if (!mDate || !mDate.isValid()) {
      this.logger.warn(`'Failed to ExtractInputDateGdsTheme, date: '${date}' is not valid.'`)
      return context.sendTaskSuccess()
    }

    const extracted = {
      date: mDate.format('DD'),
      month: mDate.format('MM'),
      year: mDate.format('YYYY')
    }

    context.sendTaskSuccess(extracted)
  }
}

module.exports = ExtractInputDateGdsTheme
