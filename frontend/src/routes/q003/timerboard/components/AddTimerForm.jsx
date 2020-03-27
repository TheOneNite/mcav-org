import React, { useState } from "react";
import { Button, Title } from "../../../../styles/q003Components";
import styled from "styled-components";
import moment from "moment";
import tz from "moment-timezone";

const Section = styled.div`
  margin-right: 1rem;
  display: flex;
  height: min-content;
`;

const AddTimerForm = () => {
  const [duration, setDuration] = useState({});
  const [contact, setContact] = useState();
  const [enteredAt, setEnteredAt] = useState(moment());
  const [stage, setStage] = useState("armor");
  const [structure, setStructure] = useState("astrahus");
  const [newAdd, setNewAdd] = useState(false);
  const structures = [
    "astrahus",
    "fortizar",
    "raitaru",
    "azbel",
    "athanor",
    "tatara"
  ];
  const [isActive, setIsActive] = useState(true);
  const handleAddTimer = async e => {
    e.preventDefault();
    const payload = {
      exits: enteredAt.add(duration),
      contact,
      structure,
      stage
    };
    const data = new FormData();
    data.append("payload", JSON.stringify(payload));
    const res = await fetch("http://localhost:8080/add-timer", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let bod = await res.text();
    bod = JSON.parse(bod);
    if ((bod.success = true)) {
      setNewAdd(true);
      setTimeout(() => {
        setNewAdd(false);
      }, 1000);
      return;
    }
    window.alert(`Error adding your timer: ${bod.msg}`);
  };
  const handleDurationInput = e => {
    setDuration({ ...duration, [e.target.name]: e.target.value });
    setEnteredAt(moment());
  };
  const handleContactInput = e => {
    setContact(e.target.value);
  };
  const renderCurrentTime = () => {
    setTimeout(() => {
      setNow(renderCurrentTime());
    }, 10000);
    return <div>{moment().format("lll") + "  +"}</div>;
  };
  const [now, setNow] = useState(renderCurrentTime());
  const verifyDuration = () => {
    if (Object.keys(duration).length > 0) {
      const timerExit = moment().add(duration);
      return <div>{"= " + timerExit.format("lll")}</div>;
    }
    return <div style={{ color: "red" }}>please enter a timer duration</div>;
  };
  const renderForm = () => {
    return (
      <div style={{ display: "flex" }}>
        <form onSubmit={handleAddTimer}>
          <div style={{ display: "flex" }}>
            <Section>
              {"Structure Type: "}
              <select
                onChange={e => {
                  setStructure(e.target.value);
                }}
              >
                {structures.map(name => {
                  return <option value={name}>{name}</option>;
                })}
              </select>
            </Section>
            <Section>
              {"Timer Stage: "}
              <select
                onChange={e => {
                  setStage(e.target.value);
                }}
              >
                <option value="armor">Armor</option>
                <option value="structure">Structure</option>
              </select>
            </Section>
            <Section>
              RF length (from now)
              <div>
                {now}
                <input
                  placeholder="DD"
                  size={2}
                  value={duration.d}
                  name="d"
                  onChange={handleDurationInput}
                />
                <input
                  placeholder="HH"
                  size={2}
                  value={duration.h}
                  name="h"
                  onChange={handleDurationInput}
                />
                <input
                  placeholder="MM"
                  size={2}
                  value={duration.m}
                  name="m"
                  onChange={handleDurationInput}
                />
                {verifyDuration()}
              </div>
            </Section>
            <Section>
              {"Contact Person: "}
              <input
                placeholder="[CORP] Character"
                onChange={handleContactInput}
                value={contact}
              />
            </Section>
            <Section style={{ height: "100%" }}>
              <Button>Save</Button>
            </Section>
          </div>
          {newAdd && (
            <div
              style={{
                //width: "100%",
                backgroundColor: "#6B8DD0",
                padding: "1ch",
                textAlign: "center",
                color: "#21191C"
              }}
            >
              Timer Added Successfully
            </div>
          )}
        </form>
        <Button
          onClick={() => {
            setIsActive(false);
          }}
        >
          Done
        </Button>
      </div>
    );
  };
  return (
    <div style={{ padding: "2rem" }}>
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
