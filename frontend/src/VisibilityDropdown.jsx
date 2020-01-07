import React, { Component } from "react";

class VisibilityDropdown extends Component {
  render = () => {
    return (
      <div>
        Visibility
        <select onChange={this.props.onChange}>
          <option>Private</option>
          <option>Public</option>
        </select>
      </div>
    );
  };
}

export default VisibilityDropdown;
