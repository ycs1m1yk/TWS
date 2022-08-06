def check(arr1, arr2):
    count = 0
    for i in range(len(arr1)):
        if arr1[i] == arr2[i]:
            count += 1

    return count


def solution(arr, target):
    answer = 0
    acountArr = []

    # 행 비교
    for i in range(len(arr)):
        acountArr.append(check(arr[i], target[i]))

    print(acountArr)

    return len(acountArr)