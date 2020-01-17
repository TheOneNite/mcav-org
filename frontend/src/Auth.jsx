import React, { Component } from "react";
import { connect } from "react-redux";

import { uri } from "./assets/eveSso.js";

class UnconnectedAuth extends Component {
  render = () => {
    return (
      <div>
        <h3>Please Login using Eve SSO</h3>
        <a href={uri}>
          <button>
            <img src="https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-black-large.png" />
          </button>
        </a>
      </div>
    );
  };
}

const Auth = connect()(UnconnectedAuth);

export default Auth;
