import React from "react";
import "./UnderConstruction.css";
import { Link } from "react-router-dom";
import Build from "@material-ui/icons/Build";

const UnderConstruction = () => {
  document.title = "MorseT - Under Construction";
  return (
    <div id="UnderConstructionMasterContainer">
      <div id="UnderConstructionContainer">
        <div id="UnderConstructionIcon">
            <Build style={{ fontSize: 100 }} />
        </div>
        <div id="UnderConstructionMessage">
          <h3>Under Construction</h3>
          <p>
            This part of the site is still in development. Use the navigation 
            bar above to go elsewhere, or go <Link to="/">home</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
