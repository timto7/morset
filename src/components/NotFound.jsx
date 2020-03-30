import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  document.title = "MorseT - Page Not Found";
  return (
    <div id="NFMasterContainer">
      <div id="NFErrorContainer">
        <div id="NFMorseContainer">
          <h1>····−</h1>
          <h1>−−−−−</h1>
          <h1>····−</h1>
        </div>
        <div id="NFMessageContainer">
          <h3>Oops, it looks like something went wrong...</h3>
          <p>
            We couldn't find the page you were looking for. Use the navigation bar
            above to go somewhere sensible, or go <Link to="/">home</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
