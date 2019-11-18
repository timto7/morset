import React, { useContext } from "react";
import "./navBar.css";
import ThemeContext from "../../context/ThemeContext";
import AudioContext from "../../context/AudioContext";
import { IoMdBulb as bulb } from "react-icons/io";
import { IoMdInformationCircleOutline as info } from "react-icons/io";
import BulbIcon from "../common/IconButton";
import VolumeControl from "./VolumeControl";
import SettingsControl from "./SettingsControl";
import InfoIcon from "../common/IconButton";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { toggle } = useContext(ThemeContext);
  const { setVolume } = useContext(AudioContext);
  const { stop } = useContext(AudioContext);

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
          <BulbIcon
            className="lightCtrl"
            icon={bulb}
            tooltip={"Light/Dark Mode"}
            onClick={() => toggle()}
          />
          <InfoIcon className="infoBtn" icon={info} tooltip={"Info"} />
          <SettingsControl />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
