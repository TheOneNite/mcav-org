import { Route, Switch } from "react-router-dom";
import { proxyBuilder } from "./assets/proxy.js";
import React, { Component } from "react";

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
    console.log(bod);
  };
  render = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/login" component={Auth} />
          <Route exact={true} path="/fits" component={Fits} />
          <Route
            exact={true}
            path="/doctrine/:docId"
            component={ViewDoctrine}
          />
          <Route exact={true} path="/doctrines" component={Doctrines} />
          <Route exact={true} path="/sso-auth" component={AuthSSO}></Route>
          <Route
            exact={true}
            path="/insufficient-permissions"
            render={this.renderDenial}
          />
        </Switch>
      </BrowserRouter>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userData
  };
};

const Router = connect(mapStateToProps)(UnconnectedRouter);
export default Router;
