import React from "react";
import "./MorseSelectionPanel.css";
import PropTypes from "prop-types";
import MorseButton from "./MorseButton";
import Add from "../common/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Remove from "../common/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";

const MorseSelectionContainer = ({
  title,
  columns,
  translation,
  characters,
  selectedChars,
  custom,
  addCustomChars,
  removeCustomChars
}) => {
  const listItems = Object.keys(translation).map(key => (
    <MorseButton
      key={key}
      character={key}
      morse={translation[key].replace(/-/g, "−").replace(/\./g, "·")}
      selected={selectedChars.includes(key)}
      custom={custom}
      removeChar={() => removeCustomChars(key)}
      addChar={() => addCustomChars(key)}
    />
  ));
  return (
    <div
      className={`morseSelectionPanel ${custom ? "custom" : ""}`}
      style={{ width: `${columns * 220}px` }}
    >
      <span className="morseSelectionPanelTitle">{title}</span>
      <div className="panelActions">
        <Remove
          icon={RemoveIcon}
          tooltip={"Remove All"}
          onClick={() => removeCustomChars(characters)}
        />
        <Add
          icon={AddIcon}
          tooltip={"Add All"}
          onClick={() => addCustomChars(characters)}
        />
      </div>
      <div className="morseButtonContainer">{listItems}</div>
    </div>
  );
};

MorseSelectionContainer.propTypes = {
  columns: PropTypes.number
};

MorseSelectionContainer.defaultProps = {
  columns: 1
};

export default MorseSelectionContainer;
