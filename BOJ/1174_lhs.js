const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const N = +require("fs").readFileSync(filePath).toString().trim();

function main() {
  if (N > 1023) {
    console.log(-1);
    return;
  }

  const result = [];
  function dfs(curr) {
    result.push(+curr);
    for (let next = 0; next < +curr.at(-1); next++) {
      dfs(curr + next + "");
    }
  }
  for (let i = 0; i <= 9; i++) {
    dfs(i + "");
  }
  result.sort((l, r) => l - r);
  console.log(result[N - 1]);
}

main();
