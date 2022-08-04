import sys
input = sys.stdin.readline

n, m = map(int, input().split())
nums = list(map(int, input().split()))
answer = []

nums.sort()

def backtracking(start):
    if len(answer) == m:
        print(*answer)
        return

    for i in range(start, n):
        if nums[i] not in answer and nums[start] <= nums[i]:
            answer.append(nums[i])
            backtracking(i)
            answer.pop()

backtracking(0)