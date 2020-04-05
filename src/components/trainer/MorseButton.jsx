import React, { useContext, useState } from "react";
import "./MorseButton.css";
import Button from "@material-ui/core/Button";
import AudioContext from "../../context/AudioContext";
import { FiVolume2 as Speaker } from "react-icons/fi";
import AddRemoveBtn from "./MorseButtonAddRemove";

const MorseButton = ({
  character,
  morse,
  selected,
  custom,
  removeChar,
  addChar
}) => {
  const {play, stop, isPlaying} = useContext(AudioContext);
  const [playing, setPlaying] = useState(false);

  function addRemoveClicked() {
    if (selected) {
      removeChar(character);
    } else {
      addChar(character);
    }
  }

  return (
    <div className={`MorseButton ${custom ? "custom" : ""}`}>
      <Button
        style={{ padding: "0px",
          height: "30px",
          width: "200px",
          borderRadius: "6px",
          ...playing && {backgroundColor: "#77777722"}
        }}
        onClick={() => {
          if (isPlaying() === false) {
            play(morse.replace(/−/g, "-").replace(/·/g, "."), () => {
              setPlaying(false);
            });
            setPlaying(true);
          } else {
            stop();
          }
        }}
        className={selected ? "selected" : ""}
      >
        <div className="morseButtonTextContainer">
          <AddRemoveBtn selected={selected} onClick={() => addRemoveClicked()} />
          <span>{character}</span>
          <span>{morse}</span>
          <Speaker
            className={`btnSpeaker ${playing ? "show" : ""} ${
              custom ? "custom" : ""
            }`}
          />
        </div>
      </Button>
    </div>
  );
};

export default MorseButton;
