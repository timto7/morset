import React from "react";
import { FiInfo as InfoIcon } from "react-icons/fi";
import { Link } from "react-scroll";
import ImgSpeed from "../../images/helpdocs/trainer_speed.png";
import ImgDurTime from "../../images/helpdocs/trainer_settimeduration.png";
import ImgDurChars from "../../images/helpdocs/trainer_setcharduration.png";
import ImgSpaces from "../../images/helpdocs/trainer_spaces.png";
import ImgStepper from "../../images/helpdocs/trainer_charstepper.png";
import ImgCharDD from "../../images/helpdocs/trainer_customchardd.png";
import ImgCheckboxes from "../../images/helpdocs/trainer_checkboxes.png";
import ImgAddRemove from "../../images/helpdocs/trainer_addremoveall.png";
import ImgCharPrev from "../../images/helpdocs/trainer_charprev.png";
import ImgMorseSB from "../../images/helpdocs/trainer_morsesb.png";
import ImgTxtSrc from "../../images/helpdocs/trainer_txtsrc.png";
import ImgTextEntry from "../../images/helpdocs/trainer_textentry2.png";
import ImgFullRand from "../../images/helpdocs/trainer_fullorrandlines.png";
import ImgCharSel from "../../images/helpdocs/trainer_charsel.png";
import ImgTxtEnt from "../../images/helpdocs/trainer_txtent.png";
import ImgTxtBin from "../../images/helpdocs/trainer_txtbin.png";
import ImgBegin from "../../images/helpdocs/trainer_begin.png";
import ImgSession from "../../images/helpdocs/trainer_session.png";
import ImgProgress from "../../images/helpdocs/trainer_progressbar.png";
import ImgDelays from "../../images/helpdocs/trainer_delays.png";
import ImgStats from "../../images/helpdocs/trainer_reviewstats.png";
import ImgTextReview from "../../images/helpdocs/trainer_textreview.png";
import ImgReviewOptions from "../../images/helpdocs/trainer_reviewoptions.png";
import ImgReviewSounds from "../../images/helpdocs/trainer_reviewsounds.png";
import ImgAllowSounds from "../../images/helpdocs/trainer_allowreviewsounds.png";


