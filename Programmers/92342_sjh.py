from collections import deque

def get_score(lion_result, apeach_result):
    lion_score, apeach_score = 0, 0
    # 라이언과 어피치 각각의 점수 구하기
    for i in range(11):
        # 둘 다 0발이면 무시
        if not lion_result[i] and not apeach_result[i]:
            continue

        if lion_result[i] > apeach_result[i]:
            lion_score += 10 - i
        else:
            apeach_score += 10 - i

    return lion_score, apeach_score


def bfs(n, apeach_result):
    max_diff = 0
    result = []

    q = deque([(0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])])

    while q:
        now_target_num, lion_result = q.popleft()  # 현재 과녁 점수, 지금까지 라이언의 점수 배열

        if sum(lion_result) == n:  # 모든 화살을 다 쏜 경우 점수 차이 계산
            lion, apeach = get_score(lion_result, apeach_result)

            # 어피치의 점수가 더 높으면 무시
            if apeach >= lion:
                continue

            # 라이언의 점수가 더 높고 점수 차이가 이전 최댓값보다 크다면
            diff = lion - apeach
            if max_diff <= diff:
                # 값 갱신 후 배열 초기화 후 추가
                max_diff = diff
                result.clear()
            else:  # 라이언의 점수가 더 높지만 점수 차이가 이전 최댓값보다 작으면 무시
                continue

            result.append(lion_result)
        elif sum(lion_result) > n:  # n발 이상 화살을 쏜 경우
            continue
        elif now_target_num == 10:  # 화살을 덜 쏜 경우
            tmp = lion_result.copy()
            tmp[now_target_num] = n - sum(tmp)
            q.append((-1, tmp))
        else:  # 화살 쏘기
            # 어피치와 같은 개수의 화살을 맞춘 경우
            equal_arrows = lion_result.copy()
            equal_arrows[now_target_num] = 0
            q.append((now_target_num + 1, equal_arrows))

            # 어피치보다 하나 더 많은 화살을 맞춘 경우
            more_than_one_arrows = lion_result.copy()
            more_than_one_arrows[now_target_num] = apeach_result[now_target_num] + 1
            q.append((now_target_num + 1, more_than_one_arrows))

    return result


def solution(n, info):
    answer = bfs(n, info)

    if not answer:
        return [-1]

    return answer[0] if len(answer) == 1 else answer[-1]

print(solution(5, [2,1,1,1,0,0,0,0,0,0,0])) # [0,2,2,0,1,0,0,0,0,0,0]
print(solution(1, [1,0,0,0,0,0,0,0,0,0,0])) # [-1]
print(solution(9, [0,0,1,2,0,1,1,1,1,1,1])) # [1,1,2,0,1,2,2,0,0,0,0]
print(solution(10, [0,0,0,0,0,0,0,0,3,4,3])) # [1,1,1,1,1,1,1,1,0,0,2]