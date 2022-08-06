# 17분
def solution(want, number, discount):
    answer = 0
    total = sum(number)
    table = {}

    for i in range(len(want)):
        table[want[i]] = number[i]

    for i in range(len(discount) - total + 1):
        tmp_arr = discount[i:i + total]
        flag = True
        for k, v in table.items():
            if tmp_arr.count(k) != v:
                flag = False
                break

        if flag:
            answer += 1

    return answer