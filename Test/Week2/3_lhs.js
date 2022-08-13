/**
  테스트 1 〉 통과 (0.45ms, 30.2MB)
  테스트 2 〉 통과 (0.42ms, 30.2MB)
  테스트 3 〉 통과 (0.44ms, 30.2MB)
  테스트 4 〉 통과 (0.16ms, 29.9MB)
  테스트 5 〉 통과 (0.53ms, 30.1MB)
  테스트 6 〉 통과 (75.31ms, 54.7MB)
  테스트 7 〉 통과 (128.21ms, 56MB)
  테스트 8 〉 통과 (43.80ms, 64.8MB)
  테스트 9 〉 통과 (15.34ms, 41.5MB)
  테스트 10 〉 통과 (16.45ms, 44MB)
  테스트 11 〉 통과 (3563.67ms, 254MB)
  테스트 12 〉 통과 (4018.31ms, 254MB)
  테스트 13 〉 통과 (5175.99ms, 251MB)
  테스트 14 〉 통과 (3826.11ms, 260MB)
  테스트 15 〉 통과 (3035.25ms, 254MB)
  테스트 16 〉 통과 (67.90ms, 87.3MB)
 */
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

  front() {
    if (this.empty()) return -1;
    return this.head.item;
  }

  back() {
    if (this.empty()) return -1;
    return this.tail.item;
  }
}

function solution(n, roads, sources, destination) {
  const adj = [...Array(n + 1)].map(() => []);
  roads.forEach((road) => {
    const [node1, node2] = road;
    adj[node1].push(node2);
    adj[node2].push(node1);
  });

  const bfs = (start) => {
    if (start === destination) return 0;

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
          if (there === destination) return distance[destination];
        }
      }
    }
    return distance[destination];
  };

  const answer = sources.reduce((acc, src) => {
    if (adj[destination].length === 0 && src !== destination) {
      acc.push(-1);
    } else {
      acc.push(bfs(src));
    }
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
