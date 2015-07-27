---
layout: post
title: "Machine learning: linear regression"
---

This post is a lecture note about linear regression.

## Definitions

### Input

$m$ denotes the number of training examples.

$n$ denotes the number of features.

$x_j^{(i)}$ denotes feature $j$ of the $i$-th training example.

Let $\mathbf x^{(i)}$ be the row vector of all the features of the $i$-th training example, viz.

$$\mathbf x^{(i)}=\begin{pmatrix}x\_0^{(i)}&\cdots&x_n^{(i)}\end{pmatrix}\,,$$

where $x_0^{(i)}=1$ for all $i\,.$

Let $\mathbf x_j$ be the column vector of all the $j$-th features of all the training examples, viz.

$$\mathbf x\_j^\mathsf T=\begin{pmatrix}x\_j^{(1)}&\cdots&x_j^{(m)}\end{pmatrix}\,.$$

Let $\mathbf X$ be a matrix whose rows are all the features of all the training examples, viz.

<div>
$$
\mathbf X
=
\begin{pmatrix}
\mathbf x^{(1)}\\
\vdots\\
\mathbf x^{(m)}
\end{pmatrix}
=
\begin{pmatrix}
x_0^{(1)}&\cdots&x_n^{(1)}\\
\vdots&\ddots&\vdots\\
x_0^{(m)}&\cdots&x_n^{(m)}
\end{pmatrix}
\,.
$$
</div>

$y^{(i)}$ denotes the output of the $i$-th training example.

Let $\mathbf y$ be the column vector of the outputs of all the training examples, viz.

$$\mathbf y^\mathsf T=\begin{pmatrix}y^{(1)}&\cdots&y^{(m)}\end{pmatrix}\,.$$

### Output

$$\theta^\mathsf T=\begin{pmatrix}\theta\_0&\cdots&\theta_n\end{pmatrix}\,.$$

### The problem

The cost function is:

<div>
$$
J(\theta)
=
\frac{1}{2m}\sum_{i=1}^m\left(\sum_{j=0}^n\theta_j x_j^{(i)}-y^{(i)}\right)^2
=\frac{1}{2m}\left|\mathbf X\theta-\mathbf y\right|^2\,.
$$
</div>

Our aim is finding the optimum $\theta$ to minimize the cost function $J(\theta)$.

There are several approaches to the optimum $\theta$. The following two sections introduces two of them, naming gradient descent and normal equation.

> Other approaches includes stochastic gradient, simulated annealing, etc.

## Gradient descent

The __gradient descent__ algorithm iterately execute the following gradient descent rule for certain times or until the error is small enough.

The gradient descent rule can be expressed as:

$$\theta\gets\theta-\alpha\nabla J(\theta)\,,$$

where

<div>
$$
\nabla J(\theta)
=
\begin{pmatrix}\frac{\partial J(\theta)}{\partial\theta_0}\\\vdots\\\frac{\partial J(\theta)}{\partial\theta_n}\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\sum_{i=1}^mx_0^{(i)}\left[\mathbf x^{(i)}\theta-y^{(i)}\right]\\\vdots\\\sum_{i=1}^mx_n^{(i)}\left[\mathbf x^{(i)}\theta-y^{(i)}\right]\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\mathbf x_0^\mathsf T\left(\mathbf X\theta-\mathbf y\right)\\\vdots\\\mathbf x_n^\mathsf T\left(\mathbf X\theta-\mathbf y\right)\end{pmatrix}
=
\frac{1}{m}
\mathbf X^\mathsf T\left(\mathbf X\theta-\mathbf y\right)
\,.
$$
</div>

Hence, the gradient descent rule is equivalent to

$$\theta\gets\theta-\frac{\alpha}{m}\mathbf X^\mathsf T\left(\mathbf X\theta-\mathbf y\right)\,.$$

The complexity of gradient descent is $O(kmn)\,,$ where $k$ is the number of iteration.

Note that the gradient descent finds a numerical solution of the optimum $\theta$.

## Normal equation

The __Normal equation__ is an approach by finding the optimum $\theta$ via first-order condition, viz.

$$\nabla J(\theta)=\mathbf0\,.$$

Solving the equation yields

$$\theta=\left(\mathbf X^\mathsf T\mathbf X\right)^{-1}\mathbf X^\mathsf T\mathbf y\,.$$

> Conjecture: $\mathbf X^\mathsf T\mathbf X$ is non-invertible iff local optima exist.

The complexity of normal equation could be $O\left(mn^2+n^{2.373}\right)$ if optimized CW-like algorithms are applied.

Note that the gradient descent finds a algebraic solution of the optimum $\theta$.
