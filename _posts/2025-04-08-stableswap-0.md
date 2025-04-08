---
layout: post
title: Understanding StableSwap
---

StableSwap, a revolutionary algorithm, addresses this challenge by enabling seamless trading of stable assets with minimal slippage. This post dives deep into the mathematical foundations of StableSwap and reveals how it creates an effective AMM.

StableSwap is defined by the formula that balances the sum of token amounts with their product:

$$An^n\sum x_i+D=ADn^n+\frac{D^{n+1}}{n^n\prod x_i}\,,$$

where:

- $n$ is the number of tokens in the pool;
- $x_i$ represents the amount of each token;
- $A$ is the amplification factor;
- $D$ is the invariant that maintains the pool's balance.

# Finding the Invariant $D$

While $x_i$ and $A$ are smart contract states, calculating $D$ is essential for each AMM operation. Newton's method provides an efficient numerical solution. In each iteration, we update $D$ using:

<details>
<summary>Mathematica</summary>
<pre>
F = A n^n Sum[x[i], {i, 1, n}] + D - A D n^n - D^(n + 1)/(n^n Product[x[i], {i, 1, n}]);
FullSimplify[D - F/D[F, D]]
</pre>
</details>

$$D_{i+1} :=\frac{A n^n \left(\sum x_i\right)+\frac{n D_i^{n+1}}{n^n\prod x_i}}{\left(A n^n-1\right)+\frac{(n+1) D_i^n}{n^n\prod x_i}}\,.$$

This was first implemented by [Curve Finance](https://github.com/curvefi/stableswap-ng/blob/main/contracts/main/CurveStableSwapNGMath.vy#L113).

# Price Dynamics

To better understand how StableSwap maintains stable prices, let's examine the marginal price as a function of token amount. For simplicity, we'll focus on a two-token pool ($n=2$), where we replace $x_{1,2}$ with $b$ and $q$:

$$4A(b+q)+D=4AD+\frac{D^3}{4bq}\,.$$

The marginal price is defined by:

$$x=-\diff q/\diff b\,.$$

The solution reveals:

<details>
<summary>Mathematica</summary>
<pre>
eq = 4 A (b + q) + D == 4 A D + D^3/(4 b q);
PowerExpand[FullSimplify[Solve[
  Eliminate[{eq, x == -ImplicitD[eq, q, b]}, q],
  x,
  Assumptions -> x > 0 && D > 0 && A > 0 && b > 0
]]]
</pre>
</details>

$$x=\frac12+\frac{8 A b^2 (D-b)-2 b^2 D+D^3}{4 b^{3/2} \sqrt{4 A b+D} \sqrt{4 A (b-D)^2+b D}}\,.\tag{1}$$

The resulting order book shape demonstrates StableSwap's remarkable ability to maintain stable prices over a narrow range around the predetermined price:

<details>
<summary>Mathematica</summary>
<pre>
DynamicModule[
  {A = 100, D = 100},
  Plot[
    1/2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(4 b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D]),
    {b, 10, 90},
    AxesLabel -> {"Amount", "Marginal Price"}
  ]
]
</pre>
</details>

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/2025-04-08-stableswap-0-0.svg" alt="marginal price">
</p>

# The Implied Order Book

The true power of StableSwap becomes apparent when we analyze its implied order book. The marginal price and order book depth are defined by:

$$f(x)=-\diff b/\diff x\,.$$

After solving:

<details>
<summary>Mathematica</summary>
<pre>
FullSimplify[-1/D[1/4 (2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D])), b]]
</pre>
</details>

$$f(x)=\frac{2 b^{5/2} (4 A b+D)^{3/2} \left(4 A (b-D)^2+b D\right)^{3/2}}{D^3 \left(48 A^2 b^3+12 (1-4 A) A b^2 D+(1-4 A)^2 b D^2+3 A D^3\right)}\,.\tag{2}$$

Equations (1) and (2) define function $f(x)$ in parametric form:

<details>
  <summary>Mathematica</summary>
  <pre><code>
DynamicModule[
  {A = 10, D = 100},
  ParametricPlot[
    {
     1/4 (2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D])),
     (2 b^(5/2) (4 A b + D)^(3/2) (4 A (b - D)^2 + b D)^(3/2))/(D^3 (48 A^2 b^3 + 12 (1 - 4 A) A b^2 D + (1 - 4 A)^2 b D^2 + 3 A D^3))
    },
    {b, 0, D},
    AspectRatio -> 0.618,
    AxesLabel -> {"Marginal Price", "Order Book Depth"}
  ]
]
  </code></pre>
</details>

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/2025-04-08-stableswap-0-1.svg" alt="order book">
</p>
