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

let latestScript = "";
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

  const { play, stop, isPlaying} = useContext(AudioContext);

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
      latestScript = Composer.createScriptFromChars(state.selectedChars);
      play(latestScript, playbackFinished, {
        "preDelay": 0.5,
        "postDelay": 1.5
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
      
      <SessionReviewContainer visible={state.showResults} latestScript={latestScript} latestAnswer={latestAnswer} closeResultsClicked={() => closeResultsClicked()} retryClicked={() => retryClicked()}/>
      <TrainerSessionContainer inSession={state.inSession} abortClicked={() => abortClicked()} restartClicked={() => restartClicked()} didChangeText={answerDidChange} />
    </div>
  );
};

export default TrainerContainer;
