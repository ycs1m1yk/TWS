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
  // here, up, right, left, down
  const dr = [0, -1, 0, 0, 1];
  const dc = [0, 0, 1, -1, 0];

  const N = +input();
  const mat = [...Array(N)].map(() => input().split(" ").map(Number));
  const visited = [...Array(N)].map(() => [...Array(N - 2).fill(0)]);

  const check = (r, c) => {
    for (let i = 0; i < 5; i++) {
      let nr = r + dr[i];
      let nc = c + dc[i];
      if (visited[nr][nc]) return false;
    }
    return true;
  };

  let ans = Infinity;
  const dfs = (L, cost = 0) => {
    if (L === 3) {
      ans = Math.min(cost, ans);
      return;
    }

    for (let r = 1; r <= N - 2; r++) {
      for (let c = 1; c <= N - 2; c++) {
        if (check(r, c)) {
          // visit
          for (let i = 0; i < 5; i++) {
            let nr = r + dr[i];
            let nc = c + dc[i];
            visited[nr][nc] = 1;
            cost += mat[nr][nc];
          }
          dfs(L + 1, cost);

          // reset visit
          for (let i = 0; i < 5; i++) {
            let nr = r + dr[i];
            let nc = c + dc[i];
            visited[nr][nc] = 0;
            cost -= mat[nr][nc];
          }
        }
      }
    }
  };

  dfs(0);
  console.log(ans);
}

main();
