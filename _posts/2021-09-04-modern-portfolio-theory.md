---
layout: post
title: Modern Portfolio Theory
---

For a given set of assets, the efficient frontier is the set of portfolios that no other portfolio with a higher expected return and the same standard deviation of return exists. On the $\mu$-$\sigma$ plane: if all assets are risky, the efficient frontier is the upper part of a hyperbola; if there is a risk-free asset, the efficient frontier is a half-line.

# Markowitz bullet

Suppose there are $n$ assets whose simple returns are random vector $\bm R_{n\times1}$, whose expectation vector and covariance matrix is $\bm\mu_{n\times1}$ and $\bm\Sigma_{n\times n}$.

We would like to build a portfolio where the weights of every component asset form vector $\bm w_{n\times1}$ satisfying $\bm1\tran\bm w=1$. The return of the portfolio would be $R_p=\bm R\tran\bm w$, whose expectation and variance is

$$\mu_p=\operatorname{E}(R_p)=\bm\mu\tran\bm w\,,\quad\sigma_p^2=\operatorname{Var}(R_p)=\bm w\tran\bm\Sigma\bm w\,.$$

To find the efficient frontier, we can minimize the variance of the portfolio return for every possible expected portfolio return such that

$$\begin{aligned}
  \min_{\bm w} &&
  \frac12\bm w\tran\bm\Sigma\bm w \,, \\
  \text{s.t.} &&
  \bm1\tran\bm w=1 \,,  \\&&
  \bm\mu\tran\bm w=\mu_p \,,
\end{aligned}$$

which, with Lagrange multiplier, is equivalent to the following linear system of equations

$$\begin{aligned}
  \bm\Sigma\bm w-\lambda_0\bm1-\lambda_1\bm\mu&=\bm0 \,, \\
  \bm1\tran\bm w&=1 \,, \\
  \bm\mu\tran\bm w&=\mu_p \,.
\end{aligned}$$

Since $\bm\Sigma$ is a covariance matrix, which by definition is positive definite and invertible, solving the system yields

$$\begin{aligned}
\bm w&=\lambda_0\bm\Sigma^{-1}\bm1+\lambda_1\bm\Sigma^{-1}\bm\mu \,, \\
\lambda_0&=\frac{C-\mu_pB}{AC-B^2} \,, \\
\lambda_1&=\frac{\mu_pA-B}{AC-B^2} \,,
\end{aligned}$$

where

$$A=\bm1\tran\bm\Sigma^{-1}\bm1\,,\quad B=\bm1\tran\bm\Sigma^{-1}\bm\mu\,,\quad C=\bm\mu\tran\bm\Sigma^{-1}\bm\mu\,.$$

Multiplying $\bm\Sigma\bm w-\lambda_0\bm1-\lambda_1\bm\mu=0$ by $\bm w$ and substituting by $\bm1\tran\bm w=1$ and $\bm\mu\tran\bm w=\mu_p$ yields

$$\bm w\tran\bm\Sigma\bm w=\lambda_0+\lambda_1\mu_p\,.$$

Substituting by $\lambda_0$, $\lambda_1$, and $\sigma_p^2=\bm w\tran\bm\Sigma\bm w$ yields

$$\frac{\sigma_p^2}{1/A}-\frac{\left(\mu_p-\frac BA\right)^2}{(AC-B^2)/A^2}=1 \,,$$

which is a hyperbola on the $\mu$-$\sigma$ plane, whose upper part is the _Markowitz bullet_.

# Capital allocation line

The previous sections analysed the case where all the available assets are risky. In this section, we extend the analysis by keeping the same risky assets as before and adding a risk-free asset with a guaranteed return $r_0$. In an analogous way to the previous section, we will build a portfolio such that the weights of risky assets form vector $\bm w$ and the weight of the risk-free asset is $w_0$.

To find the efficient frontier, we can minimize the variance of the portfolio return for every possible expected portfolio return such that

$$\begin{aligned}
  \min_{w_0,\bm w} &&  \frac12\bm w\tran\bm\Sigma\bm w \,, \\
  \text{s.t.} &&  w_0+\bm1\tran\bm w=1 \,,  \\&&
  r_0w_0+\bm\mu\tran\bm w=\mu_p \,,
\end{aligned}$$

which is equivalent to the problem

$$\begin{aligned}
  \min_{\bm w} &&  \frac12\bm w\tran\bm\Sigma\bm w \,, \\
  \text{s.t.} &&
  (\bm\mu-r_0\bm1)\tran\bm w=\mu_p-r_0 \,,
\end{aligned}$$

which, with Lagrange multiplier, is equivalent to the following linear system of equations

$$\begin{aligned}
\bm\Sigma\bm w-(\bm\mu-r_0\bm1)\lambda&=\bm0 \,, \\
(\bm\mu-r_0\bm1)\tran\bm w&=\mu_p-r_0 \,.
\end{aligned}$$

Since $\bm\Sigma$ is a covariance matrix, given $\bm\Sigma\bm w-(\bm\mu-r_0\bm1)\lambda=\bm0$, $(\bm\mu-r_0\bm1)\tran\bm w=\mu_p-r_0$, and $\sigma_p^2=\bm w\tran\bm\Sigma\bm w$, eliminating $\bm w$ and $\lambda$ yields

$$\frac{\mu_p-r_0}{\sigma_p}=\sqrt{(\bm\mu-r_0\bm1)\tran\bm\Sigma^{-1}(\bm\mu-r_0\bm1)}=\sqrt{Ar_0^2-2Br_0+C}$$

which is a line on the $\mu$-$\sigma$ plane, of which the half-line in the first quadrant is the _capital allocation line_.
