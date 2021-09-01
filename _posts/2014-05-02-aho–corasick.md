---
layout: post
title: Aho–Corasick String Matching Algorithm
---

Given string $s$ and a set of strings $\left.p\_i\middle\|\_{i=1}^n\right.$ (the "patterns"), the algorithm [^aho1975efficient] finds all sub-strings of $s$ that equals to any pattern $p\_i$. The time complexity is $O\left(\|s\|+\sum_i\|p_i\|\right)$.

The Knuth–Morris–Pratt algorithm (KMP algorithm) is the special case of the AC algorithm where only one pattern string is allowed, which is why textbooks usually put KMP before AC. Counter-intuitively, in my experience, AC is easier to understand than KMP, even if it is logically more complex. If you find the "failure function" (a.k.a. "partial match table") in KMP difficult to understand, try learning AC first, where the failure function represented as a topological diagram may give you some insight.

# A C++ implementation

The following is my implementation of the Aho-Corasick automaton in C++ for competitive programming, where "virtual pointers" denoted by indices of the nodes in an array instead of actual C pointers represent the automaton. Such an implementation saves time on memory allocation and deallocation, which makes it advantageous in competitive programming.

```cpp
template<uint8_t SIGMA> struct AC {
  struct State {
    short depth;
    size_t fail, go[SIGMA];
    vector<short> output;
  };
  short iOutput;
  vector<State> state;
  AC(): iOutput(0) { state.push_back(State()); }
  inline void clear() {
    iOutput = 0;
    state.clear();
    state.push_back(State());
  }
  template<class I> inline void insertPattern(I lo, I hi) {
    assert(lo < hi);
    size_t p = 0;
    for(I i = lo; i!=hi; i++) {
      assert(0<=*i && *i<SIGMA);
      if(!state[p].go[*i]) {
        state[p].go[*i] = state.size();
        state.push_back(State());
        state.back().depth = state[p].depth+1;
      }
      p = state[p].go[*i];
    }
    assert(iOutput>=0);
    state[p].output.push_back(iOutput++);
  }
  inline void build() {
    queue<size_t> q;
    for(uint8_t i = 0; i < SIGMA; i++)
      if(state[0].go[i])
        q.push(state[0].go[i]);
    while(q.size()) {
      size_t u = q.front();
      q.pop();
      for(uint8_t i = 0; i < SIGMA; i++) {
        size_t &v = state[u].go[i];
        if(v) {
          size_t j = state[u].fail;
          while(j && !state[j].go[i])
            j = state[j].fail;
          size_t k = state[j].go[i];
          state[v].fail = k;
          state[v].output.insert(state[v].output.end(),
              state[k].output.begin(),
              state[k].output.end());
          q.push(v);
        } else
          v = state[state[u].fail].go[i];
      }
    }
  }
  inline size_t size() const { return state.size(); }
  inline size_t go(size_t x, uint8_t y) const {
    assert(0<=x && x<state.size() && 0<=y && y<SIGMA);
    return state[x].go[y];
  }
  inline const vector<short>& output(size_t x) const {
    assert(0<=x && x<size());
    return state[x].output;
  }
  template<class I> inline void match(I lo, I hi, void action(size_t, short)) {
    assert(lo<hi);
    size_t p = 0;
    for(I i = lo; i != hi; i++) {
      assert(0<=*i && *i<SIGMA);
      p = go(p, *i);
      for(vector<short>::iterator j = state[p].output.begin();
          j!=state[p].output.end();
          j++)
        action(i-lo-state[p].depth+1, *j);
    }
  }
};
```

# Problems

## POJ 1204

String matching.

