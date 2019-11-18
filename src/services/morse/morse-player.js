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
  envelopeTime = 0.002,
  playing = false,
  envelope = true;

setSpeed(10, 18);

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
    oscillator.type = "sine";
    oscillator.frequency.value = toneFreq;

    let morseGain = audioCtx.createGain();
    morseGain.gain.setValueAtTime(0.0, t);

    t += 0.05; // To prevent initial pop

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

    oscillator.connect(morseGain);
    morseGain.connect(panner);
    panner.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(t);
  }
};

export function play(str, callback = undefined) {
  if (!morsetrans.isValidMorse(str)) {
    str = morseTranslation.translateTextToMorse(str);
  }
  runAudiofy(str, callback);
}

export function playMorse(morse, callback = undefined) {
  if (morsetrans.isValidMorse(morse)) {
    runAudiofy(morse, callback);
  } else {
    if (callback) callback();
    return;
  }
}

export function playText(text, callback = undefined) {
  text = morseTranslation.translateTextToMorse(text);
  runAudiofy(text, callback);
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
    (60 * charSpeed - 37.2 * overallSpeed) / (overallSpeed * charSpeed);
  pauseLength = (3 * farns) / 19;
  spaceLength = (7 * farns) / 19;
}

export function setVolume(vol) {
  masterGain.gain.setValueAtTime(
    Math.pow(vol / 100.0, 2.0),
    audioCtx.currentTime
  );
}

export function getVolume() {
  return masterGain.gain.value * 100;
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
  getVolume,
  setFrequency,
  setPanning,
  setEnvelope,
  isPlaying
};
