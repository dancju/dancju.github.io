---
layout: post
title: Extending StableSwap
---

StableSwap has revolutionized the way we handle stablecoin trading in DeFi. However, as the ecosystem evolves, we've identified two key limitations that need to be addressed:

1. **Limited Liquidity Range**: The original StableSwap concentrates liquidity around a predetermined price, which becomes problematic when dealing with yield-bearing stablecoins that naturally drift from their peg.
2. **Rigid Token Composition**: The protocol assumes equal weights for all tokens, which doesn't reflect the diverse risk profiles and market dynamics of different stablecoins.

In this post, we'll explore how we can extend StableSwap to address these limitations while maintaining its elegant mathematical foundation.

# The Original StableSwap

Let's first understand how StableSwap was conceived. The protocol is built around a beautiful mathematical construction that starts with an equilibrium point $\left(\frac{D}{n},\dots,\frac{D}{n}\right)$ and two fundamental hypersurfaces:

$$\sum x_i=D\,,$$

and

$$\prod x_i=\left(\frac{D}{n}\right)^n\,.$$

These hypersurfaces are carefully chosen to be tangent at the equilibrium point. The magic happens when we combine these equations into a single, more powerful hypersurface:

$$An^n\sum x_i+D=ADn^n+\frac{D^{n+1}}{n^n\prod x_i}\,.$$

# Extending StableSwap

Now, let's adapt this elegant framework to meet our new requirements. We'll follow the same mathematical approach but with enhanced flexibility.

## 1. Flexible Equilibrium Point

Instead of forcing equal weights, we introduce a weighted equilibrium point $\left(w_{1}D,\dots,w_{n}D\right)$, where $\sum w_i=1$. This allows us to accommodate different stablecoin characteristics and market dynamics.

## 2. Dynamic Price Relationships

To handle yield-bearing stablecoins and varying token compositions, we introduce rate parameters $r_i$. These parameters define the price sensitivity of each token, where the implicit derivatives $\partial x_i/\partial x_j$ on both fundamental hypersurfaces at the equilibrium point $\left(w_{1}D,\dots,w_{n}D\right)$ must equal $-r_j/r_i$. This requirement leads to the following unique construction:

$$\sum r_ix_i=D\sum r_iw_i\,,$$

and

$$\prod x_i^{r_iw_i}=\prod\left(w_iD\right)^{r_iw_i}\,.$$

## 3. The Extended Formula

Following StableSwap's elegant approach, we combine these equations into a single, comprehensive hypersurface:

$$A\sum r_ix_i+D=AD\sum r_iw_i+D\prod\left(\frac{w_iD}{x_i}\right)^{r_iw_i}\,.\tag{0}$$

This extended formula maintains the mathematical beauty of the original StableSwap while adding the flexibility needed for modern DeFi applications. It provides several key advantages:

- **Dynamic Weighting**: Supports different weights for each stablecoin, allowing for more precise market representation and risk management
- **Yield Integration**: Seamlessly accommodates yield-bearing stablecoins through rate parameters, enabling efficient handling of interest-bearing assets
- **Arbitrage Resistance**: The equilibrium point's stability ensures that price deviations from peg don't create exploitable arbitrage opportunities
- **Impermanent Loss Protection**: By maintaining stable equilibrium points, the system minimizes impermanent loss for liquidity providers

These improvements make the protocol more robust and adaptable to the evolving DeFi landscape while maintaining its core mathematical elegance.

# Visualization of 2-token Case

Here is an interactive visualization of 2-token Extended StableSwap. Try adjusting $r_x$ and $w_x$ to see how the curve changes.

<iframe src="https://www.desmos.com/calculator/cxildympt7" width="100%" height="500px"></iframe>

# Solving for $D$

Similar to the original StableSwap, we can solve Equation (0) for $D$ using the Newton–Raphson method.

$$D':=\frac{A \sum r_i x_i+\eta D\prod\left(\frac{w_iD}{x_i}\right)^{r_iw_i}}{A\eta-1+(\eta+1)\prod\left(\frac{w_iD}{x_i}\right)^{r_iw_i}}\,,$$

where $\eta=\sum r_i w_i\,.$
