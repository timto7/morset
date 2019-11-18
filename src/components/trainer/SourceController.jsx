import React, { useState } from "react";
import MorseSelection from "./MorseSelectionContainer";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Translator from "../../services/morse/morse-translation";

const charOrder = "kmrsuaptlowinjefyvgqzhbcdx1928374650";
let charCustom = "abc";
let lastCount = 2;

const SourceController = () => {
  const [state, setState] = useState({
    selectedChars: charOrder.substring(0, 2)
  });

  function charCountDidChange(count) {
    setState({ selectedChars: charOrder.substring(0, count) });
    if (count - lastCount === 1) {
      setOpenSB(true);
    } else {
      setOpenSB(false);
    }
    lastCount = count;
  }

  function didChangeSelection(selection) {
    setState({
      source: selection,
      selectedChars:
        selection === 0 ? charOrder.substring(0, lastCount) : charCustom
    });
  }

  return (
    <div id="SourceController">
      <MorseSelection
        selectedChars={state.selectedChars}
        charCountDidChange={charCountDidChange}
        didChangeSelection={didChangeSelection}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={openSB}
        autoHideDuration={4000}
        onClose={handleCloseSB}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <div id="message-id">
            Latest: <b>{state.selectedChars.slice(-1).toUpperCase()}</b>
            <em>
              {Translator.translateTextToMorse(state.selectedChars.slice(-1))
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
  );
};

export default SourceController;
