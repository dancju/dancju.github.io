---
layout: post
title: Suffix automaton

---
A suffix automaton is a DFA that accepts all suffix strings of a given text.

Actually, I don't really understand the following code.

## Template

```cpp
template<uint8_t SIGMA, size_t CAPACITY> class SAM {
  struct State {
    size_t val;
    State *pare, *trans[SIGMA];
  } pool[CAPACITY];
  State *_end, *last;
public:
  typedef const State* iterator;
  SAM(): _end(pool+1), last(pool) { memset(&pool[0], 0, sizeof(State)); }
  inline void clear() {
    _end = pool+1;
    last = pool;
    memset(&pool[0], 0, sizeof(State));
  }
  inline void insert(uint8_t x) {
    assert(0<=x && x<SIGMA);
    State *p = last, *np = _end++;
    assert(_end <= pool+CAPACITY);
    np->val = p->val+1;
    memset(np->trans, 0, sizeof np->trans);
    for(; p && p->trans[x]==0; p = p->pare)
      p->trans[x] = np;
    last = np;
    if(p==NULL) {
      np->pare = pool;
      return;
    }
    State *q = p->trans[x];
    if(p->val+1 == q->val)
      np->pare = q;
    else {
      State *nq = _end++;
      assert(_end <= pool+CAPACITY);
      nq->val = p->val+1;
      memcpy(nq->trans, q->trans, sizeof q->trans);
      nq->pare = q->pare;
      q->pare = nq;
      np->pare = nq;
      for(; p && p->trans[x]==q; p = p->pare)
        p->trans[x] = nq;
    }
  }
  inline iterator begin() const { return pool; }
  inline iterator end() const { return _end; }
  inline size_t size() const { return _end-pool; }
  inline const State& operator[](size_t x) const { return pool[x]; }
  inline void print(char i2c(uint8_t)) const {
    printf("    ");
    for(uint8_t j = 0; j < SIGMA; j++)
      printf("%3c", i2c(j));
    puts("");
    for(iterator i = pool; i < _end; i++) {
      printf("%2ld |", i-pool);
      for(uint8_t j = 0; j < SIGMA; j++)
        if(i->trans[j])
          printf("%3ld", i->trans[j]-pool);
        else
          printf("   ");
      printf(" |%3ld\n", i->val);
    }
  }
};
```

## Problems

### SPOJ LCS

Find the longest common substring of 2 strings in linear time.

```cpp
char a[250001];
SAM<26, 500000> sam;

int main() {
  scanf("%s", a);
  for(long i = 0; a[i]; i++)
    sam.insert(a[i]-'a');
  scanf("%s", a);
  long res = 0;
  for(long i = 0, p = 0, t = 0; a[i]; )
    if(sam[p].trans[a[i]-'a']) {
      p = sam[p].trans[a[i]-'a']-sam.begin();
      maximize(res, ++t);
      i++;
    } else if(p) {
      p = sam[p].pare-sam.begin();
      t = sam[p].val;
    }
    else
      i++;
  printf("%ld\n", res);
  return 0;
}
```

### SPOJ LCS2

Find the longest common substring of no more than 10 strings in linear time.

```cpp
const int N = 100000, M = 200000;
char s[N+1];
size_t v0[M], v1[M], cnt[N], topo[M];
SAM<26, M> sam;

int main() {
  scanf("%s", s);
  size_t len = strlen(s);
  for(char *i = s; *i; i++)
    sam.insert(*i-'a');
  for(long i = 0; i < sam.size(); i++)
    cnt[sam[i].val]++;
  for(long i = 0; i < len; i++)
    cnt[i+1] += cnt[i];
  for(long i = sam.size()-1; i >= 0; i--)
    topo[--cnt[sam[i].val]] = i;
  for(long p = 0; p < sam.size(); p++)
    v0[p] = sam[p].val;
  while(~scanf("%s", s)) {
    memset(v1, 0, sizeof(v1));
    for(size_t i = 0, t = 0, p = 0; s[i]; )
      if(sam[p].trans[s[i]-'a']) {
        p = sam[p].trans[s[i]-'a']-sam.begin();
        i++;
        maximize(v1[p], ++t);
      } else if(p) {
        p = sam[p].pare-sam.begin();
        t = sam[p].val;
      } else
        i++;
    for(size_t *i = topo+sam.size()-1; i >= topo; i--) {
      if(*i)
        maximize(v1[sam[*i].pare-sam.begin()], v1[*i]);
      minimize(v0[*i], v1[*i]);
    }
  }
  size_t res = 0;
  for(long p = 0; p < sam.size(); p++)
    maximize(res, v0[p]);
  printf("%ld\n", res);
  return 0;
}
```

### SPOJ NSUBSTR

