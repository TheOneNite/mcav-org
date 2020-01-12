import React, { Component } from "react";
import { connect } from "react-redux";

import {getDoctrines} from "./assets/"

class UnconnectedViewDoctrine extends Component {
    componentDidMount = () => {
        
    }
  render = () => {
      console.log(this.props.match)
    return <div></div>;
  };
}

const mapState = state => {
    return {docFits:state.}
}
