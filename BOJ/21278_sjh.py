import sys
input = sys.stdin.readline
INF = int(1e9)

n, m = map(int, input().split())
board = [[INF] * (n + 1) for _ in range(n + 1)]
time = INF
answer = []

for _ in range(m):
    a, b = map(int, input().split())
    board[a][b] = 1
    board[b][a] = 1

# 플로이드 와샬 알고리즘을 통해 각 노드에서 모든 노드까지의 최단거리 구하기
for k in range(1, n + 1):
    board[k][k] = 0 # 자기 자신으로 가는 비용은 1로 초기화
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            board[i][j] = min(board[i][j], board[i][k] + board[k][j])

for i in range(1, n + 1):
    for j in range(1, n + 1):
        tmp = 0 # k 노드에서 치킨집까지 편도 시간
        # 치킨집이 i, j일 경우 k 노드에서 출발했을 떄의 편도 시간의 합 구하기
        for k in range(1, n + 1):
            tmp += min(board[k][i], board[k][j])

        # 왕복 시간 갱신
        if time > tmp * 2:
            time = tmp * 2
            answer = [i, j, time]

print(*answer)