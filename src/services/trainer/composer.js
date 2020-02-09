export function createScriptFromChars(chars, options = undefined) {
    let script = "", limit = 30, randomSpacing = true, charSpacing = null, spaceCountdown = 0;

    const setSpacing = () => {
        if (randomSpacing) {
            spaceCountdown = Math.floor(Math.random() * (limit / (Math.random() * limit / 2) + 1)) + (Math.floor(Math.random() * 3) + 1);
        } else  {
            spaceCountdown = charSpacing;
        }
    }

    if (options !== undefined) {
        if ("limit" in options) {
          limit = options["limit"];
        }
        if ("randomSpacing" in options) {
            randomSpacing = options["randomSpacing"];
        }
        if ("charSpacing" in options) {
            charSpacing = options["charSpacing"];
        }
    }
    
    setSpacing();

    for (let i = 0; i < limit; i++) {
        if (!spaceCountdown && i > 0) {
            script += " ";
            setSpacing();
        } else {
            script += chars.charAt(Math.floor(Math.random() * chars.length));
            spaceCountdown--;
        }
    }
    return script.trim();
}

export default {
    createScriptFromChars
};