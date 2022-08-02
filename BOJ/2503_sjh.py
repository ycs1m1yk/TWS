import sys
from itertools import permutations
input = sys.stdin.readline

n = int(input())
nums = list(permutations(['1', '2', '3', '4', '5', '6', '7', '8', '9'], 3))

for _ in range(n):
    a, s, b = map(int, input().split())
    tmp = list(str(a))
    count = 0

    for i in range(len(nums)):
        s_count = b_count = 0
        i -= count

        for j in range(3):
            if tmp[j] == nums[i][j]:
                s_count += 1
            elif tmp[j] in nums[i]:
                b_count += 1

        if b_count != b or s_count != s:
            nums.remove(nums[i])
            count += 1

print(len(nums))

"""
소요시간 - 32분

아이디어 - 가능한 모든 경우의 수에서 strike와 ball의 수가 일치하지 않으면 지우기

풀이
1) permutaion 함수로 모든 경우의 수 구하기
2) 모든 경우의 수를 순회하며 strike와 ball 체크
3) 입력 받은 strike와 ball의 수와 일치하지 않으면 제거
4) 제거된 숫자로 인해 변경된 배열을 순서에 맞게 올바르게 검사하기 위해 인덱스 조절
"""