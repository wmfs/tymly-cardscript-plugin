const shasum = require('shasum')

async function findTodos ({ userId, todoModel, rbacService, countsOnly, client }) {
  const resultsObj = {}

  await todoQuery(
    { userId: { equals: userId } },
    todoModel,
    client,
    countsOnly,
    resultsObj
  )

  const roles = await userRoles(userId, rbacService)
  if (roles.length) {
    await todoQuery(
      { teamName: { equals: roles } },
      todoModel,
      client,
      countsOnly,
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

    obj.shasum = shasum(obj)
  } // for ...

  return resultsObj
} // findTodos

async function todoQuery (filter, todoModel, client, countsOnly, resultsObj) {
  if (countsOnly) {
    const where = []

    if (filter.userId) where.push(`user_id = '${filter.userId.equals}'`)
    if (filter.teamName) where.push(`team_name = '${filter.teamName.equals}'`)

    let query = 'select state_machine_category, count(*) from tymly.todos'
    if (where.length) query += ` where ${where.join(' AND ')}`
    query += 'group by state_machine_category'

    const { rows: toDos } = await client.query(query)
    toDos.forEach(r => {
      if (!resultsObj[r.state_machine_category]) resultsObj[r.state_machine_category] = 0
      resultsObj[r.state_machine_category] += parseInt(r.count)
    })
  } else {
    const toDos = await todoModel.find({ where: filter })
    toDos.forEach(r => { resultsObj[r.id] = r })
  }

  return resultsObj
} // findTodos

async function userRoles (userId, rbacService) {
  const roles = await rbacService.listUserRoles(userId)
  return roles.filter(r => r[0] !== '$') // strip built-in roles
}

module.exports = findTodos
