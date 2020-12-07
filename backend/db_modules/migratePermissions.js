let request = require('request')
const ESI_URI = 'https://esi.evetech.net/latest'
const datasource = '?datasource=tranquility'

const getPermissions = (charId, token) => {
  let response = new Promise((resolve, reject) => {
    request.get(
      `${ESI_URI}/characters/${charId}/roles/${datasource}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
      (err, resp, bod) => {
        console.log('raw res', resp)
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        bod = JSON.parse(bod)
        if (bod.error) {
          console.log('ESI error:', bod.error)
          reject(bod.error)
        }
        console.log('role response', bod)
        let { roles } = bod
        if (!roles) {
          reject('ESI error')
        }
        let perms = {
          canManageFits: roles.includes('Fitting_Manager'),
        }
        resolve(perms)
      }
    )
  })
  return response
}

const migratePermissions = (dbRes) => {
  console.log('migrating permissions')
  //   if (dbRes.permissions) return
  if (!dbRes.token) {
    console.log('tokens not valid')
  }
  if (!dbRes.charId) {
    console.log('no user')
  } else {
    return getPermissions(dbRes.charId, dbRes.token.access)
  }
}

module.exports = migratePermissions
