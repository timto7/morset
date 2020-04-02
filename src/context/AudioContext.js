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

  const setSpeed = (overall, char) => {
    Morse.setSpeed(overall, char);
    window.localStorage.setItem("overallSpeed", overall);
    window.localStorage.setItem("charSpeed", char);
  };

  const getSpeed = () => {
    let os = window.localStorage.getItem("overallSpeed");
    if (os === null || os === undefined || Number.isNaN(os)) os = 15;
    let cs = window.localStorage.getItem("charSpeed");
    if (cs === null || cs === undefined || Number.isNaN(cs)) cs = 18;
    return [os, cs];
  }
  const speeds = getSpeed();
  setSpeed(speeds[0], speeds[1]);
  
  const getSessionCharAmount = () => {
    let ca = parseInt(window.localStorage.getItem("charAmount"));
    if (ca === null || ca === undefined || Number.isNaN(ca)) ca = 50;
    return ca;
  }

  const setSessionCharAmount = ca => {
    window.localStorage.setItem("charAmount", ca);
  }
  setSessionCharAmount(getSessionCharAmount());

  const getPreDelay = () => {
    let pd = window.localStorage.getItem("preDelay");
    if (pd === null || pd === undefined || Number.isNaN(pd)) pd = 0.5;
    return pd;
  }

  const setPreDelay = pd => {
    window.localStorage.setItem("preDelay", pd);
  }
  setPreDelay(getPreDelay());

  const getPostDelay = () => {
    let pd = window.localStorage.getItem("postDelay");
    if (pd === null || pd === undefined || Number.isNaN(pd)) pd = 2.0;
    return pd;
  }

  const setPostDelay = pd => {
    window.localStorage.setItem("postDelay", pd);
  }
  setPostDelay(getPostDelay());

  const getRandomSpacing = () => {
    let rs = window.localStorage.getItem("randomSpacing");
    if (window.localStorage.getItem("randomSpacing") === "false") {
      rs = false;
    } else {
      rs = true;
    }
    return rs;
  }

  const setRandomSpacing = rs => {
    window.localStorage.setItem("randomSpacing", rs);
  }
  setRandomSpacing(getRandomSpacing());

  const getCharSpacing = () => {
    let cs = parseInt(window.localStorage.getItem("charSpacing"));
    if (cs === null || cs === undefined || Number.isNaN(cs)) cs = 10;
    return cs;
  }

  const setCharSpacing = cs => {
    window.localStorage.setItem("charSpacing", cs);
  }
  setCharSpacing(getCharSpacing());

  const getDurationMode = () => {
    let dm = parseInt(window.localStorage.getItem("durationMode"));
    if (dm === null || dm === undefined || Number.isNaN(dm)) dm = 0;
    return dm;
  }

  const setDurationMode = dm => {
    window.localStorage.setItem("durationMode", dm);
  }
  setDurationMode(getDurationMode());

  const getSessionTimeLimit = () => {
    let stl = parseFloat(window.localStorage.getItem("sessionTimeLimit"));
    if (stl === null || stl === undefined || Number.isNaN(stl)) stl = 1.0;
    return stl;
  }

  const setSessionTimeLimit = stl => {
    window.localStorage.setItem("sessionTimeLimit", stl);
  }
  setSessionTimeLimit(getSessionTimeLimit());
  

  return (
    <AudioContext.Provider
      value={{
        play,
        stop,
        setVolume,
        setFrequency,
        setPanning,
        setEnvelope,
        isPlaying,
        setSpeed,
        getSpeed,
        getPreDelay,
        setPreDelay,
        getPostDelay,
        setPostDelay,
        getSessionCharAmount,
        setSessionCharAmount,
        getRandomSpacing,
        setRandomSpacing,
        getCharSpacing,
        setCharSpacing,
        getDurationMode,
        setDurationMode,
        getSessionTimeLimit,
        setSessionTimeLimit
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
