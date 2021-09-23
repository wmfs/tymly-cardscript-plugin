const moment = require('moment')

module.exports = function filterStaleLongRunningTasks () {
  return function (event) {
    const twoDaysAgo = moment().subtract(2, 'days')
    return event.running.filter(exec => {
      return moment(exec.created).isBefore(twoDaysAgo)
    })
  }
}
