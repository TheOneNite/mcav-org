import React, { Component } from "react";
import Doctrines from "./Doctrines.jsx";
import Fits from "./Fits.jsx";

class Home extends Component {
  render = () => {
    return (
      <div>
        <Doctrines />
        <Fits />
      </div>
    );
  };
}
