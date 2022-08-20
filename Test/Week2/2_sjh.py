"""
풀이 시간: 30분
"""
from collections import defaultdict

def solution(topping):
    answer = 0
    l_table, r_table = defaultdict(int), defaultdict(int)

    for k in topping:
        r_table[k] += 1

    l_count, r_count = 0, len(set(topping))

    for i in range(len(topping)):
        t = topping[i]

        if not l_table[t]:
            l_count += 1

        l_table[t] += 1
        r_table[t] -= 1

        if r_table[t] == 0:
            r_count -= 1

        if l_count == r_count:
            answer += 1

        if l_count > r_count:
            return answer
