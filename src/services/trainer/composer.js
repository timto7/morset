export function createScriptFromChars(chars, options = undefined) {
    let script = "", prevWasSpace = false, limit = 30;

    if (options !== undefined) {
        if ("limit" in options) {
          limit = options["limit"];
        }
    }
    
    for (let i = 0; i < limit; i++) {
        if (!prevWasSpace && i > 0 && i < limit - 2 && (Math.floor(Math.random() * 8) === 0)) {
            script += " ";
            prevWasSpace = true;
        } else {
            script += chars.charAt(Math.floor(Math.random() * chars.length));
            prevWasSpace = false;
        }
    }
    return script;
}

export default {
    createScriptFromChars
};