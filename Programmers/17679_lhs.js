/**
 * 테스트 1 〉	통과 (0.45ms, 33.6MB)
   테스트 2 〉	통과 (0.60ms, 33.5MB)
   테스트 3 〉	통과 (0.34ms, 33.5MB)
   테스트 4 〉	통과 (2.44ms, 33.8MB)
   테스트 5 〉	통과 (77.90ms, 39.6MB)
   테스트 6 〉	통과 (10.30ms, 38.2MB)
   테스트 7 〉	통과 (1.03ms, 33.7MB)
   테스트 8 〉	통과 (1.68ms, 33.8MB)
   테스트 9 〉	통과 (0.40ms, 33.5MB)
   테스트 10 〉	통과 (1.06ms, 33.7MB)
   테스트 11 〉	통과 (2.56ms, 34MB)
 */
const isMatchedBlock = (r, c, board) => {
  const friend = board[r][c];
  if (friend === "-") {
    return false;
  }
  return [board[r][c + 1], board[r + 1][c], board[r + 1][c + 1]].every(
    (el) => el === friend
  );
};

const rotate90CW = (arr) => {
  const [N, M] = [arr.length, arr[0].length];
  const result = [...Array(M)].map(() => [...Array(N)]);
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      result[c][N - 1 - r] = arr[r][c];
    }
  }
  return result;
};

const getInitialCheck = (m, n) =>
  [...Array(n)].map(() => [...Array(m)].fill(0));

function solution(m, n, board) {
  let answer = 0;
  let rotatedBoard = rotate90CW(board.map((row) => [...row]));
  let check = [...Array(n)].map(() => [...Array(m)].fill(0));
  while (true) {
    for (let r = 0; r <= n - 2; r += 1) {
      for (let c = 0; c <= m - 2; c += 1) {
        if (isMatchedBlock(r, c, rotatedBoard)) {
          check[r][c] += 1;
          check[r][c + 1] += 1;
          check[r + 1][c] += 1;
          check[r + 1][c + 1] += 1;
        }
      }
    }

    const flatCheck = check.flat();
    if (flatCheck.some(Boolean)) {
      answer += flatCheck.filter(Boolean).length;
      check.forEach((row, r) => {
        for (let c = 0; c < row.length; c += 1) {
          if (row[c]) {
            rotatedBoard[r][c] = "X";
          }
        }
      });
      rotatedBoard = rotatedBoard.map((row) => [
        ...row.join("").replaceAll("X", "").padEnd(n, "-"),
      ]);
      check = getInitialCheck(m, n);
    } else {
      break;
    }
  }
  return answer;
}

console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));
console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);
