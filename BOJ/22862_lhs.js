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
  const [N, K] = input().split(" ").map(Number);
  const S = input().split(" ").map(Number);

  const firstEven = S.findIndex((el) => el % 2 === 0);
  if (firstEven === -1) {
    console.log(0);
    return;
  }

  let [begin, end, oddCount, ans] = [firstEven, firstEven, 0, 1];
  while (end < N) {
    if (S[end] % 2) oddCount += 1;
    if (oddCount > K) {
      ans = Math.max(end - begin - oddCount + 1, ans);
      for (let i = begin; i < end; i++) {
        if (S[i] % 2) {
          begin = i + 1;
          oddCount -= 1;
          break;
        }
      }
      if (ans >= N - begin + 1) break;
    }
    end += 1;
  }

  ans = Math.max(end - begin - oddCount, ans);
  console.log(ans);
}

main();
