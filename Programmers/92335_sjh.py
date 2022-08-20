import string, math


# 진수 변환
def convert(num, base):
    tmp = string.digits + string.ascii_lowercase
    q, r = divmod(num, base)
    if q == 0:
        return tmp[r]
    else:
        return convert(q, base) + tmp[r]


# 소수 판별
def is_prime(n):
    n = int(n)
    if n == 1:
        return False
    if n == 2 or n == 3:
        return True
    for i in range(2, math.ceil(math.sqrt(n)) + 2):
        if n % i == 0:
            return False
    return True


def solution(n, k):
    answer = 0
    num = convert(n, k)
    # k진법으로 변환된 숫자를 0을 기준으로 분할하여 각 숫자를 10진수라고 가정하여 소수인지 판별하면 해결
    arr = num.split('0')

    for a in arr:
        if a != '' and is_prime(a):
            answer += 1

    return answer