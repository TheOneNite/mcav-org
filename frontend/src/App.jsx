import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js";
import logo from "./logo.svg";
import "./App.css";

import Router from "./router.jsx";

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
