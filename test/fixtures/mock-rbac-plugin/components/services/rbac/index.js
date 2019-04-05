const debug = require('debug')('rbac')

class DummyRbacService {
  boot (options, callback) {
    options.messages.info('Dummy RBAC Service - always say yes')
    callback(null)
  } // boot

  listUserRoles (userId) {
    if (userId === 'test-team-member') {
      return Promise.resolve(['$everyone', 'test-team'])
    }

    return Promise.resolve(['$everyone'])
  } // getUserRoles

  checkAuthorization (userId, ctx, resourceType, resourceName, action) {
    const text = `User '${userId}' asking for '${action}' on ${resourceType} '${resourceName}'... ` +
      `\n\tAccess permitted - NO ACCESS CONTROL APPLIED`
    debug(text)
    return Promise.resolve(true)
  } // checkRoleAuthorization

  resetCache () {
    this.userMembershipsCache.reset()
  }
} // RbacService

module.exports = {
  serviceClass: DummyRbacService,
  bootAfter: ['statebox', 'caches', 'storage']
}
