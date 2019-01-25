---
layout: post
title: "Machine learning: regularization"
---

This is a lecture note about regularization.

# Overfitting

Overfitting is a situation that the hypothesis fits the training examples well but does not generalize on the whole input space. Such situation is usually caused by a complicated function with unnecessary features creating a lot of unnecessary curves and angles.

There are two main options to solve the issue of overfitting:

* Reduce the number of features.
  * Manually select which features to keep.
  * Use a model selection algorithm.
* Regularization: Keep all the features, but reduce the parameters $\boldsymbol\theta$.

Reducing redundant features is the decent approach, of which the regularization is a dumb simulation.

# Linear regression

Recall the original loss function is

$$J(\boldsymbol\theta)=\frac{1}{2m}\left|\boldsymbol X\boldsymbol\theta-\boldsymbol y\right|^2\,.$$

The regularized loss function is

$$J(\boldsymbol\theta)=\frac{1}{2m}\left|\boldsymbol X\boldsymbol\theta-\boldsymbol y\right|^2+\lambda\sum_{j=1}^n\theta_j^2\,.$$

The $\lambda$, or the regularization parameter, determines how much the costs of our theta parameters are inflated. If it is chosen too large, it would cause underfitting.

Note that the bias parameter $\theta_0$ is not penalized. That is because regularization is a dumb simulation of removing redundant features, while the bias feature $x_0$ is not the one we want to remove.

## Gradient descent

<div>
$$
\nabla J(\boldsymbol\theta)
=
\frac{1}{m}
\boldsymbol X^\mathsf T\left(\boldsymbol X\boldsymbol\theta-\boldsymbol y\right)
+
\frac{\lambda}{m}\boldsymbol l
\,,
$$
</div>

where

<div>
$$
\boldsymbol l^\mathsf T
=
\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.
$$
</div>

## Normal equation

Solve the first-order condition $\nabla J(\boldsymbol\theta)=\boldsymbol0$ we obtain

$$\boldsymbol\theta=\left(\boldsymbol{X^\mathsf TX+}\lambda\boldsymbol L\right)^{-1}\boldsymbol{X^\mathsf Ty}\,,$$

where

<div>
$$\boldsymbol L=\begin{pmatrix}0\\&1\\&&\ddots\\&&&1\end{pmatrix}\,.$$
</div>

# Logistic regression

Recall the original loss function is

<div>
$$
J(\boldsymbol\theta)
=-\frac{1}{m}\left\{\ln\left[g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\boldsymbol y+\ln\left[\boldsymbol 1-g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\left(\boldsymbol 1-\boldsymbol y\right)\right\}\,.
$$
</div>

Similarly to the linear regression, the regularized loss function of logistic regression is

<div>
$$
J(\boldsymbol\theta)
=
-\frac{1}{m}\left\{\ln\left[g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\boldsymbol y+\ln\left[\boldsymbol 1-g\left(\boldsymbol X\boldsymbol\theta\right)\right]^\mathsf T\left(\boldsymbol 1-\boldsymbol y\right)\right\}
+\frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2
\,.
$$
</div>

## Gradient descent

<div>
$$\nabla J(\boldsymbol\theta)
=
\frac{1}{m}\boldsymbol X^\mathsf T\left[g(\boldsymbol X\boldsymbol\theta)-\boldsymbol y\right]
+
\frac{\lambda}{m}\boldsymbol l
\,,$$
</div>

where

<div>
$$
\boldsymbol l^\mathsf T
=
\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.
$$
</div>
