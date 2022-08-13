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
