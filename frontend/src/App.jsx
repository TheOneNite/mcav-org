import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
import Router from "./router.js";

class App extends Component {
  renderDenial = () => {
    return <div>You are not authorized to access this page</div>;
  };
  render = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    );
  };
}

export default App;
