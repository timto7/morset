import React from "react";
import { FiAlertTriangle as WarningIcon } from "react-icons/fi";
import ImgNavItems from "../../images/helpdocs/general_navitems.png";
import ImgVolume from "../../images/helpdocs/general_volume.png";
import ImgLightDark from "../../images/helpdocs/general_lightdark.png";
import ImgFreq from "../../images/helpdocs/general_freq.png";
import ImgStereo from "../../images/helpdocs/general_stereo.png";
import ImgOsc from "../../images/helpdocs/general_osc.png";
import ImgAmpEnv from "../../images/helpdocs/general_ampenv.png";

export default function GeneralHelpPage(props) {

  return (
    <div id="GeneralHelpContainer" style={{paddingBottom: "20px"}}>
      <div className="helpSubjectTitle">
        <h2>General</h2>
        <p>This section provides an introduction to the general features that persist across the application.</p>
      </div>
      <div id="nav-general-navigation" className="topicSection">
        <h3>Navigation</h3>
        <p>Different parts of the application can be accessed easily via the <b>navigation bar</b> that is
        persistantly located at the very top of the application. Key navigation buttons can be found
        in the leftmost portion of the navigation bar.</p>
        <img src={ImgNavItems} alt="Navigation" width='247' height='59' />
      </div>
      <div id="nav-general-changing-the-volume" className="topicSection">
        <h3>Changing the Volume</h3>
        <p>The audio volume can be change at any time using the <b>volume controller</b> located towards the 
        right in the <b>navigation bar</b>. The <b>volume controller</b> is comprised of a <b>mute/unmute 
        button</b> and a <b>volume slider</b> for precise volume adjustment.</p>
        <img src={ImgVolume} alt="Volume control"  width='58' height='229' />
      </div>
      <div id="nav-general-switching-between-light-dark-modes" className="topicSection">
        <h3>Switched Between Light/Dark Modes</h3>
        <p>The application can switch between light and dark mode by clicking the <b>light/dark mode 
        button</b> located towards the right in the <b>navigation bar</b>.</p>
        <img src={ImgLightDark} alt="Light/dark mode" width='94' height='100' />
      </div>
      <div id="nav-general-changing-the-tone-frequency" className="topicSection">
        <h3>Changing the Tone Frequency</h3>
        <p>The tone frequency of the morse code can be altered using the <b>tone frequency slider</b>. This
        can be found in the <b>audio section</b> of the <b>settings</b> located at the top right of the application.</p>
        <img src={ImgFreq} alt="Tone frequency slider" width='329' height='474' />
      </div>
      <div id="nav-general-changing-the-stereo-position" className="topicSection">
        <h3>Changing the Stereo Position</h3>
        <p>The stereo position of the audio can be altered using the <b>stereo position slider</b>. This
        can be found in the <b>audio section</b> of the <b>settings</b> located at the top right of the application.</p>
        <img src={ImgStereo} alt="Stereo position slider" width='329' height='474' />
      </div>
      <div id="nav-general-setting-the-oscillator-waveform" className="topicSection">
        <h3>Setting the Oscillator Waveform</h3>
        <p>To change the oscillator waveform, use the <b>oscillator waveform segmented control</b> in order to select between 
        sine, square and triangle waveforms. This can be done in the <b>audio section</b> of the <b>settings</b> located at 
        the top right of the application.</p>
        <img src={ImgOsc} alt="Oscillator waveform segmented control" width='329' height='474' /><br />
        <div className="helpdocs-warningContainer">
          <WarningIcon style={{fontSize: "50px", color: "var(--tlk-yellow)"}}/>
          <span>The square waveform is considerably louder, ensure you lower the volume before selecting.</span>
        </div>
      </div>
      <div id="nav-general-toggling-the-amplitude-envelope" className="topicSection">
        <h3>Toggling the Amplitude Envelope</h3>
        <p>The amplitude envelope fades the amplitude from zero to the maximum value, rather than setting these limits instantly when keying, 
        and ultimately prevents an audible "clicking" artifact. This feature can be toggled using the <b>amplitude envelope toggle 
        switch</b> found in the <b>audio section</b> of the <b>settings</b> located at the top right of the application.</p>
        <img src={ImgAmpEnv} alt="Amplitude envelope toggle switch" width='329' height='474' />
      </div>
    </div>
  );
}
