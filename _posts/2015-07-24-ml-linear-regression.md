---
layout: post
title: 'Machine Learning: Linear Regression'
---

This is a lecture note about linear regression.

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

$y^{(i)}$ denotes the output of the $i$-th training example.

Let $\bm y$ be the column vector of the outputs of all the training examples, viz.

$$\bm y\tran=\begin{pmatrix}y^{(1)}&\cdots&y^{(m)}\end{pmatrix}\,.$$

## Output

$$\bm\theta\tran=\begin{pmatrix}\theta_0&\cdots&\theta_n\end{pmatrix}\,.$$

## The problem

Consider the quadric loss function

$$
J(\theta)
=
\frac{1}{2m}\sum_{i=1}^m\left(\sum_{j=0}^n\theta_j x_j^{(i)}-y^{(i)}\right)^2
=\frac{1}{2m}\left|\bm X\bm\theta-\bm y\right|^2\,.
$$

Our aim is finding the optimum $\bm\theta$ to minimize the loss function $J(\bm\theta)$.

There are several approaches to the optimum $\bm\theta$. The following two sections introduces two of them, namely _gradient descent_ and _normal equation_.

{:.blockquote.alert.alert-danger}
> Other approaches includes stochastic gradient, simulated annealing, etc.

# Gradient descent

The **gradient descent** algorithm iteratively execute the following gradient descent rule for certain times or until the error is small enough.

The gradient descent rule can be expressed as:

$$\bm\theta\gets\bm\theta-\alpha\nabla J(\bm\theta)\,,$$

where

$$
\nabla J(\bm\theta)
=
\begin{pmatrix}\frac{\partial J(\theta)}{\partial\theta_0}\\\vdots\\\frac{\partial J(\theta)}{\partial\theta_n}\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\sum_{i=1}^mx_0^{(i)}\left(\bm x^{(i)}\bm\theta-y^{(i)}\right)\\\vdots\\\sum_{i=1}^mx_n^{(i)}\left(\bm x^{(i)}\bm\theta-y^{(i)}\right)\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\bm x_0\tran\left(\bm X\bm\theta-\bm y\right)\\\vdots\\\bm x_n\tran\left(\bm X\bm\theta-\bm y\right)\end{pmatrix}
=
\frac{1}{m}
\bm X\tran\left(\bm X\bm\theta-\bm y\right)
\,.
$$

Hence, the gradient descent rule is equivalent to

$$\bm\theta\gets\bm\theta-\frac{\alpha}{m}\bm X\tran\left(\bm X\bm\theta-\bm y\right)\,.$$

The complexity of gradient descent is $O(kmn)\,,$ where $k$ is the number of iteration.

Note that the gradient descent finds a numerical solution of the optimum $\bm\theta$.

# Normal equation

The **Normal equation** is an approach by finding the optimum $\bm\theta$ via first-order condition, viz.

$$\nabla J(\bm\theta)=\boldsymbol0\,.$$

Solving the equation yields

$$\bm\theta=\left(\bm X\tran\bm X\right)^{-1}\bm X\tran\bm y\,.$$

{:.blockquote.alert.alert-danger}
> Conjecture: $\bm X\tran\bm X$ is non-invertible iff local optima exist.

The complexity of the normal equation could be $O\left(mn^2+n^{2.373}\right)$ if optimized CW-like algorithms are applied.

Note that the gradient descent finds an algebraic solution of the optimum $\bm\theta$.
