# 정확성 O, 효율성 X
def solution(info, query):
    answer = []

    for q in query:
        q = q.replace('and', '')
        q = q.split()
        count = 0
        for i in info:
            i = i.split()
            flag = True
            # 점수 비교
            if int(i[4]) < int(q[4]):
                flag = False
            else:
                # 언어, 직군, 경력, 소울푸드 비교
                for idx in range(4):
                    if q[idx] == '-':
                        continue
                    else:
                        if q[idx] != i[idx]:
                            flag = False
                            break

            # 모든 조건에 만족하면 카운팅
            if flag:
                count += 1

        answer.append(count)

    return answer