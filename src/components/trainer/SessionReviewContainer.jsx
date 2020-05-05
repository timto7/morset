import React, {useEffect, useContext} from "react";
import "./SessionReviewContainer.css";
import CloseBtn from "./SessionButton";
import CloseIcon from "@material-ui/icons/Close";
import RetryBtn from "./SessionButton";
import RetryIcon from "@material-ui/icons/Refresh";
import Marker from "../../services/trainer/marker";
import AudioContext from "../../context/AudioContext";
import UnderConstruction from "../UnderConstruction";

let overallScore, 
  noOfErrors, 
  stats = [], 
  latestResults, 
  scriptText, 
  resultText, 
  mistakesPresent, 
  missesPresent, 
  extraPresent;

const getResultType = c => {
  let resultType;
    switch (c) {
      case "m":
        resultType="result_text result_missed";
        break;
      case "s":
        resultType="result_text result_sub";
        break;
      case "e":
        resultType="result_text result_extra";
        break;
      default:
        resultType="result_text";
        break;
    }
    return resultType;
}

const SessionReviewContainer = ({latestScript, latestAnswer, visible, closeResultsClicked, retryClicked}) => {
  
  const { playReviewSound, getReviewSounds } = useContext(AudioContext);

  useEffect(() => {
    if (visible && latestAnswer !== undefined) {
      latestAnswer = latestAnswer.replace(/(\r?\n)/gm, "");
      latestResults = Marker.getResult(latestScript, latestAnswer.trim().toLowerCase());
      stats = latestResults.stats;
      noOfErrors = latestResults.errors;
      overallScore = Math.floor((((latestScript.length - noOfErrors) > 0 ? latestScript.length - noOfErrors : 0) / latestScript.length) * 100);
      scriptText = latestScript.split("").map((c, index) =>
        <span key={index} className={`${getResultType(latestResults.errorPlacements.charAt(index))}`}>{c}</span>
      );
      resultText = latestAnswer.split("").map((c, index) =>
        <span key={index} className={`${getResultType(latestResults.errorPlacements2.charAt(index))}`}>{c}</span>
      );
      mistakesPresent = latestResults.mistakesPresent;
      missesPresent = latestResults.missesPresent;
      extraPresent = latestResults.extraPresent;
      if (getReviewSounds()) {
        if (overallScore < 90) {
          playReviewSound(2);
        } else {
          if (overallScore < 100) {
            playReviewSound(1);
          } else {
            playReviewSound(0);
          }
        }
      }
    }
  }, [visible]);

  let transcriptKey; 
  if (mistakesPresent || missesPresent) {
    transcriptKey = 
    <div className="reviewKeyContainer">
      {mistakesPresent && <div className="reviewKeyContent"><div className="keyCircle red" /><span className="keyText">mistake</span></div>}
      {missesPresent && <div className="reviewKeyContent"><div className="keyCircle yellow" /><span className="keyText">missed</span></div>}
    </div>;
  }

  let userInputKey;
  if (mistakesPresent || extraPresent) {
    userInputKey = 
    <div className="reviewKeyContainer">
      {mistakesPresent && <div className="reviewKeyContent"><div className="keyCircle red" /><span className="keyText">mistake</span></div>}
      {extraPresent && <div className="reviewKeyContent"><div className="keyCircle yellow" /><span className="keyText">extra</span></div>}
    </div>;
  }

  return (
    <div
      id="SessionReviewContainer"
      className={`${visible ? "visible" : ""}`}
    >
      <div id="reviewOptionContainer">
        <div id="reviewOptionContent">
          <CloseBtn actionType={"abort"} label="Close" Icon={CloseIcon} onClick={closeResultsClicked} />
          <RetryBtn label="Retry" Icon={RetryIcon} onClick={retryClicked} />
        </div>
      </div>
      <div id="sessionReviewContent">
        <div id="sessionReviewStatsContainer">
          <div id="sessionReviewHeader"><p>{(overallScore < 1 && Object.keys(latestResults.hits).length > 0) ? "<1" : overallScore}%</p><p>{noOfErrors} error{noOfErrors === 1 ? "" : "s"}</p></div>
          <div id="sessionReviewStatsPanel"></div>
          <table>
            <tbody>
              <tr><th></th><th>overall</th><th>hit</th><th>mistake</th><th>miss</th><th>extra</th></tr>
              {stats.map(r => (
                <tr key={r["char"]}>
                  <td>{r["char"]}</td>
                  <td>{r["overall"]}%</td>
                  <td>{r["hits"]}</td>
                  <td className={`${!r["wrong"] ? "resultTableZero" : ""}`}>{r["wrong"]}</td>
                  <td className={`${!r["misses"] ? "resultTableZero" : ""}`}>{r["misses"]}</td>
                  <td className={`${!r["extra"] ? "resultTableZero" : ""}`}>{r["extra"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="sessionTextReviewContainer">
          <div className="sessionTextReviewPanel"><p className="sessionTextReviewHeader">sent transcript</p>{transcriptKey}{scriptText}</div>
          <div className="sessionTextReviewPanel"><p className="sessionTextReviewHeader">user entry</p>{userInputKey}{resultText}</div>
          </div>
      </div>
    </div>
  );
};

export default SessionReviewContainer;
