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
    const { activeFit } = this.state;
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
            {`Hazmat is a longrange skirmish doctrine with good staying power that lets us keep fighting with nano principales in situations that are too hot for nano proper.  One of the primary uses for this doctrine will be going out and killing big things that our nano gangs tackle in kspace, and to that end it is designed with the ability to clear tackle and mitigate damage in order to stabilize and control a grid long enough for us to bring caps as primary anti-big-thing DPS and maybe even extract them once the big thing is dead.  In order to do this the doctrine is going to be DUAL-PROPPED, with a MWD to position on grid and kite away from stuff as well as an AB to keep speed up and sig down when fighting big bads.

Mainline for this doctrine will be Ishtars, logi will be Onerios, tackle will be a mix of brick Heretics and Ishkurs, and there’s also a link Legion

Ishtar: These are pretty straightforward drone damage AHACs.  You have some guns but they’re basically only for shredding triangles that try and get onto the ball.

Onerios: Kitey logi, range and speed are your best friend.  You also are dualpropped so if you ever get caught you can switch to AB and fly along with a destroyer sig

Heretics: Primary tackle for the fleet, you have scram+web and are reasonably fast.  You’re also pretty tanky and will hold under reps from the logi.

Ishkur: A faster initial tackle option that also has strong drone antisupport.  As a plus it uses essentially the same skills as the enyo so you can put all your alts in one of these.
`}
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
