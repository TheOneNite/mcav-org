import React, { Component } from "react";
import AddFitForm from "./AddFitForm.jsx";

class Fits extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggleAdd = event => {
    this.setState({ addFit: !this.state.addFit });
  };
  render = () => {
    return (
      <div>
        Fits go Here
        <button onClick={this.toggleAdd}>Add Fit</button>
        {this.state.addFit && <AddFitForm />}
      </div>
    );
  };
}

export default Fits;
