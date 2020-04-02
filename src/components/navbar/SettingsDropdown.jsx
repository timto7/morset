import React from "react";
import "./SettingsDropdown.css";
import "./SettingsPane.css";
import AudioPane from "./AudioSettingsPane";
import TrainingPane from "./TrainingSettingsPane";
import TranslationPane from "./TranslationSettingsPane";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AudioIcon from "@material-ui/icons/Speaker";
import TrainIcon from "@material-ui/icons/FitnessCenter";
import TranslateIcon from "@material-ui/icons/Translate";

const useStyles = makeStyles({
  root: {
    width: 300,
    background: "none"
  }
});

const SettingsDropdown = ({ show }) => {
  const [value, setValue] = React.useState("audio");
  const [index, setIndex] = React.useState(0);

  const options = ["audio", "training", "translate"];
  let cntnrClass = `${show ? "show" : ""} ${index === 0 ? "pane-0" : index === 1 ? "pane-1" : "pane-2"}`;
  const classes = useStyles();

  return (
    <div>
      <div id="settingsAciveIndicator" className={cntnrClass} />
      <div id="settingsDDContainer" className={cntnrClass}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setIndex(options.indexOf(newValue));
          }}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Audio"
            value="audio"
            icon={<AudioIcon />}
          />
          <BottomNavigationAction
            label="Training"
            value="training"
            icon={<TrainIcon />}
          />
          <BottomNavigationAction
            label="Translation"
            value="translation"
            icon={<TranslateIcon />}
          />
        </BottomNavigation>
        <div
          id="settingsContent"
        >
          <AudioPane visible={index === 0 ? true : false}></AudioPane>
          <TrainingPane visible={index === 1 ? true : false}></TrainingPane>
          <TranslationPane visible={index === 2 ? true : false}></TranslationPane>
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;
