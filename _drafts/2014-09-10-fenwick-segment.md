---
layout: post
title: Fenwick trees and Segment trees
---

Fenwick 树與線段樹用於解決區間上的統計問題。

## Problems

### POJ 2528

```cpp
#include <algorithm>
#include <bitset>
#include <cstdio>
#include <cstring>
#include <vector>
#define lowBit(x) ((x) & -(x))
#define unify(c) c.resize(unique(c.begin(), c.end()) - c.begin())

using namespace std;

int n;
int lo[10000], hi[10000];
inline void discretization() {
  vector<int> bin;
  scanf("%d", &n);
  bin.reserve(n << 2);
  for (int i = 0; i < n; i++) {
    scanf("%d%d", lo + i, hi + i);
    bin.push_back(lo[i]);
    bin.push_back(++hi[i]);
  }
  sort(bin.begin(), bin.end());
  unify(bin);
  for (int i = 0; i < n; i++) {
    lo[i] = lower_bound(bin.begin(), bin.end(), lo[i]) - bin.begin();
    hi[i] = lower_bound(bin.begin(), bin.end(), hi[i]) - bin.begin();
  }
}

const int N = 1 << 16;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

int tree[N << 1];

void update(int _, size_t lo, size_t hi, int val) {
  if (lo <= left(_) && right(_) <= hi) {
    tree[_] = val;
    return;
  }
  if (tree[_] + 1) {
    tree[_ << 1] = tree[_ << 1 | 1] = tree[_];
    tree[_] = -1;
  }
  if (lo < right(_ << 1))
    update(_ << 1, lo, hi, val);
  if (hi > right(_ << 1))
    update(_ << 1 | 1, lo, hi, val);
}

bitset<10000> s;

void query(int _, size_t lo, size_t hi) {
  if (tree[_] != -1) {
    s.set(tree[_]);
    return;
  }
  if (_ < N) {
    query(_ << 1, lo, hi);
    query(_ << 1 | 1, lo, hi);
  }
}

int main() {
  int kase;
  scanf("%d", &kase);
  while (kase--) {
    discretization();
    memset(tree, -1, sizeof tree);
    for (int i = 0; i < n; i++)
      update(1, lo[i], hi[i], i);
    s.reset();
    query(1, 0, 20000);
    printf("%zu\n", s.count());
  }
  return 0;
}
```

### POJ 3225

```cpp
#include <cstdio>

const size_t N = 1 << 17;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

char tree[N << 1] = {0, 1};

inline void pushDown(size_t _) {
  if (tree[_] == 3)
    return;
  if (!tree[_]) {
    tree[_ << 1] ^= 3;
    tree[_ << 1 | 1] ^= 3;
  } else
    tree[_ << 1] = tree[_ << 1 | 1] = tree[_];
  tree[_] = 3;
}

inline void pushUp(size_t _) {
  _ <<= 1;
  if (tree[_] == tree[_ | 1] && (tree[_] == 1 || tree[_] == 2))
    tree[_ >> 1] = tree[_];
}

void update(size_t lo, size_t hi, bool val, size_t _ = 1) {
  if (lo <= left(_) && right(_) <= hi) {
    tree[_] = 1 << val;
    return;
  }
  pushDown(_);
  if (lo < right(_ << 1))
    update(lo, hi, val, _ << 1);
  if (hi > right(_ << 1))
    update(lo, hi, val, _ << 1 | 1);
  pushUp(_);
}

void flip(size_t lo, size_t hi, size_t _ = 1) {
  if (lo <= left(_) && right(_) <= hi) {
    tree[_] ^= 3;
    return;
  }
  pushDown(_);
  if (lo < right(_ << 1))
    flip(lo, hi, _ << 1);
  if (hi > right(_ << 1))
    flip(lo, hi, _ << 1 | 1);
  pushUp(_);
}

int lo, hi;
bool first = 1;

inline void print() {
  if (!~lo)
    return;
  if (first)
    first = 0;
  else
    putchar(' ');
  printf("%c%d,%d%c", lo & 1 ? '(' : '[', lo >> 1, hi >> 1, hi & 1 ? ']' : ')');
}

void query(size_t _ = 1) {
  if (!tree[_]) {
    tree[_ << 1] ^= 3;
    tree[_ << 1 | 1] ^= 3;
    tree[_] = 3;
    query(_ << 1);
    query(_ << 1 | 1);
  } else if (tree[_] == 3) {
    query(_ << 1);
    query(_ << 1 | 1);
  } else if (tree[_] == 2) {
    if (left(_) == hi)
      hi = right(_);
    else {
      print();
      lo = left(_);
      hi = right(_);
    }
  }
}

int main() {
  char o0, o1, o2;
  while (~scanf("%c %c%d,%d%c\n", &o0, &o1, &lo, &hi, &o2)) {
    lo = lo + lo + (o1 == '(');
    hi = hi + hi - (o2 == ')') + 1;
    if (o0 == 'U')
      update(lo, hi, 1);
    else if (o0 == 'I') {
      update(0, lo, 0);
      update(hi, N, 0);
    } else if (o0 == 'D')
      update(lo, hi, 0);
    else if (o0 == 'C') {
      update(0, lo, 0);
      update(hi, N, 0);
      flip(lo, hi);
    } else
      flip(lo, hi);
  }
  lo = hi = -1;
  query();
  print();
  puts(first ? "empty set" : "");
  return 0;
}
```

