import React from "react";
import "./SessionButton.css";

const SessionButton = ({Icon, label, actionType, onClick}) => {

  let actnType = "";
  switch(actionType) {
    case "abort":
      actnType = "abort";
      break;
    case "restart":
      actnType = "restart";
      break;
    case "go":
      actnType = "go";
      break;
    default:
      break;
  }

  return (
    <div className={`sessionButton ${actnType}`} onClick={onClick}>
        <Icon className={"sessionButtonIcon"} /><span>{label}</span>
    </div>
  );
};

export default SessionButton;
