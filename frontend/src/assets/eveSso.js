import devURL from "./proxy.js";

const uri = `https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=${devURL}/sso-auth&scope=publicData&client_id=c23147201ca9455a841bd6f06df98842`;

export { uri };
