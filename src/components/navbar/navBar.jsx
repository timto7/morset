import React, { useContext, useState } from "react";
import "./navBar.css";
import ThemeContext from "../../context/ThemeContext";
import AudioContext from "../../context/AudioContext";
import { MdLightbulbOutline as bulb } from "react-icons/md";
import { MdInfoOutline as info } from "react-icons/md";
import { MdHelpOutline as help } from "react-icons/md";
import BulbIcon from "../common/IconButton";
import VolumeControl from "./VolumeControl";
import SettingsControl from "./SettingsControl";
import InfoIcon from "../common/IconButton";
import { NavLink } from "react-router-dom";
import InfoModal from "./InfoModal";


const NavBar = () => {
  const { toggle } = useContext(ThemeContext);
  const { setVolume, stop } = useContext(AudioContext);

  const [showInfo, setShowInfo] = useState(false);

  function toggleInfo() {
    setShowInfo(!showInfo);
  }

  function closeInfo() {
    setShowInfo(false);
  }
  
  return (
    <div id="navContainer">
      <div id="navContent">
        <div id="navLinkContainer">
          <NavLink
            to="/"
            exact
            activeClassName="active"
            onClick={() => {
              stop();
            }}
          >
            <span className="logo" />
          </NavLink>
          <div>
            <NavLink
              to="/trainer"
              activeClassName="active"
              onClick={() => {
                stop();
              }}
            >
              <h3>trainer</h3>
            </NavLink>
            <NavLink
              to="/translator"
              activeClassName="active"
              onClick={() => {
                stop();
              }}
            >
              <h3>translator</h3>
            </NavLink>
          </div>
        </div>
        <div id="navOptionContainer">
          <VolumeControl handleVolumeChange={volume => setVolume(volume)} />
          <InfoIcon className="infoBtn" icon={info} tooltip={"Information"} onClick={() => toggleInfo()}/>
          <NavLink to="/help">
            <InfoIcon 
              className="helpBtn" 
              icon={help} 
              tooltip={"Help Documentation"}
              onClick={() => {
                stop();
              }}
            />
          </NavLink>
          <BulbIcon
            className="lightCtrl"
            icon={bulb}
            tooltip={"Light/Dark Mode"}
            onClick={() => toggle()}
          />
          <SettingsControl />
        </div>
      </div>
      <InfoModal visible={showInfo} close={() => closeInfo()} />
    </div>
  );
};

export default NavBar;
