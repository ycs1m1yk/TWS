const countSetBits = (n) => {
  let [nCopy, count] = [n, 0];
  while (nCopy) {
    nCopy &= nCopy - 1;
    count += 1;
  }

  return count;
};

// 비트마스크 조합
const combination = (cand, r) => {
  const result = [];
  for (let i = 0; i < 1 << cand.length; i++) {
    if (countSetBits(i) === r) {
      const temp = [];
      for (let j = 0; j < cand.length; j++) {
        if (i & (1 << j)) {
          temp.push(cand[j]);
        }
      }
      result.push(temp);
    }
  }
  return result;
};

function solution(orders, course) {
  const courseMapArr = [...Array(11)].map(() => ({}));
  for (const order of orders) {
    for (const r of course) {
      if (r <= order.length) {
        const combi = combination(order, r);
        combi.forEach((el) => {
          const menu = el.sort().join("");
          courseMapArr[r][menu] = courseMapArr[r][menu]
            ? courseMapArr[r][menu] + 1
            : 1;
        });
      }
    }
  }
  const answer = course
    .reduce((acc, r) => {
      const max = Math.max(...Object.values(courseMapArr[r]));
      if (max > 1) {
        const menuArr = Object.entries(courseMapArr[r])
          .filter(([_, v]) => v === max)
          .map(([k, _]) => k);
        acc.push(...menuArr);
      }
      return acc;
    }, [])
    .sort();

  return answer;
}
