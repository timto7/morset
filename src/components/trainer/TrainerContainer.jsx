import React, { useState, useContext, useEffect} from "react";
import "./TrainerContainer.css";
import Launcher from "./TrainerLauncher";
import MorseSelection from "./MorseSelectionContainer";
import TrainerSessionContainer from "./TrainerSessionContainer";
import AudioContext from "../../context/AudioContext";
import Composer from "../../services/trainer/composer";
import SessionReviewContainer from "./SessionReviewContainer";

let noChars = false;
let doNotMark = false;
let restartRequired = false;

let latestComposition = {script: "", totalDuration: 0};
let latestAnswer = "";

const TrainerContainer = () => {
  document.title = "MorseT - Trainer";

  const [state, setState] = useState({
    selectedChars: "",
    source: 0,
    inSession: false,
    showResults: false,
  });

  const keyPress = event => {
    if (event.keyCode === 27) {
     stop();
     doNotMark = true;
     setState(prevState => ({ ...prevState, inSession: false, showResults: false }));
    }
    if ((event.ctrlKey || event.metaKey) && event.which === 13) {
      if (state.inSession === false) {
        beginSession();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress, false);
    return () => {
      document.removeEventListener("keydown", keyPress, false);
    };
  });

  useEffect(() => {
    if (restartRequired) {
      restartRequired = false;
      beginSession();
    }
  }, [state.showResults])

  useEffect(() => {
    if (state.inSession || state.showResults) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [state.inSession, state.showResults])

  const { 
    play, 
    stop, 
    isPlaying,
    getPreDelay, 
    getPostDelay, 
    getSessionCharAmount, 
    getRandomSpacing, 
    getCharSpacing,
    getSpeed
  } = useContext(AudioContext);

  noChars = state.selectedChars.length > 0 ? false : true;

  function selectedCharsDidChange(chars) {
    setState(prevState => ({ ...prevState, selectedChars: chars }));
  }

  function beginWasClicked() {
    beginSession();
  }

  function beginSession() {
    if (isPlaying() === false) {
      setState(prevState => ({ ...prevState, inSession: true, showResults: false }));
      latestAnswer = "";
      const speeds = getSpeed();
      latestComposition = Composer.createScriptFromChars(state.selectedChars, 
      {
        randomSpacing: getRandomSpacing(), 
        charSpacing: getCharSpacing(),
        durationType: 1,
        charLimit: getSessionCharAmount(),
        overallSpeed: speeds[0],
        charSpeed: speeds[1]
      });
      play(latestComposition.script, playbackFinished, {
        "preDelay": parseFloat(getPreDelay()),
        "postDelay": parseFloat(getPostDelay())
      });
    }
  }

  const answerDidChange = event => {
    latestAnswer = event.target.value;
  }

  function playbackFinished() {
    if (doNotMark === false) {
      setState(prevState => ({ ...prevState, showResults: true }));
      setState(prevState => ({ ...prevState, inSession: false }));
    }
    if (restartRequired === true) {
      beginSession();
    }
    doNotMark = false;
    restartRequired = false;
  }

  function abortClicked() {
    stop();
    doNotMark = true;
    setState(prevState => ({ ...prevState, inSession: false }));
  }

  function restartClicked() {
    stop();
    doNotMark = true;
    restartRequired = true;
    setState(prevState => ({ ...prevState, inSession: false }));
  }

  function closeResultsClicked() {
    setState(prevState => ({ ...prevState, showResults: false }));
  }

  function retryClicked() {
    restartRequired = true;
    setState(prevState => ({ ...prevState, showResults: false}));
  }

  return (
    <div id="TrainerContainer" className={`${state.inSession ? "inSession" : ""}`}>
      <div id="TrainerConfigContent" className={`${state.inSession ? "inSession" : ""} ${state.showResults ? "showingResults" : ""}`}>
      <Launcher noChars={noChars} beginWasClicked={() => beginWasClicked()} />
      <MorseSelection
        selectedChars={state.selectedChars}
        selectedCharsDidChange={selectedCharsDidChange}
        beginWasClicked={beginWasClicked}
      />
      </div>
      <SessionReviewContainer visible={state.showResults} latestScript={latestComposition.script} latestAnswer={latestAnswer} closeResultsClicked={() => closeResultsClicked()} retryClicked={() => retryClicked()} />
      <TrainerSessionContainer inSession={state.inSession} abortClicked={() => abortClicked()} restartClicked={() => restartClicked()} didChangeText={answerDidChange} totalDuration={latestComposition.totalDuration + parseFloat(getPostDelay())} startDelay={parseFloat(getPreDelay())} />
    </div>
  );
};

export default TrainerContainer;
