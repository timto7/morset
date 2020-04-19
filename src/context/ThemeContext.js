import React, { useState, useLayoutEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {}
});

export default ThemeContext;

export function ThemeProvider(props) {
  // keeps state of the current chosen theme
  const [dark, setDark] = useState(window.localStorage.getItem("darkTheme"));

  const muiType = dark ? "dark" : "light";

  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#3ea6ff",
        contrastText: "#fff"
      },
      text: {
        light: "#000",
        dark: "#fff"
      },
      type: muiType
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 12
    }
  });

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true") {
      setDark(true);
      applyTheme(darkTheme);
    }

    if (!lastTheme || lastTheme === "false") {
      setDark(false);
      applyTheme(lightTheme);
    }
  }, [dark]);

  const applyTheme = theme => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  const toggle = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.cssText = "transition: background .5s ease";
    setDark(!dark);
    window.localStorage.setItem("darkTheme", !dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// styles
const lightTheme = [
  "--border: rgba(0, 0, 0, 0.2);",
  "--tooltip: rgba(60, 64, 67, 0.92);",
  "--dropdownBG: #fff;",
  "--prompt: rgba(0, 0, 0, 0.54);",
  "--shadow: rgba(0, 0, 0, 0.13);",
  "--shadow-2: rgba(0, 0, 0, 0.08);",
  "--idle: rgba(0, 0, 0, 0.6);",
  "--text: #000;",
  "--textAlt: #222;",
  "--inactive: rgba(0, 0, 0, 0.3);",
  "--background: #fff;",
  "--tlk-red: #ff082c;",
  "--tlk-yellow: #ffdb08;",
  "--tlk-green: #00d4b5;",
  "--tlk-blue: #3ea6ff;",
  "--tlk-dark-blue: #2980b9;",
  "--tlk-purple: #9b59b6;",
  "--tlk-orange: #fbc02d;",
  "--tlk-gray: #546e7a;",
  "--tlk-brand-1: #fff;",
  "--tlk-brand-2: #fff;",
  "--tlk-contrast: #000;",
  "--session-background: #fff;",
  "--home-shadow: rgba(0, 0, 0, 0.16);",
  "--home-outline: rbga(255, 255, 255, 0);",
  "--home-outline-idle: rbga(255, 255, 255, 0);",
  "--home-icon: #444;",
  "--mark-miss: #ffdb0877;",
  "--mark-sub: #ff082c66;",
  "--mark-extra: #ffdb0877;",
  "--info-background: rgba(255, 255, 255, 0.65);",
  "--logo-colour1: #3ea6ff;",
  "--logo-colour2: #1abc9c;",
  "--textBox: #fff;"
];

const darkTheme = [
  "--border: rgba(255, 255, 255, 0.14);",
  "--tooltip: #303136;",
  "--dropdownBG: #40424f;",
  "--prompt: rgba(255, 255, 255, 0.7);",
  "--idle: rgba(255, 255, 255, 0.6);",
  "--text: #fff;",
  "--textAlt: #eee;",
  "--inactive: rgba(0, 0, 0, 0.3);",
  "--background: #fff;",
  "--tlk-red: #ff082c;",
  "--tlk-yellow: #ffdb08;",
  "--tlk-green: #00d4b5;",
  "--tlk-blue: #3ea6ff;",
  "--tlk-dark-blue: #2980b9;",
  "--tlk-purple: #9b59b6;",
  "--tlk-orange: #ff973e;",
  "--tlk-gray: #546e7a;",
  "--tlk-brand-1: #1c1d22;",
  "--tlk-brand-2: #191a1f;",
  "--tlk-contrast: #fff;",
  "--session-background: #1f1f28;",
  "--shadow: rgba(0, 0, 0, 0.39);",
  "--shadow-2: rgba(0, 0, 0, 0.24);",
  "--home-outline: #3498db;",
  "--home-outline-idle: rbga(52, 152, 219, 0);",
  "--home-icon: #ccc;",
  "--mark-miss: #ffdb0877;",
  "--mark-sub: #ff082c77;",
  "--mark-extra: #ffdb08aa;",
  "--info-background: #191a1f99;",
  "--logo-colour1: #3ea6ff;",
  "--logo-colour2: #9b59b6;",
  "--textBox: #15161b;"
];
