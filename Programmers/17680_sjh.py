def solution(cacheSize, cities):
    cities = [c.upper() for c in cities] # 대소문자 구분 x
    answer = 0
    cache = []

    if cacheSize == 0:
        return len(cities) * 5

    for city in cities:
        if not city in cache: # 새로운 데이터가 들어온 경우
            if len(cache) < cacheSize: # 캐시에 공간이 남아있다면
                cache.append(city) # 캐시 추가
                answer += 5
            else: # 캐시에 공간이 남아있지 않다면
                cache.pop(0) # 가장 오래된 캐시 제거
                cache.append(city) # 새로운 캐시 추가
                answer += 5
        else: # 이미 존재하는 데이터가 들어온 경우
            cache.append(cache.pop(cache.index(city))) # 해당 데이터를 꺼낸 뒤 가장 최근 데이터 위치로 보내기
            answer += 1

    return answer


print(solution(3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))  # 50
print(solution(3, ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]))  # 21
print(solution(2,
               ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork",
                "Rome"]))  # 60
print(solution(5,
               ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork",
                "Rome"]))  # 52
print(solution(2, ["Jeju", "Pangyo", "NewYork", "newyork"]))  # 16
print(solution(0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))  # 25
