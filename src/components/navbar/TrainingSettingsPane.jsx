import React, { useState, useContext } from "react";
import "./TrainingSettingsPane.css";
import AudioContext from "../../context/AudioContext";
import StartDelayInput from "../common/Input";
import EndDelayInput from "../common/Input";
import LimitInput from "../common/Input";

const validateCharAmount = val => {
  val = Number.parseInt(val);
  if (Number.isNaN(val)) return 50;
  if (val < 1) return 1;
  return val;
};

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

const TrainingSettingsPane = () => {
  const { getPreDelay, setPreDelay, getPostDelay, setPostDelay, getSessionCharAmount, setSessionCharAmount } = useContext(AudioContext);
  
  const intialCharAmount = getSessionCharAmount();
  const intialPreDelay = getPreDelay();
  const intialPostDelay = getPostDelay();

  const [charAmount, setCharAmount] = useState(intialCharAmount);
  const [startDelay, setStartDelay] = useState(intialPreDelay);
  const [endDelay, setEndDelay] = useState(intialPostDelay);

  const handleCharAmountInputChange = event => {
    setCharAmount(event.target.value);
  };

  const handleCharAmountInputKeyDown = event => {
    if (event.key === "Enter") {
      submitCharAmountInputValue(event.target.value);
    }
  };

  const handleCharAmountInputBlur = event => {
    submitCharAmountInputValue(validateCharAmount(charAmount));
  };

  const submitCharAmountInputValue = v => {
    v = validateCharAmount(charAmount);
    setSessionCharAmount(v);
    setCharAmount(v);
  };

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
      <h4>Session Character Amount</h4>
      <div className="settingsInputContainer">
        <span>amount:</span>
        <LimitInput
          onChange={handleCharAmountInputChange}
          value={charAmount}
          onBlur={handleCharAmountInputBlur}
          onKeyDown={handleCharAmountInputKeyDown}
        />
      </div>
      <h4>Session Timing Delays (seconds)</h4>
      <div id="delaySettingsContainer">
        <div className="settingsInputContainer">
          <span>start:</span>
          <StartDelayInput
            className="delayInput"
            onChange={handleStartInputChange}
            value={startDelay}
            onBlur={handleStartInputBlur}
            onKeyDown={handleStartInputKeyDown}
          />
        </div>
        <div className="settingsInputContainer">
          <span>end:</span>
          <EndDelayInput
            className="delayInput"
            onChange={handleEndInputChange}
            value={endDelay}
            onBlur={handleEndInputBlur}
            onKeyDown={handleEndInputKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingSettingsPane;
