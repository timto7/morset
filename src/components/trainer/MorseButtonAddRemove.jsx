import React from "react";
import "./MorseButtonAddRemove.css";
import { FiSquare as OmmittedIcon } from "react-icons/fi";
import { FiCheckSquare as AddedIcon } from "react-icons/fi";

const MorseButtonAddRemove = ({ selected, onClick }) => {
  function didClick(event) {
    event.stopPropagation();
    onClick();
  }

  return (
    <div
      className="MorseButtonAddRemove"
      onClick={event => didClick(event)}
      onMouseDown={event => {
        event.stopPropagation();
      }}
    >
      <div>
        <div className="addRemoveRipple" />
        {selected ? <AddedIcon style={{width: "24px", height: "24px"}}/> : <OmmittedIcon style={{width: "24px", height: "24px"}}/>}
      </div>
    </div>
  );
};

export default MorseButtonAddRemove;
