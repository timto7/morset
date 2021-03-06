import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import Loading from "./components/Loading";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <ThemeProvider>
    <Suspense fallback={<Loading />}>
      <AudioProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AudioProvider>
    </Suspense>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
