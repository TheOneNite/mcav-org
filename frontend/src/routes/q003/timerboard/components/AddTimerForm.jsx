import React, { useState } from "react";
import { Button, Title } from "../../../../styles/q003Components";
import styled from "styled-components";
import moment from "moment";
import tz from "moment-timezone";

const Section = styled.div`
  margin-right: 1rem;
  display: flex;
`;

const AddTimerForm = () => {
  const [duration, setDuration] = useState({ d: 1, h: 17, m: 59 });
  const [enteredAt, setEnteredAt] = useState();
  const structures = [
    "astrahus",
    "fortizar",
    "raitaru",
    "azbel",
    "athanor",
    "tatara"
  ];
  const [isActive, setIsActive] = useState(true);
  const handleAddTimer = () => {};
  const renderCurrentTime = () => {
    return <div>{moment().format("lll") + "  +"}</div>;
  };
  const verifyDuration = () => {
    const timerExit = moment().add(duration);
    return <div>{"= " + timerExit.format("lll")}</div>;
  };
  const renderForm = () => {
    return (
      <form onSubmit={handleAddTimer}>
        <div style={{ display: "flex" }}>
          <Section>
            {"Structure Type: "}
            <select>
              {structures.map(name => {
                return <option vlaue={name}>{name}</option>;
              })}
            </select>
          </Section>
          <Section>
            {"Timer Stage: "}
            <select>
              <option>Armor</option>
              <option>Structure</option>
            </select>
          </Section>
          <Section>
            RF length (from now)
            <div>
              {renderCurrentTime()}
              <input placeholder="DD" size={2} value={duration.d} />
              <input placeholder="HH" size={2} value={duration.h} />
              <input placeholder="MM" size={2} value={duration.m} />
              {verifyDuration()}
            </div>
          </Section>
          <Section>
            {"Contact Person: "}
            <input />
          </Section>
        </div>
      </form>
    );
  };
  return (
    <div style={{ padding: "2rem" }}>
      <Title>Active Timers</Title>
      {isActive ? (
        renderForm()
      ) : (
        <Button
          onClick={() => {
            setIsActive(true);
          }}
        >
          Add Timer
        </Button>
      )}
    </div>
  );
};

export default AddTimerForm;
