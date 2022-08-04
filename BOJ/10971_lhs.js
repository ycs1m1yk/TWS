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
  function permutation(now, total, flag) {
    if (flag === (1 << N) - 1 && map[now][0]) {
      ans = Math.min(total + map[now][0], ans);
      return;
    }

    for (let i = 1; i < N; i++) {
      const cost = map[now][i];
      if ((flag & (1 << i)) === 0 && cost && total + cost < ans) {
        permutation(i, total + cost, flag | (1 << i));
      }
    }
  }

  // 시작점을 0으로 고정
  permutation(0, 0, 1);
  console.log(ans);
}

main();
