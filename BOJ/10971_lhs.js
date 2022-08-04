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
  const visited = [...Array(N).fill(false)];

  let ans = Infinity;
  function dfs(toPick, picked = []) {
    if (toPick === 0) {
      let flag = true;
      const totalCost = picked.reduce((acc, v, i, a) => {
        if (flag) {
          let cost;
          if (i === 0) {
            cost = map[a.at(-1)][a[i]];
          } else {
            cost = map[a[i - 1]][a[i]];
          }
          flag = cost !== 0;
          acc += cost;
          return acc;
        }
      }, 0);
      if (flag) {
        ans = Math.min(totalCost, ans);
      }
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        picked.push(i);
        dfs(toPick - 1, picked);
        visited[i] = false;
        picked.pop();
      }
    }
  }

  dfs(N);
  console.log(ans);
}

main();
