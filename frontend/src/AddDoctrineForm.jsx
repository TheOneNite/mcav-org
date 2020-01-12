import React, { Component } from "react";
import { connect } from "react-redux";
import devURL from "./assets/proxy.js";
import styled from "styled-components";

const FormStyle = styled.div`
  background-color: #171516;
  color: #c6f8ff;
  padding: 20px;
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
    this.state = { fits: [] };
  }
  inputHandler = event => {
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
  submitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    console.log(this.state);
    data.append("name", this.state.title);
    data.append("fits", JSON.stringify(this.state.fits));
    const res = await fetch(devURL + "/add-doctrine", {
      method: "POST",
      body: data
    });
  };
  toggleFit = event => {
    if (this.state.fits.includes(event.target.name)) {
      let newFits = this.state.fits.filter(fitId => {
        return fitId != event.target.name;
      });
      this.setState({ fits: newFits });
    } else {
      let newFits = this.state.fits.concat(event.target.name);
      this.setState({ fits: newFits });
    }
  };
  renderFits = fitData => {
    console.log(fitData);
    return (
      <button
        name={fitData.id}
        onClick={this.toggleFit}
        className={
          this.state.fits.includes(fitData.id)
            ? "button-selected"
            : "button-fit"
        }
      >
        {fitData.title}
      </button>
    );
  };
  render = () => {
    return (
      <FormStyle>
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
    );
  };
}

const mapState = state => {
  return { fits: state.fitList };
};

const AddDoctrineForm = connect(mapState)(UnconnectedAddDoctrineForm);

export default AddDoctrineForm;
