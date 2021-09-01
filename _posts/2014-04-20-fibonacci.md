---
layout: post
title: Summation of Power of Fibonacci Numbers
---

{:.blockquote.alert.alert-danger}
> Find $\sum_{i=1}^nF_i^k$ in modular arithmetic with a time limit, where $F_i$ is the $i$-th Fibonacci number.

We can construct the following recurrence relation and compute the vector by binary exponentiation.

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
