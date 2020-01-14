import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  margin: 0px;
  padding: 25px;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  z-index: 5;
`;

const Bg = styled.video`
  width: 100vw;
  object-fit: cover;
  position: absolute;
  top: 0px;
  z-index: 1;
`;

const Wrap = styled.div`
  height: 100vw;
  position: absolute;
`;

const Lonk = styled.a`
  font-variant: small-caps;
  font-size: 36px;
`;
const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TITLE = styled.div`
  width: 100%;
  text-align: center;
  font-size: 600px;
  position: relative;
  right: 40px;
`;

class Landing extends Component {
  render = () => {
    return (
      <Wrap>
        <Bg src="/enyo.mp4" autoPlay={true} muted={true} />
        <Page>
          <LinkWrapper>
            <div>
              <Lonk>Tools</Lonk>
            </div>
            <div>
              <Lonk href="https://forums.mcav.org/">Forums</Lonk>
            </div>
            <div>
              <Lonk href="https://zkillboard.com/alliance/99006690/">
                Killboard
              </Lonk>
            </div>
            <div>
              <Lonk>Media</Lonk>
            </div>
          </LinkWrapper>
          <TITLE>MCAV</TITLE>
          <LinkWrapper>
            <div>
              <Lonk href="https://pathfinder.mcav.org">Pathfinder</Lonk>
            </div>
            <div>
              <Lonk>Seat</Lonk>
            </div>
            <div>
              <Lonk href="/fits">Doctrines</Lonk>
            </div>
          </LinkWrapper>
        </Page>
      </Wrap>
    );
  };
}

export default Landing;
