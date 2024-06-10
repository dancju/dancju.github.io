---
layout: post
title: Deriving Black–Scholes Formula
---

Given

- the risk-free asset $B_t$ with dynamics \begin{equation}\diff B_t=rB_t\diff t\,,\label{db}\end{equation}
- a non-dividend-paying stock $S_t$ following a geometric Brownian motion \begin{equation}\diff S_t=\mu S_t\diff t+\sigma S_t\diff W_t\,,\label{ds}\end{equation}
- an European call option on $S_t$ maturing at time $T$ with payoff function \begin{equation}C_T=\max(0,S_T-K)\,,\label{payoff}\end{equation}
- an European put option on $S_t$ maturing at time $T$ with payoff function \begin{equation\*}P_T=\max(0,K-S_T)\,,\end{equation\*}

find the risk-free pricing for $C_t$ and $P_t$.

# Call options, method without PDE

## Step 1, measure change

Define risk-neutral measure $\widetilde\Pr$, under which \begin{equation}\widetilde W_t\=W_t\+\int_0^t\gamma_s\diff s\,.\label{girsanov}\end{equation}

Applying quotient rule to $S_t/B_t$ and inserting \eqref{db}, \eqref{ds}, and \eqref{girsanov} yields

$$\diff\frac{S_t}{B_t}=\frac{S_t}{B_t}\left((\mu-r-\sigma\gamma_t)\diff t+\sigma\diff\widetilde W_t\right)\,.$$

Since $S_t/B_t$ is a martingale under $\widetilde\Pr$, the drift term is zero, i.e., \begin{equation}\gamma_t=\frac{\mu-r}{\sigma}\,.\label{gamma}\end{equation}

Combining \eqref{ds}, \eqref{girsanov}, and \eqref{gamma} yields \begin{equation}\diff S_t=rS_t\diff t+\sigma S_t\diff\widetilde W_t\,.\label{ds1}\end{equation}

## Step 2, log-normal distribution

Given \eqref{ds1}, applying Itô's lemma to $\ln S_t$ yields

$$\diff\ln S_t=\left(r-\frac{\sigma^2}2\right)\diff t+\sigma\diff\widetilde W_t\,.$$

Integrating from $t$ to $T$ yields

$$\ln S_T-\ln S_t=(T-t)\left(\mu-\frac{\sigma^2}2\right)+\sigma\left(\widetilde W_T-\widetilde W_t\right)\,,$$

Given $\widetilde W_t$ is a Wiener process, $\widetilde W_T-\widetilde W_t\sim\mathcal N(0,T-t)$, which implies

\begin{equation}\ln S_T\sim\mathcal N\left(\ln S_t+(T-t)\left(\mu-\frac{\sigma^2}2\right),(T-t)\sigma^2\right)\,.\label{lns}\end{equation}

## Step 3, the lemma

Given random variable $S$ such that $\ln S\sim\mathcal N(\mu,\sigma^2)$, there is

$$\E\max(0,S-K)=\Phi(d_+)e^{\mu+\frac{\sigma^2}2}-\Phi(d_-)K\,,$$

where $K$ is a constant,

$$d_\pm=\frac{\mu-\ln K}\sigma+\frac\sigma2\pm\frac\sigma2\,,$$

and $\Phi(\cdot)$ is the CDF of standard normal distribution $\mathcal N(0,1)$.

**Proof**

Given $\ln S\sim\mathcal N(\mu,\sigma^2)$, we have the PDF of $S$

$$f(x)=\frac1{\sqrt{2\pi}\sigma x}e^{-\frac{(\ln x-\mu)^2}{2\sigma^2}}\,.$$

Defining variable

$$Q=\frac{\ln S-\mu}\sigma\,,$$

we have $Q\sim\mathcal N(0,1)$ and its PDF

$$\varphi(x)=\frac1{\sqrt{2\pi}}e^{-\frac{x^2}2}\,.$$

Combining the definitions of $f(\cdot)$, $Q$, and $\varphi(\cdot)$, we have

$$f(S)\diff S=\varphi(Q)\diff Q\,.$$

According to the definition of expectation, we have

$$\E\max(0,S-K)=\int_K^\infty(s-K)f(s)\diff s\,.$$

Substituting $v$ for $q$ in the integral yields

$$\E\max(0,S-K)=\int_{\frac{\ln K-\mu}\sigma}^\infty(e^{\mu+\sigma q}-K)\varphi(q)\diff q\,,$$

or

$$\E\max(0,S-K)=\int_{\frac{\ln K-\mu}\sigma}^\infty e^{\mu+\sigma q}\varphi(q)\diff q-K\int_{\frac{\ln K-\mu}\sigma}^\infty\varphi(q)\diff q\,.$$

Substituting $q$ for $q-\sigma$ in the first integral yields

$$\E\max(0,S-K)=e^{\mu+\frac{\sigma^2}2}\int_{\frac{\ln K-\mu}\sigma-\sigma}^\infty\varphi(q)\diff q-K\int_{\frac{\ln K-\mu}\sigma}^\infty\varphi(q)\diff q\,.$$

