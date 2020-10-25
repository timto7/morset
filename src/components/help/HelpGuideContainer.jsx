import React, {useState, useEffect} from "react";
import "./HelpGuideContainer.css";
import { MdHelpOutline as HelpIcon } from "react-icons/md";
import ScrollProgess from "../common/ScrollProgress";
import HelpNav from "./HelpGuideNavigation";
import GeneralHelp from "./GeneralHelpPage";
import TrainerHelp from "./TrainerHelpPage";
import TranslatorHelp from "./TranslatorHelpPage";
import GotoTop from "../common/GotoTopButton";

const navTree = {
  "General": [
    "browser support",
    "navigation",
    "changing the volume",
    "switching between light/dark modes",
    "changing the tone frequency",
    "changing the stereo position",
    "setting the oscillator waveform",
    "toggling the amplitude envelope"
  ],
  "Trainer": [
    "overview",
    "setting the morse speed",
    "character selector and text entry",
    "tailoring the sessions in character selector",
    "adding more ordered characters in character selector",
    "custom character selection",
    "previewing a morse character",
    "using text entry",
    "using pipes to add delays",
    "configuring full text or random line selection",
    "beginning and configuring a session",
    "reviewing a session"
  ],
  "Translator": [
    "still under construction"
  ]
}

export default function HelpGuideContainer(props) {

  document.title = "MorseT - Help Documentation";

  const [selectedSubject, setSelectedSubject] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const subjectClicked = index => {
    setSelectedSubject(index);
  }

  const scrollProgress = event => {
    const scrollPx = -document.body.getBoundingClientRect().top;
    if (scrolled) {
      if (scrollPx === 0) {
        setScrolled(false);
      }
    } else {
      if (scrollPx > 0) {
        setScrolled(true);
      }
    }
  };

  useEffect(() => {
    scrollProgress();
    document.addEventListener("scroll", scrollProgress);
    return (() => {
      document.removeEventListener("scroll", scrollProgress);
    });
  });

  return (
    <div id="HelpGuideContainer" style={{paddingTop: "20px"}}>
      <ScrollProgess 
        menuIndex={selectedSubject}
      />
      <div id="helpTitleContainer" className={scrolled ? "reduced" : ""} ><HelpIcon id="titleHelpIcon" /> <h1> Help Documentation</h1></div>
      <div id="helpInnerContainer">
        {selectedSubject === 0 && <>
            <HelpNav 
              selectedSubject={parseInt(selectedSubject)}
              subjectClicked={subjectClicked}
              navTree={navTree}
            />
            <div id="helpContent">
              <GeneralHelp />
            </div>
          </>}
        {selectedSubject === 1 && <>
            <HelpNav 
              selectedSubject={parseInt(selectedSubject)}
              subjectClicked={subjectClicked}
              navTree={navTree}
            />
            <div id="helpContent">
              <TrainerHelp />
            </div>
          </>}
        {selectedSubject === 2 && <>
            <HelpNav 
              selectedSubject={parseInt(selectedSubject)}
              subjectClicked={subjectClicked}
              navTree={navTree}
            />
            <div id="helpContent">
              <TranslatorHelp />
            </div>
          </>}
      </div>
      <GotoTop />
    </div>
  );
}
