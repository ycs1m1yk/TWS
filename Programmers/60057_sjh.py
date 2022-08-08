def solution(s):
    answer = len(s)
    # 반복되는 문자열이 압축될 수 있는 최대 길이 = 입력 문자열의 길이의 절반
    for step in range(1, len(s) // 2 + 1):
        tmp = ''  # 압축된 문자열을 저장할 빈 문자열
        count = 1
        prev = s[:step]  # 앞에서부터 step만큼의 문자열 추출
        # step 크기만큼 증가시키면서 prev와 비교
        for j in range(step, len(s), step):
            # 이전 문자열과 step만큼 증가한 문자열이 같다면(압축 가능하다면) 카운팅
            if prev == s[j:j + step]:
                count += 1
            # 다른 문자열이 나왔다면(압축이 불가능 하다면)
            else:
                # 카운팅된 문자열이 1보다 크면
                if count > 1:
                    tmp += str(count) + prev  # 숫자+문자열
                else:
                    tmp += prev  # 카운팅된 문자열이 한 개라면 문자열

                count = 1
                prev = s[j:j + step]  # 상태 초기화

        # 남아있는 문자열에 대해 처리
        tmp += str(count) + prev if count > 1 else prev
        answer = min(answer, len(tmp))

    return answer

print(solution("aabbaccc")) # 7
print(solution("ababcdcdababcdcd")) # 9
print(solution("abcabcdede")) # 8
print(solution("abcabcabcabcdededededede")) # 14
print(solution("xababcdcdababcdcd")) # 17
