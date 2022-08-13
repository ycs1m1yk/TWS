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
