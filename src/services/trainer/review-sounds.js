import FlawlessSound from "../../audio/Flawless.mp3";
import GoodSound from "../../audio/Good.mp3";
import NotGoodSound from "../../audio/NotGood.mp3";

const sounds = [FlawlessSound, GoodSound, NotGoodSound];

const ReviewAudioContext = window.AudioContext || window.webkitAudioContext;
const reviewAudioContext = new ReviewAudioContext();
let reviewAudioFile, track;

let vol = parseFloat(Math.pow(window.localStorage.getItem("volume") / 100.0, 2.0));
let pan = parseFloat(Math.pow(window.localStorage.getItem("stereo") / 100.0, 2.0));

const gainNode = reviewAudioContext.createGain();
gainNode.gain.value = vol;

const pannerOptions = {pan: pan};
const panner = new StereoPannerNode(reviewAudioContext, pannerOptions);

export function playSound(x) {
  reviewAudioFile = new Audio(sounds[x]);
  track = reviewAudioContext.createMediaElementSource(reviewAudioFile);
  track.connect(gainNode).connect(panner).connect(reviewAudioContext.destination);
  reviewAudioFile.play();
}

export function setVolume(volume) {
  vol = parseFloat(Math.pow(volume / 100.0, 2.0));
  gainNode.gain.value = vol;
}

export function setPanning(panning) {
  let pan = parseFloat(panning / 100.0);
  panner.pan.value = pan;
}

export default {
  playSound,
  setVolume,
  setPanning
};