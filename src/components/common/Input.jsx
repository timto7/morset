import React, { useState } from "react";
import "./Input.css";

export default function Input(props) {

  const [triggerRipple, setTriggerRipple] = useState(false);
  const [initVal, setInitVal] = useState(false);

  const handleFocus = event => {
    if (props.autoHighlight === true) {
      event.target.select();
    }
    setTriggerRipple(false);
    setInitVal(event.target.value);
  };

  const keyPress = event => {
    if (event.key === "Enter") {
      event.target.blur();
      setTriggerRipple(true);
    }
  };

  const blurred = event => {
    if (event.target.value !== initVal) {
      setTriggerRipple(true);
    }
  };

  return (
    <div className="Input">
      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={event => {
          if (props.onBlur !== undefined) {
            props.onBlur(event);
          }
          blurred(event);
        }}
        type="number"
        onFocus={handleFocus}
        onKeyDown={event => {
          if (props.onKeyDown !== undefined) {
            props.onKeyDown(event);
          }
          keyPress(event);
        }}
        {...(props.tabentry === false && { tabIndex: "-1" })}
      />
      <div className="inputBorderHighlight" />
      <div className="entryRipple" style={triggerRipple === true ? {animation: "inputRipple .3s ease"} : {}}/>
      <span className="InputPrompt">{props.prompt}</span>
    </div>
  );
}
