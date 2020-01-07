import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedAddDoctrineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  inputHander = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
  };
  renderFits = () => {};
  render = () => {
    // add some kind of selector for current fits
    <div>
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          placeholder="Doctrine Name"
          onChange={this.inputHandler}
          value={this.state.name}
          name="name"
        />
        <div>
          Fits:
          <div>
            <select onChange={this.dropdownHandler}></select>
          </div>
        </div>
        <button>Add</button>
      </form>
    </div>;
  };
}

const mapState = state => {};
