import React, { Component } from "react";
import { connect } from "react-redux";
import devURL from "./assets/proxy.js";
import styled from "styled-components";
import FitSelector from "./FitSelector";
import FitButton from "./FitButtons";

const BackgroundBlur = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 9;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.8);
`;
const ExitButton = styled.button`
  background-color: red;
  border: 2px solid darkred;
  justify-self: right;
`;

const FormStyle = styled.div`
  background-color: #171516;
  color: #c6f8ff;
  padding: 20px;
  width: 50vw;
  height: 90vh;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
  margin-right: 24vw;
  margin-left: 24vw;
  margin-top: 4vh;
  .button-fit {
    border: 2px solid #388ba0;
    background-color: inherit;
    color: inherit;
  }
  .button-selected {
    background-color: #388ba0;
    color: #171516;
    border: 2px solid #c6f8ff;
  }
`;

class UnconnectedAddDoctrineForm extends Component {
  constructor(props) {
    super(props);
    this.state = { fits: [], stage: 0 };
  }
  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  loadFits = async () => {
    const res = await fetch(devURL + "/fits");
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      let fitList = bod.fitList;
      this.props.dispatch({ type: "loadFits", fitList });
    }
  };
  componentDidMount = () => {
    this.loadFits();
  };
  submitHandler = async (event) => {
    const { fits } = this.state;
    event.preventDefault();
    if (fits.length < 1) {
      alert("Must add at least one fit");
      return;
    }
    let data = new FormData();
    console.log(this.state);
    data.append("name", this.state.title);
    data.append("fits", JSON.stringify(this.state.fits));
    const res = await fetch(devURL + "/add-doctrine", {
      method: "POST",
      body: data,
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      alert("Fit added successfully");
      window.location.reload();
      this.props.onClose();
    }
  };
  toggleFit = (buttonFitId) => {
    if (this.state.fits.includes(buttonFitId)) {
      let newFits = this.state.fits.filter((fitId) => {
        return fitId != buttonFitId;
      });
      this.setState({ fits: newFits });
    } else {
      let newFits = this.state.fits.concat(buttonFitId);
      this.setState({ fits: newFits });
    }
  };
  renderFits = (fitData) => {
    return (
      <FitSelector
        fitName={fitData.title}
        defaultSelected={false}
        onSelect={this.toggleFit}
        onDeselect={this.toggleFit}
        name={fitData.id}
      ></FitSelector>
    );
  };
  render = () => {
    const { onClose } = this.props;
    return (
      <BackgroundBlur>
        <FormStyle>
          <ExitButton onClick={onClose}>X</ExitButton>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="Doctrine Name"
              onChange={this.inputHandler}
              value={this.state.title}
              name="title"
            />
            <button>Submit</button>
          </form>
          <div>
            <div>Select Fits:</div>
            {this.props.fits && this.props.fits.map(this.renderFits)}
          </div>
        </FormStyle>
      </BackgroundBlur>
    );
  };
}

const mapState = (state) => {
  return { fits: state.fitList };
};

const AddDoctrineForm = connect(mapState)(UnconnectedAddDoctrineForm);

export default AddDoctrineForm;
