import React, { lazy, Suspense } from "react";
import "./App.css";
import NavBar from "./components/navbar/navBar";
import Home from "./components/home/Home";
import NotFound from "./components/NotFound";
import { Route, Redirect, Switch } from "react-router-dom";
import UnderConstruction from "./components/UnderConstruction";

const TrainerContainer = lazy(() =>
  import("./components/trainer/TrainerContainer")
);

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Suspense fallback={React.Fragment}>
          <Switch>
            <Route path="/trainer" component={TrainerContainer} />
            <Route path="/translator" component={UnderConstruction} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}
