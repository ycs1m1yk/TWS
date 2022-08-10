def zacard(inter, uni):
    if len(inter) == len(uni):
        return 65536

    return int(len(inter) / len(uni) * 65536)


def solution(str1, str2):
    arr1 = []
    arr2 = []

    # 두 글자씩 문자열 분리
    for i in range(len(str1) - 1):
        if str1[i: i + 2].isalpha():
            arr1.append(str1[i: i + 2].lower())

    for i in range(len(str2) - 1):
        if str2[i: i + 2].isalpha():
            arr2.append(str2[i: i + 2].lower())

    tmp = arr1.copy()
    union = arr1.copy()
    intersection = []

    for i in arr2:
        # 다중 합집합 구하기
        if i not in tmp:
            union.append(i)
        else:
            tmp.remove(i)

        # 다중 교집합 구하기
        if i in arr1:
            arr1.remove(i)
            intersection.append(i)

    # print(intersection)
    # print(union)

    return zacard(intersection, union)

print(solution("FRANCE", "french")) # 16384
print(solution("handshake", "shake hands")) # 65536
print(solution("aa1+aa2", "AAAA12")) # 43690
print(solution("E=M*C^2", "e=m*c^2")) # 65536