import sys
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))

l, r, answer, odd_count, tmp_count = 0, -1, 0, 0, 0

while True:
    # 범위 내의 k개 이하의 홀수가 있다면 정답 갱신 후 범위 늘리기(right 증가)
    if odd_count <= k:
        answer = max(answer, tmp_count - odd_count)

    if odd_count <= k:

        # 유효 범위 체크
        r += 1
        if r >= n:
            break

        if arr[r] % 2 == 1:
            odd_count += 1
        tmp_count += 1
    else:
        # k개 이상의 홀수가 있으면 범위 줄이기(left 증가)
        if arr[l] % 2 == 1:
            odd_count -= 1
        tmp_count -= 1

        # 유효 범위 체크
        l += 1
        if l > r:
            break

print(answer)