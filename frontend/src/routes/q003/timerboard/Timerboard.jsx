import React, { useState, useEffect } from "react";
import { Title } from "../../../styles/q003Components";
import connect from "redux";
import AddTimerForm from "./components/AddTimerForm";
import ListDisplayTimer from "./components/ListDisplayTimer";
import moment from "moment";

const Timerboard = () => {
  const [timers, setTimers] = useState([]);
  const getTimers = async () => {
    const res = await fetch("http://localhost:8080/all-timers");
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      setTimers(bod.timersList);
    }
  };
  useEffect(() => {
    getTimers();
  }, []);
  const sortTimers = timers => {
    const now = moment();
    return timers.sort((a, b) => {
      console.log(moment(a.timer));
      if (moment(a.timer).diff(now) < moment(b.timer).diff(now)) {
        return -1;
      }
      if (moment(a.timer).diff(now) > moment(b.timer).diff(now)) {
        return 1;
      }
    });
  };
  return (
    <div>
      <Title>Timers</Title>
      <AddTimerForm />
      {sortTimers(timers).map(timerData => {
        return <ListDisplayTimer {...timerData} />;
      })}
    </div>
  );
};

export default Timerboard;
