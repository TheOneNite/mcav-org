import React, { Component } from "react";
import styled from "styled-components";

class FitButton extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };
  render = () => {
    const { name, className } = this.props;
    return (
      <button
        onClick={() => this.props.handleRoute(this.props.id)}
        className={className}
      >
        {name}
      </button>
    );
  };
}

export default FitButton;
