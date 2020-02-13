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
  generateCopyTxt = mode => {
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
    if (mode === "eft") {
      console.log(this.props.fitData, "IHOQFHOQFHO");
      return this.props.fitData.fit;
    } else {
      return generateMultibuy();
    }
  };
  componentDidMount = () => {
    // component props don't change between ship tabs so it is not re-rendered and consequently the copy string never changes.  basically this is the same component and the prop is just hotswapped?
    if (this.props.mode === "eft") {
      this.setState({
        displayTxt: this.state.defaultDisplay
      });
    } else {
      this.setState({
        displayTxt: this.state.defaultDisplay
      });
    }
    this.generateCopyTxt(this.props.mode);
  };
  render = () => {
    const { mode } = this.props;
    console.log(this.props.fitData);
    console.log(this.state.copyStr, mode);
    return (
      <FillButton
        onClick={() => {
          console.log(navigator);
          // call copy string generator here when the button is clicked so that it will copy the correct fit? doesnt work
          navigator.clipboard
            .writeText(this.generateCopyTxt(mode))
            .then(copyRes => {
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
