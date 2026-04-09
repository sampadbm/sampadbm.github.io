---
date: 2026-03-24
title: Lagrange duality
tags: [math, linear-algebra, tutorial]
summary: Intuitive Lagrange duality
authors: [sampad]
---

### Motivation

In this short exposition, we would like develop and intuition for how the Lagrange dual comes about in constrained
optimization problems.

### Preliminaries

#### Constrained optimization



$$
\begin{equation}
\begin{aligned}
& \min_{x} f(x) \\
& \text{s.t. } h(x) \leq 0
\end{aligned}
\end{equation}
$$


#### Indicator functions

$$
I(t) = \begin{cases} 
0 & \text{if } t \leq 0 \\ 
\infty & \text{otherwise} 
\end{cases}
$$


In another form,

$$I(t) = \sup_{\lambda \geq 0} \; \lambda \cdot t$$
If $t \leq 0$, the best we can do is to set $\lambda$ to zero. 
When $t>0$, we send $\lambda$ to $+\infty$.  
Hence  both the forms are equivalent. 


#### Max–min Inequality / Weak Duality

$$\inf_x \; \sup_\lambda \; g(x,\lambda) \geq \sup_{\lambda} \; \inf_x g(x,\lambda)$$

Proof:

Let 

$$\begin{aligned}g(A,B) = \inf_x \; \sup_{\lambda} \; g(x,\lambda) \\ g(a,b) = \sup_{\lambda} \; \inf_x \; g(x,\lambda)\end{aligned}$$
Now

$$g(a,b) \leq g(A,b) \leq g(A,B)$$
##### Visual Grid Proof: Max-Min Inequality

This proof demonstrates why the "highest valley floor" (**Max-Min**) can never exceed the "lowest mountain peak" (**Min-Max**) using a symbolic grid.

**Variables:**
* **Horizontal Axis ($x$):** Controls the columns.
* **Vertical Axis ($\lambda$):** Controls the rows.
* **$g(a, b)$:** The Max-Min solution (Dual).
* **$g(A, B)$:** The Min-Max solution (Primal).
* **$g(A, b)$:** The "Bridge" intersection element.

##### 1. The Symbolic Grid

$$
\begin{array}{c|ccccc|c}
g(x, \lambda) & \dots & a & \dots & A & \dots & \text{Row Inf: } \inf_{x} g(x, \lambda) \\ \hline
\vdots & \ddots & \vdots & \ddots & \vdots & \ddots & \vdots \\
b & \dots & \mathbf{\color{blue}{g(a, b)}} & \dots & \color{purple}{g(A, b)} & \dots & \mathbf{\color{blue}{\sup_{\lambda} \inf_{x} g(x, \lambda)}} \\
\vdots & \ddots & \vdots & \ddots & \vdots & \ddots & \vdots \\
B & \dots & g(a, B) & \dots & \mathbf{\color{red}{g(A, B)}} & \dots & \dots \\ 
\vdots & \ddots & \vdots & \ddots & \vdots & \ddots & \vdots \\ \hline
\text{Col Sup: } \sup_{\lambda} g(x, \lambda) & \dots & \dots & \dots & \mathbf{\color{red}{\inf_{x} \sup_{\lambda} g(x, \lambda)}} & \dots & 
\end{array}
$$



---

##### 2. The Visual Chain Proof

The inequality is forced by the existence of the **Bridge Element** $\color{purple}{g(A, b)}$, which sits at the intersection of the optimal column $A$ and the optimal row $b$.

1.  **Horizontal Row Constraint:** Since $\color{blue}{g(a, b)}$ is the infimum of row $b$ over all $x$, it must be less than or equal to any other element in that row:
    $$\mathbf{\color{blue}{g(a, b)}} \leq \color{purple}{g(A, b)}$$

2.  **Vertical Column Constraint:** Since $\color{red}{g(A, B)}$ is the supremum of column $A$ over all $\lambda$, it must be greater than or equal to any other element in that column:
    $$\color{purple}{g(A, b)} \leq \mathbf{\color{red}{g(A, B)}}$$

3.  **The Conclusion:** By transitivity through the bridge element:
    $$\underbrace{\color{blue}{\sup_{\lambda} \inf_{x} g(x, \lambda)}}_{\color{blue}{g(a, b)}} \leq \color{purple}{g(A, b)} \leq \underbrace{\color{red}{\inf_{x} \sup_{\lambda} g(x, \lambda)}}_{\color{red}{g(A, B)}}$$
    

### Absorbing constraints into the objective

The above constrained optimization form can be rewritten using the indicator function as

$$\begin{equation}\begin{aligned}\min_{x} f(x) + I\big(h(x) \big) \\ = \min_x f(x) + \sup_{\lambda \geq 0} \; \lambda \cdot h(x) \\ = \min_x \; \sup_{\lambda \geq 0} \; \underbrace{f(x) + \lambda \cdot h(x)}_{L(x,\lambda)} \\ \geq \sup_{\lambda \geq 0}\;\min_x \; L(x,\lambda) \\ \geq \min_x L(x,\lambda)  = g(\lambda)\end{aligned} \end{equation}$$
$L(x,\lambda)$ is called the Lagrangian and its minimum over $x$, i.e. $g(\lambda)$ is called the Lagrange Dual or simply the Dual (Boyd, Ch. 5). 
Since the dual function is the point-wise minimum of a family of affine
functions of $\lambda$, it is concave, even when the functions $f$ and $h$ themselves are not convex.