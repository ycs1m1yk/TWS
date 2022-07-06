import sys
input = sys.stdin.readline

word = list(input().rstrip())

i = 0
while i < len(word):
    # 시작
    if word[i] == '<':
        # 끝나는 괄호 만날때까지 인덱스 증가
        while word[i] != '>':
            i += 1
        i += 1 # > 다음 문자로 인덱스 이동
    elif word[i].isalnum():
        start = i # 알파벳 시작 인덱스

        # 알파벳인 경우 증가
        while i < len(word) and word[i].isalnum():
            i += 1

        # 알파벳 뒤집기
        tmp = word[start:i]
        tmp.reverse()
        word[start:i] = tmp
    else: # 공백인 경우 인덱스 증가
        i += 1

print(''.join(word))