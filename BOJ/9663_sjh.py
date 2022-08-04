import sys
input = sys.stdin.readline

def dfs(x):
    global count

    # 모든 행에 퀸을 놓을 수 있는 경우 카운팅
    if x == N:
        count += 1
        return
    else:
        # 놓을 수 없는 경우 백트래킹
        for i in range(N):
            row[x] = i # 우선 x행에 퀸을 놓고

            # x행에 퀸을 놓을 수 있는 경우 다음 행으로 이동
            if check(x):
                dfs(x + 1)

# 상하좌우 대각선 상의 퀸을 놓을 수 있는지 체크
def check(x):
    for i in range(x):
        # 같은 열에 퀸이 있거나, 대각선에 퀸이 있는 경우 놓을 수 없다
        # 행 번호의 차이 = 열 번호의 차이 -> 대각선 상의 퀸이 놓여 있는 경우
        if row[x] == row[i] or abs(row[x] - row[i]) == x - i:
            return False
    return True


N = int(input())
count = 0
# 각 행에 퀸이 놓여 있는 열을 담는 배열
# ex) 0, 1, 2, 3번째 행에 각각 2, 0, 3, 1열에 퀸이 놓여있다면 [2, 0, 3, 1]
row = [0] * N
dfs(0)
print(count)