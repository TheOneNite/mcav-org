import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SelectorButton = styled.button`
  outline: none;
  .active {
    background-color: #911a28;
    color: #0d0d0e;
    border-color: #d48806;
  }
  .inactive {
    background-color: inherit;
  }
`;

const FitSelector = ({
  fitName,
  defaultSelected,
  onSelect,
  onDeselect,
  name
}) => {
  const [selected, setSelection] = useState(defaultSelected);
  const selectedStyle = {
    backgroundColor: "#911a28",
    borderColor: "#d48806",
    color: "#0d0d0e"
  };
  const deselectedStyle = {
    backgroundColor: "inherit"
  };
  const handleToggle = event => {
    if (selected) {
      onDeselect(event.target.name);
    } else {
      onSelect(event.target.name);
    }
    setSelection(!selected);
  };
  return (
    <SelectorButton
      onClick={handleToggle}
      className={selected ? "active" : "inactive"}
      name={name}
      style={selected ? selectedStyle : deselectedStyle}
    >
      {fitName}
    </SelectorButton>
  );
};

export default FitSelector;
