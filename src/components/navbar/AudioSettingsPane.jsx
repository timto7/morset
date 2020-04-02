import React, { useContext, useState } from "react";
import AudioContext from "../../context/AudioContext";
import { getValidFreq, getValidStereo } from "../../context/AudioContext";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Input from "../common/Input";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { setEnvelope } from "../../services/morse/morse-player";
import BtnGrp from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const SSlider = withStyles({
  root: { width: 180 }
})(Slider);

const SSwitch = withStyles({
  root: { 
    marginLeft: -10,
    marginTop: "23px"
  }
})(Switch);

const useStyles = makeStyles(theme => ({
  grpButtonContainer: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important"
    },
    marginTop: "4px",
    borderRadius: "5px",
    border: "1px solid rgba(127, 127, 127, 0.23)"
  },
  grpButton: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important"
    },
    width: "calc(260px / 3)",
    height: "28px",
    fontWeight: "500",
    letterSpacing: "1px",
    margin: "0px",
    border: "none",
    lineHeight: "18px"
  },
  selectEmpty: {}
}));

const AudioSettingsPane = ({visible}) => {

  const { setFrequency, setPanning, getWaveform, setWaveform } = useContext(AudioContext);
  const [wf, setWf] = useState(getWaveform());

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

  const wfBtnPressed = waveform => {
    setWf(waveform);
    setWaveform(waveform);
  }

  const classes = useStyles();

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
          {...(visible === false && { tabIndex: "-1" })}
        />
        <Input
          className="freqInput"
          value={freq}
          onChange={handleFreqInputChange}
          onBlur={handleFreqBlur}
          tabentry={visible}
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
          {...(visible === false && { tabIndex: "-1" })}
        />
        <Input
          className="freqInput"
          value={stereo}
          onChange={handleStereoInputChange}
          onBlur={handleStereoBlur}
          tabentry={visible}
        />
      </div>
      <h4>Oscillator Waveform</h4>
      <BtnGrp 
          aria-label="text primary button group"
          className={classes.grpButtonContainer}
          style={{border: "1px solid rgb(52, 152, 219)"}}
        >
          <Button 
            variant={wf === 0 ? "contained" : "text"}
            style={wf === 0 ? {backgroundColor: "rgb(52, 152, 219)", color: "#fff"} : {color: "rgb(52, 152, 219)"}}
            className={classes.grpButton} 
            onClick={() => wfBtnPressed(0)}>Sine</Button>
          <Button 
            variant={wf === 1 ? "contained" : "text"} 
            style={wf === 1 ? {backgroundColor: "rgb(52, 152, 219)", color: "#fff"} : {color: "rgb(52, 152, 219)"}}
            className={classes.grpButton} 
            onClick={() => wfBtnPressed(1)}>Square</Button>
          <Button 
            variant={wf === 2 ? "contained" : "text"} 
            style={wf === 2 ? {backgroundColor: "rgb(52, 152, 219)", color: "#fff"} : {color: "rgb(52, 152, 219)"}}
            className={classes.grpButton} 
            onClick={() => wfBtnPressed(2)}>Triangle</Button>
      </BtnGrp>
      <h4 style={{width: "calc(100% - 50px)", float: "left", marginTop: "32px"}}>Amplitude Envelope</h4>
      <SSwitch
        checked={env}
        onChange={toggleEnvelope}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
        {...(visible === false && { tabIndex: "-1" })}
      />
    </div>
  );
};

export default AudioSettingsPane;
