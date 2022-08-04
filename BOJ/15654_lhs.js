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

const [N, M] = input().split(" ").map(Number);
const candidates = input()
  .split(" ")
  .map(Number)
  .sort((l, r) => l - r);
const visited = [...Array(N).fill(false)];

let ans = "";
function dfs(toPick, picked = []) {
  if (toPick === 0) {
    ans += picked.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      picked.push(candidates[i]);
      dfs(toPick - 1, picked);
      picked.pop();
      visited[i] = false;
    }
  }
}

dfs(M);
console.log(ans);