```cpp
inline char c2i(char c) {
  switch(c) {
    case 'A':
      return 0;
    case 'C':
      return 1;
    case 'G':
      return 2;
    default:
      assert(c=='T');
      return 3;
  }
};

inline char i2c(char i) {
  switch(i) {
    case 0:
      return 'A';
    case 1:
      return 'C';
    case 2:
      return 'G';
    default:
      assert(i==3);
      return 'T';
  }
}

short n;
unsigned A[1001][921];
char B[1001];
AC<4> ac;

int main() {
  for(short kase = 1; scanf("%hd", &n), n; kase++) {
    ac.clear();
    while(n--) {
      scanf("%*c%s", B);
      size_t _ = strlen(B);
      for(char *i = B; i!=B+_; i++)
        *i = c2i(*i);
      ac.insertPattern(B, B+_);
    }
    ac.build();
    scanf("%*c%s", B);
    size_t _ = strlen(B);
    memset(A, -1, sizeof(A));
    A[0][0] = 0;
    for(int i = 0; i < _; i++)
      for(int j = 0; j < ac.size(); j++)
        if(A[i][j] != UINT_MAX)
          for(short k = 0; k < 4; k++)
            if(!ac.output(ac.go(j, k)).size())
              A[i+1][ac.go(j, k)]
              = min(A[i+1][ac.go(j, k)], A[i][j]+(c2i(B[i])!=k));
    unsigned res = UINT_MAX;
    for(int j = 0; j < ac.size(); j++)
      res = min(res, A[_][j]);
    printf("Case %hd: %d\n", kase, res);
  }
  return 0;
}
```

## POJ 3691

Dynamic Programming.

```cpp
inline char c2i(char c) {
  switch(c) {
    case 'A':
      return 0;
    case 'C':
      return 1;
    case 'G':
      return 2;
    default:
      assert(c=='T');
      return 3;
  }
};

inline char i2c(char i) {
  switch(i) {
    case 0:
      return 'A';
    case 1:
      return 'C';
    case 2:
      return 'G';
    default:
      assert(i==3);
      return 'T';
  }
}

short n;
unsigned A[1001][921];
char B[1001];
AC<4> ac;

int main() {
  for(short kase = 1; scanf("%hd", &n), n; kase++) {
    ac.clear();
    while(n--) {
      scanf("%*c%s", B);
      size_t _ = strlen(B);
      for(char *i = B; i!=B+_; i++)
        *i = c2i(*i);
      ac.insertPattern(B, B+_);
    }
    ac.build();
    scanf("%*c%s", B);
    size_t _ = strlen(B);
    memset(A, -1, sizeof(A));
    A[0][0] = 0;
    for(int i = 0; i<_; i++)
      for(int j = 0; j < ac.size(); j++)
        if(A[i][j]!=UINT_MAX)
          for(short k = 0; k < 4; k++)
            if(!ac.output(ac.go(j, k)).size())
              A[i+1][ac.go(j, k)]
              = min(A[i+1][ac.go(j, k)], A[i][j]+(c2i(B[i])!=k));
    unsigned res = UINT_MAX;
    for(int j = 0; j < ac.size(); j++)
      res = min(res, A[_][j]);
    printf("Case %hd: %d\n", kase, res);
  }
  return 0;
}
```

## UVa 11468

Probability.

```cpp
inline uint8_t c2i(char x) {
  if(x>='0' && x<='9')
    return x-'0';
  if(x>='A' && x<='Z')
    return x-'A'+10;
  assert(x>='a' && x<='z');
  return x-'a'+36;
}

double prob[62], f[110][410];
AC<62> ac;

int main() {
  short nCase;
  scanf("%hd", &nCase);
  for(short iCase = 1; iCase <= nCase; iCase++) {
    short t0;
    ac.clear();
    scanf("%hd", &t0);
    while(t0--) {
      char _[21];
      scanf("%*c%s", _);
      size_t __ = strlen(_);
      for(char *i = _; i!=_+__; i++)
        *i = c2i(*i);
      ac.insertPattern(_, _+__);
    }
    ac.build();
    scanf("%hd", &t0);
    memset(prob, 0, sizeof(prob));
    while(t0--) {
      char t1;
      scanf("%*c%c", &t1);
      scanf("%lf", prob+c2i(t1));
    }
    scanf("%hd", &t0);
    memset(f, 0, sizeof(f));
    f[0][0] = 1;
    for(int i = 0; i < t0; i++)
      for(short j = 0; j < ac.size(); j++)
        if(f[i][j])
          for(short k = 0; k < 62; k++)
            if(prob[k] && !ac.output(ac.go(j, k)).size())
              f[i+1][ac.go(j, k)] += f[i][j]*prob[k];
    double res = 0;
    for(short j = 0; j < ac.size(); j++)
      res += f[t0][j];
    printf("Case #%hd: %lf\n", iCase, res);
  }
  return 0;
}
```

