import sys
input = sys.stdin.readline

n, m = map(int, input().split())
nums = list(map(int, input().split()))
answer = []

nums.sort()

def backtracking():
    if len(answer) == m:
        print(*answer)
        return

    for num in nums:
        if num not in answer:
            answer.append(num)
            backtracking()
            answer.pop()

backtracking()