import React, { Component } from "react";
import styled from "styled-components";
import VisibilityDropdown from "./VisibilityDropdown.jsx";
import devURL from "./assets/proxy.js";

const FitInput = styled.textarea`
  width: 40vw;
  height: 400px;
  background-color: inherit;
  color: inherit;
`;

class AddFitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  fitPasteHandler = event => {
    let fitStr = event.target.value;
    if (this.state.name === undefined) {
      let fitLines = fitStr.split("\n");
      let title = fitLines[0].split(" ").pop();
      title = title.slice(0, title.length - 1);
      this.setState({ name: title, fitStr });
      return;
    }
    this.setState({ fitStr });
  };
  dropdownhandler = event => {
    this.setState({ visibility: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("fitStr", this.state.fitStr);
    const res = await fetch(devURL + "/add-fit", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      alert("Fit successfully added");
      this.setState({});
    }
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={this.inputHandler}
            value={this.state.name}
          />
          <VisibilityDropdown onChange={this.dropdownHandler} />
          <FitInput
            placeholder="paste EFT formatted fit here"
            name="fitStr"
            onChange={this.fitPasteHandler}
            value={this.state.fitStr}
          />
          <button>Add</button>
        </form>
      </div>
    );
  };
}

export default AddFitForm;
