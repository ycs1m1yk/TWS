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

// dfs 순열
const dfs = (candidates, visited, l, target, result, picked = []) => {
  if (l === target) {
    result.push([...picked]);
    return;
  }
  for (let i = 0; i < candidates.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      picked.push(candidates[i]);
      dfs(candidates, visited, l + 1, target, result, picked);
      picked.pop();
      visited[i] = false;
    }
  }
};

const check = (nums, guess, s, b) => {
  const guessArr = guess.toString().split("").map(Number);
  let [sCnt, bCnt] = [0, 0];
  bCnt = nums.filter((n) => guessArr.includes(n)).length;
  nums.forEach((n, i) => {
    if (n === guessArr[i]) {
      sCnt += 1;
      bCnt -= 1;
    }
  });

  return sCnt === s && bCnt === b;
};

const solve = (wholeNums, guess, s, b) => {
  return wholeNums.filter((nums) => check(nums, guess, s, b));
};

function main() {
  const N = +input();
  const queries = [...Array(N)].map((_) => input().split(" ").map(Number));

  let wholeNums = [];
  const visited = [...Array(N).fill(false)];
  dfs([1, 2, 3, 4, 5, 6, 7, 8, 9], visited, 0, 3, wholeNums);

  queries.forEach((q) => {
    const [guess, s, b] = [...q];
    if (s === 3) {
      console.log(1);
      return;
    }
    wholeNums = solve(wholeNums, guess, s, b);
  });

  console.log(wholeNums.length);
}

main();
