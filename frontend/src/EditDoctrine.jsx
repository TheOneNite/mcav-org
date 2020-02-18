import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import devURL from "./assets/proxy.js";

import AddDoctrineForm from "./AddDoctrineForm.jsx";
import FitSelector from "./FitSelector";

import { getDoctrines, getFitSingle, getFits } from "./assets/networking.js";

const Style = styled.div`
  width: 50vw;
  .fit-selector-wrapper {
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .fit-wrapper {
    padding: 20px;
  }
  .input-title {
    font-size: 36px;
    padding: 10px;
  }
  .input-description {
    padding: 1em;
    background-color: inherit;
    color: #e0cdb3;
    outline: none;
    width: 50vw;
    height: 400px;
  }
`;

class UnconnectedEditDoctrine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      fitList: this.props.fits,
      editFits: [],
      writeup: this.props.docData.writeup
    };
  }
  componentDidMount = () => {
    this.loadFits();
  };
  loadFits = async () => {
    const allFits = await getFits();
    this.setState({ allFits });
  };
  saveEdits = async event => {
    console.log("submitting");
    event.preventDefault();
    let data = new FormData();
    const fitIds = this.state.fitList.map(fitData => {
      return fitData.id;
    });
    let fitData = {
      id: this.props.id,
      fits: fitIds,
      name: this.state.name,
      writeup: this.state.writeup
    };
    fitData = JSON.stringify(fitData);
    data.append("payload", fitData);
    const res = await fetch(devURL + "/doctrine-update", {
      method: "POST",
      body: data
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      window.location.reload();
      return;
    }
    alert(bod.message);
  };
  revert = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      window.location.reload();
      return;
    }
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
  addFit = id => {
    console.log("add", id);
    let addFit = this.state.allFits.filter(fitData => {
      return fitData.id === id;
    })[0];
    let newFitList = this.state.fitList.concat(addFit);
    this.setState({ fitList: newFitList });
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
  renderAllFits = () => {
    if (this.state.allFits === undefined) {
      return <div>Loading....</div>;
    }
    let fitIds = this.state.fitList.map(fitData => {
      return fitData.id;
    });
    return this.state.allFits.map(fitData => {
      let selected = fitIds.includes(fitData.id);
      console.log(selected);
      return (
        <FitSelector
          fitName={fitData.title}
          defaultSelected={selected}
          onSelect={this.addFit}
          onDeselect={this.deleteFit}
          name={fitData.id}
        />
      );
    });
  };
  render = () => {
    console.log(this.state);
    const { docData } = this.props;
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
        <button onClick={this.revert}>Cancel</button>
        <div className="fit-selector-wrapper">{this.renderAllFits()}</div>
        <textarea
          className="input-description"
          value={this.state.writeup}
          onChange={this.inputHandler}
          name="writeup"
        />
      </Style>
    );
  };
}

const mapState = state => {
  return {};
};

const EditDoctrine = connect(mapState)(UnconnectedEditDoctrine);
export default EditDoctrine;
