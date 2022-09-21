def solution(n, arr1, arr2):
    answer = []
    for (i, j) in zip(arr1, arr2):
        row = bin(i | j)[2:]  # a와 b OR 연산
        row = row.rjust(n)  # 오른쪽 정렬
        row = row.replace('1', '#')
        row = row.replace('0', ' ')
        answer.append(row)

    return answer