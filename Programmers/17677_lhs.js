const tokenize = (str) => {
  let ret = {};
  for (let i = 0; i <= str.length - 2; i++) {
    const token = str.substring(i, i + 2);
    if (!!token.match(/[a-z]{2}/)) {
      ret[token] = ret[token] ? ret[token] + 1 : 1;
    }
  }
  return ret;
};

const getIntersectionCount = (obj1, obj2) => {
  const entries1 = Object.entries(obj1);
  const ret = entries1.reduce((acc, [k, v]) => {
    if (obj2[k]) {
      acc += Math.min(v, obj2[k]);
    }
    return acc;
  }, 0);

  return ret;
};

const getUnionCount = (obj1, obj2) => {
  const union = { ...obj1, ...obj2 };
  const ret = Object.entries(union).reduce((acc, [k, v]) => {
    acc += obj1[k] ? Math.max(v, obj1[k]) : v;
    return acc;
  }, 0);

  return ret;
};

function solution(str1, str2) {
  const MULTIPLIER = 65536;
  const tokens1 = tokenize(str1.toLowerCase());
  const tokens2 = tokenize(str2.toLowerCase());
  const intersectionCount = getIntersectionCount(tokens1, tokens2);
  const unionCount = getUnionCount(tokens1, tokens2);

  const answer = unionCount
    ? Math.trunc((intersectionCount * MULTIPLIER) / unionCount)
    : MULTIPLIER;
  return answer;
}
