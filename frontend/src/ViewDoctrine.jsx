import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header, Title } from "./styles/globalStyles";
import AddDoctrineForm from "./AddDoctrineForm.jsx";
import EditDoctrine from "./EditDoctrine.jsx";
import FitTab from "./FitTab.jsx";
import CopyButton from "./CopyButton";

import { getDoctrines, getFitSingle } from "./assets/networking.js";

const Style = styled.div`
  color: #e0cdb3;
  padding: 25px;
  .fitlist-wrapper {
    width: min-content;
    max-width: 50%;
    overflow-y: auto;
    flex-wrap: wrap;
    border: 2px solid #a8071a;
  }
  .wrapper-fit-tab {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .writeup-wrapper {
    width: 50%;
    max-width: 45vw;
    overflow-y: auto;
    padding: 25px;
  }
  .fit-wrapper {
    width: max-content;
    margin: 1em;
  }
  .doctrine-wrapper {
    display: flex;
    width: 90vw;
  }
  .doctrine-fit {
    border-width: 0px;
    border-left-width: 2px;
    border-bottom-width: 2px;
    padding: 1em;
    width: 100%;
    min-width: min-content;
    word-wrap: none;
    outline: none;
    font-variant: small-caps;
    font-size: 2vh;
    font-weight: bold;
    :nth-child(1) {
      border-left-width: 0px;
    }
  }
  .tab-active {
    border-bottom-width: 0px;
    cursor: default;
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
    const getStyle = () => {
      const className = "doctrine-fit";
      if (fitData.id === this.state.activeFit) {
        return className + " tab-active";
      }
      return className;
    };
    return (
      <FitTab
        id={fitData.id}
        name={fitData.title}
        handleRoute={this.setActiveFit}
        className={getStyle()}
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
        <Title>{this.state.docData && this.state.docData.name}</Title>
        {user.isAdmin && <button onClick={this.toggleEdit}>Edit</button>}
        {this.state.editing && <AddDoctrineForm edit={true} />}
        <div className="doctrine-wrapper">
          <div className="writeup-wrapper">
            <Header>Description</Header>
            {docData && docData.writeup}
          </div>
          <div className="fitlist-wrapper">
            <div className="wrapper-fit-tab">
              {this.state.fitList?.map(this.renderFitList)}
            </div>
            <div>
              <CopyButton mode="eft" />
              <CopyButton mode="multibuy" />
            </div>
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
