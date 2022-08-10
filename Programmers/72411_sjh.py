from itertools import combinations
from collections import Counter

def solution(orders, course):
    answer = []

    for k in course:
        tmp_arr = []
        for menu_arr in orders:
            # k개로 이루어진 모든 조합 찾기
            for comb in combinations(menu_arr, k):
                menu = ''.join(sorted(comb))
                tmp_arr.append(menu)

        # 가장 많이 주문된 메뉴 순으로 정렬
        sorted_arr = Counter(tmp_arr).most_common()

        # 2개 이상 주문되고 가장 많이 주문된 메뉴가 여러 개인 경우 모두 추가
        for menu, count in sorted_arr:
            if count > 1 and count == sorted_arr[0][1]:
                answer.append(menu)

    # 사전순 정렬
    return sorted(answer)

print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])) # ["AC", "ACDE", "BCFG", "CDE"]
print(solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2,3,5])) # ["ACD", "AD", "ADE", "CD", "XYZ"]
print(solution(["XYZ", "XWY", "WXA"], [2,3,4])) # ["WX", "XY"]