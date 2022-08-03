import sys
input = sys.stdin.readline

s = input().rstrip()

# 왼쪽에서부터 이동하며 팰린드롬 여부 판별
# 만약 내부의 문자열이 팰린드롬인 경우 길이 계산 후 탈출
for i in range(len(s)):
    # 내부 문자열이 팰린드롬인 경우 최단 길이 계산
    if s[i:] == s[i:][::-1]:
        print(len(s) + i)
        break