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
    fontSize: "14px",
    fontWeight: "400",
    margin: "none",
    marginRight: "12px",
    height: "32px",
    width: "150px",
    marginTop: "auto",
    marginBottom: "4px",
    padding: "none",
    justifyContent: "center",
    borderRadius: "16px"
  },
  selectEmpty: {}
}));

const validateSpacing = val => {
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
  
  const [show, setShow] = useState(false);

  const initialCharSpacing = getCharSpacing();
  const [spacing, setSpacing] = useState(initialCharSpacing);
  
  const initialRandomSpacing = getRandomSpacing();
  const [random, setRandom] = useState(initialRandomSpacing);

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
        style={show ? {backgroundColor: "rgba(52, 152, 219, 0.5)"} : {}}
      >
        <span>Spacing: {random ? "Random" : getCharSpacing()}</span>
      </SpacingButton>
      <div id="spacingPopover" className={`${show ? "show" : ""} ${!random ? "notRandom" : ""}`}>
        <div id="spacingSegmentTop">
          <span className="text">Random Spacing</span>
          <RandomSwitch 
            checked={random}
            onChange={toggleRandom}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }} />
        </div>
        <div id="spacingSegmentBottom" className={`${!random ? "notRandom" : ""}`}>
          <span>spacing:</span>
          <SpacingInput
            onChange={handleCharSpacingInputChange}
            value={spacing}
            onBlur={handleCharSpacingInputBlur}
            onKeyDown={handleCharSpacingInputKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default SpacingSelectionContainer;