const [N, M] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let ans = "";
function dfs(toPick, picked = []) {
  if (toPick === 0) {
    ans += picked.join(" ") + "\n";
    return;
  }

  const smalletst = picked.length ? picked.at(-1) + 1 : 1;
  for (let next = smalletst; next <= N; next++) {
    picked.push(next);
    dfs(toPick - 1, picked);
    picked.pop();
  }
}

dfs(M);
console.log(ans);
