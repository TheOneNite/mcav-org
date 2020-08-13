import React, { Component } from "react";
import AddFitForm from "./AddFitForm.jsx";
import { connect } from "react-redux";
import devURL from "./assets/proxy.js";
import FitButton from "./FitButtons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.div`
  margin: 25px;
`;

const Section = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

class UnconnectedFits extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggleAdd = (event) => {
    this.setState({ addFit: !this.state.addFit });
  };
  componentDidMount = () => {
    this.loadFits();
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
  renderFit = (fitData, index) => {
    return <FitButton fitData={fitData} key={index} />;
  };
  render = () => {
    const { user } = this.props;
    console.log(user);
    return (
      <Page>
        <Section>
          <Link to="/doctrines">Back to doctrines</Link>
        </Section>
        Fits
        <Section>
          {this.props.fits &&
            this.props.fits.map((fit, index) => {
              return this.renderFit(fit, index);
            })}
        </Section>
        {user.isAdmin && (
          <Section>
            <button onClick={this.toggleAdd}>Add Fit</button>
            {this.state.addFit && <AddFitForm />}
          </Section>
        )}
      </Page>
    );
  };
}

const mapState = (state) => {
  return {
    fits: state.fitList,
    doctrines: state.doctrines,
    user: state.userData,
  };
};

const Fits = connect(mapState)(UnconnectedFits);

export default Fits;