### POJ 3468

```cpp
#include <cstdio>

typedef long long llong;

const size_t N = 1 << 17;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

struct Segment {
  llong sum;
  int add;
} tree[N << 1];

inline void sink(size_t _) {
  int t = tree[_].add;
  if (!t)
    return;
  tree[_].add = 0;
  tree[_].sum += (llong)t * length(_);
  if (N <= _)
    return;
  tree[_ << 1].add += t;
  tree[_ << 1 | 1].add += t;
}

llong sum(size_t _, size_t lo, size_t hi) {
  sink(_);
  if (lo <= left(_) && right(_) <= hi)
    return tree[_].sum;
  llong res = 0;
  if (lo < right(_ << 1))
    res += sum(_ << 1, lo, hi);
  if (right(_ << 1) < hi)
    res += sum(_ << 1 | 1, lo, hi);
  return res;
}

inline void add(size_t lo, size_t hi, int val) {
  llong t0 = 0, t1 = 0;
  for (lo += N - 1, hi += N; lo ^ hi ^ 1; lo >>= 1, hi >>= 1) {
    if (~lo & 1) {
      tree[lo ^ 1].add += val;
      t0 += (llong)val * length(lo ^ 1);
    }
    if (hi & 1) {
      tree[hi ^ 1].add += val;
      t1 += (llong)val * length(hi ^ 1);
    }
    tree[lo >> 1].sum += t0;
    tree[hi >> 1].sum += t1;
  }
  t0 += t1;
  for (lo >>= 1; lo; lo >>= 1)
    tree[lo].sum += t0;
}

int main() {
  int n, q;
  scanf("%d%d", &n, &q);
  for (int i = N; i < N + n; i++)
    scanf("%lld", &tree[i].sum);
  for (int i = N - 1; i; i--)
    tree[i].sum = tree[i << 1].sum + tree[i << 1 | 1].sum;
  while (q--) {
    char _;
    int lo, hi, val;
    scanf("%*c%c", &_);
    if (_ == 'Q') {
      scanf("%d%d", &lo, &hi);
      printf("%lld\n", sum(1, lo - 1, hi));
    } else {
      scanf("%d%d%d", &lo, &hi, &val);
      add(lo - 1, hi, val);
    }
  }
  return 0;
}
```

### POJ 3667

