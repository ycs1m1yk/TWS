import sys
input = sys.stdin.readline

n = int(input())
arr = sorted(list(map(int, input().split())))

start, end = 0, n - 1
answer = []
flag = 2000000001 # 기준값 설정 최악의 경우 10억 + 10억
while start < end:
    total = arr[start] + arr[end]

    if abs(total) < flag:
        flag = abs(total)
        answer = [arr[start], arr[end]]

    if total > 0:
        # 두 값의 합이 0보다 크면 줄이고
        end -= 1
    else:
        # 0보다 작으면 늘린다.
        start += 1

print(*answer)