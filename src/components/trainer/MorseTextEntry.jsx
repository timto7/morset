import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import "./MorseTextEntry.css";
import AudioContext from "../../context/AudioContext";
import Button from "../common/IconButton"
import { FiTrash2 as trashIcon } from "react-icons/fi";
import MorseSnackBar from "../common/MorseSnackBar";
import TextEntryMode from "./TextEntryModeContainer";
import PipeDelay from "./PipeDelayContainer";

let binPressed = false;

const MorseTextEntry = ({show, value, didChangeText, inSession, source, inReview}) => {

  const textareaRef = useRef();
  const {getTextEntryString} = useContext(AudioContext);

  const [openSB, setOpenSB] = useState(false);

  useEffect(() => {
    if (!(binPressed || inSession || source === 0)) textareaRef.current.focus();
    binPressed = false;
    if (source === 1) window.scrollTo(0, 0);
  });

  useLayoutEffect(() => {
    if (!(binPressed || inSession || source === 0)) textareaRef.current.focus();
    binPressed = false;
  });

  useEffect(() => {
    if (show) {
      document.body.classList.add('block-scroll');
    } else {
      document.body.classList.remove('block-scroll');
    }
    if (textareaRef !== undefined && textareaRef.current.value.length < 2) {
      textareaRef.current.focus();
    }
    textareaRef.current.focus();
    textareaRef.current.value = getTextEntryString();
    return () => {
      document.body.classList.remove('block-scroll');
    }
  }, [show]);

  function clearTextBtnPressed() {
    binPressed = true;
    textareaRef.current.value = "";
    didChangeText(textareaRef.current.value);
  }

  const handleTextChange = event => {
    let s = event.target.value.toString().toLowerCase();
    if (s === "" || /^[\s0-9A-Za-z|.,_=/?"'!()&:;+-:@àæćđĵĝńøšþüźż]+$/.test(s)) {
      event.target.value = s;
    } else {
      s = s.replace(/[^\s\n\r0-9A-Za-z|.,_=/?"'!()&:;+-:@àæćđĵĝńøšþüźż]/g, "");
      event.target.value = s;
      setOpenSB(true);
    }
    didChangeText(s);
    textareaRef.current.focus();
  }

  const handleCloseSB = () => {
    setOpenSB(false);
  };

  return (
    <div id="MorseTextEntry" className={show ? "show" : ""}>
      <div id="TextEntryOptionsContainer">
        <div id="optionsSubContainer">
          <TextEntryMode />
          <PipeDelay />
        </div>
        <Button 
          icon={trashIcon}
          tooltip={"Clear"}
          onClick={clearTextBtnPressed}
        />
      </div>
      <div id="MorseTextEntryTFContainer">
        <textarea
          ref={textareaRef}
          placeholder="Enter text here..."
          value={value}
          onChange={handleTextChange}
          disabled={inSession || inReview || source === 0}
        />
      </div>
      <MorseSnackBar
        open={openSB}
        onClose={handleCloseSB}
      >
        <span style={{padding: "10px", color: "var(--text)"}}>Non-morse characters have been filtered out.</span>
      </MorseSnackBar>
    </div>
  );
};

export default MorseTextEntry;
