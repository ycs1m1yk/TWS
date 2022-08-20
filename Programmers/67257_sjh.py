# 60분, Fail
from itertools import permutations

def solution(expression):
    answer = []
    ops = ["*", "-", "+"]
    for op in permutations(ops, 3):
        a = op[0]
        b = op[1]
        tmp_arr = []
        for i in expression.split(a):
            tmp = [f"({j})" for j in i.split(b)]
            tmp_arr.append(f"({b.join(tmp)})")

        answer.append(abs(eval(a.join(tmp_arr))))

    return max(answer)

"""
참조: https://hynnjnn.tistory.com/34
"""

