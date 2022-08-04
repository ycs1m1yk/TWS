const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let ans = [];
function dfs(toPick, picked = []) {
  if (toPick === 0) {
    ans.push(picked.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    picked.push(i);
    dfs(toPick - 1, picked);
    picked.pop();
  }
}

dfs(M);
console.log(ans.join("\n"));
