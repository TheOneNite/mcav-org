import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import devURL from "./assets/proxy.js";

class AuthSSO extends Component {
  getAuth = async query => {
    console.log(query);
    let res = await fetch(devURL + "/sso-auth" + query);
  };
  componentDidMount = () => {
    let qStr = this.props.location.search;
    this.getAuth(qStr);
  };
  render = () => {
    return <div>Loading....</div>;
  };
}

export default AuthSSO;
