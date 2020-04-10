import React, { useState, useContext, useEffect } from "react";
import "./MorseSelectionContainer.css";
import Panel from "./MorseSelectionPanel";
import { makeTranslatedObject } from "../../services/morse/morse-translation";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CharStepper from "../common/Stepper";
import SpacingContainer from "./SpacingSelectionContainer";
import DurationContainer from "./DurationSelectionContainer";
import MorseSnackBar from "../common/MorseSnackBar";
import Button from "../common/IconButton";
import { FiPlayCircle  as PlayIcon } from "react-icons/fi";
import { FiStopCircle  as StopIcon } from "react-icons/fi";
import * as morsetrans from "../../services/morse/morse-translation.js";
import AudioContext from "../../context/AudioContext";


const charOrder = 'kmrsuaptlowinjefyvgqzhbcdx1928374650.,=/?\'"!()&:;+-:@ÀÆĆĐĴĜŃØŠÞÜŹŻ';
let customChars = "abc";
let lastCount = 2;

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const extended = "ÀÆĆĐĴĜŃØŠÞÜŹŻ";
const punctuation = '.,?\'"!/()&:;=+-:@';

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
    marginBottom: "20px",
    fontWeight: "500"
  },
  menuItem: {
    fontWeight: "500"
  },
  selectEmpty: {}
}));

const MorseSelectionContainer = ({ selectedChars, selectedCharsDidChange, show }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    selection: 0,
    openSB: false
  });

  const {play, stop, isPlaying} = useContext(AudioContext);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    selectedCharsDidChange(charOrder.substring(0, lastCount));
  }, []);

  const handleCloseSB = () => {
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
    <div id="MorseSelectionContainer" className={show ? "show" : ""}>
      <h3>Selected Morse Characters: {selectedChars.length}</h3>
      <div id="selectionOptions">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="selection-simple" color="primary">
            char. selection
          </InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true
            }}
            value={state.selection}
            onChange={handleDropDownChange}
            inputProps={{
              name: "selection",
              id: "selection-simple"
            }}
            color="primary"
          >
            <MenuItem value={0} className={classes.menuItem}>Ordered</MenuItem>
            <MenuItem value={1} className={classes.menuItem}>Custom</MenuItem>
          </Select>
        </FormControl>
        <DurationContainer style={{paddingBottom: "20px"}} />
        <SpacingContainer style={{paddingBottom: "20px"}} />
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
      </div>
      <MorseSnackBar
        open={state.openSB}
        onClose={handleCloseSB}
      >
        <div>
          <Button 
            icon={playing ? StopIcon : PlayIcon}
            tooltip={playing ? "Stop" : "Play"}
            size={"large"}
            onClick={() => 
              {
                if (isPlaying() === false) {
                  play(morsetrans.translateTextToMorse(charOrder[lastCount - 1]), () => {
                    setPlaying(false);
                  });
                  setPlaying(true);
                } else {
                  stop();
                }
              }
            }
            {...(!state.openSB && {tabentry: false})}
          />
          <div className="msbTextContainer">
            <span className="msbTitle">Latest Addition:</span>
            <div>
              <span className="msbChar">{charOrder[lastCount - 1].toUpperCase()}</span>
              <span className="msbMorse">{morsetrans.translateTextToMorse(charOrder[lastCount - 1]).replace(/-/g, "−").replace(/\./g, "·")}</span>
            </div>
          </div>
        </div>
      </MorseSnackBar>
    </div>
  );
};

export default MorseSelectionContainer;
