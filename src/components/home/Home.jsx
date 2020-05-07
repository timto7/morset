import React, { useContext } from "react";
import "./Home.css";
import TrainIcon from "@material-ui/icons/FitnessCenter";
import TranslateIcon from "@material-ui/icons/Translate";
import HelpIcon from "@material-ui/icons/HelpOutline";
import { Link } from "react-router-dom";
import Background from "../../images/HomeBG.svg";
import BackgroundDark from "../../images/HomeBGDark.svg";
import ThemeContext from "../../context/ThemeContext";

const Home = () => {
  document.title = "MorseT - Home";
  document.body.style.overflow = "hidden";
  const { dark } = useContext(ThemeContext);
  return (
    <div>
      <img id="homeBackground" src={!dark ? Background : BackgroundDark} alt="Background" />
      <div id="homeContainer">
        <div id="homeOptionContainer">
          <div className="homeOptionOuter">
            <Link to="/trainer">
              <div className="homeOptionInner">
                <div className="homeIconContainer">
                  <TrainIcon style={{ fontSize: 100 }} />
                </div>
                <p>
                  <b>train</b> to be a total morse warrior
                </p>
              </div>
            </Link>
          </div>
          <div className="homeOptionOuter">
            <Link to="/translator">
              <div className="homeOptionInner">
                <div className="homeIconContainer">
                  <TranslateIcon style={{ fontSize: 100 }} />
                </div>
                <p>
                  <b>translate</b> morse to text or vice versa
                </p>
              </div>
            </Link>
          </div>
          <div className="homeOptionOuter">
            <Link to="/help">
              <div className="homeOptionInner">
                <div className="homeIconContainer">
                  <HelpIcon style={{ fontSize: 100 }} />
                </div>
                <p>
                  <b>help</b> is available from supporting docs
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
