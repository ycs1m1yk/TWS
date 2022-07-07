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

function main() {
  const N = +input();
  const files = [...Array(N)].map(() => input());
  const formats = files.reduce((acc, file) => {
    const fileFormat = file.split(".")[1];
    if (acc[fileFormat]) {
      acc[fileFormat] += 1;
      return acc;
    }
    acc[fileFormat] = 1;
    return acc;
  }, {});

  const ans = Object.entries(formats)
    .sort()
    .reduce((acc, [k, v]) => {
      acc += `${k} ${v}\n`;
      return acc;
    }, "");

  console.log(ans);
}

main();
