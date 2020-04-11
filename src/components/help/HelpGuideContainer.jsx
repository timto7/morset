import React, {useState, useEffect} from "react";
import "./HelpGuideContainer.css";
import ScrollProgess from "../common/ScrollProgress";
import HelpNav from "./HelpGuideNavigation";
import GeneralHelp from "./GeneralHelpPage";
import TrainerHelp from "./TrainerHelpPage";
import TranslatorHelp from "./TranslatorHelpPage";
import GotoTop from "./GotoTopButton";


export default function HelpGuideContainer(props) {

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
      <div id="helpTitleContainer"><h1 className={scrolled ? "reduced" : ""}>Help Documentation</h1></div>
      <div id="helpInnerContainer">
        <HelpNav 
          selectedSubject={parseInt(selectedSubject)}
          subjectClicked={subjectClicked}
        />
        <div id="helpContent">
          {selectedSubject === 0 && <GeneralHelp />}
          {selectedSubject === 1 && <TrainerHelp />}
          {selectedSubject === 2 && <TranslatorHelp />}
        </div>
      </div>
      <GotoTop />
    </div>
  );
}
