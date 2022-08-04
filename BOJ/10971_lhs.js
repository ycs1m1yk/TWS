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
  const picked = [];
  let ans = Infinity;

  // 비트마스크 순열
  function permutation(cnt, r, flag) {
    if (cnt === r && map[picked.at(-1)][picked[0]] !== 0) {
      const totalCost = picked.reduce((acc, _, i, a) => {
        if (i === 0) {
          acc += map[a.at(-1)][a[i]];
        } else {
          acc += map[a[i - 1]][a[i]];
        }
        return acc;
      }, 0);
      ans = Math.min(totalCost, ans);
      return;
    }

    for (let i = 0; i < N; i++) {
      if ((flag & (1 << i)) === 0) {
        if (cnt > 0 && map[picked[cnt - 1]][i] === 0) {
          continue;
        }
        picked[cnt] = i;
        permutation(cnt + 1, r, flag | (1 << i));
      }
    }
  }

  permutation(0, N, 0);
  console.log(ans);
}

main();
