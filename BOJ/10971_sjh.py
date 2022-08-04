# 1, 500ms
import sys
input = sys.stdin.readline

n = int(input())
board = [list(map(int, input().split())) for _ in range(n)]
answer = int(1e9)

def dfs(start, next, cost, visited):
    global answer

    # 모든 도시를 순회한 경우
    if len(visited) == n:
        # 출발 도시로 돌아가는 비용이 0이 아니라면 정답 갱신
        if board[next][start] != 0:
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

# 2, 1396ms
import sys
input = sys.stdin.readline

n = int(input())
board = [list(map(int, input().split())) for _ in range(n)]
answer = int(1e9)

# 시작 도시, 현재 도시, 현재까지 비용
def dfs(start, cur, cost):
    global answer, visited

    # 현재 도시가 출발 도시와 같고 모든 도시를 방문했다면 정답 갱신
    if start == cur and visited.count(False) == 0:
        answer = min(answer, cost)

    for i in range(n):
        if not visited[i] and board[cur][i] != 0:
            visited[i] = True
            dfs(start, i, cost + board[cur][i])
            visited[i] = False

visited = [False] * n
dfs(0, 0, 0)

print(answer)