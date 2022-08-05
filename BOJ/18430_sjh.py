import sys
input = sys.stdin.readline

n, m = map(int, input().split())
board = [list(map(int, input().split())) for _ in range(n)]
answer = -1e9
visited = [[False] * m for _ in range(n)]

def backtracking(x, y, cost):
    global answer

    # 가장 오른쪽까지 탐색을 마쳤으면 줄 바꿈
    if y == m:
        x += 1
        y = 0

    # 모든 좌표를 탐색했으면 정답 갱신
    if x == n:
        answer = max(answer, cost)
        return

    if not visited[x][y]:
        # 1번 부메랑 -> (x, y), (x + 1, y), (x, y - 1)
        if x + 1 < n and y - 1 >= 0 and not visited[x + 1][y] and not visited[x][y - 1]:
            visited[x][y] = visited[x + 1][y] = visited[x][y - 1] = True
            backtracking(x, y + 1, cost + (board[x][y] * 2) + board[x][y - 1] + board[x + 1][y])
            visited[x][y] = visited[x + 1][y] = visited[x][y - 1] = False

        # 2번 부메랑 -> (x, y), (x - 1, y), (x, y - 1)
        if x - 1 >= 0 and y - 1 >= 0 and not visited[x - 1][y] and not visited[x][y - 1]:
            visited[x][y] = visited[x - 1][y] = visited[x][y - 1] = True
            backtracking(x, y + 1, cost + (board[x][y] * 2) + board[x][y - 1] + board[x - 1][y])
            visited[x][y] = visited[x - 1][y] = visited[x][y - 1] = False

        # 3번 부메랑 -> (x, y), (x - 1, y), (x, y + 1)
        if x - 1 >= 0 and y + 1 < m and not visited[x - 1][y] and not visited[x][y + 1]:
            visited[x][y] = visited[x - 1][y] = visited[x][y + 1] = True
            backtracking(x, y + 1, cost + (board[x][y] * 2) + board[x][y + 1] + board[x - 1][y])
            visited[x][y] = visited[x - 1][y] = visited[x][y + 1] = False

        # 4번 부메랑 -> (x, y), (x + 1, y), (x, y + 1)
        if x + 1 < n and y + 1 < m and not visited[x + 1][y] and not visited[x][y + 1]:
            visited[x][y] = visited[x + 1][y] = visited[x][y + 1] = True
            backtracking(x, y + 1, cost + (board[x][y] * 2) + board[x][y + 1] + board[x + 1][y])
            visited[x][y] = visited[x + 1][y] = visited[x][y + 1] = False

    backtracking(x, y + 1, cost)

backtracking(0, 0, 0)
print(answer)