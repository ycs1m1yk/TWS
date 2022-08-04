import sys
input = sys.stdin.readline

n, m = map(int, input().split())
answer = []

def backtracking(num):
    if len(answer) == m:
        print(*answer)
        return

    for i in range(1, n + 1):
        if i >= num:
            answer.append(i)
            backtracking(i)
            answer.pop()

backtracking(1)