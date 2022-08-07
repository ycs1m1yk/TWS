const digitCountsX = [...Array(10).fill(0)];
const digitCountsY = [...digitCountsX];
const pairCounts = [...digitCountsX];

function solution(X, Y) {
  let answer = "";
  for (const ch of X) {
    digitCountsX[ch - 0] += 1;
  }
  for (const ch of Y) {
    digitCountsY[ch - 0] += 1;
  }

  for (let i = 0; i <= 9; i++) {
    pairCounts[i] = Math.min(digitCountsX[i], digitCountsY[i]);
  }

  for (let i = 9; i >= 0; i--) {
    answer += (i + "").repeat(pairCounts[i]);
  }

  answer = answer === "" ? "-1" : answer[0] === "0" ? "0" : answer;
  return answer;
}
