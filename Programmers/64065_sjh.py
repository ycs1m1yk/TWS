def solution(s):
    answer = []
    s = sorted(s[2:-2].split('},{'), key=len)

    for nums in s:
        for num in nums.split(','):
            if int(num) not in answer:
                answer.append(int(num))

    return answer