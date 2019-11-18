import React, { useState } from "react";
import "./TrainerSessionContainer.css";

const TrainerSessionContainer = ({ inSession }) => {
  return (
    <div
      id="TrainerSessionContainer"
      className={`${inSession ? "inSession" : ""}`}
    >
      <textarea />
    </div>
  );
};

export default TrainerSessionContainer;
