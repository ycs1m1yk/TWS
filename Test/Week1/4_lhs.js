const flipRow = (mat, r) => {
  mat[r] = mat[r].map((bit) => bit ^ 1);
  return mat;
};

const flipCol = (mat, c) => {
  for (let r = 0; r < mat.length; r++) {
    mat[r][c] ^= 1;
  }
  return mat;
};

const checkRow = (mat, r) => {
  let ret = -1;
  if (mat[r].every((bit) => bit === 0)) ret = 0;
  if (mat[r].every((bit) => bit === 1)) ret = 1;

  return ret;
};

function solution(beginning, target) {
  const [N, M] = [target.length, target[0].length];
  const xorMat1 = [...Array(N)].map(() => [...Array(M)]);
  const xorMat2 = [...Array(N)].map(() => [...Array(M)]);

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      xorMat1[r][c] = beginning[r][c] ^ target[r][c];
      xorMat2[r][c] = beginning[r][c] ^ target[r][c];
    }
  }

  // case 1: 1행 기준으로 1인 열들을 flip
  let answer1 = 0;
  for (let c = 0; c < M; c++) {
    if (xorMat1[0][c]) {
      flipCol(xorMat1, c);
      answer1 += 1;
    }
  }
  if (N > 1) {
    for (let r = 1; r < N; r++) {
      const check = checkRow(xorMat1, r);
      if (check === -1) return -1;
      if (check === 1) {
        answer1 += 1;
      }
    }
  }

  // case 2: 1행 기준으로 0인 열들을 flip 후 행 flip
  let answer2 = 0;
  for (let c = 0; c < M; c++) {
    if (!xorMat2[0][c]) {
      flipCol(xorMat2, c);
      answer2 += 1;
    }
  }
  flipRow(xorMat2, 0);
  answer2 += 1;

  if (N > 1) {
    for (let r = 1; r < N; r++) {
      const check = checkRow(xorMat2, r);
      if (check === 1) {
        answer2 += 1;
      }
    }
  }

  return Math.min(answer1, answer2);
}

/** 
    1 0 1 1 1 | 1 1 1 0 0          0 1 0 1 1
    0 1 0 1 0 | 1 1 1 1 0          1 0 1 0 0
    1 0 0 0 1 | 1 1 0 1 0  =>(xor) 0 1 0 1 1
    0 1 0 0 1 | 1 1 1 0 1          1 0 1 0 0
    1 0 1 0 1 | 1 1 1 1 0          0 1 0 1 1
*/
