import React, { useState, useRef, useContext } from "react";
import "./SpacingSelectionContainer.css";
import SpacingButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useOutsideClick from "../../services/useOutsideClick";
import RandomSwitch from "@material-ui/core/Switch";
import AudioContext from "../../context/AudioContext";
import SpacingInput from "../common/Input";

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
  selectEmpty: {}
}));

const validateSpacing = val => {
  if (val === "") return 0;
  val = Number.parseInt(val);
  if (Number.isNaN(val)) return 10;
  if (val < 0) return 0;
  return val;
};

const SpacingSelectionContainer = () => {

  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });

  const { getRandomSpacing, setRandomSpacing, getCharSpacing, setCharSpacing } = useContext(AudioContext);

  const initialCharSpacing = getCharSpacing();
  const [spacing, setSpacing] = useState(initialCharSpacing);
  
  const initialRandomSpacing = getRandomSpacing();
  const [random, setRandom] = useState(initialRandomSpacing);

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const toggleRandom = () => {
    setRandom(prev => !prev);
    setRandomSpacing(!random);
  };

  const handleCharSpacingInputChange = event => {
    setSpacing(event.target.value);
  };

  const handleCharSpacingInputKeyDown = event => {
    if (event.key === "Enter") {
      submitCharSpacingInputValue(event.target.value);
    }
  };

  const handleCharSpacingInputBlur = event => {
    submitCharSpacingInputValue(validateSpacing(spacing));
  };

  const submitCharSpacingInputValue = v => {
    v = validateSpacing(spacing);
    setCharSpacing(v);
    setSpacing(v);
  };

  const classes = useStyles();

  return (
    <div id="SpacingSelectionContainer" ref={ref}>
      <SpacingButton
        id="spacingBtn"
        variant="outlined"
        className={classes.button}
        onClick={toggleShow}
        style={show ? {backgroundColor: "#3ea6ff", border: "1px solid #3ea6ff", color: "#fff"} : {}}
      >
        <span>{random ? "Insert Spaces Randomly" : getCharSpacing() !== 0 ? getCharSpacing() !== 1 ? `Insert Space Every ${getCharSpacing()} Characters`: "Insert Space After Every Character" : "Don't Insert Any Spaces"}</span>
      </SpacingButton>
      <div id="spacingPopover" className={`${show ? "show" : ""} ${!random ? "notRandom" : ""}`}>
        <div id="spacingSegmentTop">
          <span className="text">Insert Spaces Randomly</span>
          <RandomSwitch 
            checked={random}
            onChange={toggleRandom}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }} />
        </div>
        <div id="spacingSegmentBottom" className={`${!random ? "notRandom" : ""}`}>
          <span>insert space every</span>
          <SpacingInput
            onChange={handleCharSpacingInputChange}
            value={spacing}
            onBlur={handleCharSpacingInputBlur}
            onKeyDown={handleCharSpacingInputKeyDown}
            tabentry={!random}
          /><span>characters</span>
        </div>
      </div>
    </div>
  );
};

export default SpacingSelectionContainer;
