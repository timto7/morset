import morseTranslation, * as morsetrans from "../morse/morse-translation.js";

export function createScriptFromChars(chars, options = undefined) {
    let 
      script = "", 
      charLimit = 30, 
      randomSpacing = true, 
      charSpacing = null, 
      spaceCountdown = 0, 
      durationType = 1,
      durationTime = 0,
      totalTime = 0.0,
      dotLength = 0.0,
      dashLength = 0.0,
      pauseLength = 0.0,
      spaceLength = 0.0,
      overallSpeed = 15.0,
      charSpeed = 18.0,
      envelopeTime = 0;

    const setSpacing = () => {
      if (randomSpacing) {
        spaceCountdown = Math.floor(Math.random() * (charLimit / (Math.random() * charLimit / 2) + 1)) + (Math.floor(Math.random() * 3) + 1);
      } else  {
        spaceCountdown = charSpacing;
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
      pauseLength = (3.0 * farns) / 19.0;
      spaceLength = (7.0 * farns) / 19.0;
      envelopeTime = 0.0025 * (1.0 / (charSpeed / 18.0));
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

    if (options !== undefined) {
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
        overallSpeed = options["overallSpeed"];
      }
      if ("charSpeed" in options) {
        charSpeed = options["charSpeed"];
      }
    }

    setSpacing();
    setSpeedElements();

    let i = 0;
    while ((durationType === 1 && i < charLimit)) {
      if (!spaceCountdown && i > 0 && i < charLimit - 1) {
        script += " ";
        setSpacing();
      } else {
        script += chars.charAt(Math.floor(Math.random() * chars.length));
        spaceCountdown--;
      }
      if (durationType === 0) {
        appendTime(script.slice(-1));
      } else {
        i++;
      }
      appendTime(script.slice(-1));
    }

    const composition = {
      script: script.trim(),
      totalDuration: totalTime
    }

    return composition;
}

export default {
    createScriptFromChars
};