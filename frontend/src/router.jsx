import { Route, Switch } from "react-router-dom";
import { proxyBuilder } from "./assets/proxy.js";
import React, { Component } from "react";
import { connect } from "react-redux";

import Fits from "./Fits.jsx";
import ViewDoctrine from "./ViewDoctrine.jsx";
import Doctrines from "./Doctrines.jsx";
import Landing from "./landing/Landing.jsx";
import Auth from "./Auth.jsx";
import AuthSSO from "./Auth-SSO.jsx";

// "server-beta"
const uri = proxyBuilder("server-beta");

class UnconnectedRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.getUser();
  };
  getUser = async () => {
    const res = await fetch(uri + "/auth", { credentials: "include" });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success === true) {
      this.props.dispatch({ type: "login", userData: bod.payload });
      return;
    }
  };
  renderDenial = () => {
    return <div>You are not authorized to access this page</div>;
  };
  render = () => {
    if (this.props.login === undefined) {
      this.getUser();
    }
    console.log(this.props.login);
    return (
      <Switch>
        <Route exact={true} path="/login" component={Auth} />
        <Route exact={true} path="/sso-auth" component={AuthSSO}></Route>
        <Route exact={true} path="/" component={Landing} />
        {this.props.login ? (
          <>
            <Route exact={true} path="/fits" component={Fits} />
            <Route
              exact={true}
              path="/doctrine/:docId"
              component={ViewDoctrine}
            />
            <Route exact={true} path="/doctrines" component={Doctrines} />
          </>
        ) : (
          <Route exact={false} path="/" render={this.renderDenial} />
        )}
      </Switch>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userData,
    login: state.loginStatus
  };
};

const Router = connect(mapStateToProps)(UnconnectedRouter);
export default Router;
