import React, { useState, useContext } from "react";
import "./TrainingSettingsPane.css";
import AudioContext from "../../context/AudioContext";
import Input from "../common/Input";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";


const SSwitch = withStyles({
  root: { 
    marginLeft: -10,
    marginTop: "23px"
  }
})(Switch);

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
  const { getPreDelay, setPreDelay, getPostDelay, setPostDelay, getProgressBar, setProgressBar } = useContext(AudioContext);
  
  const intialPreDelay = getPreDelay();
  const intialPostDelay = getPostDelay();
  const initialProgressBar = getProgressBar();

  const [startDelay, setStartDelay] = useState(intialPreDelay);
  const [endDelay, setEndDelay] = useState(intialPostDelay);
  const [progBar, setProgBar] = useState(initialProgressBar);


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

  const toggleProgressBar = () => {
    setProgressBar(!progBar);
    setProgBar(prev => !prev);
  };

  return (
    <div className="SettingsPane">
      <h4>Session Time Delays (seconds)</h4>
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
      <h4 style={{width: "calc(100% - 50px)", float: "left", marginTop: "32px"}}>Session Progress Bar</h4>
      <SSwitch
        checked={progBar}
        onChange={toggleProgressBar}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
        {...(visible === false && { tabIndex: "-1" })}
      />
    </div>
  );
};

export default TrainingSettingsPane;
