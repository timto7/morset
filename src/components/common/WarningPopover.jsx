import React, { useState, useEffect } from "react";
import "./WarningPopover.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	button: {
		shadow: 0,
		"&": {
			boxShadow: "none !important"
		},
		"&:hover": {
			boxShadow: "none !important",
      backgroundColor: "#E6C200 !important"
    },
    backgroundColor: "#ffdb08 !important",
		fontSize: "16px",
		letterSpacing: "1px",
		fontWeight: "600",
    margin: "0px auto 20px auto",
    alignSelf: "center",
    color: "black !important"
	}
}));

export default function WarningPopover(props) {
  const classes = useStyles();

  const [confirmEnabled, setConfirmEnabled] = useState(false);

  useEffect(() => {
    if (props.show) {
      setTimeout(() => setConfirmEnabled(true), 300);
    } else {
      setConfirmEnabled(false);
    }
  }, [props.show]);
  
  return (
    <div className={`${props.show ? "warningPopover show" : "warningPopover"}`}>
      <div className="warningChevron" />
      <div className="textContainer">
        <p>{props.text}</p>
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => props.onConfirm()}
            disabled={!confirmEnabled}
          >
            <span>CONFIRM</span>
          </Button>
        </div>
      </div>
      <div className="warningChevron" />
    </div>
  );
}
