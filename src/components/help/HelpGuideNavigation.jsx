import React from "react";
import "./HelpGuideNavigation.css";
import { Link } from "react-scroll";

export default function HelpGuideNavigation({selectedSubject, subjectClicked, navTree}) {


  return (
    <div id="HelpGuideNavigation">
      <ul id="helpMasterList">
        {Object.keys(navTree).map((item, i) => (
          <li
            className={`helpSubject ${selectedSubject === i ? "selected" : ""}`}
            key={i}
          >
            <span onClick={() => {
              window.scrollTo({top: 0, left: 0});
              const activeElement = document.getElementsByClassName("active")[0];
              if (activeElement !== undefined) {
                activeElement.classList.remove("active");
              }
              subjectClicked(i);
            }}>{item}</span>
            <ul>
              {navTree[item].map((topic, index) =>
                <Link
                  className="helpTopic"
                  activeClass=" active"
                  to={`nav-${item.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${topic.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                  spy={true}
                  smooth={true}
                  offset={-55}
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
