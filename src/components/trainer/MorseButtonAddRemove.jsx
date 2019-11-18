import React, { useState } from "react";
import "./MorseButtonAddRemove.css";

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
      {selected ? "−" : "+"}
    </div>
  );
};

export default MorseButtonAddRemove;
