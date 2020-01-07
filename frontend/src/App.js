import React, {Component} from 'react';
import Provider from "redux"
import {BrowserRouter} from "react-router-dom"
import store from "./store.js"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  renderBase = () => {
    return <div>
      Hello World!
    </div>
  }
  render = () => {
    return <Provider store={store}>
      <BrowserRouter>
      <Route exact={true} path="/" render={this.renderBase} ></Route>
      </BrowserRouter>
    </Provider>
  }
}

export default App;
