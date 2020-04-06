import React, { useContext, useState, useEffect } from "react";
import "./MorseTextEntry.css";

const MorseTextEntry = ({show}) => {

  useEffect(() => {

    if (show) {
      document.body.classList.add('block-scroll'); 
    } else {
      document.body.classList.remove('block-scroll'); 
    }
  }, [show])

  return (
    <div id="MorseTextEntry" class={show && "show"}>
      <div><span>Options</span></div>
      <div id="MorseTextEntryTFContainer">
        <textarea placeholder="Enter text here..." />
      </div>
    </div>
  );
};

export default MorseTextEntry;
