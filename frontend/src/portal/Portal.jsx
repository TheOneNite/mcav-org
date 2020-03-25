import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0px;
  box-sizing: border-box;
  display: flex;
`;

const Door = styled.div`
  width: 50vw;
  position: relative;
  z-index: 2;
`;

const Cover = styled.img`
  position: relative;
  z-index: 1;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const MCAV = styled.a`
  font-family: "Russo One", sans-serif;
  font-variant: small-caps;
  font-size: 12vh;
  font-weight: bolder;
  text-decoration: none;
  z-index: 5;
  position: absolute;
  bottom: 10vh;
  right: 15vw;
  color: #820014;
  -webkit-text-stroke: 1px #faad14;
  :hover {
    color: #faad14;
    -webkit-text-stroke: 1px #820014;
  }
  :active {
    color: #ffc53d;
    -webkit-text-stroke: 0px;
  }
  :visited {
    color: #820014;
  }
`;
const Q003 = styled.a`
  font-family: "Russo One", sans-serif;
  font-variant: small-caps;
  font-size: 12vh;
  font-weight: bolder;
  text-decoration: none;
  z-index: 5;
  position: absolute;
  top: 10vh;
  left: 5vw;
  padding-left: 0px;
  text-align: center;
  color: #21191c;
  -webkit-text-stroke: 1px #6b8dd0;
  :hover {
    color: #6b8dd0;
    -webkit-text-stroke: 1px #21191c;
  }
  :active {
    color: #6b8dd0;
    -webkit-text-stroke: 0px;
  }
`;
//
const Portal = () => {
  return (
    <Wrap>
      <Door>
        <Cover src="/q003.jpg" />
        <Q003 href="/q003">Frighole Coalition</Q003>
      </Door>
      <Door>
        <Cover src="/mcav.jpg" />
        <MCAV href="/mcav">MCAV</MCAV>
      </Door>
    </Wrap>
  );
};

export default Portal;
