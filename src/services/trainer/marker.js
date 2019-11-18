export default function Levenshtein(s, t) {
  let m = s.length,
    n = t.length,
    d = [],
    i,
    j,
    cost = 0;

  function min(a, b, c) {
    if (a <= b && a <= c) return a;
    if (b <= a && b <= c) return b;
    return c;
  }

  for (i = 0; i <= m; i++) {
    d[i] = [i];
  }

  for (j = 1; j <= n; j++) {
    d[0][j] = j;

    for (i = 1; i <= m; i++) {
      cost = s.charAt(i - 1) == t.charAt(j - 1) ? 0 : 1;
      d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[m][n];
}
