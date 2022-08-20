class Node {
  constructor(item, next = null) {
    this.item = item;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  empty() {
    return !this.head;
  }
  push(item) {
    const node = new Node(item);
    if (this.empty()) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.size += 1;
  }
  pop() {
    if (this.head) {
      const headItem = this.head.item;
      let temp = new Node(0, this.head.next);
      this.head = null;
      this.head = temp.next;
      temp = null;

      this.size -= 1;

      return headItem;
    }
    return -1;
  }
}

/**
 * [아이디어]
 * 연결된 node의 개수가 인 node부터 bfs 수행
 * 거리가 홀수인 노드 / 짝수인 노드 카운드 후 비교
 *
 * [채점결과]
 * 0점
 */
function solution(n, lighthouse) {
  // 인접리스트 초기화
  const adj = [...Array(n + 1)].map(() => []);
  lighthouse.forEach(([here, there]) => {
    adj[here].push(there);
    adj[there].push(here);
  });

  const bfs = (start) => {
    let [oddDistanceCount, evenDistanceCount] = [0, 0];
    const distance = [...Array(n + 1).fill(-1)];
    const q = new Queue();
    q.push(start);
    distance[start] = 0;

    while (!q.empty()) {
      const here = q.pop();
      for (const there of adj[here]) {
        if (distance[there] === -1) {
          q.push(there);
          distance[there] = distance[here] + 1;
          distance[there] % 2
            ? (oddDistanceCount += 1)
            : (evenDistanceCount += 1);
        }
      }
    }
    return Math.min(oddDistanceCount, evenDistanceCount);
  };
  const start = adj.findIndex((el) => el.length === 1);
  return bfs(start);
}

/**
 * [아이디어]
 * bfs를 그리디하게 수행
 *
 * [채점결과]
 * 작성중에 테스트 시간 종료
 */
function solution2(n, lighthouse) {
  // 인접리스트 초기화
  const adj = [...Array(n + 1)].map(() => []);
  lighthouse.forEach(([here, there]) => {
    adj[here].push(there);
    adj[there].push(here);
  });

  const bfs = (start) => {
    const distance = [...Array(n + 1).fill(-1)];
    const q = new Queue();
    q.push(start);
    distance[start] = 0;

    while (!q.empty()) {
      const here = q.pop();
      for (const there of adj[here]) {
        if (distance[there] === -1) {
          q.push(there);
          distance[there] = distance[here] + 1;
        }
      }
    }
    return Math.min(oddDistanceCount, evenDistanceCount);
  };
  const start = adj.findIndex((el) => el.length === 1);
  return bfs(start);
}

console.log(
  solution(8, [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ])
);
