const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const stdin = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\r\n|\n/);
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();
const inputNumArr = () => input().split(" ").map(Number);

function main() {
  const checkBoard = [...Array(5)].map(() => [...Array(5).fill(0)]);
  const board = [...Array(5)].map(() => inputNumArr());
  const inputNumbers = [...Array(5)].map(() => inputNumArr()).flat();
  const findIndexPair = (num) => {
    for (let r = 0; r < 5; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        if (board[r][c] === num) return [r, c];
      }
    }
  };

  const bingoCheckers = [
    () =>
      checkBoard.reduce((acc, cur) => {
        acc += cur.some((el) => el === 0) ? 0 : 1;
        return acc;
      }, 0),
    () =>
      checkBoard
        .reduce(
          (acc, cur) => {
            cur.forEach((v, i) => acc[i].push(v));
            return acc;
          },
          [...Array(5)].map(() => [])
        )
        .reduce((acc, cur) => {
          acc += cur.some((el) => el === 0) ? 0 : 1;
          return acc;
        }, 0),
    () => (checkBoard.map((v, i) => v[i]).some((el) => el === 0) ? 0 : 1),
    () => (checkBoard.map((v, i) => v[4 - i]).some((el) => el === 0) ? 0 : 1),
  ];

  const getBingoLineCount = () =>
    bingoCheckers.reduce((acc, cur) => acc + cur(), 0);

  for (let r, c, i = 0; i < 11; i += 1) {
    const number = inputNumbers[i];
    [r, c] = findIndexPair(number);
    checkBoard[r][c] = 1;
  }
  for (let r, c, i = 11; i < 25; i += 1) {
    const number = inputNumbers[i];
    [r, c] = findIndexPair(number);
    checkBoard[r][c] = 1;
    if (getBingoLineCount() >= 3) {
      console.log(i + 1);
      break;
    }
  }
}

main();