```cpp
#include <algorithm>
#include <cstdio>

using namespace std;

const size_t N = 1 << 16;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

unsigned short vm[N << 1], vl[N << 1], vr[N << 1];

void update(int lo, int hi, bool val, int _ = 1) {
  if (lo <= left(_) && right(_) <= hi) {
    if (val)
      vm[_] = vl[_] = vr[_] = length(_);
    else
      vm[_] = vl[_] = vr[_] = 0;
    return;
  }
  if (!vm[_])
    vm[_ << 1] = vl[_ << 1] = vr[_ << 1] = vm[_ << 1 | 1] = vl[_ << 1 | 1] =
        vr[_ << 1 | 1] = 0;
  else if (vm[_] == length(_))
    vm[_ << 1] = vl[_ << 1] = vr[_ << 1] = vm[_ << 1 | 1] = vl[_ << 1 | 1] =
        vr[_ << 1 | 1] = length(_ << 1);
  int mid = right(_ << 1);
  if (lo < mid)
    update(lo, hi, val, _ << 1);
  if (hi > mid)
    update(lo, hi, val, _ << 1 | 1);
  vl[_] = vl[_ << 1] + (vm[_ << 1] == length(_ << 1) ? vl[_ << 1 | 1] : 0);
  vr[_] = vr[_ << 1 | 1] + (vm[_ << 1 | 1] == length(_ << 1) ? vr[_ << 1] : 0);
  vm[_] =
      max((int)max(vm[_ << 1], vm[_ << 1 | 1]), vr[_ << 1] + vl[_ << 1 | 1]);
}

int query(int len, int _ = 1) {
  if (vm[_] < len)
    return -1;
  if (vl[_] >= len)
    return left(_);
  int res = query(len, _ << 1);
  if (~res)
    return res;
  if (vr[_ << 1] + vl[_ << 1 | 1] >= len)
    return right(_ << 1) - vr[_ << 1];
  return query(len, _ << 1 | 1);
}

int main() {
  int n, m;
  scanf("%d%d\n", &n, &m);
  update(0, n, 1);
  while (m--) {
    char o = getchar();
    int lo, len;
    if (o == '1') {
      scanf("%d\n", &len);
      lo = query(len);
      printf("%d\n", lo + 1);
      if (~lo)
        update(lo, lo + len, 0);
    } else {
      scanf("%d%d\n", &lo, &len);
      lo -= 1;
      update(lo, lo + len, 1);
    }
  }
  return 0;
}
```

### SPOJ GSS1

```cpp
#include <algorithm>
#include <climits>
#include <cstdio>

using namespace std;

template <class T> inline T maximize(T &a, const T &b) {
  return a = a < b ? b : a;
}

const size_t N = 1 << 16;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

int sum[N << 1], ma[N << 1], lma[N << 1], rma[N << 1];

int query(int lo, int hi, int &t0, int &t1, int _ = 1) {
  if (lo <= left(_) && right(_) <= hi) {
    maximize(t1, max(t0 + lma[_], ma[_]));
    t0 = max(t0 + sum[_], rma[_]);
    return t1;
  }
  if (lo < right(_ << 1))
    query(lo, hi, t0, t1, _ << 1);
  if (hi > right(_ << 1))
    query(lo, hi, t0, t1, _ << 1 | 1);
  return t1;
}

inline int query(int lo, int hi) {
  int t = 0, res = INT_MIN;
  query(lo, hi, t, res);
  return res;
}

int main() {
  int n;
  scanf("%d", &n);
  for (int i = N; i < N + n; i++) {
    scanf("%d", sum + i);
    lma[i] = rma[i] = ma[i] = sum[i];
  }
  for (int i = N - 1; i; i--) {
    sum[i] = sum[i << 1] + sum[i << 1 | 1];
    ma[i] = max(max(ma[i << 1], ma[i << 1 | 1]), rma[i << 1] + lma[i << 1 | 1]);
    lma[i] = max(lma[i << 1], sum[i << 1] + lma[i << 1 | 1]);
    rma[i] = max(rma[i << 1 | 1], sum[i << 1 | 1] + rma[i << 1]);
  }
  scanf("%d", &n);
  while (n--) {
    int lo, hi;
    scanf("%d%d", &lo, &hi);
    printf("%d\n", query(--lo, hi));
  }
  return 0;
}
```

