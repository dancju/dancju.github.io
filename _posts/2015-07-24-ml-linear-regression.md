---
layout: post
title: "Machine learning: linear regression"
---

This is a lecture note about linear regression.

## Definitions

### Input

$m$ denotes the number of training examples.

$n$ denotes the number of features.

$x_j^{(i)}$ denotes the $j^\rm{th}$ feature of the $i^\rm{th}$ training example.

Let $\boldsymbol x^{(i)}$ be the row vector of all the features of the $i$-th training example, viz.

$$\boldsymbol x^{(i)}=\begin{pmatrix}x_0^{(i)}&\cdots&x_n^{(i)}\end{pmatrix}\,,$$

where $x_0^{(i)}=1$ for all $i\,.$

Let $\boldsymbol x_j$ be the column vector of all the $j$-th features of all the training examples, viz.

$$\boldsymbol x_j^\mathsf T=\begin{pmatrix}x_j^{(1)}&\cdots&x_j^{(m)}\end{pmatrix}\,.$$

Let $\boldsymbol X$ be a matrix whose rows are all the features of all the training examples, viz.

<div>
$$
\boldsymbol X
=
\begin{pmatrix}
\boldsymbol x^{(1)}\\
\vdots\\
\boldsymbol x^{(m)}
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

Let $\boldsymbol y$ be the column vector of the outputs of all the training examples, viz.

$$\boldsymbol y^\mathsf T=\begin{pmatrix}y^{(1)}&\cdots&y^{(m)}\end{pmatrix}\,.$$

### Output

$$\boldsymbol\theta^\mathsf T=\begin{pmatrix}\theta_0&\cdots&\theta_n\end{pmatrix}\,.$$

### The problem

Consider the quadric loss function

<div>
$$
J(\theta)
=
\frac{1}{2m}\sum_{i=1}^m\left(\sum_{j=0}^n\theta_j x_j^{(i)}-y^{(i)}\right)^2
=\frac{1}{2m}\left|\boldsymbol X\boldsymbol\theta-\boldsymbol y\right|^2\,.
$$
</div>

Our aim is finding the optimum $\boldsymbol\theta$ to minimize the loss function $J(\boldsymbol\theta)$.

There are several approaches to the optimum $\boldsymbol\theta$. The following two sections introduces two of them, naming *gradient descent* and *normal equation*.

> Other approaches includes stochastic gradient, simulated annealing, etc.

## Gradient descent

The __gradient descent__ algorithm iterately execute the following gradient descent rule for certain times or until the error is small enough.

The gradient descent rule can be expressed as:

$$\boldsymbol\theta\gets\boldsymbol\theta-\alpha\nabla J(\boldsymbol\theta)\,,$$

where

<div>
$$
\nabla J(\boldsymbol\theta)
=
\begin{pmatrix}\frac{\partial J(\theta)}{\partial\theta_0}\\\vdots\\\frac{\partial J(\theta)}{\partial\theta_n}\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\sum_{i=1}^mx_0^{(i)}\left[\boldsymbol x^{(i)}\boldsymbol\theta-y^{(i)}\right]\\\vdots\\\sum_{i=1}^mx_n^{(i)}\left[\boldsymbol x^{(i)}\boldsymbol\theta-y^{(i)}\right]\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\boldsymbol x_0^\mathsf T\left(\boldsymbol X\boldsymbol\theta-\boldsymbol y\right)\\\vdots\\\boldsymbol x_n^\mathsf T\left(\boldsymbol X\boldsymbol\theta-\boldsymbol y\right)\end{pmatrix}
=
\frac{1}{m}
\boldsymbol X^\mathsf T\left(\boldsymbol X\boldsymbol\theta-\boldsymbol y\right)
\,.
$$
</div>

Hence, the gradient descent rule is equivalent to

$$\boldsymbol\theta\gets\boldsymbol\theta-\frac{\alpha}{m}\boldsymbol X^\mathsf T\left(\boldsymbol X\boldsymbol\theta-\boldsymbol y\right)\,.$$

The complexity of gradient descent is $O(kmn)\,,$ where $k$ is the number of iteration.

Note that the gradient descent finds a numerical solution of the optimum $\boldsymbol\theta$.

## Normal equation

The __Normal equation__ is an approach by finding the optimum $\boldsymbol\theta$ via first-order condition, viz.

$$\nabla J(\boldsymbol\theta)=\boldsymbol0\,.$$

Solving the equation yields

$$\boldsymbol\theta=\left(\boldsymbol X^\mathsf T\boldsymbol X\right)^{-1}\boldsymbol X^\mathsf T\boldsymbol y\,.$$

> Conjecture: $\boldsymbol X^\mathsf T\boldsymbol X$ is non-invertible iff local optima exist.

The complexity of normal equation could be $O\left(mn^2+n^{2.373}\right)$ if optimized CW-like algorithms are applied.

Note that the gradient descent finds a algebraic solution of the optimum $\boldsymbol\theta$.
