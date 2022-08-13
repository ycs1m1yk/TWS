function solution(n, roads, sources, destination) {
  const adj = [...Array(n + 1)].map(() => []);
  roads.forEach((road) => {
    const [node1, node2] = road;
    adj[node1].push(node2);
    adj[node2].push(node1);
  });

  let min = Infinity;
  const dfs = (pos, length = 0, visited = 0) => {
    if (pos === destination) {
      min = Math.min(length, min);
      return;
    }

    visited |= 1 << pos;
    for (const child of adj[pos]) {
      if ((visited & (1 << child)) === 0) {
        dfs(child, length + 1, visited);
      }
    }
  };

  const answer = sources.reduce((acc, src) => {
    if (adj[destination].length === 0 && src !== destination) {
      acc.push(-1);
      return acc;
    }

    dfs(src);
    acc.push(min === Infinity ? -1 : min);
    min = Infinity;
    return acc;
  }, []);

  return answer;
}

console.log(
  solution(
    3,
    [
      [1, 2],
      [2, 3],
    ],
    [2, 3],
    1
  )
);
console.log(
  solution(
    5,
    [
      [1, 2],
      [1, 4],
      [2, 4],
      [2, 5],
      [4, 5],
    ],
    [1, 3, 5],
    5
  )
);
