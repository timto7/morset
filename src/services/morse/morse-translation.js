import { textToMorse } from "./text-to-morse.js";

export function isValidMorse(str) {
  return str.match(/^[-.|/\s]+$/g);
}

export function formatMorse(morse) {
  morse = morse
    .replace(/[\t\r\n]*/g, "")
    .replace(/−/g, "-")
    .replace(/·/g, ".")
    .replace(/^[\s/]*|[\s/]*$/g, "")
    .replace(/\/\s*\//g, "/")
    .replace(/\s*\//g, "/")
    .replace(/\/\s*/g, "/")
    .replace(/\/{2,}/g, "/")
    .replace(/[\s+]{4,}/g, "/")
    .replace(/[\s+]{2,3}/g, " ");
  return morse;
}

export function translateTextToMorse(str) {
  let translation = "";
  const chars = str.split("");
  chars.forEach(c => {
    if (c === '|') {
      translation += '|';
    } else {
      let morse = textToMorse[c.toUpperCase()];
      if (morse) translation += morse === "/ " ? `${morse}` : `${morse} `;
    }
  });
  return translation;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function makeTranslatedObject(str) {
  const strArr = str.split("");
  let translatedObj = {};
  strArr.map(char => {
    return (translatedObj[char] = translateTextToMorse(char));
  });
  return translatedObj;
}

export default {
  isValidMorse,
  formatMorse,
  translateTextToMorse
};
