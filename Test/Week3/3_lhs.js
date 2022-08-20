/**
  테스트 1 〉 통과 (0.19ms, 29.9MB)
  테스트 2 〉 통과 (1.29ms, 30.6MB)
  테스트 3 〉 통과 (0.50ms, 30.2MB)
  테스트 4 〉 통과 (0.60ms, 30.3MB)
  테스트 5 〉 통과 (0.29ms, 29.9MB)
  테스트 6 〉 통과 (0.30ms, 30MB)
  테스트 7 〉 통과 (0.48ms, 29.9MB)
  테스트 8 〉 통과 (1.45ms, 30.5MB)
  테스트 9 〉 통과 (1.08ms, 30.4MB)
  테스트 10 〉 통과 (0.26ms, 30.1MB)
  테스트 11 〉 통과 (1.42ms, 30.6MB)
  테스트 12 〉 통과 (0.40ms, 30MB)
  테스트 13 〉 통과 (1.39ms, 30.6MB)
  테스트 14 〉 통과 (1.42ms, 30.6MB)
 */
const findEndPosition = (start, end, mod, working) => {
  const scope = [...Array(end - start + 1)].map((_, i) => start + i);
  return scope.find((pos) => (pos - 1) % mod < working);
};

function solution(distance, scope, times) {
  let answer = distance;
  let [idx, start, end] = [0, 0, 0];
  let [working, idle] = [0, 0, 0];
  const parsedScope = scope.map((v, i) => [i, ...[...v].sort((l, r) => l - r)]);
  parsedScope.sort((l, r) => l[1] - r[1]);

  for (let soldier = 0; soldier < parsedScope.length; soldier += 1) {
    [idx, start, end] = parsedScope[soldier];
    [working, idle] = times[idx];
    answer = findEndPosition(start, end, working + idle, working) || answer;
    if (answer < distance) {
      return answer;
    }
  }
  return answer;
}
