import React, { useContext } from "react";
import AudioContext from "../../context/AudioContext";
import { getValidFreq, getValidStereo } from "../../context/AudioContext";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Input from "../common/Input";
import { withStyles } from "@material-ui/core/styles";
import { setEnvelope } from "../../services/morse/morse-player";

const SSlider = withStyles({
  root: { width: 180 }
})(Slider);

const SSwitch = withStyles({
  root: { marginLeft: -10 }
})(Switch);

const AudioSettingsPane = () => {
  const { setFrequency, setPanning } = useContext(AudioContext);

  const initialFreq = getValidFreq(window.localStorage.getItem("frequency"));
  const [freq, setFreq] = React.useState(initialFreq);
  setFrequency(initialFreq);
  window.localStorage.setItem("frequency", freq);

  const initialStereo = getValidStereo(window.localStorage.getItem("stereo"));
  const [stereo, setStereo] = React.useState(initialStereo);
  setPanning(initialStereo);
  window.localStorage.setItem("stereo", stereo);

  const initialEnv =
    window.localStorage.getItem("envelope") === "false" ? false : true;
  const [env, setEnv] = React.useState(initialEnv);
  setEnvelope(env);
  window.localStorage.setItem("envelope", env);

  const handleFreqSliderChange = (event, newValue) => {
    setFreq(newValue);
  };

  const handleFreqInputChange = event => {
    setFreq(event.target.value);
  };

  const handleFreqBlur = () => {
    setFreq(getValidFreq(freq));
  };

  const handleStereoSliderChange = (event, newValue) => {
    setStereo(newValue);
  };

  const handleStereoInputChange = event => {
    setStereo(event.target.value);
  };

  const handleStereoBlur = () => {
    setStereo(getValidStereo);
  };

  const toggleEnvelope = () => {
    setEnv(prev => !prev);
  };

  return (
    <div className="SettingsPane">
      <h4>Tone Frequency (Hz)</h4>
      <div className="sliderGrid">
        <SSlider
          value={freq}
          onChange={handleFreqSliderChange}
          min={200}
          max={1200}
          aria-labelledby="input-slider"
          color="primary"
        />
        <Input
          className="freqInput"
          value={freq}
          onChange={handleFreqInputChange}
          onBlur={handleFreqBlur}
        />
      </div>
      <h4>Stereo Position</h4>
      <div className="sliderGrid">
        <SSlider
          value={stereo}
          onChange={handleStereoSliderChange}
          min={-100}
          max={100}
          aria-labelledby="input-slider"
          color="primary"
        />
        <Input
          className="freqInput"
          value={stereo}
          onChange={handleStereoInputChange}
          onBlur={handleStereoBlur}
        />
      </div>
      <h4>Amplitude Envelope</h4>
      <SSwitch
        checked={env}
        onChange={toggleEnvelope}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
};

export default AudioSettingsPane;
