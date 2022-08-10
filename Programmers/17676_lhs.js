const MILLISECONDS_IN_A_SECOND = 1000;
const MILLISECONDS_IN_A_MINUTE = 60 * MILLISECONDS_IN_A_SECOND;
const MILLISECONDS_IN_AN_HOUR = 60 * MILLISECONDS_IN_A_MINUTE;

const parseTTCToMilliSeconds = (ttc) => +ttc.slice(0, -1) * 1000;

const parseCompletionTimeToMilliSeconds = (time) => {
  const [h, m, s, ms] = time.split(/:|\./).map(Number);
  const totalMilliSeconds =
    h * MILLISECONDS_IN_AN_HOUR +
    m * MILLISECONDS_IN_A_MINUTE +
    s * MILLISECONDS_IN_A_SECOND +
    ms;

  return totalMilliSeconds;
};

const check = (lineStart, lineEnd, rangeStart, rangeEnd) => {
  return lineEnd >= rangeStart && lineStart <= rangeEnd;
};

function solution(lines) {
  const parsedLines = lines.map((line) => {
    const [_, S, T] = line.split(" ");
    const end = parseCompletionTimeToMilliSeconds(S);
    const start = end - parseTTCToMilliSeconds(T) + 1;
    return [start, end];
  });
  const presets = parsedLines.flat(2).sort((l, r) => l - r);

  let answer = 0;
  for (let i = 0; i < presets.length; i++) {
    const rangeStart = presets[i];
    const processedLinesCount = parsedLines.filter(([s, e]) =>
      check(s, e, rangeStart, rangeStart + 999)
    ).length;
    answer = Math.max(processedLinesCount, answer);
  }

  return answer;
}
