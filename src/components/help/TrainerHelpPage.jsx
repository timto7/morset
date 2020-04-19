import React from "react";
import { FiInfo as InfoIcon } from "react-icons/fi";
import { Link } from "react-scroll";
import ImgSpeed from "../../images/helpdocs/trainer_speed.png";
import ImgDurTime from "../../images/helpdocs/trainer_settimeduration.png";
import ImgDurChars from "../../images/helpdocs/trainer_setcharduration.png";
import ImgSpaces from "../../images/helpdocs/trainer_spaces.png";
import ImgStepper from "../../images/helpdocs/trainer_charstepper.png";

export default function TrainerHelpPage(props) {

  return (
    <div id="TrainerHelpContainer" style={{paddingBottom: "20px"}}>
      <div className="helpSubjectTitle">
        <h2>Trainer</h2>
        <p>This section provides guidance regarding the use of the morse training portion of the application.</p>
      </div>
      <div id="nav-trainer-overview" className="topicSection">
        <h3>Overview</h3>
        <p>The trainer section of this site is intended to enable users to build their confidence and ability 
        to transcribe morse code, or to practice and maintain their proficiency.</p>
        <p>The trainer has been built with the Koch 
        training method in mind. Rather than a student having to learn all of the morse characters in the first instance and then 
        attempting to gain better performance with gradually increasing keying speeds, Koch's method dictates that 
        a reduced set of characters should be learnt at, or near to, a desired goal keying speed. With this, new characters 
        are only to be introduced once a student is able to transcribe a particular subset accurately and consistantly.</p>
        <p>The tool works by playing audible morse code 
        to the user whilst they attempt to type out the respective characters. Following every training session, the user's 
        performance is marked and scored and a detailed breakdown is given. Novice users should begin with a small character 
        set and only introduce a character every time they obtain consistantly good scores with a particular subset.
        The overall speed of the morse can be lessened for ease at first, but the charcter speed should be close to, or 
        exactly, the speed they realistically wish to be good at transcribing in the first instance.</p>
      </div>
      <div id="nav-trainer-setting-the-morse-speed" className="topicSection">
        <h3>Setting the Morse Speed</h3>
        <p>The speed of the morse code is determined by two factors of speed: <b>the overall speed</b> and the <b>character speed</b>, both 
        are a measure of Words Per Minute (WPM). The <b>character speed</b> defines the speed at which the individual characters are 
        sent. By lengthening the intercharacter and interword gaps respectively, the overall speed of the morse code can be reduced; this 
        is what the <b>overall speed</b> represents. Having the option to specify a lower <b>overall speed</b> can allow a user more 
        time to assimilate a transmitted character whilst still being able to learn the "shape" of the morse code that forms a character at the full 
        <b> character speed</b>. It should be the user's goal, over time, to lessen the gap between these two values until they can transcribe 
        morse code at the fullest speed. This particular timing convention is known as <b>Farnsworth Timing</b>.</p> 
        <p>The speed can be set using the two aptly labelled <b>input fields</b> located towards the top right of the trainer application.</p>
        <img src={ImgSpeed} alt="Speed" width='167' height='69' />
      </div>
      <div id="nav-trainer-tailoring-the-sessions-in-character-selector" className="topicSection">
        <h3>Tailoring the Sessions in Character Selector</h3>
        <p>In the <b>character selector</b>, there are several options provided in order to tailor a session including 
        changing the time duration and altering the insertion of spaces.</p>
        <br />
        <h4>Changing the Session Duration</h4>
        <p>It is possible to specify the duration of a session either in terms of time or the number of characters. To do this, firstly 
        click on the <b>session duration button</b> (the label on the button changes contextually based on your current setting), this 
        presents a dropdown menu. In order to specify a time duration, ensure that <em>time</em> is selected in the <b>duration type segmented 
        control</b> located at the top of the dropdown menu. A time limit can then be specified in the <b>input field</b> labeled <em>time 
        duration (minutes)</em>.</p>
        <img src={ImgDurTime} alt="Speed" width='333' height='207'/>
        <br /><br />
        <p> In order to specify the number of characters in a session, ensure that <em>characters</em> is selected 
        in the <b>duration type segmented control</b>. The number of characters in a session can then be specified in the <b>input 
        field</b> labelled <em>number of characters</em>.</p>
        <img src={ImgDurChars} alt="Speed" width='333' height='207' /><br />
        <div className="helpdocs-infoContainer">
          <InfoIcon style={{fontSize: "50px", color: "var(--tlk-blue)"}}/>
          <span>It should be noted that space characters are <b>not</b> included when specifying the number of characters in a session.</span>
        </div>
        <br /><br />
        <h4>Altering the Insertion of Spaces</h4>
        <p>It is possible tailor the manner in which spaces are inserted during sessions. To do this firstly click the <b>space 
        insertion button</b> (the label on the button changes contextually based on your current setting), this presents a dropdown menu. 
        For random space insertion, ensure that the <b>toggle switch</b> labelled <em>Insert Spaces Randomly</em> is active. In order to 
        specify an exact amount characters before space insertion, turn off the previously mentioned switch, and enter the number of 
        characters that are required before every space insertion in the <b>input field</b>.</p>
        <img src={ImgSpaces} alt="Spaces" width='318' height='193' />
      </div>
      <div id="nav-trainer-adding-more-ordered-characters-in-character-selector" className="topicSection">
        <h3>Adding More Ordered Characters in Character Selector</h3>
        <p>As mentioned in the <a><Link
                  to={`nav-trainer-overview`}
                  smooth={true}
                  offset={-55}
                  duration={400}
                >overview</Link></a>, characters should be added gradually to training sessions. When the character selection is ordered,
                additional characters can be added or removed in steps using the <b>character 
                stepper</b> which is comprised of a <b>decrement button</b> and an <b>increment button</b> for doing so. 
                There is also an <b>input field</b> in which to type a specific amount of 
                characters. The order in which the characters are added ensure that short, long, easier, and more difficult characters are 
                interspersed rather equally.</p>
                <img src={ImgStepper} alt="Stepper" width='150' height='70' />
      </div>
    </div>
  );
}
