import { proxyBuilder, isProd, getAppId, getScopes } from './proxy.js'
import appsettings from '../appsettings'

const clientId = getAppId(appsettings.buildConfig)

const redirect = proxyBuilder(
  appsettings.buildConfig === 'prod' ? 'redirect-beta' : 'redirect-dev'
)

const scopes = getScopes(appsettings.buildConfig)

const uri = `https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=${redirect}/sso-auth&scope=${scopes}&client_id=${clientId}`

export { uri }
