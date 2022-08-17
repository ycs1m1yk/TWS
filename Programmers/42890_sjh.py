from itertools import combinations

def solution(relation):
    answer = []
    row = len(relation)
    col = len(relation[0])

    # 가능한 속성의 모든 인덱스 조합
    comb = []
    for i in range(1, col + 1):
        comb.extend(combinations(range(col), i))

    for c in comb:
        # 가능한 조합에 맞는 값 뽑아내기
        arr = []
        for rel in relation:
            tmp = []
            for k in c:
                tmp.append(rel[k])
            arr.append(tuple(tmp))

        # 유일성 체크
        if len(set(arr)) == row:
            flag = True

            # 최소성 체크
            for target in answer:
                if set(target).issubset(set(c)):
                    flag = False
                    break

            if flag:
                answer.append(c)

    return len(answer)

"""
참조: https://velog.io/@sem/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LEVEL2-%ED%9B%84%EB%B3%B4%ED%82%A4-Python
"""