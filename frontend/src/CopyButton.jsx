import React, { Component } from "react";
import styled from "styled-components";

const FillButton = styled.button`
  width: 100%;
  border-width: 0px;
  border-bottom-width: 2px;
`;
class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDisplay: `Copy ${this.props.mode} to Clipboard`
    };
  }
  componentDidMount = () => {
    const generateMultibuy = () => {
      const getHull = topLine => {
        let hull = topLine.split(",").shift();
        return hull.slice(1, hull.length);
      };
      let fitLines = this.props.fitData.fit.split("\n");
      fitLines[0] = getHull(fitLines[0]);
      let ammo = [];
      fitLines = fitLines.map(line => {
        let multiItem = line.split(",");
        if (multiItem.length > 1) {
          let extra = multiItem.filter((items, index) => {
            return index > 0;
          });
          ammo = ammo.concat(extra);
          return multiItem[0];
        }
        return line;
      });
      fitLines = fitLines.concat(ammo);
      return fitLines.join("\n");
    };
    if (this.props.mode === "eft") {
      this.setState({
        copyStr: this.props.fitData.fit,
        displayTxt: this.state.defaultDisplay
      });
      return;
    }
    this.setState({
      copyStr: generateMultibuy(),
      displayTxt: this.state.defaultDisplay
    });
  };
  render = () => {
    return (
      <FillButton
        onClick={() => {
          console.log(navigator);
          navigator.clipboard.writeText(this.state.copyStr).then(copyRes => {
            console.log(copyRes);
            console.log("copy success");
            this.setState({ displayTxt: "copied!" }, () => {
              setTimeout(() => {
                this.setState({ displayTxt: this.state.defaultDisplay });
              }, 750);
            });
          });
        }}
      >
        {this.state.displayTxt}
      </FillButton>
    );
  };
}

export default CopyButton;
