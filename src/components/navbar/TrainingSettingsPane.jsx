import React, { useState, useContext } from "react";
import "./TrainingSettingsPane.css";
import AudioContext from "../../context/AudioContext";
import Input from "../common/Input";


const validateStart = val => {
  val = parseFloat(Number(val));
  if (Number.isNaN(val)) return 0.5;
  if (val < 0) return 0;
  return val;
};

const validateEnd = val => {
  val = parseFloat(Number(val));
  if (Number.isNaN(val)) return 2;
  if (val < 0) return 0;
  return val;
};

const TrainingSettingsPane = ({visible}) => {
  const { getPreDelay, setPreDelay, getPostDelay, setPostDelay } = useContext(AudioContext);
  
  const intialPreDelay = getPreDelay();
  const intialPostDelay = getPostDelay();

  const [startDelay, setStartDelay] = useState(intialPreDelay);
  const [endDelay, setEndDelay] = useState(intialPostDelay);

  const handleStartInputChange = event => {
    setStartDelay(event.target.value);
  };

  const handleStartInputKeyDown = event => {
    if (event.key === "Enter") {
      submitStartInputValue(event.target.value);
    }
  };

  const handleStartInputBlur = event => {
    submitStartInputValue(validateStart(startDelay));
  };

  const submitStartInputValue = v => {
    v = validateStart(startDelay);
    setStartDelay(v);
    setPreDelay(v);
  };

  const handleEndInputChange = event => {
    setEndDelay(event.target.value);
  };

  const handleEndInputKeyDown = event => {
    if (event.key === "Enter") {
      submitEndInputValue(event.target.value);
    }
  };

  const handleEndInputBlur = event => {
    submitEndInputValue(validateEnd(endDelay));
  };

  const submitEndInputValue = v => {
    v = validateEnd(endDelay);
    setEndDelay(v);
    setPostDelay(v);
  };

  return (
    <div className="SettingsPane">
      <h4>Session Timing Delays (seconds)</h4>
      <div id="delaySettingsContainer">
        <div className="settingsInputContainer">
          <span>start: </span>
          <Input
            className="delayInput"
            onChange={handleStartInputChange}
            value={startDelay}
            onBlur={handleStartInputBlur}
            onKeyDown={handleStartInputKeyDown}
            tabentry={visible}
          />
        </div>
        <div className="settingsInputContainer">
          <span>end: </span>
          <Input
            className="delayInput"
            onChange={handleEndInputChange}
            value={endDelay}
            onBlur={handleEndInputBlur}
            onKeyDown={handleEndInputKeyDown}
            tabentry={visible}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingSettingsPane;
