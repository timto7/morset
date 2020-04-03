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
      {selected ? <RemoveIcon style={{width: "24px", height: "24px"}}/> : <AddIcon style={{width: "24px", height: "24px"}}/>}
    </div>
  );
};

export default MorseButtonAddRemove;
