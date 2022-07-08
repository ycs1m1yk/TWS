import sys
input = sys.stdin.readline

def check(word):
    left, right = 0, len(word) - 1
    while left < right:
        # 양 쪽 문자가 같으면 투 포인터 값 조정
        if word[left] == word[right]:
            left += 1
            right -= 1
        else:
            # 양 쪽 문자가 다르면
            # 1) 오른쪽 문자를 제거하고 회문인지 판단
            # 2) 왼쪽 문자를 제거하고 회문인지 판단
            # 3) 위 경우가 허용되지 않으면 일반 문자
            if word[left] == word[right - 1]:
                tmp = word[:right] + word[right + 1:]
                if tmp[:] == tmp[::-1]:
                    return 1

            if word[left + 1] == word[right]:
                tmp = word[:left] + word[left + 1:]
                if tmp[:] == tmp[::-1]:
                    return 1

            return 2

    # 문제없이 탐색이 끝났다면 정상 회문
    return 0

n = int(input())

for _ in range(n):
    word = input().rstrip()
    print(check(word))