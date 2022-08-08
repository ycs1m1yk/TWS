from math import gcd


def solution(w, h):
    total = w * h
    g = gcd(w, h)
    cut = w + h - g

    return total - cut

print(solution(8, 12))