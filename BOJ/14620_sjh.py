import sys
from itertools import combinations
input = sys.stdin.readline

# 5개 방향 탐색
dx = [0, 0, 0, 1, -1]
dy = [0, 1, -1, 0, 0]
def process(arr):
    global answer

    tot = 0
    visited = [] # 방문 처리
    for x, y in arr:
        for i in range(5):
            nx = x + dx[i]
            ny = y + dy[i]
            if [nx, ny] not in visited:
                tot += board[nx][ny]
                visited.append([nx, ny])
            else:
                return
    answer = min(answer, tot)


n = int(input())

board = [list(map(int, input().split())) for _ in range(n)]
answer = 1e9

# 꽃이 필 수 있는 모든 좌표
locs = []
for i in range(1, n - 1):
    for j in range(1, n - 1):
        locs.append((i, j))

# 중복 없이 3개의 좌표 추출
for comb in combinations(locs, 3):
    process(comb)

print(answer)