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

const palindromeCodeOf = (word, cnt) => {
  let [l, r, unmatchCnt] = [0, word.length - 1, cnt];
  while (l <= r) {
    if (word[l] !== word[r]) {
      unmatchCnt += 1;
      if (unmatchCnt > 1) return unmatchCnt;

      const lCnt = palindromeCodeOf(word.slice(l, r), unmatchCnt);
      const rCnt = palindromeCodeOf(word.slice(l + 1, r + 1), unmatchCnt);
      unmatchCnt = Math.min(lCnt, rCnt);
      break;
    }
    l += 1;
    r -= 1;
  }

  return unmatchCnt;
};

const solve = (words) => {
  return words.reduce((acc, word) => {
    acc += palindromeCodeOf(word, 0) + "\n";
    return acc;
  }, "");
};

function main() {
  const T = +input();
  const words = [...Array(T)].map(() => input());

  console.log(solve(words));
}

main();
