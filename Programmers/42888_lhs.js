function solution(record) {
  const answer = [];
  const idMap = new Map(); // <id, name>
  record.forEach((el) => {
    const [action, id, name] = el.split(" ");
    switch (action) {
      case "Enter":
        idMap.set(id, name);
        answer.push(`${id}님이 들어왔습니다.`);
        break;
      case "Leave":
        answer.push(`${id}님이 나갔습니다.`);
        break;
      case "Change":
        idMap.set(id, name);
        break;

      default:
        break;
    }
  });

  return answer.map((message) => {
    const id = message.split("님")[0];
    return message.replace(id, idMap.get(id));
  });
}
