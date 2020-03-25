import React, { useEffect } from "react";
import connect from "redux";
import AddTimerForm from "./components/AddTimerForm";

const Timerboard = () => {
  return (
    <div>
      <AddTimerForm />
    </div>
  );
};

export default Timerboard;