```cpp
const size_t N = 250000, M = 0x60000;
SAM<26, M> sam;
char raw[N+1];
int val[N+1], topo[M], cnt[M], f[N+1];

int main() {
  gets(raw);
  int len = (int)strlen(raw);
  for(char *i = raw; *i; i++)
    sam.insert(*i = *i-'a');
  for(SAM<26, M>::iterator i = sam.begin(); i != sam.end(); i++)
    val[i->val]++;
  for(long i = 0; i < len; i++)
    val[i+1] += val[i];
  for(int i = 0; i < sam.size(); i++)
    topo[--val[sam[i].val]] = i;
  for(int i = 0, p = 0; i < len; i++)
    cnt[p = (int)(sam[p].trans[raw[i]]-sam.begin())]++;
  for(int *i = topo+sam.size()-1; i > topo; i--) {
    maximize(f[sam[*i].val], cnt[*i]);
    cnt[sam[*i].pare-sam.begin()] += cnt[*i];
  }
  for(long i = len-1; i >= 0; i--)
    maximize(f[i], f[i+1]);
  for(long i = 1; i <= len; i++)
    printf("%d\n", f[i]);
  return 0;
}
```

### POJ 1743

```cpp
const int N = 20000, M = 33529;
int n;
short raw[N];
SAM<175, M> sam;

inline void bazinga0() {
  int i0, i1;
  n--;
  sam.clear();
  scanf("%d", &i1);
  for(int i = 0; i < n; i++) {
    i0 = i1;
    scanf("%d", &i1);
    sam.insert(raw[i] = i1-i0+87);
  }
}

unsigned short val[N], topo[M];
short first[M], last[M];

inline void bazinga1() {
  memset(val, 0, sizeof val);
  for(SAM<175, M>::iterator i = sam.begin(); i != sam.end(); i++)
    val[i->val]++;
  for(short i = 1; i<=n; i++)
    val[i] += val[i-1];
  for(SAM<175, M>::iterator i = sam.begin(); i != sam.end(); i++)
    topo[--val[i->val]] = i-sam.begin();
  memset(first, 0x7f, sizeof first);
  memset(last, 0, sizeof last);
  for(long p = 0, i = 0; i < n; i++) {
    p = sam[p].trans[raw[i]]-sam.begin();
    first[p] = last[p] = i+1;
  }
  for(long j = sam.size()-1; j; j--) {
    int i = topo[j];
    minimize(first[sam[i].pare-sam.begin()], first[i]);
    maximize(last[sam[i].pare-sam.begin()], last[i]);
  }
}

int res;

inline void bazinga2() {
  res = -1;
  for(int i = 1; i < sam.size(); i++)
    if(first[i]+sam[i].val < last[i])
      maximize(res, (int)sam[i].val);
}

int main() {
  while(scanf("%d", &n), n) {
    bazinga0();
    bazinga1();
    bazinga2();
    if(res>3)
      printf("%d\n", res+1);
    else
      puts("0");
  }
  return 0;
}
```

### POJ 3415

```cpp
inline uint8_t c2i(char c) {
  if('a'<=c && c<='z')
    return c-'a';
  assert('A'<=c && c<='Z');
  return c-'A'+26;
}

const int N = 100000, M = 0x26000;
int k, n;
char s[N+1];
SAM<52, M> sam;

inline void bazinga0() {
  scanf("%s", s);
  n = (int)strlen(s);
  sam.clear();
  for(char *i = s; *i; i++) {
    *i = c2i(*i);
    sam.insert(*i);
  }
}

int val[N+1], topo[M], c[M];

inline void bazinga1() {
  memset(val, 0, sizeof val);
  for(SAM<52, M>::iterator i = sam.begin(); i != sam.end(); i++)
    val[i->val]++;
  for(int i = 1; i <= n; i++)
    val[i] += val[i-1];
  for(SAM<52, M>::iterator i = sam.begin(); i != sam.end(); i++)
    topo[--val[i->val]] = (int)(i-sam.begin());
  memset(c, 0, sizeof c);
  for(int p = 0, i = 0; i < n; i++)
    c[p = (int)(sam[p].trans[s[i]]-sam.begin())]++;
  for(int *p = topo+sam.size()-1; *p; p--)
    c[sam[*p].pare-sam.begin()] += c[*p];
}

int t[M];

inline void bazinga2() {
  long long res = 0;
  scanf("%s", s);
  size_t p = 0, l = 0;
  memset(t, 0, sizeof t);
  for(char *i = s; *i; ) {
    SAM<52, M>::iterator _ = sam[p].trans[c2i(*i)];
    if(_) {
      p = _-sam.begin();
      l++;
      i++;
      if(l >= k) {
        res += ((long long)l-max(k-1, (int)sam[p].pare->val))*c[p];
        t[_->pare-sam.begin()]++;
      }
    } else if(p) {
      p = sam[p].pare-sam.begin();
      l = sam[p].val;
    } else
      i++;
  }
  for(int *p = topo+sam.size()-1; *p; p--) {
    t[sam[*p].pare-sam.begin()] += t[*p];
    if(sam[*p].val >= k)
      res += ((long long)sam[*p].val-max(k-1, (int)sam[*p].pare->val))*c[*p]*t[*p];
  }
  cout << res << endl;
}

int main() {
  while(scanf("%d", &k), k) {
    bazinga0();
    bazinga1();
    bazinga2();
  }
  return 0;
}
```

### POJ 3294

\[\]([https://github.com/nerdDan/solutions/blob/master/POJ/3294.cpp](https://github.com/nerdDan/solutions/blob/master/POJ/3294.cpp "solution"))