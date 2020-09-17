import * as morsetrans from "../morse/morse-translation.js";


export function createScriptFromChars(chars, options = undefined) {

  let 
    script = "",
    durationType = 0,
    totalTime = 0.05,
    dotLength = 0.0,
    dashLength = 0.0,
    pauseLength = 0.0,
    spaceLength = 0.0,
    overallSpeed = 15.0,
    charSpeed = 18.0,
    charLimit = 30, 
    randomSpacing = true, 
    charSpacing = null, 
    spaceCountdown = 0, 
    durationTime = 60;

  function setOptions(options) {
    if (options !== undefined) {
      if ("durationType" in options) {
        durationType = options["durationType"];
      }
      if ("durationTime" in options) {
        durationTime = options["durationTime"] * 60.0;
      }
      if ("charLimit" in options) {
        charLimit = options["charLimit"];
      }
      if ("randomSpacing" in options) {
        randomSpacing = options["randomSpacing"];
      }
      if ("charSpacing" in options) {
        charSpacing = options["charSpacing"];
      }
      if ("overallSpeed" in options) {
        overallSpeed = parseFloat(options["overallSpeed"]);
      }
      if ("charSpeed" in options) {
        charSpeed = parseFloat(options["charSpeed"]);
      }
    }
  }

  function setSpeedElements() {
    if (charSpeed < 1 || overallSpeed < 1) return;
    if (charSpeed < overallSpeed) {
      charSpeed = overallSpeed;
    }
    dotLength = 1.2 / charSpeed;
    dashLength = dotLength * 3.0;
    const farns =
      (60.0 * charSpeed - 37.2 * overallSpeed) / (overallSpeed * charSpeed);
    pauseLength = (3.0 * farns) / 19.0 - dotLength;
    spaceLength = (7.0 * farns) / 19.0 - dotLength;
  }

  const setSpacing = () => {
    if (randomSpacing) {
      spaceCountdown = Math.floor(Math.random() * (charLimit / (Math.random() * charLimit / 2) + 1)) + (Math.floor(Math.random() * 3) + 1);
    } else  {
      spaceCountdown = charSpacing;
    }
  }

  const appendTime = c => {
    let morseTrans = morsetrans.translateTextToMorse(c);
  
    if (c === " " ) {
      totalTime += spaceLength - pauseLength;
    } else {
      morseTrans.split("").forEach(function(char) {
        if (char === " ") {
          totalTime += pauseLength;
        } else {
          switch (char) {
            case ".":
              totalTime += dotLength;
              break;
            case "-":
              totalTime += dashLength;
              break;
            default:
              totalTime += 0;
              break;
          }
          totalTime += dotLength;
        }
      });
    }
  }

  setOptions(options);
  setSpacing();
  setSpeedElements();

  let i = 0;
  while ((durationType === 1 && i < charLimit) || (durationType === 0 && totalTime < durationTime)) {
    if (charSpacing === 0) {
      spaceCountdown = 1;
    }
    if (spaceCountdown < 1 && i > 0 && i < charLimit) {
      script += " ";
      setSpacing();
    } else {
      script += chars.charAt(Math.floor(Math.random() * chars.length));
      spaceCountdown--;
      i = durationType === 1 ? i + 1 : 1;
    }
    appendTime(script.slice(-1));
  }
  if (script.slice(-1) !== ' ') {
    totalTime -= pauseLength;
  } else {
    totalTime -= spaceLength + pauseLength;
  }
  const composition = {
    script: script.trim(),
    scriptToPlay: script.trim(),
    totalDuration: totalTime
  }
  return composition;
}

export function createScriptFromTextEntry(textEntry, options = undefined) {

  let 
    script = "",
    totalTime = 0.05,
    dotLength = 0.0,
    dashLength = 0.0,
    pauseLength = 0.0,
    spaceLength = 0.0,
    overallSpeed = 15.0,
    charSpeed = 18.0,
    playMode = 0,
    lineLimit = 1,
    pipeDelay = 0;

  function setOptions(options) {
    if (options !== undefined) {
      if ("overallSpeed" in options) {
        overallSpeed = parseFloat(options["overallSpeed"]);
      }
      if ("charSpeed" in options) {
        charSpeed = parseFloat(options["charSpeed"]);
      }
      if ("playMode" in options) {
        playMode = parseInt(options["playMode"]);
      }
      if ("lineLimit" in options) {
        lineLimit = parseInt(options["lineLimit"]);
      }
      if ("pipeDelay" in options) {
        pipeDelay = parseFloat(options["pipeDelay"]);
      }
    }
  }

  function setSpeedElements() {
    if (charSpeed < 1 || overallSpeed < 1) return;
    if (charSpeed < overallSpeed) {
      charSpeed = overallSpeed;
    }
    dotLength = 1.2 / charSpeed;
    dashLength = dotLength * 3.0;
    const farns =
      (60.0 * charSpeed - 37.2 * overallSpeed) / (overallSpeed * charSpeed);
    pauseLength = (3.0 * farns) / 19.0 - dotLength;
    spaceLength = (7.0 * farns) / 19.0 - dotLength;
  }

  const calculateTotalTime = str => {
    totalTime = 0.05;
    const trans = morsetrans.formatMorse(morsetrans.translateTextToMorse(str));
    trans.split("").forEach(function(char) {
      if (char === " ") {
        totalTime += pauseLength;
      } else if (char === "/") {
        totalTime += spaceLength;
      } else if (char === "|") {
        totalTime += pipeDelay;
      } else {
        switch (char) {
          case ".":
            totalTime += dotLength;
            break;
          case "-":
            totalTime += dashLength;
            break;
          default:
            break;
        }
        totalTime += dotLength;
      }
    });
  }

  setOptions(options);
  setSpeedElements();

  if (playMode === 0 ) {
    script = textEntry
    .replace(/\s*\|+\s*/g, "|")
    .replace(/(\r?\n)/gm, " ")
    .replace(/^\s+/g, "")
    .replace(/[ \t]{2,}/g, " ");
    script = script.trim();
  } else {
    let lines = textEntry.split(/\r?\n/);
    lines.forEach((l, index) => {
      lines[index] = lines[index].replace(/[ \t]{2,}/g, " ").trim();
    });
    for (let x = 0; x < lines.length; x++) {
      if (lines[x].match(/^\s*$/)) {
        lines.splice(x, 1);
        x--;
      }
    }
    const linesCopy = [...lines];
    let selectedLines = [];
    for (let i = 0; i < lineLimit; i++) {
      const lineNo = Math.floor(Math.random() * lines.length);
      selectedLines.push(lines[lineNo]);
      lines.splice(lineNo, 1);
      if (lines.length === 0) {
        lines = [...linesCopy];
      }
    }
    script = selectedLines.join(" ");
  }

  calculateTotalTime(script);

  const composition = {
    script: script.replace(/\s*\|+\s*/g, " ").trim(),
    scriptToPlay: script.trim(),
    totalDuration: totalTime
  }
  return composition;
}

export default {
  createScriptFromChars,
  createScriptFromTextEntry
};