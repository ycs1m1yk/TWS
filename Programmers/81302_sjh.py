from collections import deque


def bfs(candidates, place):
    # 상하좌우 탐색
    dx = [1, -1, 0, 0]
    dy = [0, 0, 1, -1]

    # 각 응시자를 시작점으로 BFS 탐색
    for i, j in candidates:
        q = deque()
        q.append((i, j))
        visited = [[False] * 5 for _ in range(5)]
        distance = [[0] * 5 for _ in range(5)]
        visited[i][j] = True

        while q:
            x, y = q.popleft()
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]

                # 범위를 벗어나지 않고 방문하지 않은 노드인 경우
                if 0 <= nx < 5 and 0 <= ny < 5 and not visited[nx][ny]:
                    # 방문 노드가 파티션일 경우 무시
                    if place[nx][ny] == 'X':
                        continue

                    # 방문 노드가 테이블이라면 이동 가능
                    if place[nx][ny] == 'O':
                        q.append((nx, ny))
                        visited[nx][ny] = True  # 방문 처리
                        distance[nx][ny] = distance[x][y] + 1  # 이동 거리 1 증가

                    # 방문 노드가 응시자이면서 이동 거리가 2 미만이라면 거리두기 미준수
                    if place[nx][ny] == 'P' and distance[x][y] <= 1:
                        return 0

    # 모든 노드 탐색 완료 == 모든 응시자가 거리두기 준수
    return 1


def solution(places):
    answer = []

    for place in places:
        candidates = []
        # 모든 응시자의 위치 구하기
        for i in range(5):
            for j in range(5):
                if place[i][j] == 'P':
                    candidates.append((i, j))

        # 각 응시자의 위치를 시작 노드로 하는 BFS 탐색 수행
        answer.append(bfs(candidates, place))

    return answer

print(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
                ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
                ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
                ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
                ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]
                ]
               )) # [1, 0, 1, 1, 1]
