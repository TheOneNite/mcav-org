import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import devURL from "../assets/proxy.js";

const Page = styled.div`
  margin: 0px;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0);
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
  font-family: "Russo One", sans-serif;
  font-variant: small-caps;
  font-size: 6vh;
  font-weight: bolder;
  color: #820014;
  text-decoration: none;
  -webkit-text-stroke: 1px #faad14;
  :hover {
    color: #faad14;
    -webkit-text-stroke: 1px #820014;
  }
  :active {
    color: #ffc53d;
    -webkit-text-stroke: 0px;
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw;
  text-align: center;
  @media (min-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: absolute;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0);
    .router-link {
      font-family: "Russo One", sans-serif;
      font-variant: small-caps;
      font-size: 6vh;
      font-weight: bolder;
      color: #faad14;
      -webkit-text-stroke: 1px #820014;
      :hover {
        color: #820014;
        -webkit-text-stroke: 1px #faad14;
      }
      :active {
        color: #820014;
        -webkit-text-stroke: 0px;
      }
    }
    .upper {
      top: 5vh;
    }
    .lower {
      bottom: 5vh;
    }
  }
`;

const TITLE = styled.div`
  text-align: center;
  box-sizing: border-box;
  width: 100vw;
  font-size: 37vw;
  -webkit-text-stroke: 5px #bc992e;
  color: rgba(0, 0, 0, 0);
  @media (min-width: 600px) {
    color: rgba(0, 0, 0, 0);
    width: 100vw;
    height: 85vh;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    font-size: 600px;
    font-size: 37vw;
    vertical-align: middle;
    box-sizing: border-box;
    margin: auto auto auto auto;
    -webkit-text-stroke: 5px #bc992e;
  }
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
          <LinkWrapper className="upper">
            <div>
              <Lonk>Tools</Lonk>
            </div>
            <div>
              <Lonk href="https://forums.mcav.org/" target="_blank">
                Forums
              </Lonk>
            </div>
            <div>
              <Lonk
                href="https://zkillboard.com/alliance/99006690/"
                target="_blank"
              >
                Killboard
              </Lonk>
            </div>
            <div>
              <Lonk>Media</Lonk>
            </div>
          </LinkWrapper>
          <TITLE>MCAV</TITLE>
          <LinkWrapper className="lower">
            {this.props.loggedIn ? (
              <>
                <div>
                  <Lonk href="https://pathfinder.mcav.org" target="_blank">
                    Pathfinder
                  </Lonk>
                </div>
                <div>
                  <Lonk href="https://mcav.ga" target="_blank">
                    Seat
                  </Lonk>
                </div>
                <div>
                  <Lonk href="/doctrines" target="_blank">
                    Doctrines
                  </Lonk>
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
