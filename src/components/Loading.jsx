import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner" />
      <span className="loadingLogo" />
    </div>
  );
};

export default Loading;
