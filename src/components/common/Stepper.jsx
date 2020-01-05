import React, { useState } from "react";
import "./Stepper.css";
import DownArrow from "./IconButton";
import { IoMdArrowDown as downArw } from "react-icons/io";
import UpArrow from "./IconButton";
import { IoMdArrowUp as upArw } from "react-icons/io";
import Input from "./Input";
import PropTypes from "prop-types";

const Stepper = ({
  initialValue,
  max,
  min,
  prompt,
  valueDidChange,
  visible
}) => {

  const validateValue = val => {
    val = parseInt(Number(val));
    if (min !== undefined) {
      if (val < min) val = min;
    }
    if (max !== undefined) {
      if (val > max) val = max;
    }
    return val;
  };
  
  const [placeVal, setPlaceVal] = useState(validateValue(initialValue));
  const [value, setValue] = useState(validateValue(initialValue));

  const handleInputChange = event => {
    setPlaceVal(event.target.value);
  };

  const handleInputKeyDown = event => {
    if (event.key === "Enter") {
      submitInputValue(event.target.value);
    }
  };

  const handleInputBlur = () => {
    submitInputValue(placeVal);
  };

  const submitInputValue = v => {
    v = validateValue(placeVal);
    setPlaceVal(v);
    setValue(v);
    valueDidChange(v);
  };

  return (
    <div className={visible ? "StepperContainer visible" : "StepperContainer"}>
      <DownArrow
        icon={downArw}
        tooltip={"Descrease Characters"}
        disabled={value === min}
        onClick={() => {
          const v = validateValue(value - 1);
          setValue(v);
          setPlaceVal(v);
          valueDidChange(v);
        }}
      />
      <Input
        className="stepperInput"
        onChange={handleInputChange}
        value={placeVal}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        prompt={prompt}
      />
      <UpArrow
        icon={upArw}
        tooltip={"Increase Characters"}
        disabled={value === max}
        onClick={() => {
          const v = validateValue(value + 1);
          setValue(v);
          setPlaceVal(v);
          valueDidChange(v);
        }}
      />
    </div>
  );
};

Stepper.propTypes = {
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Stepper;
