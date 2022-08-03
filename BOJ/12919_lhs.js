const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const [S, T] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\r\n|\n/);

function reverseStr(str) {
  return str.split("").reverse().join("");
}

// str의 A, B 개수 세기
function countAB(str) {
  let cnt = [0, 0];
  for (ch of str) {
    if (ch === "A") cnt[0] += 1;
    if (ch === "B") cnt[1] += 1;
  }
  return cnt;
}

// A, B 개수 차이
const cntS = countAB(S);
const cntT = countAB(T);
const [dA, dB] = [cntT[0] - cntS[0], cntT[1] - cntS[1]];

// T에서 S 만들기
// 필요한 A, B 개수 만큼 탐색
// 마지막에 reverse일때도 비교
let ans = false;
function dfs(remainA, remainB, currT, isFlipped = false) {
  if (remainA === 0 && remainB === 0) {
    const strT = currT.join("");
    // dB가 짝수이면 그대로, 홀수이면 뒤집어서 비교
    if ((dB % 2 === 0 && strT === S) || (dB % 2 && reverseStr(strT) === S)) {
      ans = true;
    }

    return;
  }

  // 이미 ans === true면 탐색 x
  if (ans) return;

  if (isFlipped) {
    if (currT[0] === "A" && remainA > 0) {
      currT.shift();
      dfs(remainA - 1, remainB, [...currT], isFlipped);
      currT.unshift("A");
    }
    if (currT.at(-1) === "B" && remainB > 0) {
      currT.pop();
      dfs(remainA, remainB - 1, [...currT], !isFlipped);
      currT.push("B");
    }
  } else {
    if (currT.at(-1) === "A" && remainA > 0) {
      currT.pop();
      dfs(remainA - 1, remainB, [...currT], isFlipped);
      currT.push("A");
    }
    if (currT[0] === "B" && remainB > 0) {
      currT.shift();
      dfs(remainA, remainB - 1, [...currT], !isFlipped);
      currT.unshift("B");
    }
  }
}

dfs(dA, dB, [...T]);
console.log(ans ? 1 : 0);
