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
        main: "#3498db",
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

  // paints the app before it renders elements
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

    // if state changes, repaints the app
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
  "--border: rgba(0, 0, 0, 0.12);",
  "--tooltip: #e9e9e9;",
  "--dropdownBG: #fff;",
  "--prompt: rgba(0, 0, 0, 0.54);",
  "--shadow: rgba(0, 0, 0, 0.2);",
  "--idle: rgba(0, 0, 0, 0.45);",
  "--text: #000;",
  "--textAlt: #222;",
  "--inactive: rgba(0, 0, 0, 0.3);",
  "--background: #fff;",
  "--tlk-red: #e74c3c;",
  "--tlk-yellow: #f1c40f;",
  "--tlk-green: #1abc9c;",
  "--tlk-blue: #3498db;",
  "--tlk-dark-blue: #2980b9;",
  "--tlk-purple: #9b59b6;",
  "--tlk-orange: #fbc02d;",
  "--tlk-gray: #546e7a;",
  "--tlk-brand-1: #fff;",
  "--tlk-brand-2: #fff;",
  "--tlk-brand-3: #ddd;",
  "--tlk-brand-4: #dfdfdf;",
  "--tlk-brand-5: #bbb;",
  "--tlk-brand-6: #aaa;",
  "--tlk-brand-7: #999;",
  "--tlk-contrast: #000;",
  "--session-background: #fff;",
  "--home-shadow: rgba(0, 0, 0, 0.16);",
  "--home-outline: rbga(255, 255, 255, 0);",
  "--home-outline-idle: rbga(255, 255, 255, 0);",
  "--home-icon: #444;",
  "--mark-miss: rgba(241, 196, 14, 0.4);",
  "--mark-sub: rgba(231, 77, 60, 0.4);",
  "--mark-extra: rgba(241, 196, 14, 0.4);",
  "--info-background: rgba(255, 255, 255, 0.65);",
  "--logo-colour1: #3498db;",
  "--logo-colour2: #1abc9c;"
];

const darkTheme = [
  "--border: rgba(255, 255, 255, 0.04);",
  "--tooltip: #40424f;",
  "--dropdownBG: #40424f;",
  "--prompt: rgba(255, 255, 255, 0.7);",
  "--shadow: rgba(255, 255, 255, 0.03);",
  "--idle: rgba(255, 255, 255, 0.45);",
  "--text: #fff;",
  "--textAlt: #eee;",
  "--inactive: rgba(0, 0, 0, 0.3);",
  "--background: #fff;",
  "--tlk-red: #e74c3c;",
  "--tlk-yellow: #f1c40f;",
  "--tlk-green: #1abc9c;",
  "--tlk-blue: #3498db;",
  "--tlk-dark-blue: #2980b9;",
  "--tlk-purple: #9b59b6;",
  "--tlk-orange: #fbc02d;",
  "--tlk-gray: #546e7a;",
  "--tlk-brand-1: #32323e;",
  "--tlk-brand-2: #282833;",
  "--tlk-brand-3: #393945;",
  "--tlk-brand-4: #40424f;",
  "--tlk-brand-5: #4d505f;",
  "--tlk-brand-6: #6e7288;",
  "--tlk-brand-7: #b4b8cd;",
  "--tlk-contrast: #fff;",
  "--session-background: #1f1f28;",
  "--home-shadow: rgba(52, 152, 219, 0.16);",
  "--home-outline: #3498db;",
  "--home-outline-idle: rbga(52, 152, 219, 0);",
  "--home-icon: #ccc;",
  "--mark-miss: rgba(241, 196, 14, 0.5);",
  "--mark-sub: rgba(231, 77, 60, 0.5);",
  "--mark-extra: rgba(241, 196, 14, 0.5);",
  "--info-background: rgba(40, 40, 51, 0.65);",
  "--logo-colour1: #3498db;",
  "--logo-colour2: #9b59b6;"
];
