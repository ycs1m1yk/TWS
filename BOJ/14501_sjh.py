import sys
input = sys.stdin.readline

n = int(input())
days = []
prices = []
answer = 0
for _ in range(n):
    t, p = map(int, input().split())
    days.append(t)
    prices.append(p)


def process(now, tot):
    global answer

    # 마지막 날
    if now == n:
        # 현재까지 일한 금액보다 마지막날 일한 금액이 크면 갱신
        if answer < tot:
            answer = tot
        return

    # 일을 할 수 없는 경우
    if now > n:
        return

    process(now + days[now], tot + prices[now]) # 일한 금액 더하고 일한만큼 날짜 증가
    process(now + 1, tot) # 현재 날짜에 일을 하지 못하는 경우


process(0, 0)
print(answer)