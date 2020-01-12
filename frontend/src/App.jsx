import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store.js";
import logo from "./logo.svg";
import "./App.css";

import Fits from "./Fits.jsx";
import Home from "./Home.jsx";
import ViewDoctrine from "./ViewDoctrine.jsx";

class App extends Component {
  renderBase = () => {
    return <div>Hello World!</div>;
  };
  render = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact={true} path="/fits" component={Fits} />
          <Route
            exact={true}
            path="/doctrine/:docId"
            component={ViewDoctrine}
          />
          <Route exact={true} path="/" component={Home}></Route>
        </BrowserRouter>
      </Provider>
    );
  };
}

export default App;
