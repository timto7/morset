import React, {useState, useEffect} from "react";
import "./MorseSnackBar.css";


export default function ScrollProgress ({menuIndex}) {

  const [scrolled, setScrolled] = useState(0);

  const scrollProgress = event => {
    const scrollPx = -document.body.getBoundingClientRect().top;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrolled(`${scrollPx / winHeightPx * 100}%`);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
    return (() => {
      window.removeEventListener("scroll", scrollProgress);
    });
  });

  useEffect(() => {
    setScrolled(0);
  }, [menuIndex]);

  const progressContainerStyle = {
    height: "4px",
    position: "fixed",
    top: 60,
    left: 0,
    width: "100vw",
    zIndex: 99
  };

  const progressBarStyle = {
    height: "4px",
    background: "#3ea6ff",
    width: scrolled
  };

  return (
    <div className="scrollProgressContainer" style={progressContainerStyle} onScroll={scrollProgress}>
      <div className="scrollProgressBar" style={progressBarStyle} />
    </div>
  );
}


