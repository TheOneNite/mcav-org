import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import devURL from "./assets/proxy.js";

import AddDoctrineForm from "./AddDoctrineForm.jsx";

import { getDoctrines, getFitSingle } from "./assets/networking.js";

const Style = styled.div`
  .fitlist-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .fit-wrapper {
    padding: 20px;
  }
  .input-title {
    font-size: 36px;
  }
`;

class UnconnectedEditDoctrine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      fitList: this.props.fits,
      editFits: []
    };
  }
  saveEdits = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("id", this.props.id);
    data.append("fits", this.state.fitList);
    data.append("name", this.state.name);
    const res = await fetch(devURL + "/doctrine-update", {
      method: "POST",
      body: data
    });
  };
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addEdit = event => {
    let addId = event.target.name;
    let newEdits = this.state.editFits.concat(event.target.name);
    //console.log(this.state.fitList);
    let fitSch = this.state.fitList.filter(fit => {
      return fit.id === addId;
    });
    console.log(fitSch);
    let fitStr = fitSch[0].fit;
    this.setState({ editFits: newEdits, [event.target.name]: fitStr });
  };
  removeEdit = event => {
    let newEdits = this.state.editFits.filter(fitId => {
      return fitId !== event.target.name;
    });
    this.setState({ editFits: newEdits });
  };
  saveFitEdit = event => {
    let saveId = event.target.name;
    let newFits = [...this.state.fitList];
    let editFit = newFits.filter(fit => {
      return fit.id === saveId;
    });
    editFit = editFit[0];
    let saveIndex = newFits.indexOf(editFit);
    editFit.fit = this.state[event.target.name];
    console.log(editFit);
    newFits.splice(saveIndex, 1, editFit);
    this.setState({ fitList: newFits }, () => {
      this.removeEdit({ target: { name: saveId } });
    });
  };
  fitInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  deleteFit = id => {
    let newFits = this.state.fitList.filter(fit => {
      return fit.id !== id;
    });
    this.setState({ fitList: newFits });
  };
  confirmDelete = event => {
    if (window.confirm("Confirm Fit Deletion")) {
      this.deleteFit(event.target.name);
      return;
    }
    console.log("NO DELTE");
  };
  fitEdit = fitData => {
    if (this.state.editFits.includes(fitData.id)) {
      return (
        <div>
          <textarea
            onChange={this.fitInput}
            value={this.state[fitData.id]}
            name={fitData.id}
          />
          <button onClick={this.saveFitEdit} name={fitData.id}>
            Save
          </button>
        </div>
      );
    }
    return this.renderFit(fitData);
  };
  renderFit = fitData => {
    let fitLines = fitData.fit.split("\n");
    //console.log(fitLines);
    fitLines = fitLines.map(lineStr => {
      if (lineStr.length > 0) {
        return <div>{lineStr}</div>;
      }
      return <br></br>;
    });
    return (
      <div>
        <div>
          <button name={fitData.id} onClick={this.confirmDelete}>
            X
          </button>
        </div>
        <div className="fit-wrapper">{fitLines}</div>
      </div>
    );
  };
  render = () => {
    console.log(this.state);
    return (
      <Style>
        <input
          type="text"
          onChange={this.inputHandler}
          name="name"
          value={this.state.name}
          className="input-title"
        />
        <button onClick={this.saveEdits}>Save</button>
        <div></div>
        <div className="fitlist-wrapper">
          {this.state.fitList && this.state.fitList.map(this.fitEdit)}
        </div>
      </Style>
    );
  };
}

const mapState = state => {
  return {};
};

const EditDoctrine = connect(mapState)(UnconnectedEditDoctrine);
export default EditDoctrine;
