// →, ↓, ←
const dr = [0, 1, 0];
const dc = [1, 0, -1];

const checkBoundary = (r, c) => {
  return 0 <= r && r < 5 && c < 5;
};

const checkSafety = (place, r, c) => {
  // →→, →↓, ↓→, ↓↓, ↓←, ←↓ 체크: [00, 01, 10, 11, 12, 21]
  const paths = ["00", "01", "10", "11", "12", "21"];
  for (let i = 0; i < paths.length; i++) {
    let temp = "";
    let nr = r + dr[paths[i][0]];
    let nc = c + dc[paths[i][0]];
    if (checkBoundary(nr, nc)) {
      temp += place[nr][nc];
      nr += dr[paths[i][1]];
      nc += dc[paths[i][1]];
      if (checkBoundary(nr, nc)) temp += place[nr][nc];
    }
    if (temp[0] === "P" || temp === "OP") return false;
  }
  return true;
};

function solution(places) {
  const answer = places.reduce((acc, place) => {
    let safetyCode = 1;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (place[row][col] !== "P") continue;
        if (!checkSafety(place, row, col)) {
          safetyCode = 0;
          break;
        }
      }
      if (safetyCode === 0) break;
    }
    acc.push(safetyCode);
    return acc;
  }, []);

  return answer;
}

console.log(
  solution([
    ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
    ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
    ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
    ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
    ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
  ])
);
