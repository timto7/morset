import React, { useState, useContext } from "react";
import "./SpeedEntry.css";
import OverallSpeedInput from "./Input.jsx";
import CharSpeedInput from "./Input.jsx";
import AudioContext from "../../context/AudioContext";

export default function SpeedEntry() {
  const { setSpeed, getSpeed } = useContext(AudioContext);
  const initialSpeeds = getSpeed();
  const [overallSpeed, setOverallSpeed] = useState(initialSpeeds[0]);
  const [charSpeed, setCharSpeed] = useState(initialSpeeds[1]);

  const validateOverall = val => {
    val = parseInt(Number(val));
    if (Number.isNaN(val)) return 15;
    if (val < 1) return 1;
    if (val > charSpeed) setCharSpeed(validateChar(val));
    return val;
  };

  const validateChar = val => {
    val = parseInt(Number(val));
    if (Number.isNaN(val)) return 18;
    if (val < 1) return 1;
    if (val < overallSpeed) setOverallSpeed(validateOverall(val));
    return val;
  };
  
  const handleOverallInputChange = event => {
    setOverallSpeed(event.target.value);
  };

  const handleOverallInputKeyDown = event => {
    if (event.key === "Enter") {
      submitOverallInputValue(event.target.value);
    }
  };

  const handleOverallInputBlur = event => {
    submitOverallInputValue(validateOverall(overallSpeed));
  };

  const submitOverallInputValue = v => {
    v = validateOverall(overallSpeed);
    setOverallSpeed(v);
    setSpeed(v, charSpeed);
  };

  const handleCharInputChange = event => {
    setCharSpeed(event.target.value);
  };

  const handleCharInputKeyDown = event => {
    if (event.key === "Enter") {
      submitCharInputValue(event.target.value);
    }
  };

  const handleCharInputBlur = event => {
    submitCharInputValue(validateOverall(overallSpeed));
  };

  const submitCharInputValue = v => {
    v = validateChar(charSpeed);
    setCharSpeed(v);
    setSpeed(overallSpeed, v);
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
