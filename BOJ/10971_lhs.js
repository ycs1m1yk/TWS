const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const stdin = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\r\n|\n/);
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

function main() {
  const N = +input();
  const map = [...Array(N)].map(() => input().split(" ").map(Number));
  let ans = Infinity;

  // 비트마스크 순열
  function permutation(start, now, total, flag) {
    if (flag === (1 << N) - 1 && map[now][start]) {
      ans = Math.min(total + map[now][start], ans);
      return;
    }

    for (let i = 0; i < N; i++) {
      const cost = map[now][i];
      if ((flag & (1 << i)) === 0 && cost && total + cost < ans) {
        permutation(start, i, total + cost, flag | (1 << i));
      }
    }
  }

  for (let s = 0; s < N; s++) {
    permutation(s, s, 0, 1 << s);
  }
  console.log(ans);
}

main();
