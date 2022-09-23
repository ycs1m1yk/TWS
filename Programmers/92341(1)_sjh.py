from collections import defaultdict
import math


def solution(fees, records):
    d_time, d_price, p_time, p_price = fees
    last_time = 23 * 60 + 59  # 마지막 출차 시간

    parking_table = defaultdict(int)
    time_table = defaultdict(int)

    # 출차 시간이 없는 경우를 위해 역으로 탐색
    for record in reversed(records):
        time, number, action = record.split(' ')
        time = int(time.split(':')[0]) * 60 + int(time.split(':')[1]) # 분으로 변환

        if action == 'OUT':
            time_table[number] = time
        else:
            if time_table[number] != 0:
                parking_time = time_table[number] - time
                parking_table[number] += parking_time
                time_table[number] = 0
            else:
                parking_table[number] += last_time - time

    # 차량 번호 낮은 순으로 정렬
    result = sorted(list(parking_table.items()), key=lambda x: x[0])
    answer = []

    for res in result:
        car_num, total_time = res
        if total_time <= d_time: # 기본 시간 미만인 경우 기본 요금 부과
            answer.append(d_price)
        else: # 기본 시간 초과인 경우 요금 계산
            price = 0
            price += d_price
            price += math.ceil((total_time - d_time) / p_time) * p_price
            answer.append(price)

    return answer