import { proxyBuilder } from "./proxy.js";

const redirect = proxyBuilder("redirect-beta");

const uri = `https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=${redirect}/sso-auth&scope=publicData&client_id=c23147201ca9455a841bd6f06df98842`;

export { uri };
