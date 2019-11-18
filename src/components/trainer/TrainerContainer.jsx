import React, { useState } from "react";
import "./TrainerContainer.css";
import Launcher from "./TrainerLauncher";
import MorseSelection from "./MorseSelectionContainer";
import TrainerSessionContainer from "./TrainerSessionContainer";
import Marker from "../../services/trainer/marker";
import Composer from "../../services/trainer/composer";

let noChars = false;

const TrainerContainer = () => {
  document.title = "MorseT - Trainer";

  const [state, setState] = useState({
    selectedChars: "km",
    source: 0,
    inSession: false
  });

  noChars = state.selectedChars.length > 0 ? false : true;

  function selectedCharsDidChange(chars) {
    setState(prevState => ({ ...prevState, selectedChars: chars }));
  }

  function beginWasClicked() {
    console.log("dude");
    setState(prevState => ({ ...prevState, inSession: true }));
  }

  return (
    <div id="TrainerContainer">
      <Launcher noChars={noChars} beginWasClicked={() => beginWasClicked()} />
      <MorseSelection
        selectedChars={state.selectedChars}
        selectedCharsDidChange={selectedCharsDidChange}
        beginWasClicked={beginWasClicked}
      />
      <TrainerSessionContainer inSession={state.inSession} />
    </div>
  );
};

export default TrainerContainer;
