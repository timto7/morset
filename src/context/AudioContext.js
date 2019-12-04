import React from "react";
import Morse from "../services/morse/morse-player";

const AudioContext = React.createContext({
  playing: false,
  play: () => {},
  stop: () => {},
  setVolume: () => {},
  setFrequency: () => {},
  setSpeed: () => {},
  setPanning: () => {},
  isPlaying: () => {}
});

export default AudioContext;

export function getValidVol(v) {
  if (v === null || v === undefined || Number.isNaN(v)) {
    return 70;
  } else if (v < 0) {
    return 0;
  } else if (v > 100) {
    return 100;
  }
  return Number(v);
}

export function getValidFreq(f) {
  if (f === null || f === undefined || Number.isNaN(f)) {
    return 600;
  } else if (f < 200) {
    return 200;
  } else if (f > 1200) {
    return 1200;
  }
  return Number(f);
}

export function getValidSpeed(s) {
  if (s === null || s === undefined || Number.isNaN(s)) {
    return 15;
  } else if (s < 1) {
    return 1;
  }
  return Number(s);
}

export function getValidStereo(s) {
  if (s === null || s === undefined || Number.isNaN(s)) {
    return 0;
  } else if (s > 100) {
    return 100;
  } else if (s < -100) {
    return -100;
  }
  return Number(s);
}

export function AudioProvider(props) {
  const storedVol = window.localStorage.getItem("volume");
  const initialVol = getValidVol(storedVol);
  Morse.setVolume(initialVol);

  const storedFreq = window.localStorage.getItem("frequency");
  const initialFreq = getValidFreq(storedFreq);
  Morse.setFrequency(initialFreq);

  const storedEnv = window.localStorage.getItem("envelope");
  const initialEnv = getValidFreq(storedEnv);
  Morse.setEnvelope(initialEnv);

  const play = (string, callback = undefined, timingOptions = undefined) => {
      Morse.play(string, callback, timingOptions);
  };

  const setVolume = volume => {
    Morse.setVolume(volume);
  };

  const setFrequency = freq => {
    Morse.setFrequency(freq);
  };

  // const setSpeed = speed => {
  //   Morse.setSpeed(speed);
  // };

  const setPanning = panning => {
    const panningScale = panning / 100.0;
    Morse.setPanning(panningScale);
  };

  const setEnvelope = envelope => {
    Morse.setEnvelope(envelope);
  };

  const stop = () => {
    Morse.stop();
  };

  const isPlaying = () => {
    return Morse.isPlaying();
  };

  return (
    <AudioContext.Provider
      value={{
        play,
        stop,
        setVolume,
        setFrequency,
        setPanning,
        setEnvelope,
        isPlaying
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
