function solution(s) {
  if (s.length === 1) return 1;

  let answer = Infinity;
  for (let size = 1; size <= Math.floor(s.length / 2); size++) {
    let [target, cnt, result] = [s.slice(0, size), 1, ""];

    // 투포인터
    for (
      let start = size, end = start + size;
      start < s.length;
      start += size, end += size
    ) {
      const curr = s.slice(start, end);
      if (curr === target) {
        cnt += 1;
        continue;
      }
      result += `${cnt > 1 ? cnt : ""}${target}`;
      target = curr; // target 초기화
      cnt = 1; // cnt 초기화
    }
    result += `${cnt > 1 ? cnt : ""}${target}`; // 남은 문자열 처리
    answer = Math.min(result.length, answer); // answer 업데이트
    result = ""; // result 초기화
  }

  return answer;
}
