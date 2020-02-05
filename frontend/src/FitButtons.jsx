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
    const { fitData } = this.props;
    let formattedFit = undefined;
    let hull = "";
    if (this.state.expand === true) {
      let fitLines = fitData.fit.split("\n");
      formattedFit = fitLines.map(lineStr => {
        if (lineStr.length > 0) {
          return <div>{lineStr}</div>;
        }
        return <br></br>;
      });
    } else {
      hull = fitData.fit.split(" ")[0];
      hull = hull.slice(1, hull.length - 1);
    }
    return (
      <button onClick={this.toggleExpand}>
        {this.state.expand ? formattedFit : `${fitData.title} (${hull})`}
      </button>
    );
  };
}

export default FitButton;
