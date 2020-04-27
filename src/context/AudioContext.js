import React from "react";
import Morse from "../services/morse/morse-player";
import ReviewSounds from "../services/trainer/review-sounds";

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

export function getValidWaveform(wf) {
  wf = parseInt(wf);
  if (wf === null || wf === undefined || Number.isNaN(wf)) {
    return 0;
  } else if (wf > 2) {
    return 2;
  } else if (wf < 0) {
    return 0;
  }
  return wf;
}

export function getValidSessionSource(s) {
  s = parseInt(s);
  if (s === null || s === undefined || Number.isNaN(s)) {
    return 0;
  } else if (s > 1) {
    return 1;
  } else if (s < 0) {
    return 0;
  }
  return s;
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

  const storedWf = parseInt(window.localStorage.getItem("waveform"));
  const initialWf = getValidWaveform(storedWf);
  Morse.setWaveform(initialWf);

  const play = (string, callback = undefined, timingOptions = undefined) => {
      Morse.play(string, callback, timingOptions);
  };

  const playText = (string, callback = undefined, timingOptions = undefined) => {
    Morse.playText(string, callback, timingOptions);
  };

  const setVolume = volume => {
    Morse.setVolume(volume);
    ReviewSounds.setVolume(volume);
  };

  const setFrequency = freq => {
    Morse.setFrequency(freq);
  };

  const setPanning = panning => {
    const panningScale = panning / 100.0;
    Morse.setPanning(panningScale);
    ReviewSounds.setPanning(panning);
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
    Morse.setSpeed(parseInt(overall), parseInt(char));
    window.localStorage.setItem("overallSpeed", parseInt(overall));
    window.localStorage.setItem("charSpeed", parseInt(char));
  };

  const getSpeed = () => {
    let os = parseInt(window.localStorage.getItem("overallSpeed"));
    if (os === null || os === undefined || Number.isNaN(os)) os = parseInt(15);
    let cs = parseInt(window.localStorage.getItem("charSpeed"));
    if (cs === null || cs === undefined || Number.isNaN(cs)) cs = parseInt(18);
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

  const getProgressBar = () => {
    let pb = window.localStorage.getItem("progressBar");
    if (pb === null || pb === undefined) pb = "true";
    return pb === "true";
  }
  
  const setProgressBar = pb => {
    window.localStorage.setItem("progressBar", pb);
  }

  const getReviewSounds = () => {
    let rs = window.localStorage.getItem("reviewSounds");
    if (rs === null || rs === undefined) rs = "true";
    return rs === "true";
  }
  
  const setReviewSounds = rs => {
    window.localStorage.setItem("reviewSounds", rs);
  }
  
  const getWaveform = () => {
    const wf = getValidWaveform(window.localStorage.getItem("waveform"));
    return wf;
  }

  const setWaveform = wf => {
    wf = getValidWaveform(wf);
    window.localStorage.setItem("waveform", wf);
    Morse.setWaveform(wf);
  }

  const getSessionSource = () => {
    let ss = getValidSessionSource(window.localStorage.getItem("sessionSource"));
    return ss;
  }

  const setSessionSource = ss => {
    window.localStorage.setItem("sessionSource", ss);
  }

  const getTextEntryString = () => {
    let es = window.localStorage.getItem("textEntryString");
    if (es === null || es === undefined) es = "";
    es = es.toString().toLowerCase();
    return es;
  }

  const setTextEntryString = es => {
    window.localStorage.setItem("textEntryString", es.toString().toLowerCase());
  }

  const getFullTextMode = () => {
    let ft = parseInt(window.localStorage.getItem("fullTextMode"));
    if (ft === null || ft === undefined || Number.isNaN(ft) || ft < 0 || ft > 1) ft = 0;
    return ft;
  }
  
  const setFullTextMode = ft => {
    window.localStorage.setItem("fullTextMode", ft);
  }

  const getTextLineLimit = () => {
    let lm = parseInt(window.localStorage.getItem("textLineLimit"));
    if (lm === null || lm === undefined || Number.isNaN(lm) || lm < 1) lm = 1;
    return lm;
  }

  const setTextLineLimit = lm => {
    window.localStorage.setItem("textLineLimit", parseInt(lm));
  }

  const playReviewSound = soundId => {
    ReviewSounds.playSound(soundId);
  }

  return (
    <AudioContext.Provider
      value={{
        play,
        playText,
        stop,
        setVolume,
        setFrequency,
        setPanning,
        setEnvelope,
        isPlaying,
        setSpeed,
        getSpeed,
        getWaveform,
        setWaveform,
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
        setSessionTimeLimit,
        getProgressBar,
        setProgressBar,
        getReviewSounds,
        setReviewSounds,
        getSessionSource,
        setSessionSource,
        getTextEntryString,
        setTextEntryString,
        getFullTextMode,
        setFullTextMode,
        getTextLineLimit,
        setTextLineLimit,
        playReviewSound
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
