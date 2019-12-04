export function createScriptFromChars(chars, options = undefined) {
    let script = "";
    let prevWasSpace = false;
    const limit = 30;
    for (let i = 0; i < limit; i++) {
        if (!prevWasSpace && i > 0 && i < limit - 2 && (Math.floor(Math.random() * 5) === 0)) {
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