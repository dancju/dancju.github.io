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

# Price Dynamics

To better understand how StableSwap maintains stable prices, let's examine the marginal price as a function of token amount. For simplicity, we'll focus on a two-token pool ($n=2$):

$$4A(x_1+x_2)+D=4AD+\frac{D^3}{4x_1x_2}\,.$$

The marginal price is defined by:

$$p=-\diff x_2/\diff x_1\,.$$

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

$$p=\frac12+\frac{8 A x_1^2 (D-x_1)-2 x_1^2 D+D^3}{4 x_1^{3/2} \sqrt{4 A x_1+D} \sqrt{4 A (x_1-D)^2+x_1 D}}\,.\tag{1}$$

The resulting order book shape demonstrates StableSwap's remarkable ability to maintain stable prices over a narrow range around the predetermined price:

<details>
<summary>Mathematica</summary>
<pre>
DynamicModule[
  {D = 100},
  Plot[
    Evaluate@Table[
      1/2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(4 b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D]),
      {A, {0, 10, 100, 1000}}
    ],
    {b, 10, 90},
    AxesLabel -> {"Amount", "Marginal Price"},
    PlotLegends -> LineLegend[{0, 10, 100, 1000}, LegendLabel -> A]
  ]
]
</pre>
</details>

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/2025-04-08-stableswap-0-0.svg" alt="marginal price">
</p>

# The Implied Order Book

The true power of StableSwap becomes apparent when we analyze its implied order book. The marginal price and order book depth are defined by:

$$f(p)=-\diff x_1/\diff p\,.$$

After solving:

<details>
<summary>Mathematica</summary>
<pre>
FullSimplify[-1/D[1/4 (2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D])), b]]
</pre>
</details>

$$f(p)=\frac{2 x_1^{5/2} (4 A x_1+D)^{3/2} \left(4 A (x_1-D)^2+x_1 D\right)^{3/2}}{D^3 \left(48 A^2 x_1^3+12 (1-4 A) A x_1^2 D+(1-4 A)^2 x_1 D^2+3 A D^3\right)}\,.\tag{2}$$

Equations (1) and (2) define function $f(p)$ in parametric form:

<details>
<summary>Mathematica</summary>
<pre>
DynamicModule[
  {D = 100},
  ParametricPlot[
    Evaluate@Table[
      {
        1/4 (2 + (-2 b^2 D + D^3 + 8 A b^2 (-b + D))/(b^(3/2) Sqrt[4 A b + D] Sqrt[4 A (b - D)^2 + b D])),
        (2 b^(5/2) (4 A b + D)^(3/2) (4 A (b - D)^2 + b D)^(3/2))/(D^3 (48 A^2 b^3 + 12 (1 - 4 A) A b^2 D + (1 - 4 A)^2 b D^2 + 3 A D^3))
      },
      {A, {0, 10, 100}}
    ],
    {b, 0, D},
    AspectRatio -> 0.618,
    AxesLabel -> {"Marginal Price", "Order Book Depth"},
    PlotLegends -> LineLegend[{0, 10, 100}, LegendLabel -> A]
  ]
]
</pre>
</details>

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/2025-04-08-stableswap-0-1.svg" alt="order book">
</p>

# Solving for Invariant $D$

The invariant $D$ plays a crucial role in StableSwap as it represents the total value of the pool and maintains the balance between tokens. While $x_i$ (token amounts) and $A$ (amplification factor) are stored as smart contract states, $D$ needs to be calculated for each AMM operation.

To solve for $D$, we can use the Newton-Raphson method, which is an efficient numerical technique for finding roots of equations. Starting from the StableSwap invariant equation:

$$f(D) = An^n\sum x_i + D - ADn^n - \frac{D^{n+1}}{n^n\prod x_i} = 0\,,$$

we can iteratively update $D$ using the Newton-Raphson formula:

<details>
<summary>Mathematica</summary>
<pre>
F = A n^n Sum[x[i], {i, 1, n}] + D - A D n^n - D^(n + 1)/(n^n Product[x[i], {i, 1, n}]);
FullSimplify[D - F/D[F, D]]
</pre>
</details>

$$D' = D - \frac{f(D)}{f'(D)}=\frac{A n^n \left(\sum x_i\right)+\frac{n D}{n^n}\prod\frac{D}{x_i}}{An^n-1+\frac{(n+1)}{n^n}\prod\frac{D}{x_i}}\,.$$

This formula provides a fast-converging solution for $D$ and was first implemented by [Curve Finance](https://github.com/curvefi/stableswap-ng/blob/fd54b9a1a110d0e2e4f962583761d9e236b70967/contracts/main/CurveStableSwapNGMath.vy#L90) in their smart contracts.

The convergence of this method is typically very fast, often requiring only a few iterations to reach a precise solution. This efficiency is crucial for on-chain operations where gas costs are a significant consideration.

# Solving for $x_k$

When we need to calculate the amount of a specific token $x_k$ given the amounts of other tokens and the invariant $D$, we can derive a quadratic equation from the StableSwap invariant. This is particularly useful when calculating token amounts after swaps or when adding/removing liquidity.

Starting from the StableSwap invariant:

$$An^n\sum x_i+D=ADn^n+\frac{D^{n+1}}{n^n\prod x_i}\,,$$

we can isolate $x_k$:

$$An^nx_k+An^n\sum_{i\ne k}x_i+D=ADn^n+\frac{D^{n+1}}{n^nx_k\prod_{i\ne k}x_i}\,.$$

Let's denote $\sum' = \sum_{i\ne k}x_i$ and $\prod' = \prod_{i\ne k}\frac{D}{x_i}$ for clarity. Multiplying both sides by $x_k$ and rearranging terms gives us a quadratic equation:

$$An^nx_k^2+\left(An^n\sum'+D-ADn^n\right)x_k=\frac{D\prod'}{n^n}\,.$$

This can be written in the standard quadratic form:

$$x_k^2+bx_k=c\,,$$

where:

$$b=\sum'+\frac{D}{An^n}-D\,,$$

$$c=\frac{D\prod'}{An^{2n}}\,.$$

To solve this equation numerically, we can use the Newton-Raphson method, which provides fast convergence. The iterative formula is:

$$x_k'=\frac{x_k^2+c}{2x_k+b}=\frac{x_k^2+\frac{D\prod'}{An^{2n}}}{2x_k+\sum'+\frac{D}{An^n}-D}\,.$$

Again, this approach was also first implemented by [Curve Finance](https://github.com/curvefi/stableswap-ng/blob/fd54b9a1a110d0e2e4f962583761d9e236b70967/contracts/main/CurveStableSwapNGMath.vy#L18) in their smart contracts.

This method typically converges within a few iterations, making it efficient for on-chain computations. The initial guess for $x_k$ can be set to $D/n$ (equal distribution) or the previous value of $x_k$ if available, which often leads to faster convergence.
