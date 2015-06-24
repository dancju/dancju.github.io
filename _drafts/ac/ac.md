# KMP 算法與 Aho-Corasick 算法

許多人發現 KMP 算法的原理難以理解。我在學習 Aho-Corasick 算法時發現通過理解 Aho-Corasick 來理解 KMP 算法非常容易。雖然前者比後者更復雜——其實，後者在邏輯上是前者的一個特例——但前者也許更容易理解。

# 什麼是 Aho-Corasick 算法

考慮這樣一個問題：有一串很長的文本，你要從中找出所有「he」，「she」，「his」，「her」這四個詞。對於「usher」这个詞，你需要把其中的「she」和「her」都找出來。

Aho-Corasick 算法就是用於解決這樣一類問題：對給定的__文本串__ _T_，找出所有屬於__模式串__集合 _P_ 的子串。

首先我們可以想出這樣的算法：

```
for i := 0 to |T|
	for p in P
		if p = T[i..i+|p|-1]
			輸出 T[i..i+|p|-1]
```

可以看出，暴力枚舉的效率是 `$O\left(\left|T\right|\sum_{p\in P}\left|p\right|\right)$`。而接下來介紹的 Aho-Corasick 算法將之優化到 `$O\left(\left|T\right|+\sum_{p\in P}\left|p\right|\right)$`。

# Aho-Corasick 自動機

Aho-Corasick 算法依賴於由 _T_ 構造出來的 Aho-Corasick 自動機。當 `$T=\left\{\text{he},\text{she},\text{his},\text{her}\right\}$` 時，構造出的 Aho-Corasick 自動機如下圖所示。

![ac.jpg](http://user-image.logdown.io/user/10769/blog/10392/post/261839/c27XPLzTG2I8CG0St90O_ac.jpg)

後文將詳細描述怎樣構造出這個自動機，我們先看這個自動機如何能幫助我們找出文本串 _T_ 中所有的模式串。

# 自動機構造過程第一步

# 構造過程第二步

# KMP 算法
