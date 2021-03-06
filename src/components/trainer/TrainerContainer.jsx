import React, { useState, useContext, useEffect} from "react";
import "./TrainerContainer.css";
import Launcher from "./TrainerLauncher";
import MorseSelection from "./MorseSelectionContainer";
import TrainerSessionContainer from "./TrainerSessionContainer";
import AudioContext from "../../context/AudioContext";
import Composer from "../../services/trainer/composer";
import SessionReviewContainer from "./SessionReviewContainer";
import MorseTextEntry from "./MorseTextEntry";

let noChars = false;
let doNotMark = false;
let restartRequired = false;
let textEntryString = "";

let latestComposition = {script: "", totalDuration: 0};
let latestAnswer = "";

const TrainerContainer = () => {
  document.title = "MorseT - Trainer";

  const { 
    playText,
    stop,
    isPlaying,
    getPreDelay,
    getPostDelay,
    getDurationMode,
    getSessionTimeLimit,
    getSessionCharAmount,
    getRandomSpacing,
    getCharSpacing,
    getSpeed,
    getSessionSource,
    setSessionSource,
    getTextEntryString,
    setTextEntryString,
    getFullTextMode,
    getTextLineLimit,
    getPipeDelay,
  } = useContext(AudioContext);

  const [state, setState] = useState({
    selectedChars: "",
    source: getSessionSource(),
    inSession: false,
    showResults: false,
    textEntryIsEmpty: true
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

  noChars = state.source === 0 ? state.selectedChars.length > 0 ? false : true : state.textEntryIsEmpty;

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
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, [state.inSession, state.showResults]);

  useEffect(() => {
    textEntryString = getTextEntryString();
    if (textEntryString.length > 0) setState(prevState => ({ ...prevState, textEntryIsEmpty: false }));
  }, []);
  

  function selectedCharsDidChange(chars) {
    setState(prevState => ({ ...prevState, selectedChars: chars }));
  }

  function beginWasClicked() {
    beginSession();
  }

  function beginSession() {
    if (isPlaying() === false) {
      latestAnswer = "";
      const speeds = getSpeed();
      setState(prevState => ({ ...prevState, inSession: true, showResults: false }));
      latestComposition = state.source === 0 ? Composer.createScriptFromChars(state.selectedChars, 
      {
        randomSpacing: getRandomSpacing(),
        durationType: getDurationMode(),
        durationTime: getSessionTimeLimit(),
        charSpacing: getCharSpacing(),
        charLimit: getSessionCharAmount(),
        overallSpeed: speeds[0],
        charSpeed: speeds[1]
      }) : 
      Composer.createScriptFromTextEntry(textEntryString,
        {
          overallSpeed: speeds[0],
          charSpeed: speeds[1],
          playMode: getFullTextMode(),
          lineLimit: getTextLineLimit(),
          pipeDelay: getPipeDelay(),
        }
      );
      playText(latestComposition.scriptToPlay, playbackFinished, {
        "preDelay": parseFloat(getPreDelay()),
        "postDelay": parseFloat(getPostDelay()),
        "pipeDelay": parseFloat(getPipeDelay()),
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

  function sourceChanged(s) {
    setSessionSource(s);
    setState(prevState => ({ ...prevState, source: s}));
  }

  const handleMorseTextEntryChange = s => {
    textEntryString = s;
    setTextEntryString(s);
    if (textEntryString.length > 0 && /^[\s|]+$/.test(textEntryString)) {
      setState(prevState => ({ ...prevState, textEntryIsEmpty: true}));
    } else {
      if ((textEntryString.length === 0) !== state.textEntryIsEmpty) {
        setState(prevState => ({ ...prevState, textEntryIsEmpty: textEntryString.length === 0}));
      }
    }
  };

  return (
    <div id="TrainerContainer"
      className={`${state.inSession ? "inSession" : ""}`} 
    >
      <div id="TrainerConfigContent" 
        className={`${state.inSession ? "inSession" : ""} ${state.showResults ? "showingResults" : ""}`}
      >
        <Launcher
          noChars={noChars}
          beginWasClicked={() => beginWasClicked()}
          source={state.source}
          sourceChanged={s => sourceChanged(s)}
        />
        <MorseSelection
          selectedChars={state.selectedChars}
          selectedCharsDidChange={selectedCharsDidChange}
          beginWasClicked={beginWasClicked}
          show={state.source === 0}
          style={{...state.source === 1 && {overflow: "visible", height: "0px"}}}
          disabled={state.source === 1}
        />
        <MorseTextEntry
          show={state.source === 1}
          didChangeText={handleMorseTextEntryChange}
          inSession={state.inSession}
          source={state.source}
          inReview={state.showResults}
        />
      </div>
      <SessionReviewContainer
        visible={state.showResults}
        latestScript={latestComposition.script}
        latestAnswer={latestAnswer}
        closeResultsClicked={() => closeResultsClicked()}
        retryClicked={() => retryClicked()}
        speeds={getSpeed()}
        source={getSessionSource()}
        durationMode={getDurationMode()}
        durationTime={getSessionTimeLimit()}
        charLimit={getSessionCharAmount()}
      />
      <TrainerSessionContainer
        inSession={state.inSession}
        abortClicked={() => abortClicked()}
        restartClicked={() => restartClicked()}
        didChangeText={answerDidChange}
        totalDuration={latestComposition.totalDuration + parseFloat(getPostDelay())}
        startDelay={parseFloat(getPreDelay())}
      />
    </div>
  );
};

export default TrainerContainer;
