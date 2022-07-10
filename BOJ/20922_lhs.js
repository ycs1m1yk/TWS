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
  const arr = input().split(" ").map(Number);
  const cntArr = [...Array(200001).fill(0)];

  let [begin, end, ans] = [0, 0, 1];
  while (end < N) {
    const curr = arr[end];
    cntArr[curr] += 1;

    if (cntArr[curr] > K) {
      ans = Math.max(end - begin, ans);
      let newBegin;
      for (let i = begin; i < end; i++) {
        if (arr[i] === curr) {
          newBegin = i + 1;
          break;
        }
      }
      if (ans >= N - newBegin + 1) break;

      for (let i = begin; i < newBegin; i++) {
        cntArr[arr[i]] -= 1;
      }
      begin = newBegin;
    }

    end += 1;
  }

  ans = Math.max(end - begin, ans);
  console.log(ans);
}

main();
