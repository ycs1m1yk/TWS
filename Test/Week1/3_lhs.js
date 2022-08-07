// 컨테이너 = [n, ..., 1]
// 보조 컨테이너 = [1, 4, ... ?]

// [5,] [2,1]

// [4,3,1,2,5]

function solution(order) {
  let answer = 0;
  const length = order.length;
  const container = [...Array(length)].map((_, i) => length - i);
  const subContainer = [];

  for (let i = 0; i < length; i++) {
    const containerTop = container[container.length - 1];
    const subContainerTop = subContainer[subContainer.length - 1];
    const current = order[i];
    if (
      containerTop !== current &&
      subContainerTop &&
      subContainerTop !== current
    ) {
      break;
    }
    if (subContainerTop === current) {
      subContainer.pop();
      answer += 1;
      continue;
    }

    // container -> subContainer
    while (container.length) {
      const box = container.pop();
      if (box !== current) {
        subContainer.push(box);
      } else {
        answer += 1;
        break;
      }
    }
  }
  return answer;
}
