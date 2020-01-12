import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import AddDoctrineForm from "./AddDoctrineForm.jsx";
import EditDoctrine from "./EditDoctrine.jsx";

import { getDoctrines, getFitSingle } from "./assets/networking.js";

const Style = styled.div`
  .fitlist-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .fit-wrapper {
    padding: 20px;
  }
`;

class UnconnectedViewDoctrine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.loadDoctrine(this.props.match.params.docId);
  };
  loadDoctrine = async id => {
    let docData = await getDoctrines(id);
    docData = docData[0];
    console.log(docData);
    Promise.all(
      docData.fits.map(async id => {
        let fitData = await getFitSingle(id);
        return fitData;
      })
    ).then(fitData => {
      console.log(fitData);
      this.setState({ docData, fitList: fitData });
    });
  };
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
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
    return <div className="fit-wrapper">{fitLines}</div>;
  };
  render = () => {
    if (this.state.editing) {
      return (
        <Style>
          <a href="/">Home</a>
          <EditDoctrine
            name={this.state.docData.name}
            fits={this.state.fitList}
            id={this.state.docData.id}
          />
        </Style>
      );
    }
    return (
      <Style>
        <a href="/">Home</a>
        <h2>{this.state.docData && this.state.docData.name}</h2>
        <button onClick={this.toggleEdit}>Edit</button>
        {this.state.editing && <AddDoctrineForm edit={true} />}
        <div className="fitlist-wrapper">
          {this.state.fitList && this.state.fitList.map(this.renderFit)}
        </div>
      </Style>
    );
  };
}

const mapState = state => {
  return {};
};

const ViewDoctrine = connect(mapState)(UnconnectedViewDoctrine);
export default ViewDoctrine;
