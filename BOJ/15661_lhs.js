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
  const mat = [...Array(N)].map(() => input().split(" ").map(Number));

  // 1~N/2명 뽑는지 체크
  function check(num) {
    const target = Math.ceil(N / 2);
    let setBitCount = 0;
    while (num > 0) {
      if (num & 1) setBitCount += 1;
      num >>= 1;
    }
    return setBitCount <= target;
  }

  // 전력 차이 계산
  function calcDiff(picked) {
    let [startPower, linkPower] = [0, 0];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (picked[i] && picked[j]) startPower += mat[i][j] + mat[j][i];
        if (!picked[i] && !picked[j]) linkPower += mat[i][j] + mat[j][i];
      }
    }
    return Math.abs(startPower - linkPower);
  }

  // 비트마스크 조합
  let ans = Infinity;
  function combination() {
    for (let i = 0; i < 1 << N; i++) {
      if (check(i)) {
        const picked = [...Array(N).fill(0)];
        for (let j = 0; j < N; j++) {
          if (i & (1 << j)) {
            picked[j] = 1;
          }
        }
        const diff = calcDiff(picked);
        ans = Math.min(diff, ans);
        if (ans === 0) return;
      }
    }
  }
  combination();
  console.log(ans);
}

main();
