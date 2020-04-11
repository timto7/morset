import React, {useState} from "react";
import "./HelpGuideNavigation.css";
import { Link } from "react-scroll";

export default function HelpGuideNavigation({selectedSubject, subjectClicked}) {

  const NavTree = {
    "General": [
      "navigation",
      "changing the volume",
      "switching between light/dark modes",
      "changing the tone frequency",
      "changing the stereo position",
      "setting the oscillator waveform",
      "toggling the amplitude envelope"
    ],
    "Trainer": [
      "stuff"
    ],
    "Translator": [
      "still under construction"
    ]
  }
  
  return (
    <div id="HelpGuideNavigation">
      <ul id="helpMasterList">
        {Object.keys(NavTree).map((item, i) => (
          <li
            className={`helpSubject ${selectedSubject === i ? "selected" : ""}`}
            key={i}
          >
            <span onClick={() => {
              window.scrollTo(0, 0);
              subjectClicked(i);
            }}>{item}</span>
            <ul>
              {NavTree[item].map((topic, index) =>
                <Link
                  className="helpTopic"
                  activeClass="helpTopic active"
                  to={`nav-${item.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${topic.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                  spy={true}
                  smooth={true}
                  offset={-67}
                  duration={400}
                  key={"s"+index}
                ><div><span>{topic}</span></div></Link>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
