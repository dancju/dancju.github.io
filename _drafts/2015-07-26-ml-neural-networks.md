---
layout: post
title: "Machine Learning: Neural Networks"
---

This post is a lecture note about artificial neural networks.

$$g(x)=\frac{1}{1+e^{-x}}\,.$$

$$
\mathbf a^{(i)}=\left\{
\begin{array}{ll}
\mathbf x&i=1\,,\\
g\left(\Theta^{(i-1)}\mathbf a^{(i-1)}\right)&\text{else}.
\end{array}
\right.
$$

$$h(x,\Theta)=\mathbf a^{(L)}\,.$$

$$
\delta^{(i)}=\left\{
\begin{array}{ll}
\mathbf a^{(L)}-\mathbf y&i=L\,,\\
\left[\left(\Theta^{(i)}\right)\tran\delta^{(i+1)}\right]\cdot g'\left(\Theta^{(i-1)}\mathbf a^{(i-1)}\right)&\text{else.}
\end{array}
\right.
$$

$$
\delta^{(i)}=\left\{
\begin{array}{ll}
\mathbf a^{(L)}-\mathbf y&i=L\,,\\
\left[\left(\Theta^{(i)}\right)\tran\delta^{(i+1)}\right]\cdot\mathbf a^{(i)}\cdot\left(\mathbf1-\mathbf a^{(i)}\right)&\text{else.}
\end{array}
\right.
$$

Recall the regularized cost function of the logistic regression is

$$
J(\theta)
=
-\frac{1}{m}\left\{\ln\left[g\left(\mathbf X\theta\right)\right]\tran\mathbf y+\ln\left[1-g\left(\mathbf X\theta\right)\right]\tran\left(1-\mathbf y\right)\right\}
+\frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2
\,.
$$

The neural network is a generalized version of logistic regression, whose regularized cost function is

$$
J(\Theta)
=
-\frac{1}{m}
\sum_{i=1}^m\sum_{k=1}^K
\left\{y_k^{(i)}\ln h\left(\mathbf x^{(i)};\Theta\right)_k+\left(1-y_k^{(i)}\right)\ln\left[1-h\left(\mathbf x^{(i)};\Theta\right)_k\right]\right\}
+\frac{\lambda}{2m}
\sum_{l=1}^{L-1}\sum_{i=1}^{s_l}\sum_{j=1}^{s_{l+1}}
\left(\Theta_{j,i}^{(l)}\right)^2
\,.
$$
