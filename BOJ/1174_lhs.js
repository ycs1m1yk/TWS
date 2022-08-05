const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const N = +require("fs").readFileSync(filePath).toString().trim();

function main() {
  if (N <= 10) {
    console.log(N - 1);
    return;
  }
  if (N > 1023) {
    console.log(-1);
    return;
  }

  const q = [...Array(10)].map((_, i) => i);
  let [cnt, ans] = [10, 0];
  while (q.length) {
    if (cnt === N) {
      console.log(ans);
      break;
    }
    const front = q.shift();

    for (let i = 0; i < front % 10; i += 1) {
      cnt += 1;
      const num = front * 10 + i;
      q.push(num);
      if (cnt === N) {
        ans = num;
        break;
      }
    }
  }
}

main();
