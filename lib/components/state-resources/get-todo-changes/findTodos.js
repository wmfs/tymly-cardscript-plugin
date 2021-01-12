async function findTodos (userId, todoModel, rbacService) {
  const resultsObj = await todoQuery(
    { userId: { equals: userId } },
    todoModel
  )

  const roles = await userRoles(userId, rbacService)
  if (roles.length) {
    await todoQuery(
      { teamName: { equals: roles } },
      todoModel,
      resultsObj
    )
  } // if ...

  // inject todoId into launches
  for (const [id, obj] of Object.entries(resultsObj)) {
    if (Array.isArray(obj.launches)) {
      obj.launches.forEach(l => {
        l.input && (l.input.todoId = id)
      })
    } // if ...
  } // for ...

  return resultsObj
} // findTodos

async function todoQuery (filter, todoModel, resultsObj = {}) {
  const toDos = await todoModel.find({
    where: filter
  })
  toDos.forEach(r => { resultsObj[r.id] = r })
  return resultsObj
} // findTodos

async function userRoles (userId, rbacService) {
  const roles = await rbacService.listUserRoles(userId)
  return roles.filter(r => r[0] !== '$') // strip built-in roles
}

module.exports = findTodos
