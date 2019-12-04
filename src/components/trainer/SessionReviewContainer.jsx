import React, {useEffect} from "react";
import "./SessionReviewContainer.css";
import Marker from "../../services/trainer/marker";

let overallScore, noOfErrors, charBreakdown, latestResults, scriptText, resultText;

const SessionReviewContainer = ({latestScript, latestAnswer, visible}) => {

  useEffect(() => {
    latestResults = Marker.getResult(latestScript, latestAnswer.trim().toLowerCase());
    noOfErrors = latestResults.errors;
    overallScore = Math.floor((((latestScript.length - noOfErrors) > 0 ? latestScript.length - noOfErrors : 0) / latestScript.length) * 100);
    console.log("\nnumber of misses: ", noOfErrors);
    console.log("overall score: ", overallScore);
    console.log(`${latestScript}\n${latestAnswer}`);
    scriptText = latestScript.split("").map((c, index) =>
      <span key={index} className={`${latestResults.errorPlacements.charAt(index) === "-" ? "erroneous" : ""}`}>{c}</span>
    );
    resultText = latestAnswer.split("").map((c, index) =>
      <span key={index} className={`${latestResults.errorPlacements2.charAt(index) === "-" ? "erroneous" : ""}`}>{c}</span>
    );
  }, [visible]);


  return (
    <div
      id="SessionReviewContainer"
      className={`${visible ? "visible" : ""}`}
    >
      <div id="sessionReviewContent">
        <div id="sessionReviewHeader"><p>{overallScore}%</p><p>{noOfErrors} error{noOfErrors === 1 ? "" : "s"}</p></div>
        <div id="sessionReviewStatsPanel"></div>
        <div id="sessionReviewComparisonPanel">
          <div>{scriptText}</div>
          <div>{resultText}</div>
          </div>
      </div>
    </div>
  );
};

export default SessionReviewContainer;