### SPOJ GSS3

```cpp
#include <algorithm>
#include <climits>
#include <cstdio>

using namespace std;

template <class T> inline T maximize(T &a, const T &b) {
  return a = a < b ? b : a;
}

const size_t N = 1 << 16;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

int sum[N << 1], ma[N << 1], lma[N << 1], rma[N << 1];

inline void swim(int i) {
  sum[i] = sum[i << 1] + sum[i << 1 | 1];
  ma[i] = max(max(ma[i << 1], ma[i << 1 | 1]), rma[i << 1] + lma[i << 1 | 1]);
  lma[i] = max(lma[i << 1], sum[i << 1] + lma[i << 1 | 1]);
  rma[i] = max(rma[i << 1 | 1], sum[i << 1 | 1] + rma[i << 1]);
}

int query(int lo, int hi, int &t0, int &t1, int _ = 1) {
  if (lo <= left(_) && right(_) <= hi) {
    maximize(t1, max(t0 + lma[_], ma[_]));
    t0 = max(t0 + sum[_], rma[_]);
    return t1;
  }
  if (lo < right(_ << 1))
    query(lo, hi, t0, t1, _ << 1);
  if (hi > right(_ << 1))
    query(lo, hi, t0, t1, _ << 1 | 1);
  return t1;
}

inline int query(int lo, int hi) {
  int t = 0, res = INT_MIN;
  query(lo, hi, t, res);
  return res;
}

int main() {
  int n;
  scanf("%d", &n);
  for (int i = N; i < N + n; i++) {
    scanf("%d", sum + i);
    lma[i] = rma[i] = ma[i] = sum[i];
  }
  for (int i = N - 1; i; i--)
    swim(i);
  scanf("%d", &n);
  while (n--) {
    int o, a, b;
    scanf("%d%d%d", &o, &a, &b);
    if (!o) {
      sum[a += N - 1] = b;
      lma[a] = rma[a] = ma[a] = sum[a];
      for (a >>= 1; a; a >>= 1)
        swim(a);
    } else
      printf("%d\n", query(--a, b));
  }
  return 0;
}
```

### SPOJ GSS4

```cpp
#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>

using namespace std;

const size_t N = 1 << 17;
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

long long sum[N << 1];

void update(int lo, int hi, int _ = 1) {
  if (sum[_] == length(_))
    return;
  if (N <= _) {
    sum[_] = sqrt(sum[_]);
    return;
  }
  if (lo < right(_ << 1))
    update(lo, hi, _ << 1);
  if (hi > right(_ << 1))
    update(lo, hi, _ << 1 | 1);
  sum[_] = sum[_ << 1] + sum[_ << 1 | 1];
}

inline long long query(int lo, int hi, int _ = 1) {
  long long res = 0;
  for (lo += N - 1, hi += N; lo ^ hi ^ 1; lo >>= 1, hi >>= 1) {
    if (~lo & 1)
      res += sum[lo ^ 1];
    if (hi & 1)
      res += sum[hi ^ 1];
  }
  return res;
}

int main() {
  int n;
  for (int iCase = 1; ~scanf("%d", &n); iCase++) {
    printf("Case #%d:\n", iCase);
    memset(sum, 0, sizeof sum);
    for (int i = N; i < N + n; i++)
      scanf("%lld", sum + i);
    for (int i = N - 1; i; i--)
      sum[i] = sum[i << 1] + sum[i << 1 | 1];
    scanf("%d", &n);
    while (n--) {
      char o;
      int lo, hi;
      scanf("\n%c%d%d", &o, &lo, &hi);
      if (lo > hi)
        swap(lo, hi);
      --lo;
      if (o == '0')
        update(lo, hi);
      else
        printf("%lld\n", query(lo, hi));
    }
    putchar('\n');
  }
  return 0;
}
```

### SPOJ GSS5

