function solution(w, h) {
  let answer = 0;

  // 1차 함수 밑의 정사각형 개수 카운팅
  // 기울기가 큰 경우로 진행
  if (w > h) {
    for (let i = 1; i < h; i++) {
      answer += Math.floor((w * i) / h);
    }
  } else {
    for (let i = 1; i < w; i++) {
      answer += Math.floor((h * i) / w);
    }
  }
  answer *= 2;
  return answer;
}
