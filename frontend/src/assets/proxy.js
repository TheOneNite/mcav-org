// const devURL = 'http://localhost:8080'
//const devURL = "http://mcav.org";
const devURL = 'https://compayn.space:8080'

const buildConfig = 'dev'

export const proxyBuilder = (build) => {
  switch (build) {
    case 'redirect-beta':
      return 'https://compayn.space'
    case 'redirect-dev':
      return 'http://localhost:3000'
    case 'server-beta':
      return 'https://compayn.space:8080'
    default:
      return 'http://localhost:8080'
  }
}

export const getAppId = (buildConfig) => {
  switch (buildConfig) {
    case 'prod':
      return 'c23147201ca9455a841bd6f06df98842'
    case 'dev':
      return 'ba111862447547bfa1d64eeeab888f0c'
  }
}

export const getScopes = (buildConfig) => {
  if (buildConfig === 'dev')
    return 'esi-fittings.read_fittings.v1 esi-fittings.write_fittings.v1 esi-characters.read_corporation_roles.v1'
  if (buildConfig === 'prod') {
    return 'publicData esi-skills.read_skills.v1 esi-clones.read_clones.v1 esi-fittings.write_fittings.v1 esi-clones.read_implants.v1'
  }
}
export default devURL
