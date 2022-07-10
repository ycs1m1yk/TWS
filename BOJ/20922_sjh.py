import sys
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))

l, r = 0, 0
answer = 0
count = [0] * (max(arr) + 1) # 원소 등장 횟수 체크

while r < n:
    if count[arr[r]] < k:
        # 현재 원소가 k번 이하로 등장했다면 해당 원소 카운트하고 범위 확장
        count[arr[r]] += 1
        r += 1
    else:
        # k번을 초과하여 등장했다면 해당 원소 하나 줄이고 범위 줄이기
        count[arr[l]] -= 1
        l += 1

    # 최장 길이 계산
    answer = max(answer, r - l)

print(answer)