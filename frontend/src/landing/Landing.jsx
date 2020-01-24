import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import devURL from "../assets/proxy.js";

const Page = styled.div`
  margin: 0px;
  padding: 25px;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  z-index: 5;
`;

const Bg = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0px;
  z-index: 1;
`;

const Wrap = styled.div`
  position: absolute;
`;

const Lonk = styled.a`
  font-variant: small-caps;
  font-size: 36px;
  font-weight: bolder;
  color: #720d10;
  text-decoration: none;
  -webkit-text-stroke: 2px black;
  :hover {
    color: black;
    -webkit-text-stroke: 1px #720d10;
  }
`;
const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 10;
  .router-link {
    font-variant: small-caps;
    font-size: 36px;
    font-weight: bolder;
    color: #bc992e;
    :hover {
      color: black;
      -webkit-text-stroke: 1px #720d10;
    }
  }
`;

const TITLE = styled.div`
  color: rgba(0, 0, 0, 0);
  width: 100%;
  height: max-content;
  text-align: center;
  font-size: 600px;
  position: relative;
  right: 70px;
  bottom: 35px;
  -webkit-text-stroke: 5px #bc992e;
`;

class UnconnectedLanding extends Component {
  autoLogin = async () => {
    let res = await fetch(devURL + "/auth", { credentials: "include" });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success === true) {
      this.props.dispatch({ type: "login" });
    }
  };
  componentDidMount = () => {
    this.autoLogin();
  };
  render = () => {
    return (
      <Wrap>
        <Bg src="/enyo.mp4" autoPlay={true} muted={true} loop={true} />
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
            {this.props.loggedIn ? (
              <>
                <div>
                  <Lonk href="https://pathfinder.mcav.org">Pathfinder</Lonk>
                </div>
                <div>
                  <Lonk href="https://mcav.ga">Seat</Lonk>
                </div>
                <div>
                  <Lonk href="/doctrines">Doctrines</Lonk>
                </div>
              </>
            ) : (
              <Link to="/login" className="router-link">
                Login
              </Link>
            )}
          </LinkWrapper>
        </Page>
      </Wrap>
    );
  };
}

const mapStateToProps = state => {
  return { loggedIn: state.loginStatus };
};
const Landing = connect(mapStateToProps)(UnconnectedLanding);

export default Landing;
