import React, { useState, useEffect } from "react";
import "./MorseSelectionContainer.css";
import Panel from "./MorseSelectionPanel";
import { makeTranslatedObject } from "../../services/morse/morse-translation";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CharStepper from "../common/Stepper";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Translator from "../../services/morse/morse-translation";
import SpacingContainer from "./SpacingSelectionContainer";
import DurationContainer from "./DurationSelectionContainer";

const charOrder = 'kmrsuaptlowinjefyvgqzhbcdx1928374650.,=/?"!()&:;+-:@ÀÆĆĐĴĜŃØŠÞÜŹŻ';
let customChars = "abc";
let lastCount = 2;

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const extended = "ÀÆĆĐĴĜŃØŠÞÜŹŻ";
const punctuation = '.,?"!/()&:;=+-:@';

const alphabetTrans = makeTranslatedObject(alphabet);
const numbersTrans = makeTranslatedObject(numbers);
const extendedTrans = makeTranslatedObject(extended);
const punctuationTrans = makeTranslatedObject(punctuation);

const storedCustomChars = window.localStorage.getItem("customChars");
if (storedCustomChars === null || storedCustomChars === undefined || typeof storedCustomChars != "string") {
  customChars = "abc";
  window.localStorage.setItem("customChars", "abc");
} else {
  customChars = storedCustomChars;
}

function getValidCount(c) {
  if (c === null || c === undefined || Number.isNaN(c)) {
    return 2;
  } else if (c < 2) {
    return 2;
  } else if (c > charOrder.length) {
    return charOrder.length;
  }
  return Number(c);
}
const storedCharCount = window.localStorage.getItem("charCount");
lastCount = getValidCount(storedCharCount);
window.localStorage.setItem("charCount", lastCount);

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    marginRight: "20px",
    marginBottom: "20px"
  },
  selectEmpty: {}
}));

const MorseSelectionContainer = ({ selectedChars, selectedCharsDidChange }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    selection: 0,
    openSB: false
  });

  useEffect(() => {
    selectedCharsDidChange(charOrder.substring(0, lastCount));
  }, []);

  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState(prevState => ({ ...prevState, openSB: false }));
  };

  const handleDropDownChange = event => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
    if (event.target.name === "selection") {
      setState(prevState => ({ selection: event.target.value }));
      selectedCharsDidChange(
        event.target.value === 0
          ? charOrder.substring(0, lastCount)
          : customChars
      );
    }
    window.localStorage.setItem("selectionMode", event.target.value);
  };

  function charCountDidChange(count) {
    if (count - lastCount === 1) {
      setState(prevState => ({ ...prevState, openSB: true }));
    } else {
      setState(prevState => ({ ...prevState, openSB: false }));
    }
    lastCount = count;
    selectedCharsDidChange(charOrder.substring(0, count));
    window.localStorage.setItem("charCount", count);
  }

  function addCustomChars(chars) {
    for (let i = 0; i < chars.length; i++) {
      if (!customChars.includes(chars.charAt(i))) {
        customChars += chars.charAt(i);
      }
    }
    selectedCharsDidChange(customChars);
    window.localStorage.setItem("customChars", customChars);
  }

  function removeCustomChars(chars) {
    for (let i = 0; i < chars.length; i++) {
      if (customChars.includes(chars.charAt(i))) {
        customChars = customChars.replace(chars.charAt(i), "");
      }
    }
    selectedCharsDidChange(customChars);
    window.localStorage.setItem("customChars", customChars);
  }

  return (
    <div id="MorseSelectionContainer">
      <h3>Selected Morse Characters: {selectedChars.length}</h3>
      <div id="selectionOptions">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="selection-simple" color="primary">
            selection
          </InputLabel>
          <Select
            value={state.selection}
            onChange={handleDropDownChange}
            inputProps={{
              name: "selection",
              id: "selection-simple"
            }}
            color="primary"
          >
            <MenuItem value={0}>Ordered</MenuItem>
            <MenuItem value={1}>Custom</MenuItem>
          </Select>
        </FormControl>
        <SpacingContainer style={{paddingBottom: "20px"}} />
        <DurationContainer style={{paddingBottom: "20px"}} />
        <CharStepper
          initialValue={lastCount}
          min={2}
          max={charOrder.length}
          prompt="characters"
          valueDidChange={charCountDidChange}
          visible={state.selection === 0 ? true : false}
        />
      </div>
      <div id="innerSelectionContainer">
        <Panel
          title="alphabet"
          columns={2}
          characters={alphabet}
          translation={alphabetTrans}
          selectedChars={selectedChars}
          custom={state.selection === 0 ? false : true}
          addCustomChars={addCustomChars}
          removeCustomChars={removeCustomChars}
        />
        <Panel
          title="numbers"
          characters={numbers}
          translation={numbersTrans}
          selectedChars={selectedChars}
          custom={state.selection === 0 ? false : true}
          addCustomChars={addCustomChars}
          removeCustomChars={removeCustomChars}
        />
        <Panel
          title="extended"
          characters={extended}
          translation={extendedTrans}
          selectedChars={selectedChars}
          custom={state.selection === 0 ? false : true}
          addCustomChars={addCustomChars}
          removeCustomChars={removeCustomChars}
        />
        <Panel
          title="punctuation"
          columns={2}
          characters={punctuation}
          translation={punctuationTrans}
          selectedChars={selectedChars}
          custom={state.selection === 0 ? false : true}
          addCustomChars={addCustomChars}
          removeCustomChars={removeCustomChars}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={state.openSB}
          autoHideDuration={4000}
          onClose={handleCloseSB}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <div id="message-id">
              Latest: <b>{selectedChars.slice(-1).toUpperCase()}</b>
              <em>
                {Translator.translateTextToMorse(selectedChars.slice(-1))
                  .replace(/-/g, "−")
                  .replace(/\./g, "·")}
              </em>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSB}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    </div>
  );
};

export default MorseSelectionContainer;
