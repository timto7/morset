import React, { useState, useRef, useContext } from "react";
import "./TextEntryModeContainer.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useOutsideClick from "../../services/useOutsideClick";
import Switch from "@material-ui/core/Switch";
import AudioContext from "../../context/AudioContext";
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
    marginTop: "4px",
    padding: "none",
    justifyContent: "center",
    borderRadius: "16px",
    fontWeight: "500",
    lineHeight: "12px"
  },
  selectEmpty: {}
}));

const validateLimit = val => {
  if (val === "") return 1;
  val = Number.parseInt(val);
  if (Number.isNaN(val)) return 1;
  if (val < 1) return 1;
  return val;
};

const TextEntryModeContainer = () => {

  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });

  const { 
    getFullTextMode,
    setFullTextMode,
    getTextLineLimit,
    setTextLineLimit
  } = useContext(AudioContext);

  const { dark } = useContext(ThemeContext);

  const initialLineLimit = getTextLineLimit();
  const [lineLimit, setLineLimit] = useState(initialLineLimit);
  
  const initialFullTextMode = getFullTextMode();
  const [textMode, setTextMode] = useState(initialFullTextMode);

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const toggleFullText = () => {
    setTextMode(textMode === 0 ? 1 : 0);
    setFullTextMode(textMode === 0 ? 1 : 0);
  };

  const handleLineLimitInputChange = event => {
    setLineLimit(event.target.value);
  };

  const handleLineLimitInputKeyDown = event => {
    if (event.key === "Enter") {
      submitLineLimitInputValue(event.target.value);
    }
  };

  const handleLineLimitInputBlur = event => {
    submitLineLimitInputValue(validateLimit(lineLimit));
  };

  const submitLineLimitInputValue = v => {
    setTextLineLimit(v);
    setLineLimit(v);
  };

  const classes = useStyles();

  return (
    <div id="textEntryModeContainer" ref={ref}>
      <Button
        id="textEntryModeBtn"
        variant="outlined"
        className={classes.button}
        onClick={toggleShow}
        style={show ? {backgroundColor: "#3ea6ff", border: "1px solid #3ea6ff", ...!dark ? {color: "#fff"} : {color: "#000"}} : {}}
      >
        <span>{textMode === 0 ? "Play the Whole Text" : getTextLineLimit() !== 1 ? `Play ${getTextLineLimit()} Random Lines From Text`: "Play a Single Random Line From Text"}</span>
      </Button>
      <div id="textEntryModePopover" className={`${show ? "show" : ""} ${textMode === 1 ? "notFullText" : ""}`}>
        <div id="teModeSegmentTop">
          <span className="text">Play the Whole Text</span>
          <Switch 
            checked={textMode === 0}
            onChange={toggleFullText}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div id="teModeSegmentBottom" className={`${textMode === 1 ? "notFullText" : ""}`}>
          <span>play</span>
          <Input
            onChange={handleLineLimitInputChange}
            value={lineLimit}
            onBlur={handleLineLimitInputBlur}
            onKeyDown={handleLineLimitInputKeyDown}
            tabentry={textMode === 1}
          /><span>random line{parseInt(lineLimit) === 1 ? '' : 's'} from text</span>
        </div>
      </div>
    </div>
  );
};

export default TextEntryModeContainer;
