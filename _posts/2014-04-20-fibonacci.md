---
layout: post
title: Find $\sum_{i=1}^n F_i^k$ within $\Theta\left(k^3\log n\right)$ time
---

I encountered a interesting problems in a programming contest last week. The problem requires calculating $\sum_{i=1}^nF_i^k$ under a dramatically short time limit, where $F$ is the Fibonacci sequence. The supposed solution is exponentiation by squaring upon the following formula.

$$
\begin{pmatrix}
1&\binom{k}{0}&\binom{k}{1}&\cdots&\binom{k}{k-1}&\binom{k}{k} \\
&\binom{k}{0}&\binom{k}{1}&\cdots&\binom{k}{k-1}&\binom{k}{k} \\
&\binom{k-1}{0}&\binom{k-1}{1}&\cdots&\binom{k-1}{k-1} \\
&\vdots&\vdots \\
&\binom{1}{0}&\binom{1}{1} \\
&\binom{0}{0} \\
\end{pmatrix}
\begin{pmatrix}
\sum_{i=1}^{n-1}F_i^k \\
F_n^kF_{n-1}^0 \\
F_n^{k-1}F_{n-1}^1 \\
\vdots \\
F_n^1F_{n-1}^{k-1} \\
F_n^0F_{n-1}^k
\end{pmatrix}
=
\begin{pmatrix}
\sum_{i=1}^n F_i^k \\
F_{n+1}^kF_n^0 \\
F_{n+1}^{k-1}F_n^1 \\
\vdots \\
F_{n+1}^1F_n^{k-1} \\
F_{n+1}^0F_n^k
\end{pmatrix}
$$
