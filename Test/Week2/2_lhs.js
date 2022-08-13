/**
  테스트 1 〉 통과 (1.57ms, 30.5MB)
  테스트 2 〉 통과 (11.66ms, 34.8MB)
  테스트 3 〉 통과 (6.59ms, 33.7MB)
  테스트 4 〉 통과 (6.50ms, 34.4MB)
  테스트 5 〉 통과 (31.06ms, 62.7MB)
  테스트 6 〉 통과 (74.00ms, 68.2MB)
  테스트 7 〉 통과 (76.12ms, 68.5MB)
  테스트 8 〉 통과 (82.59ms, 68.2MB)
  테스트 9 〉 통과 (29.96ms, 68.2MB)
  테스트 10 〉 통과 (31.99ms, 68MB)
  테스트 11 〉 통과 (9.02ms, 34MB)
  테스트 12 〉 통과 (3.45ms, 30.4MB)
  테스트 13 〉 통과 (89.99ms, 68.3MB)
  테스트 14 〉 통과 (87.95ms, 68MB)
  테스트 15 〉 통과 (96.61ms, 68.1MB)
  테스트 16 〉 통과 (78.52ms, 68.1MB)
  테스트 17 〉 통과 (73.43ms, 68.1MB)
  테스트 18 〉 통과 (84.76ms, 68.5MB)
  테스트 19 〉 통과 (60.83ms, 68.3MB)
  테스트 20 〉 통과 (61.02ms, 68.4MB)
 */
function solution(topping) {
  let answer = 0;
  const leftToppingMap = {};
  const rightToppingMap = topping.reduce((acc, curr) => {
    acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1);
    return acc;
  }, {});

  let [leftCount, rightCount] = [0, Object.keys(rightToppingMap).length];
  for (let pos = 0; pos < topping.length - 1; pos++) {
    const curr = topping[pos];
    if (leftToppingMap[curr]) {
      leftToppingMap[curr] += 1;
    } else {
      leftToppingMap[curr] = 1;
      leftCount += 1;
    }

    rightToppingMap[curr] -= 1;
    if (rightToppingMap[curr] === 0) rightCount -= 1;
    if (leftCount === rightCount) answer += 1;
    if (leftCount > rightCount) break;
  }

  return answer;
}
