import React, {useRef, useLayoutEffect} from "react";
import "./TrainerSessionContainer.css";
import AbortBtn from "./SessionButton";
import AbortIcon from "@material-ui/icons/Close";
import RefreshBtn from "./SessionButton";
import RefreshIcon from "@material-ui/icons/Refresh";

const TrainerSessionContainer = ({ abortClicked, restartClicked, inSession, didChangeText, totalDuration = 10, startDelay = 0.5,  }) => {
  const textareaRef = useRef();
  let runProgressBar = false;

  console.log("progress bar duration: " + totalDuration);

  useLayoutEffect(() => {
    if (textareaRef !== undefined) {
      textareaRef.current.focus();
      textareaRef.current.value = "";
    }
    runProgressBar = true;
  });

  return (
    <div
      id="TrainerSessionContainer"
      className={`${inSession ? "inSession" : ""}`}
    >
      <div id="sessionOptionContainer">
        <AbortBtn actionType={"abort"} label="Abort" Icon={AbortIcon} onClick={abortClicked} />
        <RefreshBtn actionType={"restart"} label="Restart" Icon={RefreshIcon} onClick={() => {
          restartClicked()
        }} />
      </div>
      <div id="sessionProgressBar"
        style={ inSession ? { transitionDuration: `${totalDuration - (totalDuration * 0.005)}s`, transitionDelay: `${startDelay}s`, width : "100%"} : {}}
      />
      <textarea ref={textareaRef} spellCheck={false} readOnly={!inSession} onChange={didChangeText} />
    </div>
  );
};

export default TrainerSessionContainer;
