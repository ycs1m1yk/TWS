# 30분
from collections import Counter

def solution(X, Y):
    atable = Counter(X)
    btable = Counter(Y)
    answer = []

    arr1 = []
    arr2 = []

    for k, v in atable.items():
        arr1.append((k, v))

    for k, v in btable.items():
        arr2.append((k, v))

    arr1.sort(key=lambda x: x[1], reverse=True)
    arr2.sort(key=lambda x: x[1], reverse=True)

    for i in range(len(arr1)):
        for j in range(len(arr2)):
            if arr1[i][0] == arr2[j][0]:
                if arr1[i][1] >= arr2[j][1]:
                    count = arr2[j][1]
                else:
                    count = arr1[i][1]

                for _ in range(count):
                    answer.append(arr1[i][0])

    if len(answer) == 0:
        return "-1"
    elif len(answer) == answer.count('0'):
        return "0"
    else:
        return ''.join(sorted(answer, reverse=True))