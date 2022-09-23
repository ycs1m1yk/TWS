/**
  테스트 1 〉	통과 (0.44ms, 33.6MB)
  테스트 2 〉	통과 (1.79ms, 35.7MB)
  테스트 3 〉	통과 (1.85ms, 35.7MB)
  테스트 4 〉	통과 (0.80ms, 33.6MB)
  테스트 5 〉	통과 (3.25ms, 35.7MB)
  테스트 6 〉	통과 (3.11ms, 35.8MB)
  테스트 7 〉	통과 (1.25ms, 33.5MB)
  테스트 8 〉	통과 (0.97ms, 33.6MB)
  테스트 9 〉	통과 (0.84ms, 33.7MB)
  테스트 10 〉	통과 (1.03ms, 33.4MB)
  테스트 11 〉	통과 (0.70ms, 33.5MB)
  테스트 12 〉	통과 (0.67ms, 33.5MB)
  테스트 13 〉	통과 (1.39ms, 33.7MB)
  테스트 14 〉	통과 (1.82ms, 35.8MB)
  테스트 15 〉	통과 (2.23ms, 35.8MB)
  테스트 16 〉	통과 (0.99ms, 33.6MB)
  테스트 17 〉	통과 (0.83ms, 33.5MB)
  테스트 18 〉	통과 (0.65ms, 33.5MB)
  테스트 19 〉	통과 (0.46ms, 33.4MB)
  테스트 20 〉	통과 (2.45ms, 35.7MB)
  테스트 21 〉	통과 (2.01ms, 35.7MB)
  테스트 22 〉	통과 (2.31ms, 35.7MB)
  테스트 23 〉	통과 (0.81ms, 33.5MB)
  테스트 24 〉	통과 (3.54ms, 35.9MB)
  테스트 25 〉	통과 (3.54ms, 35.9MB)
 */
const subtractTwoArray = (lArr, rArr) =>
  lArr.map((el, i) => (el ? el - rArr[i] : -1));

const getApeachScore = (arr) =>
  arr.reduce((acc, curr, i) => (curr >= 0 ? acc + 10 - i : acc), 0);

const getRionScore = (arr) =>
  arr.reduce((acc, curr, i) => (curr >= 1 ? acc + 10 - i : acc), 0);

const getScoreDifference = (lArr, rArr) => {
  return (
    getRionScore(subtractTwoArray(rArr, lArr)) -
    getApeachScore(subtractTwoArray(lArr, rArr))
  );
};

const compareLowHits = (lArr, rArr) => {
  for (let i = lArr.length - 1; i >= 0; i -= 1) {
    const diff = rArr[i] - lArr[i];
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
};

function solution(n, info) {
  let answer = [...Array(11)].fill(0);
  const rionInfo = [...Array(11)].fill(0);
  const candidates = info.map((el) => el + 1);
  candidates[10] = 0; // 0점짜리

  let maxScoreDifference = 0;
  function dfs(shotCount = 0, picked = []) {
    if (shotCount === n) {
      const scoreDifference = getScoreDifference(info, rionInfo);
      if (scoreDifference > 0 && scoreDifference === maxScoreDifference) {
        if (compareLowHits(answer, rionInfo) > 0) {
          answer = [...rionInfo];
        }
      }
      if (scoreDifference > maxScoreDifference) {
        maxScoreDifference = scoreDifference;
        answer = [...rionInfo];
      }
      return;
    }

    const smallest = picked.length ? picked.at(-1) + 1 : 0;
    for (let i = smallest; i < candidates.length; i++) {
      if (shotCount + candidates[i] <= n) {
        picked.push(i);
        rionInfo[i] = i === 10 ? n - shotCount : candidates[i];
        dfs(shotCount + rionInfo[i], picked);
        rionInfo[i] = 0;
        picked.pop();
      }
    }
  }

  dfs();

  return answer.every((el) => el === 0) ? [-1] : answer;
}

console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
