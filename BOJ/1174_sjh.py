import sys
input = sys.stdin.readline

n = int(input())
answer = []

def backtracking(cur):
    answer.append(int(cur))

    # 마지막 자릿수보다 작은 숫자들만(=줄어드는 수) 현재 수 뒤에 추가
    for i in range(int(cur[-1])):
        backtracking(cur + str(i))

# 0 ~ 9까지 각 숫자를 시작으로 하여 탐색
for i in range(10):
    backtracking(str(i))

answer.sort()

# 1 ~ 1000000까지 줄어드는 수는 총 1023개 -> 1023보다 큰 수가 입력으로 들어오면 -1
if n > len(answer):
    print(-1)
else:
    print(answer[n - 1])