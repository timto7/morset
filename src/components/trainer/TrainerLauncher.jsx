import React from "react";
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
      backgroundColor: "#0b8eff !important",
      boxShadow: "none !important"
    },
    letterSpacing: "2px",
    lineHeight: "20px",
    fontWeight: "600",
    height: "52px",
    margin: "0px",
    borderRadius: "6px"
  },
  formControl: {
    minWidth: 120,
    marginLeft: "20px",
    fontWeight: "500"
  },
  menuItem: {
    fontWeight: "500"
  },
  selectEmpty: {}
}));

const TrainerLauncher = ({ noChars, beginWasClicked, source, sourceChanged }) => {
  const classes = useStyles();

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
          <TrainIcon style={{height: "30px", width: "30px"}}/>
          <span className="iconBtnText">BEGIN</span>
        </Button>
      </div>
      <div id="launchSecondary">
        <SpeedEntry />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="source-simple" color="primary">
            session source
          </InputLabel>
          <Select
            MenuProps={{
              disableScrollLock: true
            }}
            value={source}
            onChange={s => {sourceChanged(s.target.value)}}
            inputProps={{
              name: "source",
              id: "source-simple"
            }}
            color="primary"
          >
            <MenuItem value={0} className={classes.menuItem}>Character Selector</MenuItem>
            <MenuItem value={1} className={classes.menuItem}>Text Entry</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TrainerLauncher;
