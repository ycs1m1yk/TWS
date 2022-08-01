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

const MAX = 2 * 10 ** 9;

const lowerBound = (target, arr, lo, hi) => {
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (target > arr[mid]) lo = mid;
    else hi = mid;
  }

  return hi;
};

const closest = (target, arr, lb) => {
  const sums = [
    arr[lb - 1] !== target ? Math.abs(arr[lb - 1] + target) : MAX,
    arr[lb] ? Math.abs(arr[lb] + target) : MAX,
    arr[lb + 1] ? Math.abs(arr[lb + 1] + target) : MAX,
  ];
  const minIdx = sums.findIndex((v) => v === Math.min(...sums));
  return { sumAbs: sums[minIdx], offset: minIdx - 1 };
};

const solve = (arr) => {
  /**
   * Case
   * 1: 산성만
   * 2: 알칼리만
   * 3: 혼합
   */
  const candidates = {
    case1: { sumAbs: MAX, str: "" },
    case2: { sumAbs: MAX, str: "" },
    case3: { sumAbs: MAX, str: "" },
  };

  const zeroLb = lowerBound(0, arr, -1, arr.length);
  if (zeroLb <= arr.length - 2) {
    const sumAbs = arr[zeroLb] + arr[zeroLb + 1];
    const str = `${arr[zeroLb]}  ${arr[zeroLb + 1]}`;
    if (sumAbs === 0) return str;
    candidates["case1"] = { sumAbs, str };
  }
  if (zeroLb >= 2) {
    const sumAbs = -arr[zeroLb - 2] + -arr[zeroLb - 1];
    const str = `${arr[zeroLb - 2]}  ${arr[zeroLb - 1]}`;
    if (sumAbs === 0) return str;
    candidates["case2"] = { sumAbs, str };
  }

  let minAbs = MAX;
  if (zeroLb !== 0 && zeroLb !== arr.length) {
    for (let i = 0; i < zeroLb; i++) {
      const curr = arr[i];
      const lb = lowerBound(-curr, arr, zeroLb - 1, arr.length);
      const { sumAbs, offset } = closest(curr, arr, lb);

      if (sumAbs < minAbs) {
        candidates["case3"].sumAbs = sumAbs;
        candidates["case3"].str = `${curr}  ${arr[lb + offset]}`;
        minAbs = sumAbs;
      }
      if (sumAbs === 0) break;
    }
  }

  let pick = "case3";
  if (candidates["case1"].sumAbs < minAbs) {
    pick = "case1";
    minAbs = candidates["case1"].sumAbs;
  }
  if (candidates["case2"].sumAbs < minAbs) pick = "case2";

  return candidates[pick].str;
};

function main() {
  const N = +input();
  const values = input()
    .split(" ")
    .map(Number)
    .sort((l, r) => l - r);

  console.log(solve(values));
}

main();
