const flipWords = (str) => {
  return str
    .split(" ")
    .reduce((acc, curr) => {
      acc.push([...curr].reverse().join(""));
      return acc;
    }, [])
    .join(" ");
};

const solve = (str) => {
  const strArr = [...str];
  const words = str.split(/<[\w|\s]+>/g);

  // 태그가 없을때
  if (words.length === 1) {
    return flipWords(words[0]);
  }

  const indexes = [...str.matchAll(/>[\w]/g)].reduce((acc, curr) => {
    acc.push(curr.index + 1);
    return acc;
  }, []);

  const flippedWords = words.filter((el) => el).map((el) => flipWords(el));

  if (str[0] !== "<") {
    strArr.splice(0, flippedWords[0].length, ...flippedWords[0]);
    flippedWords.shift();
  }
  indexes.forEach((idx, i) =>
    strArr.splice(idx, flippedWords[i].length, ...flippedWords[i])
  );

  return strArr.join("");
};

const main = () => {
  const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
  const S = require("fs").readFileSync(filePath).toString().trim();
  console.log(solve(S));
};

main();
