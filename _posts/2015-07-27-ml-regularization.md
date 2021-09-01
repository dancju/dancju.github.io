---
layout: post
title: 'Machine Learning: Regularization'
---

This is a lecture note about regularization.

# Overfitting

Overfitting is a situation that the hypothesis fits the training examples well but does not generalize on the whole input space. Such situation is usually caused by a complicated function with unnecessary features creating a lot of unnecessary curves and angles.

There are two main options to solve the issue of overfitting:

- Reduce the number of features.
  - Manually select which features to keep.
  - Use a model selection algorithm.
- Regularization: Keep all the features, but reduce the parameters $\bm\theta$.

Reducing redundant features is the decent approach, of which the regularization is a dumb simulation.

# Linear regression

Recall the original loss function is

$$J(\bm\theta)=\frac{1}{2m}\left|\bm X\bm\theta-\bm y\right|^2\,.$$

The regularized loss function is

$$J(\bm\theta)=\frac{1}{2m}\left|\bm X\bm\theta-\bm y\right|^2+\lambda\sum_{j=1}^n\theta_j^2\,.$$

The $\lambda$, or the regularization parameter, determines how much the costs of our theta parameters are inflated. If it is chosen too large, it would cause underfitting.

Note that the bias parameter $\theta_0$ is not penalized. That is because regularization is a dumb simulation of removing redundant features, while the bias feature $x_0$ is not the one we want to remove.

## Gradient descent

$$\nabla J(\bm\theta)=\frac{1}{m}\bm X\tran\left(\bm X\bm\theta-\bm y\right)+\frac{\lambda}{m}\bm l\,,$$

where

$$\bm l\tran=\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.$$

## Normal equation

Solve the first-order condition $\nabla J(\bm\theta)=\boldsymbol0$ we obtain

$$\bm\theta=\left(\bm{X\tran X+}\lambda\bm L\right)^{-1}\bm{X\tran y}\,,$$

where

$$\bm L=\begin{pmatrix}0\\&1\\&&\ddots\\&&&1\end{pmatrix}\,.$$

# Logistic regression

Recall the original loss function is

$$J(\bm\theta)=-\frac{1}{m}\left(\ln\left[g\left(\bm X\bm\theta\right)\right]\tran\bm y+\ln\left[\bm 1-g\left(\bm X\bm\theta\right)\right]\tran\left(\bm 1-\bm y\right)\right)\,.$$

Similarly to the linear regression, the regularized loss function of logistic regression is

$$J(\bm\theta)=-\frac{1}{m}\left(\ln\left[g\left(\bm X\bm\theta\right)\right]\tran\bm y+\ln\left[\bm 1-g\left(\bm X\bm\theta\right)\right]\tran\left(\bm 1-\bm y\right)\right)+\frac{\lambda}{2m}\sum_{j=1}^n\theta_j^2\,.$$

## Gradient descent

$$\nabla J(\bm\theta)=\frac{1}{m}\bm X\tran\left[g(\bm X\bm\theta)-\bm y\right]+\frac\lambda m\bm l\,,$$

where

$$\bm l\tran=\begin{pmatrix}0&\theta_1&\cdots&\theta_n\end{pmatrix}\,.$$
