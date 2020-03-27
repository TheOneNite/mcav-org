import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";

const OuterWrapper = styled.div`
  background-color: #6e1e2d;
  margin: 5px;
  width: 100%;
  display: flex;
  padding: 1ch;
`;

const InnerWrapper = styled.div`
  margin-right: 3rem;
  color: black;
  text-align: center;
`;
const CountdownWrapper = styled.div`
  margin-right: 3rem;
  color: black;
  width: 15ch;
  text-align: right;
`;

const ListDisplayTimer = ({ structure, stage, contact, timer }) => {
  const [timerExit, setTimerExit] = useState();
  const updateTime = () => {
    if (timer !== null) {
      const exitTime = moment(timer);
      const days = exitTime.diff(moment(), "days");
      const hours = exitTime.diff(moment().add(days, "days"), "hours");
      const mins = exitTime.diff(
        moment().add({ d: days, h: hours }),
        "minutes"
      );
      const secs = exitTime.diff(
        moment().add({ d: days, h: hours, m: mins }),
        "seconds"
      );
      setTimerExit(`${days}d ${hours}h ${mins}m ${secs}s`);
      setTimeout(updateTime, 1000);
    }
  };
  useEffect(() => {
    updateTime();
  }, []);
  return (
    <OuterWrapper>
      <CountdownWrapper>{timerExit}</CountdownWrapper>
      <InnerWrapper style={{ width: "8ch" }}>{structure}</InnerWrapper>
      <InnerWrapper style={{ width: "9ch" }}>{stage}</InnerWrapper>
      <InnerWrapper>Contact: {contact}</InnerWrapper>
    </OuterWrapper>
  );
};

export default ListDisplayTimer;
