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
  const [N, M] = input().split(" ").map(Number);
  const A = input().split(" ").map(Number);
  const B = input().split(" ").map(Number);

  let [i, j, ans] = [0, 0, ""];
  while (i <= N || j <= M) {
    if (i === N) {
      ans += " " + B.slice(j).join(" ");
      break;
    }
    if (j === M) {
      ans += " " + A.slice(i).join(" ");
      break;
    }
    if (+A[i] <= +B[j]) {
      ans += " " + A[i];
      i += 1;
    } else {
      ans += " " + B[j];
      j += 1;
    }
  }

  console.log(ans.trim());
}

main();
