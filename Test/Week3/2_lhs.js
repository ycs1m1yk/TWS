/**
  테스트 1 〉 통과 (0.16ms, 29.9MB)
  테스트 2 〉 통과 (0.11ms, 30MB)
  테스트 3 〉 통과 (15.37ms, 44.9MB)
  테스트 4 〉 통과 (27.83ms, 64.9MB)
  테스트 5 〉 통과 (29.74ms, 68.7MB)
  테스트 6 〉 통과 (20.64ms, 54.2MB)
  테스트 7 〉 통과 (22.19ms, 57MB)
  테스트 8 〉 통과 (20.50ms, 54.4MB)
  테스트 9 〉 통과 (15.63ms, 46.4MB)
  테스트 10 〉 통과 (1.95ms, 31.7MB)
  테스트 11 〉 통과 (12.91ms, 43.9MB)
  테스트 12 〉 통과 (40.03ms, 82.6MB)
  테스트 13 〉 통과 (0.11ms, 29.7MB)
  테스트 14 〉 통과 (0.12ms, 29.9MB)
  테스트 15 〉 통과 (0.13ms, 30MB)
  테스트 16 〉 통과 (0.13ms, 30.1MB)
  테스트 17 〉 통과 (0.12ms, 30MB)
 */
const check = (count, ingredient) => {
  return (
    (count === 0 && ingredient === 1) ||
    (count === 1 && ingredient === 2) ||
    (count === 2 && ingredient === 3) ||
    (count === 3 && ingredient === 1)
  );
};
const getKeepCount = (slice) => {
  if (slice === "123") return 3;
  if (slice.slice(-2) === "12") return 2;
  if (slice.slice(-1) === "1") return 1;
  return 0;
};
function solution(ingredient) {
  let [answer, count] = [0, 0];
  const firstOneIndex = ingredient.findIndex((el) => el === 1);
  const stack = [];
  for (let i = firstOneIndex; i < ingredient.length; i += 1) {
    if (check(count, ingredient[i])) {
      count += 1;
    } else {
      ingredient[i] === 1 ? (count = 1) : (count = 0);
    }
    stack.push(ingredient[i]);
    if (count === 4) {
      for (let i = 0; i < count; i += 1) {
        stack.pop();
      }
      count = getKeepCount(stack.slice(-3).join(""));
      answer += 1;
    }
  }
  return answer;
}

console.log(solution([2, 1, 1, 2, 3, 1, 2, 3, 1]));
console.log(solution([1, 3, 2, 1, 2, 1, 3, 1, 2]));
