/**
  * 정확성  테스트
  테스트 1 〉	통과 (0.59ms, 30MB)
  테스트 2 〉	통과 (0.33ms, 29.8MB)
  테스트 3 〉	통과 (0.72ms, 29.9MB)
  테스트 4 〉	통과 (5.66ms, 33.8MB)
  테스트 5 〉	통과 (12.31ms, 34.7MB)
  테스트 6 〉	통과 (10.69ms, 32.5MB)
  테스트 7 〉	통과 (14.58ms, 34.8MB)
  테스트 8 〉	통과 (74.34ms, 34MB)
  테스트 9 〉	통과 (41.66ms, 34.4MB)
  테스트 10 〉	통과 (45.10ms, 34.6MB)
  테스트 11 〉	통과 (7.70ms, 35.1MB)
  테스트 12 〉	통과 (8.37ms, 33.1MB)
  테스트 13 〉	통과 (17.26ms, 34.8MB)
  테스트 14 〉	통과 (19.32ms, 33MB)
  테스트 15 〉	통과 (31.96ms, 33.5MB)
  테스트 16 〉	통과 (16.43ms, 34.6MB)
  테스트 17 〉	통과 (10.45ms, 33.2MB)
  테스트 18 〉	통과 (37.35ms, 33.3MB)

  * 효율성  테스트
  테스트 1 〉	통과 (747.61ms, 103MB)
  테스트 2 〉	통과 (714.79ms, 103MB)
  테스트 3 〉	통과 (615.22ms, 96.9MB)
  테스트 4 〉	통과 (575.63ms, 96.1MB)
 */
const getColumns = (querySting) => querySting.replace(/and /g, "").split(" ");

const upperBound = (arr, target) => {
  let [lo, hi] = [-1, arr.length];
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (+arr[mid][4] >= +target) lo = mid;
    else hi = mid;
  }

  return hi;
};

function solution(info, query) {
  // 쿼리의 가짓수는 4*3*3*3 = 108
  // 점수를 제외한 컬럼들로 aggregation한 결과를 캐싱
  const cache = new Map();
  const infoParsed = info.map((el) => el.split(" "));
  const infoSortedScoreDescending = infoParsed.sort((l, r) => r[4] - l[4]);

  let [key, value] = ["", undefined];
  let [language, position, career, soulfood, score] = ["", "", "", "", ""];
  const answer = query.reduce((acc, q) => {
    [language, position, career, soulfood, score] = getColumns(q);
    key = `${language} ${position} ${career} ${soulfood}`;
    value = cache.get(key);

    if (!!value) {
      acc.push(upperBound(value, score));
    } else {
      value = infoSortedScoreDescending.filter(
        (el) =>
          (language === "-" || el[0] === language) &&
          (position === "-" || el[1] === position) &&
          (career === "-" || el[2] === career) &&
          (soulfood === "-" || el[3] === soulfood)
      );
      cache.set(key, value);

      acc.push(upperBound(value, score));
    }

    return acc;
  }, []);
  return answer;
}

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 1",
    ]
  )
);
