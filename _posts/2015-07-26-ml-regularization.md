---
layout: post
title: "Machine learning: regularization"
---

This post is a lecture note about regularization.

## Overfitting

Overfitting is a situation that the hypothesis fits the training examples well but does not generalize on the whole input space. Such situation is usually caused by a complicated function with unnecessary features creating a lot of unnecessary curves and angles.

There are two main options to solve the issue of overfitting:

* Reduce the number of features.
  * Manually select which features to keep.
  * Use a model selection algorithm.
* Regularization: Keep all the features, but reduce the parameters $\theta\,.$

Reducing redundant features is the decent approach, to which the regularization is a dumb simulation.

## Linear regression

Recall the original cost function is

$$J(\theta)=\frac{1}{2m}\left|\mathbf X\theta-\mathbf y\right|^2\,.$$

The regularized cost function is

$$J(\theta)=\frac{1}{2m}\left|\mathbf X\theta-\mathbf y\right|^2+\lambda\sum_{j=1}^n\theta_j^2\,.$$

The $\lambda$, or the regularization parameter, determines how much the costs of our theta parameters are inflated. If it is chosen too laryge, it would cause underfitting.

Note that the bias parameter $\theta_0$ is not penalized. That is because regularization is a dumb simulation of removing redundant features, while the bias feature $x\_0$ is not the one we want to remove.

> I am not confident in the last paragraph. Please feel free to criticize if you find any suspicious point in my blog.

### Gradient descent

<div>
$$
\nabla J(\theta)
=
\frac{1}{m}
\mathbf X^\mathsf T\left(\mathbf X\theta-\mathbf y\right)
+
\frac{\lambda}{m}\mathbf l
\,,
$$
</div>

where

<div>
$$
\mathbf l^\mathsf T
=
\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.
$$
</div>

### Normal equation

Solve the first-order condition $\nabla J(\theta)=\mathbf0$ we obtain

$$\theta=\left(\mathbf{X^\mathsf TX+}\lambda\mathbf L\right)^{-1}\mathbf{X^\mathsf Ty}\,,$$

where

<div>
$$\mathbf L=\begin{pmatrix}0\\&1\\&&\ddots\\&&&1\end{pmatrix}\,.$$
</div>

## Logistic regression

Recall the original cost function is

<div>
$$
J(\theta)
=-\frac{1}{m}\left\{\ln\left[g\left(\mathbf X\theta\right)\right]^\mathsf T\mathbf y+\ln\left[1-g\left(\mathbf X\theta\right)\right]^\mathsf T\left(1-\mathbf y\right)\right\}\,.
$$
</div>

Similarly to the linear regression, the regularized cost function of logistic regression is

<div>
$$
J(\theta)
=
-\frac{1}{m}\left\{\ln\left[g\left(\mathbf X\theta\right)\right]^\mathsf T\mathbf y+\ln\left[1-g\left(\mathbf X\theta\right)\right]^\mathsf T\left(1-\mathbf y\right)\right\}
+\frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2
\,.
$$
</div>

### Gradient descent


<div>
$$\nabla J(\theta)
=
\frac{1}{m}\mathbf X^\mathsf T\left[g(\mathbf X\theta)-\mathbf y\right]
+
\frac{\lambda}{m}\mathbf l
\,,$$
</div>

where

<div>
$$
\mathbf l^\mathsf T
=
\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.
$$
</div>
