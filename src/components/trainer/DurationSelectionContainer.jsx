import React, { useState, useRef, useContext } from "react";
import "./DurationSelectionContainer.css";
import DurationButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useOutsideClick from "../../services/useOutsideClick";
import AudioContext from "../../context/AudioContext";
import Button from "@material-ui/core/Button";
import DurationTypeBtnGrp from "@material-ui/core/ButtonGroup";
import Input from "../common/Input";
import ThemeContext from "../../context/ThemeContext";

const useStyles = makeStyles(theme => ({
  button: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important"
    },
    textTransform: "none",
    fontSize: "13px",
    margin: "none",
    marginRight: "12px",
    marginBottom: "20px",
    height: "32px",
    width: "auto",
    maxWidth: "400px",
    marginTop: "auto",
    padding: "none",
    justifyContent: "center",
    borderRadius: "16px",
    fontWeight: "500",
    lineHeight: "12px"
  },
  grpButtonContainer: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important"
    },
    marginTop: "4px",
    borderRadius: "6px",
    border: "1px solid rgba(127, 127, 127, 0.23)"
  },
  grpButton: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important"
    },
    width: "130px",
    height: "28px",
    fontWeight: "600",
    letterSpacing: "1px",
    margin: "0px",
    border: "none",
    lineHeight: "17px"
  },
  selectEmpty: {}
}));

const validateCharAmount = val => {
  val = Number.parseInt(val);
  if (Number.isNaN(val)) return 50;
  if (val < 1) return 1;
  return val;
};

const validateTimeLimit = val => {
  val = Number.parseFloat(val);
  if (Number.isNaN(val)) return 1.0;
  if (val <= 0.0) return 1.0;
  return val;
};

const DurationSelectionContainer = () => {

  const { 
    getDurationMode,
    setDurationMode,
    getSessionTimeLimit,
    setSessionTimeLimit,
    getSessionCharAmount,
    setSessionCharAmount
  } = useContext(AudioContext);

  const { dark } = useContext(ThemeContext);

  const intialCharAmount = getSessionCharAmount();
  const [charAmount, setCharAmount] = useState(intialCharAmount);

  const handleCharAmountInputChange = event => {
    setCharAmount(event.target.value);
  };

  const handleCharAmountInputKeyDown = event => {
    if (event.key === "Enter") {
      submitCharAmountInputValue(event.target.value);
    }
  };

  const handleCharAmountInputBlur = event => {
    submitCharAmountInputValue(validateCharAmount(charAmount));
  };

  const submitCharAmountInputValue = v => {
    v = validateCharAmount(charAmount);
    setSessionCharAmount(v);
    setCharAmount(v);
  };


  const initialTimeLimit = getSessionTimeLimit();
  const [timeLimit, setTimeLimit] = useState(initialTimeLimit);

  const handleTimeLimitInputChange = event => {
    setTimeLimit(event.target.value);
  };

  const handleTimeLimitInputKeyDown = event => {
    if (event.key === "Enter") {
      submitTimeLimitInputValue(event.target.value);
    }
  };

  const handleTimeLimitInputBlur = event => {
    submitTimeLimitInputValue(validateTimeLimit(timeLimit));
  };

  const submitTimeLimitInputValue = v => {
    v = validateTimeLimit(timeLimit);
    setSessionTimeLimit(v);
    setTimeLimit(v);
  };

  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });
  

  const initDurationMode = parseInt(getDurationMode());
  const [durationType, setDurationType ] = useState(initDurationMode);

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  function btnTimeLimitClicked() {
    setDurationType(0);
    setDurationMode(0);
    submitCharAmountInputValue(validateCharAmount(charAmount));
  }

  function btnCharLimitClicked() {
    setDurationType(1);
    setDurationMode(1);
    submitTimeLimitInputValue(validateTimeLimit(timeLimit));
  }

  const classes = useStyles();

  return (
    <div id="DurationSelectionContainer" ref={ref}>
      <DurationButton
        id="durationBtn"
        variant="outlined"
        className={classes.button}
        onClick={toggleShow}
        style={show ? {backgroundColor: "#3ea6ff", border: "1px solid #3ea6ff", ...!dark ? {color: "#fff"} : {color: "#000"}} : {}}
      >
        <span>{`Session Duration: ${durationType === 0 ? `${getSessionTimeLimit()} minute${getSessionTimeLimit() === 1 ? '' : 's'}` : 
        `${getSessionCharAmount()} character${getSessionCharAmount() === 1 ? '' : 's'}`}`}</span>
      </DurationButton>
      <div id="durationPopover" className={`${show ? "show" : ""}`}>
        <div id="durationSegmentTop">
        <DurationTypeBtnGrp 
          aria-label="text primary button group"
          className={classes.grpButtonContainer}
          style={{border: "1px solid #3ea6ff"}}
        >
          <Button 
            variant={durationType === 0 ? "contained" : "text"}
            style={durationType === 0 ? {backgroundColor: "#3ea6ff", ...!dark ? {color: "#fff"} : {color: "#000"}} : {color: "#3ea6ff"}}
            className={classes.grpButton} 
            onClick={btnTimeLimitClicked}>Time</Button>
          <Button 
            variant={durationType === 1 ? "contained" : "text"} 
            style={durationType === 1 ? {backgroundColor: "#3ea6ff", ...!dark ? {color: "#fff"} : {color: "#000"}} : {color: "#3ea6ff"}}
            className={classes.grpButton} 
            onClick={btnCharLimitClicked}>Characters</Button>
        </DurationTypeBtnGrp>
        </div>
        <div 
          id="durationSegmentBottom"
          className={`${durationType === 0 ? "time" : "chars"}`}
        >
          <div id="timeSelectionPane">
            <span>time duration (minutes): </span>
            <Input 
              onChange={handleTimeLimitInputChange}
              value={timeLimit}
              onBlur={handleTimeLimitInputBlur}
              onKeyDown={handleTimeLimitInputKeyDown}
              tabentry={durationType === 0}
            />
          </div>
          <div id="charLimitSelectionPane">
            <span>number of characters: </span>
            <Input 
              onChange={handleCharAmountInputChange}
              value={charAmount}
              onBlur={handleCharAmountInputBlur}
              onKeyDown={handleCharAmountInputKeyDown}
              tabentry={durationType === 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSelectionContainer;
