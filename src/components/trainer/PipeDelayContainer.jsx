import React, { useState, useRef, useContext } from "react";
import "./PipeDelayContainer.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useOutsideClick from "../../services/useOutsideClick";
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
  if (val === "") return 1.0;
  val = Number.parseFloat(val);
  if (Number.isNaN(val)) return 1.0;
  if (val <= 0) return 1.0;
  return val;
};

const PipeDelayContainer = () => {

  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });

  const {
    getPipeDelay,
    setPipeDelay
  } = useContext(AudioContext);

  const { dark } = useContext(ThemeContext);

  const initialLineLimit = getPipeDelay();
  const [delay, setDelay] = useState(initialLineLimit);
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const handlePipeDelayInputChange = event => {
    setDelay(event.target.value);
  };

  const handlePipeDelayInputKeyDown = event => {
    if (event.key === "Enter") {
      submitPipeDelayInputValue(event.target.value);
    }
  };

  const handlePipeDelayInputBlur = event => {
    submitPipeDelayInputValue(validateLimit(delay));
  };

  const submitPipeDelayInputValue = v => {
    setPipeDelay(v);
    setDelay(v);
  };

  const classes = useStyles();

  return (
    <div id="pipeDelayContainer" ref={ref}>
      <Button
        id="pipeDelayBtn"
        variant="outlined"
        className={classes.button}
        onClick={toggleShow}
        style={show ? {backgroundColor: "#3ea6ff", border: "1px solid #3ea6ff", ...!dark ? {color: "#fff"} : {color: "#000"}} : {}}
      >
        <span>Pipe Delay: {getPipeDelay() + ` second${getPipeDelay() !== 1.0 ? 's' : ''}`}</span>
      </Button>
      <div id="pipeDelayPopover" className={`${show ? "show" : ""}`}>
        <span>pipe (|) delay time (secs):</span>
        <Input
          onChange={handlePipeDelayInputChange}
          value={delay}
          onBlur={handlePipeDelayInputBlur}
          onKeyDown={handlePipeDelayInputKeyDown}
          tabentry={show === true}
        />
      </div>
    </div>
  );
};

export default PipeDelayContainer;
