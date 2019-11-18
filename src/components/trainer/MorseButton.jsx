import React, { useContext, useState } from "react";
import "./MorseButton.css";
import Button from "@material-ui/core/Button";
import AudioContext from "../../context/AudioContext";
import Speaker from "@material-ui/icons/VolumeUp";
import AddRemoveBtn from "./MorseButtonAddRemove";

const MorseButton = ({
  character,
  morse,
  selected,
  custom,
  removeChar,
  addChar
}) => {
  const { play, isPlaying } = useContext(AudioContext);
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
        style={{ padding: 0, width: "220px" }}
        onClick={() => {
          if (isPlaying() === false) {
            play(morse.replace(/−/g, "-").replace(/·/g, "."), () => {
              setPlaying(false);
            });
            setPlaying(true);
          }
        }}
        className={selected ? "selected" : ""}
      >
        <div className="morseButtonTextContainer">
          <Speaker
            className={`btnSpeaker ${playing ? "show" : ""} ${
              custom ? "custom" : ""
            }`}
          />
          <span>{character}</span>
          <span>{morse}</span>
        </div>
        <AddRemoveBtn selected={selected} onClick={() => addRemoveClicked()} />
      </Button>
    </div>
  );
};

export default MorseButton;
