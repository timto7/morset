export function getResult(a, b) {
  const m = a.length, n = b.length;
  const distanceMatrix = Array(n + 1).fill(null).map(() => Array(m + 1).fill(null));
  for (let i = 0; i <= m; i += 1) {
    distanceMatrix[0][i] = i;
  }
  for (let j = 0; j <= n; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= n; j += 1) {
    for (let i = 1; i <= m; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1,
        distanceMatrix[j - 1][i] + 1,
        distanceMatrix[j - 1][i - 1] + indicator
      );
    }
  }

  let x = n, y = m, step, err = "", err2 = "", hits = {}, misses = {}, subs = {}, extra = {};
  while (x > 0 && y > 0) {
    step = Math.min(distanceMatrix[x - 1][y - 1], distanceMatrix[x - 1][y], distanceMatrix[x][y - 1]);
    if (distanceMatrix[x][y] === step) {
      err += "+";
      err2 += "+";
      x--;
      y--;
      hits[a.charAt(y)] = hits[a.charAt(y)] + 1 || 1;
    } else if (distanceMatrix[x - 1][y] === step) { // deletion / extra
      err2 += "e";
      x--;
      extra[b.charAt(x)] = extra[b.charAt(x)] + 1 || 1;
    } else if (distanceMatrix[x][y - 1] === step) { // insertion / missing
      err += "m";
      y--;
      misses[a.charAt(y)] = misses[a.charAt(y)] + 1 || 1;
    } else { // substitution
      err += "s";
      err2 += "s";
      x--;
      y--;
      subs[a.charAt(y)] = subs[a.charAt(y)] + 1 || 1;
    }
  }
  while (x > 0) { // too many pre-pended
    err2 += "e";
    x--;
    extra[b.charAt(x)] = extra[b.charAt(x)] + 1 || 1;
  }
  while (y > 0) { // too many appended
    err += "m";
    y--;
    misses[a.charAt(y)] = misses[a.charAt(y)] + 1 || 1;
  }

  // create stats
  let uniqueChars = [];
  for (let u = 0; u < a.length; u++) {
    const c = a.charAt(u);
    if (!uniqueChars.includes(c)) {
      uniqueChars[uniqueChars.length] = c;
    }
  }
  for (let u = 0; u < b.length; u++) {
    const c = b.charAt(u);
    if (!uniqueChars.includes(c)) {
      uniqueChars[uniqueChars.length] = c;
    }
  }
  uniqueChars = uniqueChars.sort();
  let stats = [];
  for (let i = 0; i < uniqueChars.length; i++) {
    const acount = a.split(uniqueChars[i]).length - 1;
    let obj = {};
    obj["char"] = uniqueChars[i] === " " ? "[space]" : uniqueChars[i].toUpperCase();
    obj["wrong"] = subs[uniqueChars[i]] || 0;
    obj["misses"] = misses[uniqueChars[i]] || 0;
    obj["extra"] = extra[uniqueChars[i]] || 0;
    obj["hits"] = hits[uniqueChars[i]] || 0;
    obj["overall"] = Math.floor((obj["hits"] / (acount + obj["extra"])) * 100) || 0;
    stats[i] = obj;
  }

  const results = {
    errors: distanceMatrix[n][m],
    errorPlacements: err.split("").reverse().join("").substring(0, m),
    errorPlacements2: err2.split("").reverse().join("").substring(0, n),
    hits: hits,
    misses: misses,
    extra: extra,
    stats: stats
  }

  return results;
}

export default {
  getResult
};

