import React, { Component } from "react";

class FitButton extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };
  render = () => {
    const { name } = this.props;
    return (
      <button onClick={() => this.props.handleRoute(this.props.id)}>
        {name}
      </button>
    );
  };
}

export default FitButton;
