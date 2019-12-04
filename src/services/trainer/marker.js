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
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator, // substitution
      );
    }
  }

  let correct = ""
  let x = n, y = m, step, err = "", err2 = "";
  while (x > 0 && y > 0) {
    step = Math.min(distanceMatrix[x - 1][y - 1], distanceMatrix[x - 1][y], distanceMatrix[x][y - 1]);
    if (distanceMatrix[x][y] === step) {
      correct += a[y - 1];
      err += "+";
      err2 += "+";
      x--;
      y--;
    } else if (distanceMatrix[x - 1][y] === step) { // deletion
      //err += "+";
      err2 += "-";
      x--;
    } else if (distanceMatrix[x][y - 1] === step) { // insertion
      err += "-";
      //err2 += "+";
      y--;
    } else { // substitution
      err += "-";
      err2 += "-";
      x--;
      y--;
    }
  }
  while (x > 0) { // too many pre-pended
    err += "+";
    err2 += "-";
    x--;
  }
  while (y > 0) { // too many appended
    err += "+";
    err2 += "-";
    y--;
  }

  let uniqueChars = [];
  for (let u = 0; u < a.length; u++) {
    const c = a.charAt(u);
    if (!uniqueChars.includes(c)) {
      uniqueChars[uniqueChars.length] = c;
    }
  }
  uniqueChars = uniqueChars.sort();
  console.log(uniqueChars);

  const results = {
    errors: distanceMatrix[n][m],
    errorPlacements: err.split("").reverse().join("").substring(0, m),
    errorPlacements2: err2.split("").reverse().join("").substring(0, n)
  }

  return results;
}

export default {
  getResult
};

