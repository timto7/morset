import React from "react";
import "./Input.css";

export default function Input(props) {

  const handleFocus = event => {
    if (props.autoHighlight === true) {
      event.target.select();
    }
  };

  return (
    <div className="Input">
      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type="number"
        onFocus={handleFocus}
        onKeyDown={props.onKeyDown}
      />
      <div className="inputBorderHighlight"></div>
      <span className="InputPrompt">{props.prompt}</span>
    </div>
  );
}
