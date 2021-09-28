const moment = require('moment')

module.exports = function filterStaleLongRunningTasks () {
  return function (event) {
    const _24hrs = moment().subtract(24, 'hours')
    return event.running.filter(exec => moment(exec.created).isBefore(_24hrs))
  }
}
