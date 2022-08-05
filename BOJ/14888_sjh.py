import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))
add, sub, mul, div = map(int, input().split())
min_value = 1e9
max_value = -1e9

# 깊이, 현재 값
def backtracking(idx, value):
    global min_value, max_value, add, sub, mul, div

    # 모든 숫자를 탐색했을 경우 정답 갱신
    if idx == n:
        min_value = min(min_value, value)
        max_value = max(max_value, value)
    else:
        # 연산자의 남은 개수에 따라 백트래킹
        if add > 0:
            add -= 1
            backtracking(idx + 1, value + nums[idx])
            add += 1
        if sub > 0:
            sub -= 1
            backtracking(idx + 1, value - nums[idx])
            sub += 1
        if mul > 0:
            mul -= 1
            backtracking(idx + 1, value * nums[idx])
            mul += 1
        if div > 0:
            div -= 1
            # 나눗셈의 경우 현재 값이 음수일 경우와 양수일 경우를 구분하여 백트래킹 진행
            if value < 0:
                backtracking(idx + 1, -(abs(value) // nums[idx]))
            else:
                backtracking(idx + 1, value // nums[idx])
            div += 1


backtracking(1, nums[0])
print(max_value)
print(min_value)
