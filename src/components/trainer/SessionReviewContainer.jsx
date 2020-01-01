import React, {useEffect} from "react";
import "./SessionReviewContainer.css";
import CloseBtn from "./SessionButton";
import CloseIcon from "@material-ui/icons/Close";
import RetryBtn from "./SessionButton";
import RetryIcon from "@material-ui/icons/Refresh";
import Marker from "../../services/trainer/marker";

let overallScore, noOfErrors, stats = [], latestResults, scriptText, resultText;

const getResultType = c => {
  let resultType;
      switch (c) {
        case "m":
          resultType="result_missed";
          break;
        case "s":
          resultType="result_sub";
          break;
        case "e":
          resultType="result_extra";
          break;
        default:
          resultType="";
          break;
      }
      return resultType;
}

const SessionReviewContainer = ({latestScript, latestAnswer, visible, closeResultsClicked, retryClicked}) => {

  useEffect(() => {
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
  }, [visible]);

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
          <div id="sessionReviewHeader"><p>{overallScore}%</p><p>{noOfErrors} error{noOfErrors === 1 ? "" : "s"}</p></div>
          <div id="sessionReviewStatsPanel"></div>
          <table>
            <tbody>
              <tr><th></th><th>overall</th><th>hit</th><th>mistake</th><th>miss</th><th>extra</th></tr>
              {stats.map(r => (
                <tr key={r["char"]}><td>{r["char"]}</td><td>{r["overall"]}%</td><td>{r["hits"]}</td><td>{r["wrong"]}</td><td>{r["misses"]}</td><td>{r["extra"]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="sessionTextReviewContainer">
          <div className="sessionTextReviewPanel"><p className="sessionTextReviewHeader">sent transcript</p>{scriptText}</div>
          <div className="sessionTextReviewPanel"><p className="sessionTextReviewHeader">user entry</p>{resultText}</div>
          </div>
      </div>
    </div>
  );
};

export default SessionReviewContainer;
