// 올바른 괄호 문자열 체크
const check = (target) => {
  const stack = [];
  let i = 0;
  while (stack[stack.length - 1] !== ")" && i < target.length) {
    const p = target[i++];
    if (p === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
      continue;
    }
    stack.push(p);
  }

  return stack.length === 0 && i === target.length;
};

// 괄호 뒤집기
const flip = (str) => {
  return [...str].map((p) => (p === "(" ? ")" : "(")).join("");
};

const correct = (p) => {
  if (p === "") return p;

  let [u, v] = ["", ""];
  let [openingCount, closingCount] = [0, 0];

  // u, v 분리
  for (let i = 0; i < p.length; i += 2) {
    u += p[i] + p[i + 1];
    p[i] === "(" ? openingCount++ : closingCount++;
    p[i + 1] === "(" ? openingCount++ : closingCount++;
    if (openingCount === closingCount) {
      v = p.slice(i + 2);
      break;
    }
  }
  return check(u) ? u + correct(v) : `(${correct(v)})${flip(u.slice(1, -1))}`;
};

function solution(p) {
  const answer = correct(p);
  return answer;
}

console.log(solution("(()())()")); // (()())()
console.log(solution(")(")); // ()
console.log(solution("()))((()")); // ()(())()
console.log(solution("")); // ""
