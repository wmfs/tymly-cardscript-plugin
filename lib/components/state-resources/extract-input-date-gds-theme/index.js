const moment = require('moment')

class ExtractInputDateGdsTheme {
  run (date, context) {
    if (!date) {
      console.log('Failed to ExtractInputDateGdsTheme, no date supplied.')
      return context.sendTaskSuccess()
    }

    const mDate = moment(date)

    if (!mDate || !mDate.isValid()) {
      console.log(`'Failed to ExtractInputDateGdsTheme, date: '${date}' is not valid.'`)
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
