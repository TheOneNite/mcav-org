import React, { Component } from "react";

class UnconnectedDoctrines extends Component {
  renderDoctrine = docData => {
    return (
      <div>
        <img src={docData.icon} />
        <div>{docData.name}</div>
        {this.props.admin && <Link to={"/doctrine/" + docData.id} />}
      </div>
    );
  };
  render = () => {
    return <div>{this.props.docList.map(this.renderDoctrine)}</div>;
  };
}

const mapState = state => {
  return { docList: state.allDocs, admin: state.isAdmin };
};
