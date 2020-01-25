import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AddDoctrineForm from "./AddDoctrineForm.jsx";
import { getDoctrines } from "./assets/networking.js";

class UnconnectedDoctrines extends Component {
  constructor(props) {
    super(props);
    this.state = { adding: false };
  }
  toggleAdd = () => {
    this.setState({ adding: !this.state.adding });
  };
  loadDoctrines = async () => {
    let docList = await getDoctrines();
    this.props.dispatch({ type: "loadDocs", docList });
  };
  componentDidMount = () => {
    this.loadDoctrines();
  };
  renderDoctrine = docData => {
    return (
      <div>
        <img src={docData.icon} alt="" />
        <Link to={"/doctrine/" + docData.id}>{docData.name}</Link>
      </div>
    );
  };
  render = () => {
    if (this.props.user === undefined) {
      return <div>Loading......</div>;
    }
    if (this.props.user === "failed") {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div>Doctrines</div>
        <div>
          {this.props.docList && this.props.docList.map(this.renderDoctrine)}
        </div>
        {this.state.adding && <AddDoctrineForm />}
        {this.props.user.isAdmin && (
          <button onClick={this.toggleAdd}>
            {this.state.adding ? "Hide Add Form" : "Add Doctrine"}
          </button>
        )}
      </div>
    );
  };
}

const mapState = state => {
  return {
    //docList: state.allDocs, admin: state.isAdmin
    docList: state.docList,
    user: state.userData
  };
};

const Doctrines = connect(mapState)(UnconnectedDoctrines);

export default Doctrines;
