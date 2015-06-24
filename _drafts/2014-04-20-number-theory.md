---
layout: post
title: Notes on number theory
---

I do not really understand this.

\\[a^2\\]

## Fibonacci

\\[\left(\begin{matrix}
1&\binom{k}{0}&\binom{k}{1}&\cdots&\binom{k}{k-1}&\binom{k}{k} \\\\\\
&\binom{k}{0}&\binom{k}{1}&\cdots&\binom{k}{k-1}&\binom{k}{k} \\\\\\
&\binom{k-1}{0}&\binom{k-1}{1}&\cdots&\binom{k-1}{k-1} \\\\\\
&\vdots&\vdots \\\\\\
&\binom{1}{0}&\binom{1}{1} \\\\\\
&\binom{0}{0} \\\\\\
\end{matrix}\right)
\left(\begin{matrix}
\sum\_{i=1}^{n-1}F\_i^k \\\\\\
F^k\_n \\\\\\
F^{k-1}\_nF\_{n-1} \\\\\\
\vdots \\\\\\
F\_nF^{k-1}\_{n-1} \\\\\\
F^k\_{n-1}
\end{matrix}\right)
=\left(\begin{matrix}
\sum\_{i=1}^n F\_i^k \\\\\\
F^k\_{n+1} \\\\\\
F^{k-1}\_{n+1}F\_n \\\\\\
\vdots \\\\\\
F\_{n+1}F^{k-1}\_n \\\\\\
F^k\_n
\end{matrix}\right)\\]
