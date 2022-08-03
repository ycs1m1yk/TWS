import sys
input = sys.stdin.readline

s = list(input().rstrip())
t = list(input().rstrip())

def dfs(word):
    if word == s:
        print(1)
        sys.exit()

    if len(word) == 0:
        return 0

    if word[-1] == 'A':
        dfs(word[:-1])

    if word[0] == 'B':
        dfs(word[1:][::-1])


dfs(t)
print(0)