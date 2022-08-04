const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const visited = [...Array(N + 1).fill(false)];
let ans = "";
function dfs(toPick, picked = []) {
  if (toPick === 0) {
    ans += picked.join(" ") + "\n";
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      picked.push(i);
      dfs(toPick - 1, picked);
      picked.pop();
      visited[i] = false;
    }
  }
}

dfs(M);
console.log(ans);
