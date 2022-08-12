function solution(cacheSize, cities) {
  if (cacheSize === 0) {
    return cities.length * 5;
  }

  let cache = [];
  let answer = 0;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].toLowerCase();
    const foundIdx = cache.findIndex((el) => el === city);
    if (foundIdx !== -1) {
      cache = [...cache.slice(0, foundIdx), ...cache.slice(foundIdx + 1), city];
      answer += 1;
      continue;
    }
    if (cache.length === cacheSize) {
      cache.shift();
    }
    cache.push(city);
    answer += 5;
  }
  return answer;
}
