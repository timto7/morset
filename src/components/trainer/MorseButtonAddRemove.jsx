import React from "react";
import "./MorseButtonAddRemove.css";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import AddIcon from "@material-ui/icons/AddCircle";

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
      {selected ? <RemoveIcon /> : <AddIcon />}
    </div>
  );
};

export default MorseButtonAddRemove;
