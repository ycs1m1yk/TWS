/**
 * 테스트 1 〉	통과 (3.46ms, 34.4MB)
   테스트 2 〉	통과 (14.09ms, 40.1MB)
   테스트 3 〉	통과 (24.61ms, 41.1MB)
   테스트 4 〉	통과 (129.12ms, 66MB)
   테스트 5 〉	통과 (251.13ms, 70.8MB)
   테스트 6 〉	통과 (17.88ms, 44MB)
   테스트 7 〉	통과 (607.94ms, 94.7MB)
   테스트 8 〉	통과 (606.17ms, 95.6MB)
   테스트 9 〉	통과 (783.95ms, 116MB)
   테스트 10 〉	통과 (781.34ms, 112MB)
   테스트 11 〉	통과 (738.91ms, 112MB)
   테스트 12 〉	통과 (850.09ms, 113MB)
   테스트 13 〉	통과 (723.79ms, 112MB)
   테스트 14 〉	통과 (671.22ms, 99.8MB)
   테스트 15 〉	통과 (9.33ms, 38.4MB)
   테스트 16 〉	통과 (665.84ms, 99.6MB)
   테스트 17 〉	통과 (697.39ms, 113MB)
   테스트 18 〉	통과 (825.63ms, 102MB)
   테스트 19 〉	통과 (1.56ms, 33.8MB)
   테스트 20 〉	통과 (0.98ms, 33.7MB)
   테스트 21 〉	통과 (170.13ms, 44MB)
   테스트 22 〉	통과 (160.78ms, 44.1MB)
   테스트 23 〉	통과 (811.16ms, 104MB)
   테스트 24 〉	통과 (836.74ms, 99MB)
   테스트 25 〉	통과 (13.01ms, 41.7MB)
   테스트 26 〉	통과 (10.51ms, 39.9MB)
   테스트 27 〉	통과 (12.80ms, 41.2MB)
   테스트 28 〉	통과 (17.12ms, 41.7MB)
   테스트 29 〉	통과 (12.99ms, 41.6MB)
   테스트 30 〉	통과 (12.17ms, 40.1MB)
   테스트 31 〉	통과 (15.99ms, 40.4MB)
 */
const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 60 * SECONDS_IN_A_MINUTE;

const parseTimeStringToSeconds = (time) => {
  const [HH, MM, SS] = time.split(":").map(Number);
  return HH * SECONDS_IN_AN_HOUR + MM * SECONDS_IN_A_MINUTE + SS;
};

const parseSecondsToTimeString = (_seconds) => {
  let secondsCopy = _seconds;

  const hours = Math.floor(secondsCopy / SECONDS_IN_AN_HOUR);
  const HH = (hours + "").padStart(2, "0");
  secondsCopy -= hours * SECONDS_IN_AN_HOUR;

  const minutes = Math.floor(secondsCopy / SECONDS_IN_A_MINUTE);
  const MM = (minutes + "").padStart(2, "0");
  secondsCopy -= minutes * SECONDS_IN_A_MINUTE;

  const SS = (secondsCopy + "").padStart(2, "0");

  return `${HH}:${MM}:${SS}`;
};

const timestampReducer = (acc, log) => {
  const [start, end] = log.split("-");
  acc[parseTimeStringToSeconds(start)] += 1;
  acc[parseTimeStringToSeconds(end)] -= 1;

  return acc;
};

function solution(play_time, adv_time, logs) {
  let answer = 0;
  const END_TIME = parseTimeStringToSeconds(play_time);
  const SECONDS_IN_ADV_TIME = parseTimeStringToSeconds(adv_time);
  const timestamps = logs.reduce(
    timestampReducer,
    [...Array(END_TIME + 1)].fill(0)
  );

  const localHits = timestamps.map(((acc = 0), (el) => (acc += el)));
  let localPlayTime = localHits
    .slice(0, SECONDS_IN_ADV_TIME + 1)
    .reduce((acc, curr) => acc + curr);
  let maxPlayTime = localPlayTime;
  for (
    let [start, end] = [0, SECONDS_IN_ADV_TIME + 1];
    end < END_TIME;
    start += 1, end += 1
  ) {
    if (start >= 1) {
      localPlayTime = localPlayTime - localHits[start - 1] + localHits[end];
      if (localPlayTime > maxPlayTime) {
        maxPlayTime = localPlayTime;
        answer = start;
      }
    }
  }
  return parseSecondsToTimeString(answer);
}

console.log(
  solution("02:03:55", "00:14:15", [
    "01:20:15-01:45:14",
    "00:40:31-01:00:00",
    "00:25:50-00:48:29",
    "01:30:59-01:53:29",
    "01:37:44-02:02:30",
  ])
);
console.log(
  solution("99:59:59", "25:00:00", [
    "69:59:59-89:59:59",
    "01:00:00-21:00:00",
    "79:59:59-99:59:59",
    "11:00:00-31:00:00",
  ])
);
