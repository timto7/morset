import React, {useState, useEffect} from "react";
import "./GotoTopButton.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FiArrowUp as GotoTopIcon } from "react-icons/fi";

const useStyles = makeStyles(theme => ({
  button: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      boxShadow: "none !important",
      backgroundColor: "transparent"
    },
    backgroundColor: "transparent",
    fontSize: "18px",
    letterSpacing: "2px",
    fontWeight: "600",
    margin: "none",
    borderRadius: "0px",
    width: "100%",
    height: "100%",
    minWidth: "0px",
    minHeight: "0px"
  }
}));


export default function GotoTopButton(props) {

  const [scrolled, setScrolled] = useState(false);

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

  const classes = useStyles();

  function scrollToTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <div
      className={`GotoTopButton ${scrolled ? "show" : ""}`}
    >
      <Button
          variant="contained"
          className={classes.button}
          onClick={scrollToTop}
        >
          <GotoTopIcon 
            className="gotoTopIcon"
            style={{
              height: "32px",
              width: "32px",
              margin: "-4px"
            }}
          />
        </Button>
    </div>
  );
}
