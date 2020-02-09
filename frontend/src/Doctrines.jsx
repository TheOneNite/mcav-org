import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import AddDoctrineForm from "./AddDoctrineForm.jsx";
import { getDoctrines } from "./assets/networking.js";
import { Title } from "./styles/globalStyles";

const DoctrinePage = styled.div`
  padding: 25px;
  font-family: "Source Code Pro", monospace;
  background-color: #0d0d0e;
  color: #d48806;
  .doctrine-link {
    margin: 1em;
  }
`;
const AddButton = styled.button`
  margin-left: 1em;
`;

class UnconnectedDoctrines extends Component {
  constructor(props) {
    super(props);
    this.state = { adding: false, loadCounter: 1 };
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
  loadCount = () => {
    if (this.state.loadCounter > 5) {
      this.setState({ loadCounter: 1 });
    }
    this.setState({ loadCounter: this.state.loadCounter + 1 });
  };
  renderDoctrine = docData => {
    return (
      <div className="doctrine-link">
        <img src={docData.icon} alt="" />
        <Link to={"/doctrine/" + docData.id}>{docData.name}</Link>
      </div>
    );
  };
  render = () => {
    console.log("doc");
    console.log(this.props.user);
    if (this.props.user === undefined) {
      const dots = "........";
      setTimeout(this.loadCount, 1000);
      return <div>{"Loading" + dots.slice(0, this.state.loadCounter)}</div>;
    }
    if (this.props.user === "failed") {
      return <Redirect to="/login" />;
    }
    return (
      <DoctrinePage>
        <Title>Doctrines</Title>
        <div>
          {this.props.docList && this.props.docList.map(this.renderDoctrine)}
        </div>
        {this.state.adding && (
          <AddDoctrineForm
            onClose={() => {
              this.toggleAdd();
            }}
          />
        )}
        {this.props.user.isAdmin && (
          <AddButton onClick={this.toggleAdd}>Add Doctrine</AddButton>
        )}
        <div style={{ margin: "1em" }}>
          <Link to="/fits">See All Fits</Link>
        </div>
      </DoctrinePage>
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