```cpp
#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>

using namespace std;

template <class T> inline T maximize(T &a, const T &b) {
  return a = a < b ? b : a;
}

const size_t N = 1 << 14;
long long d[N << 1], dl[N << 1], dm[N << 1], dr[N << 1];
inline size_t x(size_t _) { return 63 - __builtin_clzll(_); }
inline size_t y(size_t _) { return _ - (1 << x(_)); }
inline size_t length(size_t _) { return N >> x(_); }
inline size_t left(size_t _) { return y(_) * length(_); }
inline size_t right(size_t _) { return (1 + y(_)) * length(_); }

int sum[N << 1], ma[N << 1], lma[N << 1], rma[N << 1];

int querysum(int lo, int hi, int _ = 1) {
  if (lo >= hi)
    return 0;
  if (lo <= left(_) && right(_) <= hi)
    return sum[_];
  int res = 0;
  if (lo < right(_ << 1))
    res += querysum(lo, hi, _ << 1);
  if (hi > right(_ << 1))
    res += querysum(lo, hi, _ << 1 | 1);
  return res;
}

int querylma(int lo, int hi, int _ = 1) {
  if (lo >= hi)
    return 0;
  if (lo <= left(_) && right(_) <= hi)
    return lma[_];
  if (hi <= right(_ << 1))
    return querylma(lo, hi, _ << 1);
  if (lo >= right(_ << 1))
    return querylma(lo, hi, _ << 1 | 1);
  return max(querylma(lo, hi, _ << 1),
             querysum(lo, hi, _ << 1) + querylma(lo, hi, _ << 1 | 1));
}

int queryrma(int lo, int hi, int _ = 1) {
  if (lo >= hi)
    return 0;
  if (lo <= left(_) && right(_) <= hi)
    return rma[_];
  if (hi <= right(_ << 1))
    return queryrma(lo, hi, _ << 1);
  if (lo >= right(_ << 1))
    return queryrma(lo, hi, _ << 1 | 1);
  return max(queryrma(lo, hi, _ << 1 | 1),
             querysum(lo, hi, _ << 1 | 1) + queryrma(lo, hi, _ << 1));
}

int querymax(int lo, int hi, int _ = 1) {
  if (lo >= hi)
    return 0;
  if (lo <= left(_) && right(_) <= hi)
    return ma[_];
  if (hi <= right(_ << 1))
    return querymax(lo, hi, _ << 1);
  if (lo >= right(_ << 1))
    return querymax(lo, hi, _ << 1 | 1);
  return max(max(querymax(lo, hi, _ << 1 | 1), querymax(lo, hi, _ << 1)),
             queryrma(lo, hi, _ << 1) + querylma(lo, hi, _ << 1 | 1));
}

int main() {
  int kase;
  scanf("%d", &kase);
  while (kase--) {
    int n;
    scanf("%d", &n);
    memset(sum, 0, sizeof sum);
    memset(ma, 0, sizeof ma);
    memset(lma, 0, sizeof lma);
    memset(rma, 0, sizeof rma);
    for (int i = N; i < N + n; i++) {
      scanf("%d", sum + i);
      ma[i] = lma[i] = rma[i] = sum[i];
    }
    for (int i = N - 1; i; i--) {
      int l = i << 1, r = i << 1 | 1;
      sum[i] = sum[l] + sum[r];
      ma[i] = max(max(ma[l], ma[r]), rma[l] + lma[r]);
      lma[i] = max(lma[l], sum[l] + lma[r]);
      rma[i] = max(rma[r], rma[l] + sum[r]);
    }
    scanf("%d", &n);
    while (n--) {
      int lo0, hi0, lo1, hi1;
      scanf("%d%d%d%d", &lo0, &hi0, &lo1, &hi1);
      lo0--;
      lo1--;
      if (hi0 <= lo1)
        printf("%d\n",
               queryrma(lo0, hi0) + querysum(hi0, lo1) + querylma(lo1, hi1));
      else
        printf("%d\n", max(querymax(lo1, hi0),
                           max(queryrma(lo0, lo1) + querylma(lo1, hi1),
                               queryrma(lo0, hi0) + querylma(hi0, hi1))));
    }
  }
  return 0;
}
```
