import React from "react";
import "./IconButton.css";

export default function Switch(props) {
  const Icon = props.icon;
  
  let tooltip;
  if (props.tooltip) {
    tooltip = <div className="icnBtnToolTip">{props.tooltip}</div>;
  }

  return (
    <button
      className={
        `IconButton ${props.disabled ? "disabled" : ""} ${props.size === "large" && "large"}`
      }
      onClick={props.onClick}
      {...(props.tabentry === false && { tabIndex: "-1" })}
    >
      <div className="icnBtnBG" />
      <Icon className={`icnBtnIcon`} />
      {tooltip}
    </button>
  );
}
