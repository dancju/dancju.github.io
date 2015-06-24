---
layout: post
title: Suffix oracle
---

A suffix oracle is a DFA that recognizes all suffix strings of a text and some
other weird strings. A suffix oracle contains exact `N+1` states and can be
constructed in `𝚯(N)` time where `N` is the length of the text.

I reinvented this wheel when learning suffix automaton. But I don't know if this
is of any use in algorithm contests.

## The suffix oracle class
```cpp
template<char SIGMA> class SuffixOracle {
  char *text;
  int size;
  struct Node {
    bool accept;
    int trans[SIGMA];
  };
  vector<Node> val;
public:
  SuffixOracle(char *lo, char *hi) {
    assert(lo<hi);
    size = hi-lo;
    text = new char[size];
    memcpy(text, lo, size);
    vector<int> fail(hi-lo+1);
    val.push_back(Node());
    for(char *i = lo; i!=hi; i++) {
      for(int j = i-lo; ;) {
        if(val[j].trans[*i]) {
          if(i-lo+1!=val[j].trans[*i])
            fail[i-lo+1] = val[j].trans[*i];
          break;
        } else
          val[j].trans[*i] = val.size();
        j = fail[j];
      }
      val.push_back(Node());
    }
    for(int j = val.size()-1; j; j = fail[j])
      val[j].accept = 1;
  }
  ~SuffixOracle() { delete[] text; }
  inline void print() const {
    printf("        ");
    for(int i = 0; i<SIGMA; i++)
      printf("%3c", i+'a');
    puts("");
    for(int x = 0; x<val.size(); x++) {
      assert(0<=x && x<val.size());
      if(val[x].accept)
        printf("((%2d)) :", x);
      else
        printf(" (%2d)  :", x);
      for(char i = 0; i<SIGMA; i++)
        if(val[x].trans[i])
          printf("%3d", val[x].trans[i]);
        else
          printf("   ");
      puts("");
    }
  }
};
```
