from collections import defaultdict

def solution(id_list, report, k):
    table = defaultdict(int)  # 누가 몇번 신고 받은지 체크하는 테이블
    answer = [0] * len(id_list)

    for repo in set(report):
        table[repo.split()[1]] += 1

    # k번 이상 신고 받은 사람(report.split(' ')[1])인 경우
    # 신고한 사람(report.split(' ')[0]) 메일 발송 횟수 1 추가
    for repo in set(report):
        if table[repo.split(' ')[1]] >= k:
            answer[id_list.index(repo.split(' ')[0])] += 1

    return answer