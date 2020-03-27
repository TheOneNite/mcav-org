import React, { useState } from "react";
import connect from "redux";
import AddTimerForm from "./components/AddTimerForm";

const Timerboard = () => {
  const [timers, setTimers] = useState([]);
  return (
    <div>
      <AddTimerForm />
      {timers.map(timerData => {})}
    </div>
  );
};

export default Timerboard;
