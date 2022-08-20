/**
  테스트 1 〉 통과 (0.09ms, 30MB)
  테스트 2 〉 통과 (0.05ms, 30.1MB)
  테스트 3 〉 통과 (0.05ms, 30.1MB)
  테스트 4 〉 통과 (0.05ms, 30.1MB)
  테스트 5 〉 통과 (0.09ms, 30.1MB)
  테스트 6 〉 통과 (0.05ms, 30.1MB)
  테스트 7 〉 통과 (0.05ms, 30.2MB)
  테스트 8 〉 통과 (0.07ms, 30MB)
  테스트 9 〉 통과 (0.05ms, 30MB)
  테스트 10 〉 통과 (0.05ms, 29.9MB)
  테스트 11 〉 통과 (0.05ms, 30.1MB)
  테스트 12 〉 통과 (0.20ms, 29.9MB)
  테스트 13 〉 통과 (0.07ms, 29.5MB)
  테스트 14 〉 통과 (0.05ms, 30.2MB)
 */
function solution(a, b, n) {
  var answer = 0;
  let [quotient, remainder] = [0, 0];

  while (n / a >= 1) {
    remainder = n % a;
    quotient = (n - remainder) / a;
    answer += quotient * b;
    n = quotient * b + remainder;
  }
  return answer;
}
