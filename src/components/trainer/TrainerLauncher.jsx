import React, { useState } from "react";
import "./TrainerLauncher.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TrainIcon from "@material-ui/icons/FitnessCenter";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  button: {
    shadow: 0,
    "&": {
      boxShadow: "none !important"
    },
    "&:hover": {
      backgroundColor: "#2980b9 !important",
      boxShadow: "none !important"
    },
    fontSize: "16px",
    letterSpacing: "1px",
    fontWeight: "600",
    margin: "none"
  },
  formControl: {
    minWidth: 120,
    marginLeft: "20px"
  },
  selectEmpty: {}
}));

const TrainerLauncher = ({ noChars, beginWasClicked }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    source: 0,
    spacing: 0
  });

  const handleChange = event => {
    setState(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div id="TrainerLauncherContainer">
      <div id="launchPrimary">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          starticon={<TrainIcon />}
          disabled={noChars}
          onClick={beginWasClicked}
        >
          <TrainIcon />
          <span className="iconBtnText">BEGIN</span>
        </Button>
      </div>
      <div id="launchSecondary">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="spacing-simple" color="primary">
            spacing
          </InputLabel>
          <Select
            value={state.spacing}
            onChange={handleChange}
            inputProps={{
              name: "spacing",
              id: "spacing-simple"
            }}
            color="primary"
          >
            <MenuItem value={0}>Random</MenuItem>
            <MenuItem value={1}>Not Random</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="source-simple" color="primary">
            source
          </InputLabel>
          <Select
            value={state.source}
            onChange={handleChange}
            inputProps={{
              name: "source",
              id: "source-simple"
            }}
            color="primary"
          >
            <MenuItem value={0}>Character Select</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TrainerLauncher;
