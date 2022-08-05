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
const inputNumArr = () => input().split(" ").map(Number);

function main() {
  const N = +input();
  const operands = inputNumArr();
  const operators = inputNumArr(); // [+, -, *, /]

  function calc(l, op, r) {
    switch (op) {
      case 0:
        return l + r;
      case 1:
        return l - r;
      case 2:
        return l * r;
      case 3:
        return Math.trunc(l / r);

      default:
        break;
    }
  }

  let [max, min] = [-Infinity, Infinity];
  function dfs(cnt, value = operands[0]) {
    if (cnt === N - 1) {
      max = Math.max(value, max);
      min = Math.min(value, min);
      return;
    }

    for (let op = 0; op < 4; op++) {
      if (operators[op]) {
        operators[op] -= 1;
        dfs(cnt + 1, calc(value, op, operands[cnt + 1]));
        operators[op] += 1;
      }
    }
  }

  dfs(0);

  // 값이 -0일 경우 0 출력
  console.log(max || 0);
  console.log(min || 0);
}

main();
