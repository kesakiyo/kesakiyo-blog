---
title: "[BOJ-10546] 배부른 마라토너"
date: "2019-08-28"
description: "[BOJ-10546] 배부른 마라토너 풀이"
type: blog
category: algorithm
tags: string map
---

## 문제 링크

[https://www.acmicpc.net/problem/10546](https://www.acmicpc.net/problem/10546)

## 문제 요약

$N$개의 이름이 차례대로 주어진다.

그 뒤 $N$개의 이름 중 $N−1$개가 차례대로 다시 주어진다.

이 때 다시 주어지지 않은 이름 한개를 찾는 문제다

## 문제 풀이

$N$이 최대 $10^5$이긴 하지만 한 이름의 길이가 최대 20밖에 안되기 때문에 `map`을 사용해 쉽게 해결할 수 있다.

한가지 주의할 점은 동명 이인이 존재하기 때문에 해당 이름이 한번 더 주어졌는지만 판단하면 안된다는 점이다.

## 소스 코드

```cpp
#include <stdio.h>
#include <map>
#include <string>

using namespace std;

map<string, int> cnt;
int n;
char str[22];

int main() {
    scanf("%d", &n);
    for (int i = 0 ; i < n ; ++i) {
        scanf("%s", str);
        ++cnt[str];
    }

    for (int i = 0 ; i < n - 1 ; ++i) {
        scanf("%s", str);
        int& c = cnt[str];
        if (--c == 0) {
            cnt.erase(str);
        }
    }
    printf("%s\n", cnt.begin()->first.c_str());
}
```
