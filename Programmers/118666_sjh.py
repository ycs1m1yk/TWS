def solution(survey, choices):
    answer = ''
    score_table = {
        1: 3,
        2: 2,
        3: 1,
        4: 0,
        5: 1,
        6: 2,
        7: 3
    }

    table = {
        'R': 0,
        'T': 0,
        'C': 0,
        'F': 0,
        'J': 0,
        'M': 0,
        'A': 0,
        'N': 0
    }
    for i in range(len(survey)):
        a, b = survey[i][0], survey[i][1]
        choice = choices[i]
        if choice < 4:
            table[a] += score_table[choice]
        elif choice == 4:
            continue
        else:
            table[b] += score_table[choice]

    result = list(table.items())
    for i in range(0, len(result) - 1, 2):
        a, b = result[i:i + 2][0], result[i:i + 2][1]
        if a[1] > b[1]:
            answer += a[0]
        elif a[1] == b[1]:
            tmp = [a[0], b[0]]
            tmp.sort()
            answer += tmp[0]
        else:
            answer += b[0]

    return answer