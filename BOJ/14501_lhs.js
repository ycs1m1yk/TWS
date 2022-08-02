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
  const schedule = [...Array(N)].map(() => input().split(" ").map(Number));
  schedule.unshift(null);

  let ans = -1;
  const dfs = (now, pay = 0) => {
    if (now > N) {
      ans = Math.max(pay, ans);
      return;
    }

    const [T, P] = schedule[now];
    if (now + T <= N + 1) {
      dfs(now + T, pay + P);
    }
    dfs(now + 1, pay);
  };

  dfs(1);
  console.log(ans);
}

main();
