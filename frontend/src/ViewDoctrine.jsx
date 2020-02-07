import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import AddDoctrineForm from "./AddDoctrineForm.jsx";
import EditDoctrine from "./EditDoctrine.jsx";
import FitTab from "./FitTab.jsx";

import { getDoctrines, getFitSingle } from "./assets/networking.js";

const Style = styled.div`
  .fitlist-wrapper {
    width: 50%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
  }
  .writeup-wrapper {
    width: 50%;
    max-width: 45vw;
    overflow-y: auto;
    padding: 25px;
  }
  .fit-wrapper {
    width: max-content;
  }
  .doctrine-wrapper {
    display: flex;
    width: 90vw;
  }
`;

const Header = styled.h3`
  font-variant: small-caps;
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
    Promise.all(
      docData.fits.map(async id => {
        let fitData = await getFitSingle(id);
        return fitData;
      })
    ).then(fitList => {
      let fitObj = {};
      fitList.forEach(fit => {
        fitObj[fit.id] = fit;
      });
      this.setState({ docData, fitList, fitObj, activeFit: fitList[0].id });
    });
  };
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };
  setActiveFit = id => {
    this.setState({ activeFit: id });
  };
  renderFitList = fitData => {
    return (
      <FitTab
        id={fitData.id}
        name={fitData.title}
        handleRoute={this.setActiveFit}
      />
    );
  };
  renderFit = active => {
    console.log(this.state);
    console.log(active);
    const fitData = this.state.fitObj[active];
    let fitLines = fitData.fit.split("\n");
    fitLines = fitLines.map(lineStr => {
      if (lineStr.length > 0) {
        return <div>{lineStr}</div>;
      }
      return <br></br>;
    });
    return <div className="fit-wrapper">{fitLines}</div>;
  };
  render = () => {
    const { user } = this.props;
    const { activeFit, docData } = this.state;
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
        <Link to="/doctrines">Doctrines Home</Link>
        <h2>{this.state.docData && this.state.docData.name}</h2>
        {user.isAdmin && <button onClick={this.toggleEdit}>Edit</button>}
        {this.state.editing && <AddDoctrineForm edit={true} />}
        <div className="doctrine-wrapper">
          <div className="writeup-wrapper">
            <Header>Description</Header>
            {docData && docData.writeup}
          </div>
          <div className="fitlist-wrapper">
            {this.state.fitList?.map(this.renderFitList)}
            {activeFit && this.renderFit(activeFit)}
          </div>
        </div>
      </Style>
    );
  };
}

const mapState = state => {
  return { user: state.userData };
};

const ViewDoctrine = connect(mapState)(UnconnectedViewDoctrine);
export default ViewDoctrine;
