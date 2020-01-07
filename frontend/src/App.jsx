import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store.js";
import logo from "./logo.svg";
import "./App.css";

import Fits from "./Fits.jsx";

class App extends Component {
  renderBase = () => {
    return <div>Hello World!</div>;
  };
  render = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact={true} path="/fits" component={Fits} />
          <Route exact={true} path="/" render={this.renderBase}></Route>
        </BrowserRouter>
      </Provider>
    );
  };
}

export default App;
