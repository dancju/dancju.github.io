---
layout: post
title: "Machine learning: logistic regression"

---
This is a lecture note about logistic regression.

Logistic regression is actually an approach to classification problems instead of regression problems.

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

$y^{(i)}$ denotes the output of the $i$-th training example. For all training examples, the output $y^{(i)}\in\\{0,1\\}\,.$

Let $\boldsymbol y$ be the column vector of the outputs of all the training examples, viz.

$$\boldsymbol y^\mathsf T=\begin{pmatrix}y^{(1)}&\cdots&y^{(m)}\end{pmatrix}\,.$$

### Output

$$\boldsymbol\theta^\mathsf T=\begin{pmatrix}\theta_0&\cdots&\theta_n\end{pmatrix}\,.$$

### The problem

The __[logistic function](https://en.wikipedia.org/wiki/Logistic_function)__ is

$$g(x)=\frac{1}{1+e^{-x}}\,.$$

The __hypothesis__ denotes the probability of the estimated output being $1\,,$ which is

<div>
$$
h\left(\boldsymbol x^{(i)};\boldsymbol\theta\right)
=g\left(\sum_{j=0}^n\theta_jx_j^{(i)}\right)
=g\left(\boldsymbol x^{(i)}\boldsymbol\theta\right)\,.
$$
</div>

The __loss function__ is

<div>
$$
\begin{align}
J(\boldsymbol\theta)
&=-\frac{1}{m}\sum_{i=1}^m\left\{y^{(i)}\ln\left[h\left(\boldsymbol x^{(i)};\boldsymbol\theta\right)\right]+\left(1-y^{(i)}\right)\ln\left[1-h\left(\boldsymbol x^{(i)};\boldsymbol\theta\right)\right]\right\}\\
&=-\frac{1}{m}\left(\ln\left[g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\boldsymbol y+\ln\left[\boldsymbol 1-g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\left(\boldsymbol 1-\boldsymbol y\right)\right)\,.
\end{align}
$$
</div>

> It is feasible to define the loss function as
> $$J(\boldsymbol\theta)=\frac{1}{m}\left[\exp(-\boldsymbol X\boldsymbol\theta)^\mathsf T\boldsymbol y+\exp(\boldsymbol X\boldsymbol\theta)^\mathsf T(\boldsymbol1-\boldsymbol y)\right]\,,$$
> since it is similar in shape to above?

## Gradient descent

<div>
$$\nabla J(\boldsymbol\theta)
=
\begin{pmatrix}\frac{\partial J(\boldsymbol\theta)}{\partial\theta_0}\\\vdots\\\frac{\partial J(\boldsymbol\theta)}{\partial\theta_n}\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\sum_{i=1}^mx_0^{(i)}\left[g\left(\boldsymbol x^{(i)}\boldsymbol\theta\right)-y^{(i)}\right]\\\vdots\\\sum_{i=1}^mx_n^{(i)}\left[g\left(\boldsymbol x^{(i)}\boldsymbol\theta\right)-y^{(i)}\right]\end{pmatrix}
=
\frac{1}{m}
\begin{pmatrix}\boldsymbol x_0^\mathsf T[g(\boldsymbol X\boldsymbol\theta)-\boldsymbol y]\\\vdots\\\boldsymbol x_n^\mathsf T[g(\boldsymbol X\boldsymbol\theta)-\boldsymbol y]\end{pmatrix}
=
\frac{1}{m}\boldsymbol X^\mathsf T\left[g(\boldsymbol X\boldsymbol\theta)-\boldsymbol y\right]
\,.$$
</div>

The rest part are same with the linear regression.
