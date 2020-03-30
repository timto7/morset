import React, { useState } from "react";
import "./VolumeControl.css";
import VolumeBtn from "../common/IconButton";
import { getValidVol } from "../../context/AudioContext";
import { FiVolume2 as volumeHigh } from "react-icons/fi";
import { FiVolume1 as volumeLow } from "react-icons/fi";
import { FiVolumeX as volumeMute } from "react-icons/fi";
import Slider from "@material-ui/core/Slider";

const VolumeControl = ({ handleVolumeChange }) => {
  const storedVol = window.localStorage.getItem("volume");
  const initialVol = getValidVol(storedVol);
  let lastUnmutedVol = initialVol > 0 ? initialVol : 70;

  const [volume, setVolume] = useState(initialVol);
  window.localStorage.setItem("volume", volume);

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
    if (newValue > 0) {
      lastUnmutedVol = volume;
    }
    handleVolumeChange(volume);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
      handleVolumeChange(0);
    } else {
      setVolume(lastUnmutedVol);
      handleVolumeChange(lastUnmutedVol);
    }
  };

  return (
    <div className="VolumeControl">
      <VolumeBtn
        className="volCtrl noToolTip"
        icon={volume >= 50 ? volumeHigh : volume > 0 ? volumeLow : volumeMute}
        onClick={toggleMute}
      />
      <div className="volumeSliderContainer">
        <div>
          <Slider
            color="primary"
            orientation="vertical"
            min={0}
            max={100}
            value={volume}
            aria-labelledby="vertical-slider"
            onChange={handleSliderChange}
          />
        </div>
        <span id="volLabel">{volume}</span>
      </div>
    </div>
  );
};

export default VolumeControl;
