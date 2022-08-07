function areSameArray(arr1, arr2) {
  let ret = true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      ret = false;
      break;
    }
  }

  return ret;
}

function solution(want, number, discount) {
  let answer = 0;
  let windowArr = [...Array(number.length).fill(0)];
  for (let i = 0; i < 10; i++) {
    const matchIdx = want.indexOf(discount[i]);
    if (matchIdx !== -1) {
      windowArr[matchIdx] += 1;
    }
  }
  if (areSameArray(number, windowArr)) {
    answer += 1;
  }

  if (discount.length > 10) {
    // 슬라이딩 윈도우
    for (let old = 0, next = 10; next < discount.length; old++, next++) {
      const matchOldIdx = want.indexOf(discount[old]);
      if (matchOldIdx !== -1) {
        windowArr[matchOldIdx] -= 1;
      }

      const matchNextIdx = want.indexOf(discount[next]);
      if (matchNextIdx !== -1) {
        windowArr[matchNextIdx] += 1;
      }

      if (areSameArray(number, windowArr)) {
        answer += 1;
      }
    }
  }

  return answer;
}
