import React from "react";
import "./Home.css";
import TrainIcon from "@material-ui/icons/FitnessCenter";
import TranslateIcon from "@material-ui/icons/Translate";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "MorseT - Home";
  return (
    <div>
      <div id="logoContainer">
        <span className="logoLarge"></span>
      </div>
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
      </div>
    </div>
  );
};

export default Home;
