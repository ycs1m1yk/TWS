"""
풀이시간: 5분
"""

# Brute force
def solution(number):
    answer = 0
    for i in range(len(number)):
        for j in range(i + 1, len(number)):
            for k in range(j + 1, len(number)):
                if number[i] + number[j] + number[k] == 0:
                    answer += 1

    return answer

# 조합
from itertools import combinations

def solution(number):
    answer = 0

    for nums in combinations(number, 3):
        if sum(nums) == 0:
            answer += 1

    return answer