import React, { Component } from "react";
import AddFitForm from "./AddFitForm.jsx";
import { connect } from "react-redux";
import devURL from "./assets/proxy.js";
import FitButton from "./FitButtons";

class UnconnectedFits extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggleAdd = event => {
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
      <div>
        Fits
        <div>
          {this.props.fits &&
            this.props.fits.map((fit, index) => {
              return this.renderFit(fit, index);
            })}
        </div>
        {user.isAdmin && <button onClick={this.toggleAdd}>Add Fit</button>}
        {this.state.addFit && <AddFitForm />}
      </div>
    );
  };
}

const mapState = state => {
  return {
    fits: state.fitList,
    doctrines: state.doctrines,
    user: state.userData
  };
};

const Fits = connect(mapState)(UnconnectedFits);

export default Fits;
