import React, { useState } from "react";
import "./TrainerLauncher.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TrainIcon from "@material-ui/icons/FitnessCenter";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SpeedEntry from "../common/SpeedEntry";

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
    source: 0
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
        <SpeedEntry />
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
            disabled={true}
          >
            <MenuItem value={0}>Character Select</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TrainerLauncher;