Substituting definite integrals of PDF for their corresponding CDFs with the formula $\int_\alpha^\infty\varphi(x)\diff x=\Phi(-\alpha)$ yields the lemma.

## Step 4, finale

Applying the lemma above to \eqref{lns} yields \begin{equation}\E\max(0,S_T-K)=\Phi(d_+)S_te^{(T-t)r}-\Phi(d_-)K\,,\label{emax}\end{equation}

where

$$d_\pm=\frac1{\sigma\sqrt{T-t}}\ln\frac{S_t}K+\frac{r\sqrt{T-t}}\sigma\pm\frac{\sigma\sqrt{T-t}}2\,.$$

Since $C_t/B_t$ is a martingale under $\widetilde\Pr$, we have \begin{equation}\frac{C_t}{B_t}=\E\left(\frac{C_T}{B_T}\right)\,.\label{cb}\end{equation}

Combining \eqref{db}, \eqref{payoff}, \eqref{emax} and \eqref{cb} yields

$$C_t=-e^{-(T-t)r}K\Phi(d_-)+S_t\Phi(d_+)\,,$$

which gives the Black–Scholes formula of a call option for a non-dividend-paying underlying stock.

# Call options, method with PDE

## Step 1, measure change

This step, being the same as in approach 1, gives \eqref{ds1}.

## Step 2, deriving the PDE

Applying quotient rule to $\diff\frac{V_t}{B_t}$ gives

\begin{equation}
\diff\frac{V_t}{B_t}=\frac{\diff V_tB_T-V_t\diff B_t}{B_t^2}\,.\label{dvb}
\end{equation}

Applying Ito's lemma to $V(t,S_t)$ gives

\begin{equation}
\diff V_t=\frac{\partial V_t}{\partial t}\diff t+\frac{\partial V_t}{\partial S_t}\diff S_t+\frac{1}{2}\frac{\partial^2 V_t}{\partial S_t^2}(\diff S_t)^2\,.\label{dv}
\end{equation}

Plugging \eqref{db}, \eqref{ds1}, and \eqref{dv} into \eqref{dvb} gives

$$\diff\frac{V_t}{B_t}=\frac1{B_t}\left(\frac{\partial V_t}{\partial t}+\frac{\partial V_t}{\partial S_t}rS_t+\frac{\partial^2 V_t}{\partial S_t^2}\frac{\sigma^2S_t^2}2-rV_t\right)\diff t+(\cdots)\diff\widetilde W_t\,.$$

Since $V_t/B_t$ is a martingale under $\widetilde\Pr$, the drift term is zero, i.e.,

\begin{equation}
\frac{\partial V_t}{\partial t}+\frac{\partial V_t}{\partial S_t}rS_t+\frac{\partial^2 V_t}{\partial S_t^2}\frac{\sigma^2S_t^2}2=rV_t\,,\label{pde}
\end{equation}

which gives the Black–Scholes equation for the financial derivative, whose terminal condition defined by payoff function.

## Step 3, transforming the PDE

Substituting variables $t,S_t,V_t$ with $\tau,X_\tau,U_\tau$ by

$$t=T-\frac{2\tau}{\sigma^2}\,,\quad S_t=e^{X_\tau}\,,\quad V_t=e^{\alpha X_\tau+\beta\tau}U_\tau\,,$$

where $\alpha$ and $\beta$ are arbitrary constants.  We have

$$-\frac{\partial U_\tau}{\partial \tau}+\frac{\partial^2U_\tau}{\partial X_\tau^2}+\left(2\alpha+\frac{2r}{\sigma^2}-1\right)\frac{\partial U_\tau}{\partial X_\tau}+\left((\alpha-1)\left(\alpha+\frac{2r}{\sigma^2}\right)-\beta\right)U_\tau=0\,.$$

In order to eliminate $\frac{\partial U_\tau}{\partial X_\tau}$ term and $U_\tau$ term, we choose

$$\alpha=\frac12-\frac{r}{\sigma^2}\,,\quad\beta=-\left(\frac12+\frac{r}{\sigma^2}\right)^2\,,$$

which gives a simple heat equation

$$\frac{\partial U_\tau}{\partial \tau}=\frac{\partial^2U_\tau}{\partial X_\tau^2}\,,$$

and its initial condition

$$U_0=e^{-\alpha X_0}\max\left(0,e^{X_0}-K\right)\,.$$

## Step 4, solving the PDE

The heat equation has a fundamental solution

$$U_\tau=\frac1{2\sqrt{\pi\tau}}\int_{\mathbb R}e^{-\frac{(X_\tau-y)^2}{4\tau}}e^{-\alpha y}\max\left(0,e^{y}-K\right)\diff y\,.$$

# Put options

According to the put-call parity $C_t-P_t=S_t-Ke^{-(T-t)r}$, we get the Black–Scholes formula of a put option for a non-dividend-paying underlying stock such that

$$P_t=e^{-(T-t)r}K\Phi(-d_-)-\Phi(-d_+)S_t\,.$$
