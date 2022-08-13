"""
풀이 시간: 40분 + 30분
"""

# 1, 다익스트라 우선순위 큐 이용 - Fail(12.5)
import heapq
INF = int(1e9)

def dijkstra(start, graph, distance):
    q = []
    heapq.heappush(q, (0, start))
    distance[start] = 0

    while q:
        dist, now = heapq.heappop(q)

        if distance[now] < dist:
            continue

        for i in graph[now]:
            cost = dist + i[1]

            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))

def solution(n, roads, sources, destination):
    answer = []

    for start in sources:
        graph = [[] for _ in range(n + 1)]
        distance = [INF] * (n + 1)

        for road in roads:
            a, b = road
            graph[a].append((b, 1))

        dijkstra(start, graph, distance)

        if distance[destination] == INF:
            answer.append(-1)
        else:
            answer.append(distance[destination])

    return answer

# 2, BFS - TLE(68.8)
from collections import deque


def bfs(n, start, graph, destination):
    q = deque([start])
    distance = [-1] * (n + 1)
    distance[start] = 0

    while q:
        now = q.popleft()
        for next_node in graph[now]:
            if distance[next_node] == -1:
                q.append(next_node)
                distance[next_node] = distance[now] + 1

                if next_node == destination:
                    return distance[destination]

    return distance[destination]


def solution(n, roads, sources, destination):
    answer = []
    graph = [[] for _ in range(n + 1)]

    for road in roads:
        a, b = road
        graph[a].append(b)
        graph[b].append(a)

    for start in sources:
        answer.append(bfs(n, start, graph, destination))

    return answer