## UVa 11019

Two-dimensional string matching. Hashing is another method for this problem.

```cpp
inline uint8_t c2i(char x) {
  if(x>='0' && x<='9')
    return x-'0';
  if(x>='A' && x<='Z')
    return x-'A'+10;
  assert(x>='a' && x<='z');
  return x-'a'+36;
}

double prob[62], f[110][410];
AC<62> ac;

int main() {
  short nCase;
  scanf("%hd", &nCase);
  for(short iCase = 1; iCase <= nCase; iCase++) {
    short t0;
    ac.clear();
    scanf("%hd", &t0);
    while(t0--) {
      char _[21];
      scanf("%*c%s", _);
      size_t __ = strlen(_);
      for(char *i = _; i!=_+__; i++)
        *i = c2i(*i);
      ac.insertPattern(_, _+__);
    }
    ac.build();
    scanf("%hd", &t0);
    memset(prob, 0, sizeof(prob));
    while(t0--) {
      char t1;
      scanf("%*c%c", &t1);
      scanf("%lf", prob+c2i(t1));
    }
    scanf("%hd", &t0);
    memset(f, 0, sizeof(f));
    f[0][0] = 1;
    for(int i = 0; i < t0; i++)
      for(short j = 0; j < ac.size(); j++)
        if(f[i][j])
          for(short k = 0; k < 62; k++)
            if(prob[k] && !ac.output(ac.go(j, k)).size())
              f[i+1][ac.go(j, k)] += f[i][j]*prob[k];
    double res = 0;
    for(short j = 0; j < ac.size(); j++)
      res += f[t0][j];
    printf("Case #%hd: %lf\n", iCase, res);
  }
  return 0;
}
```

## POJ 2778

Counting problem. Size of state space is `2000000000 × 95`, therefore we can't simply calculate all the states one by one. Since every row is a linear combination of the prior row, **exponentiation of matrices by squaring** can be applied to optimise the algorithm asymptotically.

```cpp
inline uint8_t c2i(char x) {
  if(x>='0' && x<='9')
    return x-'0';
  if(x>='A' && x<='Z')
    return x-'A'+10;
  assert(x>='a' && x<='z');
  return x-'a'+36;
}

double prob[62], f[110][410];
AC<62> ac;

int main() {
  short nCase;
  scanf("%hd", &nCase);
  for(short iCase = 1; iCase <= nCase; iCase++) {
    short t0;
    ac.clear();
    scanf("%hd", &t0);
    while(t0--) {
      char _[21];
      scanf("%*c%s", _);
      size_t __ = strlen(_);
      for(char *i = _; i!=_+__; i++)
        *i = c2i(*i);
      ac.insertPattern(_, _+__);
    }
    ac.build();
    scanf("%hd", &t0);
    memset(prob, 0, sizeof(prob));
    while(t0--) {
      char t1;
      scanf("%*c%c", &t1);
      scanf("%lf", prob+c2i(t1));
    }
    scanf("%hd", &t0);
    memset(f, 0, sizeof(f));
    f[0][0] = 1;
    for(int i = 0; i < t0; i++)
      for(short j = 0; j < ac.size(); j++)
        if(f[i][j])
          for(short k = 0; k < 62; k++)
            if(prob[k] && !ac.output(ac.go(j, k)).size())
              f[i+1][ac.go(j, k)] += f[i][j]*prob[k];
    double res = 0;
    for(short j = 0; j < ac.size(); j++)
      res += f[t0][j];
    printf("Case #%hd: %lf\n", iCase, res);
  }
  return 0;
}
```

# References

[^aho1975efficient]: Aho, Alfred V., and Margaret J. Corasick. "Efficient string matching: an aid to bibliographic search." Communications of the ACM 18.6 (1975): 333-340.
