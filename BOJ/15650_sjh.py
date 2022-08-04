# 1
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
answer = []

def backtracking():
    if len(answer) == m:
        if m == 1:
            print(*answer)
        else:
            flag = False
            for i in range(1, m):
                if answer[i] < answer[i - 1]:
                    flag = True
                    break

            if not flag:
                print(*answer)

        return

    for i in range(1, n + 1):
        if i not in answer:
            answer.append(i)
            backtracking()
            answer.pop()

backtracking()

# 2
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
answer = []

def backtracking(start):
    if len(answer) == m:
        print(*answer)
        return

    for i in range(start, n + 1):
        if i not in answer:
            answer.append(i)
            backtracking(i + 1)
            answer.pop()

backtracking(1)