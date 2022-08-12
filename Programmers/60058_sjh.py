# 균형잡힌 괄호 문자열인지 판단
def balanced_index(p):
    count = 0
    for i in range(len(p)):
        if p[i] == '(':
            count += 1
        else:
            count -= 1

        if count == 0:
            return i


# 올바른 괄호 문자열인지 판단
def is_correct(s):
    stack = []
    for i in s:
        if i == '(':  # '('는 stack에 추가
            stack.append(i)
        else:  # i == ')'인 경우
            if stack == []:  # 짝이 맞는 괄호가 없다면 False
                return False
            else:
                stack.pop()  # '('가 ')'와 짝을 이루면 stack에서 '(' 하나 제거

    return stack == []


def solution(p):
    # 1. 빈 문자열인 경우 빈 문자열 반환
    if len(p) == 0:
        return ''

    # 2. 균형 잡힌 괄호 문자열로 분리
    idx = balanced_index(p)
    u = p[:idx + 1]
    v = p[idx + 1:]

    # 3. 올바른 괄호 문자열인 경우 v에 대해 재귀 호출
    if is_correct(u):
        answer = u + solution(v)  # 3-1
    else:  # 4. 올바른 괄호 문자열이 아닌 경우 아래 과정 수행
        answer = '('  # 4-1
        answer += solution(v)  # 4-2
        answer += ')'  # 4-3

        # 4-4
        u = u[1:-1]
        for i in range(len(u)):
            if u[i] == ')':
                answer += '('
            else:
                answer += ')'

    return answer

print(solution("(()())()")) # "(()())()"
print(solution(")(")) # "()"
print(solution("()))((()")) # "()(())()"