export default function TrainerHelpPage(props) {

  return (
    <div id="TrainerHelpContainer" style={{paddingBottom: "20px"}}>
      <div className="helpSubjectTitle">
        <h2>Trainer</h2>
        <p>This section provides guidance regarding the use of the morse training portion of the application.</p>
      </div>
      <div id="section-trainer-overview" className="topicSection">
        <h3>Overview</h3>
        <p>The trainer section of this site is intended to enable users to build their confidence and ability 
        to transcribe morse code, or to practice and maintain their proficiency.</p>
        <p>The trainer has been built with the Koch 
        training method in mind. Rather than a student having to learn all of the morse characters in the first instance and then 
        attempting to gain better performance with gradually increasing keying speeds, Koch's method dictates that 
        a reduced set of characters should be learnt at, or near to, a desired goal keying speed. With this, new characters 
        are only to be introduced once a student is able to transcribe a particular subset accurately and consistently.</p>
        <p>The tool works by playing audible morse code 
        to the user whilst they attempt to type out the respective characters. Following every training session, the user's 
        performance is marked and scored and a detailed breakdown is given. Novice users should begin with a small character 
        set and only introduce a character every time they obtain consistently good scores with a particular subset.
        The overall speed of the morse can be lessened for ease at first, but the character speed should be close to, or 
        exactly, the speed they realistically wish to be good at transcribing in the first instance.</p>
      </div>
      <div id="section-trainer-setting-the-morse-speed" className="topicSection">
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
      <div id="section-trainer-character-selector-and-text-entry" className="topicSection">
        <h3>Character Selector and Text Entry</h3>
        <p>Before beginning a session, the user must specify what characters or content should be relayed in a given session.
        The training suite provides two means of providing a source of content for your session being the <b>character selector</b> and 
        {' '}<b>text entry</b>.</p>
        <br />
        <h4>Character Selector</h4>
        <p>The <b>character selector</b> allows for a particular set of characters to be defined that will be randomly transmitted during the 
        sessions. The <b>character selector</b> is comprised of options to tailor your session towards the top and the lower section 
        contains a large character chart that shows all of the available characters and which of them are selected. Go to the <Link
                  to={`section-trainer-tailoring-the-sessions-in-character-selector`}
                  smooth={true}
                  offset={-55}
                  duration={500}
                >following section</Link> to start learning more about the character selector.</p>
        <img src={ImgCharSel} alt="Character selector" width='543' height='549' />
        <br /><br />
        <h4>Text Entry</h4>
        <p><b>Text entry</b> allows an extract of text or 
        random lines of text to be entered for the trainer to use verbetim during a session. To learn more about this go to the <Link
                  to={`section-trainer-using-text-entry`}
                  smooth={true}
                  offset={-55}
                  duration={500}
                >using text entry</Link> section.</p>

        <img src={ImgTxtEnt} alt="Text entry" width='625' height='331' />
      </div>
      <div id="section-trainer-tailoring-the-sessions-in-character-selector" className="topicSection">
        <h3>Tailoring the Sessions in Character Selector</h3>
        <p>In the <b>character selector</b>, there are several options provided in order to tailor a session including 
        changing the time duration and altering the insertion of spaces.</p>
        <br />
        <h4>Changing the Session Duration</h4>
        <p>It is possible to specify the duration of a session either in terms of time or the number of characters. To do this, firstly 
        click on the <b>session duration button</b> (the label on the button changes contextually based on your current settings), this 
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
        insertion button</b> (the label on the button changes contextually based on your current settings), this presents a dropdown menu. 
        For random space insertion, ensure that the <b>toggle switch</b> labelled <em>Insert Spaces Randomly</em> is active. In order to 
        specify an exact amount characters before space insertion, turn off the previously mentioned switch, and enter the number of 
        characters that are required before every space insertion in the <b>input field</b>.</p>
        <img src={ImgSpaces} alt="Spaces" width='318' height='193' />
      </div>
      <div id="section-trainer-adding-more-ordered-characters-in-character-selector" className="topicSection">
        <h3>Adding More Ordered Characters in Character Selector</h3>
        <p>As mentioned in the <Link
                  to={`section-trainer-overview`}
                  smooth={true}
                  offset={-55}
                  duration={500}
                >overview</Link>, characters should be added gradually to training sessions. When the character selection is ordered,
                additional characters can be added or removed in steps using the <b>character 
                stepper</b> which is comprised of a <b>decrement button</b> and an <b>increment button</b> for doing so. 
                There is also an <b>input field</b> in which to type a specific amount of 
                characters. The order in which the characters are added ensure that short, long, easier, and more difficult characters are 
                interspersed rather equally.</p>
                <img src={ImgStepper} alt="Stepper" width='150' height='70' />
      </div>
      <div id="section-trainer-custom-character-selection" className="topicSection">
        <h3>Custom Character Selection</h3>
        <p>In the <b>character selector</b>, it is possible to specify a custom set of characters to use in a session. To do this, firstly 
        select <em>Custom</em> in the <b>char. selection dropdown menu</b> located on the left towards the top.</p>
        <img src={ImgCharDD} alt="Custom character dropdown" width='151' height='71' />
        <p>The <b>check boxes</b> contained in the <b>morse character buttons</b> are now interactive and can be used to select 
        or deselect specific morse characters.</p>
        <img src={ImgCheckboxes} alt="Morse button checkboxes" width='219' height='174' />
        <p>It is also possible to bulk add or remove an entire section of morse characters by hovering over a particular section and using either 
        the <b>add all button</b> or <b>remove all button</b> that appear to the right of the section title.
        </p>
        <img src={ImgAddRemove} alt="Add or remove all" width='195' height='59' />
      </div>
      <div id="section-trainer-previewing-a-morse-character" className="topicSection">
        <h3>Previewing a Morse Character</h3>
        <p>It is possible to preview a morse character and hear what it will sound like at the currently set speed outside of 
        session. To preview a morse character, simply click on a <b>morse character button</b> in the morse chart to hear that character.</p>
        <img src={ImgCharPrev} alt="Character preview" width='195' height='59' />
        <p>Additionally, when using the ordered character selection, adding a new character will cause a snackbar to appear 
        in the bottom right corner which informs the user of the latest character addition. The respective character can be previewed by 
        clicking on the <b>play button</b>.</p>
        <img src={ImgMorseSB} alt="New char SB" width='341' height='101' />
      </div>
      <div id="section-trainer-using-text-entry" className="topicSection">
        <h3>Using Text Entry</h3>
        <p>The session source can be changed from character selection to text entry, whereby the user can supply an 
        extract to be used for the sessions. In order to change to the <b>text entry mode</b>, select <em>Text Entry</em> in 
        the <b>session source dropdown menu</b> located at the top right of the application.</p>
        <img src={ImgTxtSrc} alt="Text entry source" width='143' height='64' />
        <p>When the <em>text entry</em> session source is selected, the <b>character selector</b> is replaced with a <b>text area</b> in 
        which the user can supply a piece of text. Non-morse characters will be filtered out automatically upon entry and any return 
        characters will be removed and replaced with a single space character before the session. Furthermore, two or more concurrent 
        space characters will be replaced with a single space character before a session.</p>
        <img src={ImgTextEntry} alt="Text entry field" width='599' height='299' />
        <p>The <b>clear button</b> to the right above the <b>text area</b> can be used to clear all entered text.</p>
        <img src={ImgTxtBin} alt="Clear text" width='43' height='45' />
      </div>
      <div id="section-trainer-configuring-full-text-or-random-line-selection" className="topicSection">
        <h3>Configuring Full Text Or Random Line Selection</h3>
        <p>Multiline text can be entered into the <b>text area</b> and the tool can be programmed to select a certain number 
        of random lines from this text for a session. By clicking on the <b>text selection type button</b> (the label on the button 
        changes contextually based on your current settings) a dropdown menu will be presented. In order to select the text in its 
        entirety for a session, ensure that the <b>toggle switch</b> labelled <em>Play the Whole Text</em> is active. Otherwise, deactivating 
        said toggle switch will cause an <b>input field</b> to appear in which the desired number of lines to be randomly selected can be 
        entered. If the number of random lines to be selected is greater than the actual number of lines contained in the text the system 
        will randomly select from the entire list of lines more than once; certain lines would be duplicated.</p>
        <img src={ImgFullRand} alt="Full or rand lines" width='312' height='182' />
      </div>
      <div id="section-trainer-beginning-and-configuring-a-session" className="topicSection">
        <h3>Beginning and Configuring a Session</h3>
        <p>To begin a session, simply click on the <b>begin session button</b> located at the top left of the trainer application.</p>
        <img src={ImgBegin} alt="Begin session" width='180' height='71' />
        <p>Once the session begins, the user is presented with a <b>text area</b> in which to type their transcription of the 
        morse code. To abort a session click on the <b>abort button</b> above the <b>text area</b>. To restart a session click on 
        the <b>restart button</b> above the <b>text area</b>. Restarting a session creates a brand new morse transcript, it will not be a copy 
        of the previous session.</p>
        <img src={ImgSession} alt="Session" width='645' height='417' />
        <p>During the session, a <b>progress bar</b> gradually traverses the top of the <b>text area</b> that signifies how much of the 
        session has been completed. The presence of the <b>progress bar</b> can be set using a <b>toggle switch</b> labelled <em>Session Progress 
        Bar</em> in the <b>training section</b> of the <b>settings</b> located at the top right of the application. This 
        change takes effect in the next session.</p>
        <img src={ImgProgress} alt="Progress bar" width='328' height='361' />
        <p>A time delay can be added before the start of a session in order to give the user time to compose themselves before the morse 
        code begins to play. Additionally, time can be added to the end of a session in order for the user to finish transcribing the morse 
        code. These delays can be altered using the respective <b>input fields</b> in the <b>training section</b> of 
        the <b>settings</b> located in the top right of the application. These changes take effect in the next session.</p>
        <img src={ImgDelays} alt="Delays" width='328' height='361' />
      </div>
      <div id="section-trainer-reviewing-a-session" className="topicSection">
        <h3>Reviewing a Session</h3>
        <p>Upon completion of a session, a review of the user's performance is presented. This takes the form of character statistics and 
        a review of the inputted text versus the sent transcript.</p>
        <p>The character statistics provide a breakdown for every single character involved in the session in terms 
        of hits (successful copies), mistaken characters, missed characters, extra characters and an overall percentage.</p>
        <img src={ImgStats} alt="Review stats" width='606' height='553' />
        <p>Any characters that were mistaken for another are highlighted red in the sent transcript and any characters that were missed 
        are highlighted yellow. Similarly to the sent transcript, characters that were mistakes that should have been copied as differing characters 
        are highlighted red in the user entry and any characters that were extra are highlighted yellow.</p>
        <img src={ImgTextReview} alt="Text review" width='556' height='224' />
        <p>A <b>session review sound effect</b> will also play which gives you an immediate indication of your performance upon completing a 
        session. This can be toggled on or off using a <b>toggle switch</b> labelled <em>Session Review Sounds</em> in 
        the <b>training section</b> of the <b>settings</b> located at the top right of the application.</p>
        <img src={ImgReviewSounds} alt="Toggle review sounds" width='328' height='361' />
        <p>Some users may not be able to hear the session review sounds when using Google Chrome as some audio playback is blocked by Chrome's 
        anti-autoplay feature. The feature is intended to prevent irritating background audio adverts that plague some sites, however, the morse 
        trainer does not feature any such crimes against user experience. To allowlist the morse trainer, click on the <b>padlock</b> in 
        the <b>address bar</b> and ensure that <em>Sound</em> is set to <em>Allow</em>.</p>
        <img src={ImgAllowSounds} alt="Allow review sounds" width='439' height='390' />
        <p>In order to close the session review, click on the <b>close button</b>. To try again, click on the <b>retry button</b>.</p>
        <img src={ImgReviewOptions} alt="Review options" width='193' height='55' />
      </div>
    </div>
  );
}
