import React, { useState, useRef } from "react";
import SettingsBtn from "../common/IconButton";
import { IoMdSettings as settingsIcon } from "react-icons/io";
import SettingsDropdown from "./SettingsDropdown";
import useOutsideClick from "../../services/useOutsideClick";

const SettingsControl = () => {
  const [show, setShow] = useState(false);

  const ref = useRef();
  useOutsideClick(ref, () => {
    setShow(false);
  });

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="SettingsControl" ref={ref}>
      <SettingsDropdown show={show} />
      <SettingsBtn
        className="volumeCtrl"
        icon={settingsIcon}
        tooltip={"Settings"}
        onClick={toggleShow}
      />
    </div>
  );
};

export default SettingsControl;
