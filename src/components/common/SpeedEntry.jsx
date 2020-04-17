import React, { useState, useContext } from "react";
import "./SpeedEntry.css";
import OverallSpeedInput from "./Input.jsx";
import CharSpeedInput from "./Input.jsx";
import AudioContext from "../../context/AudioContext";

const TABKEY = 0;

export default function SpeedEntry() {
  const { setSpeed, getSpeed } = useContext(AudioContext);
  const initialSpeeds = getSpeed();
  const [overallSpeed, setOverallSpeed] = useState(initialSpeeds[0]);
  const [charSpeed, setCharSpeed] = useState(initialSpeeds[1]);

  const validateOverall = val => {
    val = parseInt(Number(val));
    if (Number.isNaN(val)) return 15;
    if (val < 1) return 1;
    return val;
  };

  const validateChar = val => {
    val = parseInt(Number(val));
    if (Number.isNaN(val)) return 18;
    if (val < 1) return 1;
    return val;
  };
  
  const handleOverallInputChange = event => {
    setOverallSpeed(event.target.value);
  };

  const handleOverallInputKeyDown = event => {
    if (event.key === "Enter" || event.keyCode === TABKEY) {
      submitOverallInputValue(validateOverall(event.target.value));
    }
  };

  const handleOverallInputBlur = event => {
    submitOverallInputValue(validateOverall(overallSpeed));
  };

  const submitOverallInputValue = v => {
    v = validateOverall(overallSpeed);
    setOverallSpeed(v);
    if (overallSpeed > charSpeed) setCharSpeed(overallSpeed);
    setSpeed(v, overallSpeed > charSpeed ? v : charSpeed);
  };

  const handleCharInputChange = event => {
    setCharSpeed(event.target.value);
  };

  const handleCharInputKeyDown = event => {
    if (event.key === "Enter" || event.keyCode === TABKEY) {
      submitCharInputValue(validateChar(event.target.value));
    }
  };

  const handleCharInputBlur = event => {
    submitCharInputValue(validateOverall(overallSpeed));
  };

  const submitCharInputValue = v => {
    v = validateChar(charSpeed);
    setCharSpeed(v);
    if (charSpeed < overallSpeed) setOverallSpeed(charSpeed);
    setSpeed(charSpeed < overallSpeed ? v : overallSpeed, v);
  };

  return (
    <div className="SpeedEntry">
      <OverallSpeedInput 
        id="overallSpeedInput"
        onChange={handleOverallInputChange}
        value={overallSpeed}
        onBlur={handleOverallInputBlur}
        onKeyDown={handleOverallInputKeyDown}
        prompt="overall / character speed" 
      />
      <span className="speedEntrySlash">/</span>
      <CharSpeedInput 
        id="charSpeedInput"
        onChange={handleCharInputChange}
        value={charSpeed}
        onBlur={handleCharInputBlur}
        onKeyDown={handleCharInputKeyDown}
      />
  </div>
  );
}
