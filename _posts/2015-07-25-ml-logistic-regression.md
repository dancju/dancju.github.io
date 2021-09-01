---
layout: post
title: 'Machine Learning: Logistic Regression'
---

This is a lecture note about logistic regression.

Logistic regression is an approach to classification problems instead of regression problems despite its name contains "regression".

# Definitions

## Input

$m$ denotes the number of training examples.

$n$ denotes the number of features.

$x_j^{(i)}$ denotes the $j^\text{th}$ feature of the $i^\text{th}$ training example.

Let $\bm x^{(i)}$ be the row vector of all the features of the $i$-th training example, viz.

$$\bm x^{(i)}=\begin{pmatrix}x_0^{(i)}&\cdots&x_n^{(i)}\end{pmatrix}\,,$$

where $x_0^{(i)}=1$ for all $i\,.$

Let $\bm x_j$ be the column vector of all the $j$-th features of all the training examples, viz.

$$\bm x_j\tran=\begin{pmatrix}x_j^{(1)}&\cdots&x_j^{(m)}\end{pmatrix}\,.$$

Let $\bm X$ be a matrix whose rows are all the features of all the training examples, viz.

$$
\bm X
=
\begin{pmatrix}
\bm x^{(1)}\\
\vdots\\
\bm x^{(m)}
\end{pmatrix}
=
\begin{pmatrix}
x_0^{(1)}&\cdots&x_n^{(1)}\\
\vdots&\ddots&\vdots\\
x_0^{(m)}&\cdots&x_n^{(m)}
\end{pmatrix}
\,.
$$

$y^{(i)}$ denotes the output of the $i$-th training example. For all training examples, the output $y^{(i)}\in\\{0,1\\}\,.$

Let $\bm y$ be the column vector of the outputs of all the training examples, viz.

$$\bm y\tran=\begin{pmatrix}y^{(1)}&\cdots&y^{(m)}\end{pmatrix}\,.$$

## Output

$$\bm\theta\tran=\begin{pmatrix}\theta_0&\cdots&\theta_n\end{pmatrix}\,.$$

## The problem

The **[logistic function](https://en.wikipedia.org/wiki/Logistic_function)** is

$$g(x)=\frac{1}{1+e^{-x}}\,.$$

The **hypothesis** denotes the probability of the estimated output being $1\,,$ which is

$$
h\left(\bm x^{(i)};\bm\theta\right)
=g\left(\sum_{j=0}^n\theta_jx_j^{(i)}\right)
=g\left(\bm x^{(i)}\bm\theta\right)\,.
$$

The **loss function** is

$$
\begin{aligned}
J(\bm\theta)
&=-\frac{1}{m}\sum_{i=1}^m\left\{y^{(i)}\ln\left[h\left(\bm x^{(i)};\bm\theta\right)\right]+\left(1-y^{(i)}\right)\ln\left[1-h\left(\bm x^{(i)};\bm\theta\right)\right]\right\}\\
&=-\frac{1}{m}\left(\ln\left[g\left(\bm X\bm\theta\right)\right]\tran\bm y+\ln\left[\bm 1-g\left(\bm X\bm\theta\right)\right]\tran\left(\bm 1-\bm y\right)\right)\,.
\end{aligned}
$$

{:.blockquote.alert.alert-danger}
> Is it feasible to define the loss function as
> $$J(\bm\theta)=\frac{1}{m}\left(\exp(-\bm X\bm\theta)\tran\bm y+\exp(\bm X\bm\theta)\tran(\boldsymbol1-\bm y)\right)$$
> since they are pretty similar?

# Gradient descent

$$
\nabla J(\bm\theta)
=
\begin{pmatrix}\frac{\partial J(\bm\theta)}{\partial\theta_0}\\\vdots\\\frac{\partial J(\bm\theta)}{\partial\theta_n}\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\sum_{i=1}^mx_0^{(i)}\left[g\left(\bm x^{(i)}\bm\theta\right)-y^{(i)}\right]\\\vdots\\\sum_{i=1}^mx_n^{(i)}\left[g\left(\bm x^{(i)}\bm\theta\right)-y^{(i)}\right]\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\bm x_0\tran[g(\bm X\bm\theta)-\bm y]\\\vdots\\\bm x_n\tran[g(\bm X\bm\theta)-\bm y]\end{pmatrix}
=
\frac{1}{m}\bm X\tran\left[g(\bm X\bm\theta)-\bm y\right]
\,.
$$

The rest part is identical with the linear regression.
