import morseTranslation, * as morsetrans from "./morse-translation.js";
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let oscillator = audioCtx.createOscillator();
let panner = audioCtx.createStereoPanner();
let masterGain = audioCtx.createGain();
masterGain.gain.setValueAtTime(Math.pow(0.8, 2.0), audioCtx.currentTime);

let dotLength,
  dashLength,
  pauseLength,
  spaceLength,
  toneFreq = 600,
  envelopeTime = 0.0025,
  playing = false,
  envelope = true,
  preDelay = 0,
  postDelay = 0,
  waveform = 0;

const waveforms = ["sine", "square", "triangle"];

setSpeed(15, 18);

const runAudiofy = (str, callback) => {
  if (callback) {
    audiofy(str, callback);
  } else {
    audiofy(str);
  }
};

const audiofy = (str, callback = undefined) => {

  str = morsetrans.formatMorse(str);

  if (playing === false) {
    playing = true;

    oscillator = audioCtx.createOscillator();
    oscillator.onended = function() {
      playing = false;
      if (callback !== undefined) {
        callback();
      }
    };

    let t = audioCtx.currentTime;
    oscillator.type = waveforms[waveform];
    oscillator.frequency.value = toneFreq;

    let morseGain = audioCtx.createGain();
    morseGain.gain.setValueAtTime(0.0, t);

    t += 0.05; // To prevent initial popx
    t += preDelay;

    str.split("").forEach(function(char) {
      if (char === " ") {
        t += pauseLength;
      } else if (char === "/") {
        t += spaceLength;
      } else {
        let duration;
        switch (char) {
          case ".":
            duration = dotLength;
            break;
          case "-":
            duration = dashLength;
            break;
          default:
            duration = 0;
            break;
        }
        morseGain.gain.setValueAtTime(envelope ? 0.0 : 1.0, t);
        morseGain.gain.linearRampToValueAtTime(1.0, t + envelopeTime);
        t += duration;
        morseGain.gain.setValueAtTime(envelope ? 1.0 : 0.0, t);
        morseGain.gain.linearRampToValueAtTime(0.0, t + envelopeTime);
        t += dotLength; // intra-char gap
      }
    });
    t += postDelay;

    oscillator.connect(morseGain);
    morseGain.connect(panner);
    panner.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(t);
  }
};

export function play(str, callback = undefined, timingOptions = undefined) {
  setTimingOptions(timingOptions);
  if (!morsetrans.isValidMorse(str)) {
    str = morseTranslation.translateTextToMorse(str);
  }
  runAudiofy(str, callback);
}

export function playMorse(morse, callback = undefined, timingOptions = undefined) {
  setTimingOptions(timingOptions);
  if (morsetrans.isValidMorse(morse)) {
    runAudiofy(morse, callback);
  } else {
    if (callback) callback();
    return;
  }
}

export function playText(text, callback = undefined, timingOptions = undefined) {
  setTimingOptions(timingOptions);
  text = morseTranslation.translateTextToMorse(text);
  runAudiofy(text, callback);
}

export function setTimingOptions(timingOptions) {
  if (timingOptions !== undefined) {
    if ("preDelay" in timingOptions) {
      preDelay = timingOptions["preDelay"];
    } else {
      preDelay = 0;
    }
    if ("postDelay" in timingOptions) {
      postDelay = timingOptions["postDelay"];
    } else {
      postDelay = 0;
    }
  } else {
    preDelay = postDelay = 0;
  }
}

export function stop() {
  if (playing === true) {
    oscillator.stop(audioCtx.currentTime);
  }
}

export function setSpeed(overallSpeed, charSpeed) {
  if (charSpeed < 1 || overallSpeed < 1) return;
  if (charSpeed < overallSpeed) {
    charSpeed = overallSpeed;
  }
  dotLength = 1.2 / charSpeed;
  dashLength = dotLength * 3.0;
  const farns =
    (60.0 * charSpeed - 37.2 * overallSpeed) / (overallSpeed * charSpeed);
  pauseLength = (3.0 * farns) / 19.0;
  spaceLength = (7.0 * farns) / 19.0;
  envelopeTime = 0.0025 * (1.0 / (charSpeed / 18.0));
}

export function setVolume(vol) {
  masterGain.gain.setValueAtTime(
    Math.pow(vol / 100.0, 2.0),
    audioCtx.currentTime
  );
}

export function setFrequency(freq) {
  toneFreq = freq;
  oscillator.frequency.value = toneFreq;
}

export function setPanning(panning) {
  panner.pan.value = panning;
}

export function setEnvelope(env) {
  envelope = env;
}

export function setWaveform(wf) {
  waveform = wf;
  oscillator.type = waveforms[waveform];
}

export function isPlaying() {
  return playing;
}

export default {
  play,
  playMorse,
  playText,
  stop,
  setSpeed,
  setVolume,
  setFrequency,
  setPanning,
  setEnvelope,
  isPlaying,
  setWaveform
};
