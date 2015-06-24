通常各種算法書都會先講 KMP 算法，再講 Aho-Corasick 算法。但是筆者發現通過理解 Aho-Corasick 來理解 KMP 算法非常容易。雖然前者比後者更復雜（其實，後者在邏輯上是前者的一個特例），但前者也許更容易理解。所以，不管你懂不懂 KMP，都可以看懂這篇最好懂的 Aho-Corasick 算法講解。

# 什麼是 Aho-Corasick 算法

考慮這樣一個問題：有一串很長的文本，你要從中找出所有「he」，「she」，「his」，「her」這四個詞。如果你的文本中包含「usher」这个詞，你需要把其中的「she」和「her」都找出來。

Aho-Corasick 算法就是用於解決這樣一類問題：對給定的__文本串__ _T_，找出所有屬於__模式串集合__ __P__ 的子串。

首先我們可以想出這樣的算法：

```
for i := 0 to |T|
  for p in P
    if p = T[i..i+|p|-1]
      輸出 “在位置 i 找到了串 p”
```

可以看出，暴力枚舉的效率是 `$O\left(\left|T\right|\sum_{p\in \mathbf{P}}\left|p\right|\right)$`。而接下來介紹的 Aho-Corasick 算法將之優化到 `$O\left(\left|T\right|+\sum_{p\in \mathbf{P}}\left|p\right|\right)$`。

# Aho-Corasick 自動機

Aho-Corasick 算法依賴於由 __P__ 構造出來的 Aho-Corasick 自動機。當 `$\mathbf{P}=\left\{\text{he},\text{she},\text{his},\text{her}\right\}$` 時，構造出的 Aho-Corasick 自動機如下圖所示。

![ac.jpg](http://user-image.logdown.io/user/10769/blog/10392/post/261839/c27XPLzTG2I8CG0St90O_ac.jpg)

圖中的自動機由三部分組成：節點、帶有字母標記的實線弧、虛線弧。節點在自動機里稱爲「狀態」，其中兩重圓圈的狀態又叫「接受態」。

先看實線弧。實線弧叫做「goto function」。狀態和 goto function 組成的子圖是一種常用每一個狀態表示某個模式串的前綴，其中接受態表示模式串本身。這個串就是從樹根到此節點上途徑的弧的標記連起來的串。例如節點 8 表示串「her」。樹根節點 0 表示空串。

再看虛線弧。虛線弧叫做「failure function」。如果節點 B 到節點 A 有一條虛線弧，表示 A 所對應的串是 B 所對應的串的後綴，且在所有的節點中是最長的後綴（B 本身除外）。例如節點 7 指向節點 3 表示「s」是「his」的後綴；雖然「is」也是「his」的後綴但並不存在對應「is」的節點。節點 1、2、3、6、8 表示的串並沒有不爲空的後綴在這個圖中，換句話說，它們的最長後綴爲空串，所以這五個節點應該有一條虛線弧連向根節點 0。

# 匹配過程

# 自動機構造過程

## 第一步 構造 trie

## 第二步 求 failure function

# 與 KMP 算法的關係
