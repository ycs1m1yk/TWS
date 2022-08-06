# Fail
def solution(order):
    answer = []
    tmp_arr = []
    arr = []

    curBox = order[0]
    for i in range(len(order)):
        # 현재 박스가 순서에 맞는 박스가 아닌 경우 보조 벨트로 이동
        if i + 1 != curBox:
            tmp_arr.append(i + 1)
        else:
            order.remove(curBox)
            answer.append(curBox)
            break

    tmp_arr.reverse()

    for i in range(len(tmp_arr)):
        if tmp_arr[i] != order[i]:
            break
        else:
            answer.append(order[i])

    print(answer)

    return len(answer)

"""
아 뭔가 처음으로 줄어드는 변곡점 가지고 스택 쓰면 될 것 같은데 모르겠다..
"""