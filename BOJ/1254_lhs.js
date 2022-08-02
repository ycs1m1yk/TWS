const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const S = require("fs").readFileSync(filePath).toString().trim();

const checkPalindrome = (str) => {
  let [l, r] = [0, str.length - 1];

  let isPalindrome = true;
  while (l < r) {
    if (str[l] !== str[r]) {
      isPalindrome = false;
      break;
    }
    l += 1;
    r -= 1;
  }
  return isPalindrome;
};

for (let i = 0; i < S.length; i++) {
  if (checkPalindrome(S.slice(i))) {
    console.log(S.length + i);
    break;
  }
}
