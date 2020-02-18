import React, { Component } from "react";
import styled from "styled-components";

const TabButton = styled.button`
  width: "max-content";
`;

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
      <TabButton
        onClick={() => this.props.handleRoute(this.props.id)}
        className={className}
      >
        {name}
      </TabButton>
    );
  };
}

export default FitButton;
