import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Doctrines from "./Doctrines.jsx";
import Fits from "./Fits.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.autoLogin();
  };
  autoLogin = async () => {
    const res = await fetch("/auth", { credentials: "include" });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      this.setState({ login: "success" });
      return;
    }
    this.setState({ login: "failed" });
  };
  render = () => {
    if (this.state.login === "success") {
      return (
        <div>
          <Doctrines />
          <Fits />
        </div>
      );
    }
    if (this.state.login === "failed") {
      return <Redirect to="/login" />;
    }
    return <div>Loading...</div>;
  };
}

export default Home;
