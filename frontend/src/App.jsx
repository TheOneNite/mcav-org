import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store.js";
import logo from "./logo.svg";
import "./App.css";

import Fits from "./Fits.jsx";
import Home from "./Home.jsx";
import ViewDoctrine from "./ViewDoctrine.jsx";
import Doctrines from "./Doctrines.jsx";
import Landing from "./landing/Landing.jsx";
import Auth from "./Auth.jsx";
import AuthSSO from "./Auth-SSO.jsx";
import devURL from "./assets/proxy.js";

class App extends Component {
  renderDenial = () => {
    return <div>You are not authorized to access this page</div>;
  };
  render = () => {
    return (
      <Provider store={store}>
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
              pant="/insufficient-permissions"
              render={this.renderDenial}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  };
}

export default App;
