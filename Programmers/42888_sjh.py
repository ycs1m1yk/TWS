def solution(record):
    answer = []
    name_table = {}

    for rec in record:
        p = rec.split(' ')
        # Enter, Change
        if len(p) == 3:
            action, id, name = p[0], p[1], p[2]
            if action == 'Enter':
                name_table[id] = name
                answer.append(id + '님이 들어왔습니다.')
            elif action == 'Change':
                name_table[id] = name
        # Leave
        else:
            action, id = p[0], p[1]
            answer.append(id + '님이 나갔습니다.')

    # 최종 결과 출력
    result = []
    for a in answer:
        uid = a.split('님이')[0]
        result.append(a.replace(uid, name_table[uid]))

    return result