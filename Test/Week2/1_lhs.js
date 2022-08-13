/**
  테스트 1 〉 통과 (2.79ms, 32.1MB)
  테스트 2 〉 통과 (0.17ms, 30.2MB)
  테스트 3 〉 통과 (0.21ms, 30.1MB)
  테스트 4 〉 통과 (0.53ms, 30.1MB)
  테스트 5 〉 통과 (1.93ms, 32.6MB)
  테스트 6 〉 통과 (2.90ms, 32.2MB)
  테스트 7 〉 통과 (2.99ms, 32.2MB)
  테스트 8 〉 통과 (2.76ms, 32.1MB)
  테스트 9 〉 통과 (2.71ms, 32.1MB)
  테스트 10 〉 통과 (2.82ms, 32.1MB)
  테스트 11 〉 통과 (1.70ms, 32.6MB)
  테스트 12 〉 통과 (2.70ms, 32.2MB)
  테스트 13 〉 통과 (1.73ms, 32.1MB)
 */
const popcount = (n) => {
  let [nCopy, count] = [n, 0];
  while (nCopy) {
    nCopy &= nCopy - 1;
    count += 1;
  }
  return count;
};

function solution(number) {
  let answer = 0;
  const N = number.length;
  for (let num = 0; num < 1 << N; num++) {
    let sum = 0;
    if (popcount(num) === 3) {
      for (let i = 0; i < N; i++) {
        if (num & (1 << i)) {
          sum += number[i];
        }
      }
      if (sum === 0) {
        answer += 1;
      }
    }
  }
  return answer;
}
