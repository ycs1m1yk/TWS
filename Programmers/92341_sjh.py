# 50분
from collections import defaultdict
import math


def time_parser(time):
    time = time.split(':')
    return int(time[0]) * 60 + int(time[1])


def solution(fees, records):
    answer = []
    time_table = defaultdict(int)
    acc_time_table = defaultdict(int)
    check_table = {}
    d_time, d_price, p_time, p_price = fees

    for record in records:
        rec = record.split(' ')

        if rec[2] == 'IN':  # 입차
            time_table[rec[1]] = time_parser(rec[0])  # 입차 시간 저장
            check_table[rec[1]] = (rec[1], True)
        else:  # 출차
            in_time = time_table[rec[1]]  # 입차 시간
            out_time = time_parser(rec[0])  # 출차 시간
            using_time = out_time - in_time  # 주차 시간
            acc_time_table[rec[1]] += using_time  # 누적 주차 시간 더하기
            check_table[rec[1]] = (rec[1], False)

    # 출차 기록 없는 경우 체크
    for v in check_table.values():
        if v[1]:
            # 거꾸로 탐색
            tmp_records = records[:][::-1]
            for record in tmp_records:
                rec = record.split(' ')
                # 같은 차량인 경우
                if rec[1] == v[0] and check_table[rec[1]][1]:
                    acc_time_table[rec[1]] += time_parser("23:59") - time_parser(rec[0])
                    check_table[rec[1]] = (rec[1], False)

    # 요금 계산
    for car_num, time in acc_time_table.items():
        if time <= d_time:
            answer.append((car_num, d_price))
        else:
            price = d_price + math.ceil(((time - d_time) / p_time)) * p_price
            answer.append((car_num, int(price)))

    # 차량 번호 낮은 순서대로 출력
    answer.sort(key=lambda x: x[0])
    result = []
    for ans in answer:
        result.append(ans[1])

    return result