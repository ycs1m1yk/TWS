import sys
from collections import defaultdict
input = sys.stdin.readline

n = int(input())

table = defaultdict(int)
for _ in range(n):
    filename, extension = input().rstrip().split('.')
    table[extension] += 1

answer = []
for k, v in table.items():
    answer.append((k, v))

# 파일이름순 정렬
answer.sort(key=lambda x: x[0])

for ans in answer:
    print(*ans)