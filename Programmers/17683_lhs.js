const parseToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const tokenize = (noteStr) => {
  const notes = [];
  for (let i = 0; i < noteStr.length; i++) {
    let note = noteStr[i];
    if (noteStr[i + 1] === "#") {
      note += noteStr[++i];
    }
    notes.push(note);
  }
  return notes;
};

const compare = (info1, info2) => {
  // 재생시간이 같은 경우 먼저 재생된 순서
  if (info1[2] === info2[2]) {
    return info1[0] - info2[0];
  }

  // 재생시간이 긴 순서
  return info2[2] - info1[2];
};

function solution(m, musicinfos) {
  const parsedInfos = musicinfos.map((info, idx) => {
    const [start, end, title, noteStr] = info.split(",");
    const runningTime = parseToMinutes(end) - parseToMinutes(start);
    const notes = tokenize(noteStr);
    const playCount = Math.ceil(runningTime / notes.length);
    const fullNotes = [...Array(playCount)]
      .map(() => [...notes])
      .flat()
      .slice(0, runningTime);

    return [idx, title, runningTime, fullNotes.join(" ") + " "];
  });

  const parsedM = [...tokenize(m)].join(" ") + " ";
  const matched = parsedInfos
    .filter((info) => info[3].includes(parsedM))
    .sort(compare);

  const answer = matched[0] ? matched[0][1] : "(None)";
  return answer;
}

console.log(
  solution("ABCDEFG", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"])
);
console.log(
  solution("DEF", ["12:00,12:14,HELLO,C#DFFGAB", "13:00,13:05,WORLD,ABCDEF"])
);
console.log(
  solution("CCB", ["03:00,03:10,FOO,CCB#CCB", "04:00,04:08,BAR,ABC"])
);
console.log(solution("CC#BCC#BCC#", ["03:00,03:08,FOO,CC#B"]));
