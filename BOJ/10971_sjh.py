import sys
input = sys.stdin.readline

n = int(input())
board = [list(map(int, input().split())) for _ in range(n)]
answer = int(1e9)

# 시작 도시, 다음 도시, 현재까지 비용, 현재까지 방문 도시 목록
def dfs(start, next, cost, visited):
    global answer

    if len(visited) == n:
        if board[next][start] != 0:
            # 현재까지 비용 + 출발 도시로 가는 비용
            answer = min(answer, cost + board[next][start])
            return

    for i in range(1, n):
        if board[next][i] != 0 and i not in visited and i != start:
            visited.append(i)
            dfs(start, i, cost + board[next][i], visited)
            visited.pop()


for i in range(n):
    dfs(i, i, 0, [i])

print(answer)