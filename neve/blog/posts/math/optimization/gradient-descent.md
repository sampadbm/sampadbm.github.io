---
date: 2026-07-29
title: Gradient Descent
tags: [math, linear-algebra, tutorial]
summary: Proof of convergence for quadratic objective
authors: [sampad]
---

### Warmup

Objective is to minimize the quadratic function

$$f(w) = f(x,y) = a (x - \alpha)^2 + b (y - \beta)^2$$

where $a,b > 0, w = [x,y]^T$ such that $f$ has a minima at $c = [\alpha,  \beta]^T$

The gradient is 
$$
\begin{aligned}
	\nabla_w f(w) = \begin{bmatrix} \frac{\partial f}{\partial x} \\\;\\ \frac{\partial f}{\partial y} \end{bmatrix} =  2 \begin{bmatrix} a(x-\alpha) \\\;\\ b (y-\beta) \end{bmatrix} 
	= \underbrace{\begin{bmatrix} 2a & 0 \\ 0 & 2b\end{bmatrix}}_{H} \begin{bmatrix} x - \alpha \\ y - \beta \end{bmatrix} \\ = H \bigg( \underbrace{\begin{bmatrix} x \\ y \end{bmatrix}}_{w} - \underbrace{\begin{bmatrix} \alpha \\ \beta \end{bmatrix}}_{c}\bigg) = H (w - c)
\end{aligned}
$$

Note $H := \nabla^2 f(w) = \mathrm{diag}(2a, 2b)$ is the Hessian. Since $a, b > 0$, $H$ is symmetric positive definite.

Gradient descent @ learning rate = $\eta$ starting at initial parameter $w_0$, we get

$$
\begin{aligned}
	w_{t+1} = w_t - \eta \; \underbrace{\nabla_w f(w_t)} \\
	w_{t+1} = w_t - \eta \; \overbrace{H(w_t - c)} \\
	w_{t+1} - {\color{red} c} = (w_t - {\color{red} c}) - \eta \; H(w_t - c) \\
	\underbrace{w_{t+1} - c}_{e_{t+1}} = (I - \eta H) \underbrace{(w_t - c)}_{e_t} \\\;\\
	e_{t+1} = (I - \eta H) e_t \\\;\\
	\overbrace{\begin{bmatrix} p_{t+1} \\ q_{t+1}  \end{bmatrix}}^{e_{t+1}} =  \bigg( \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} - \eta \begin{bmatrix} 2a & 0 \\ 0 & 2b\end{bmatrix} \bigg) \overbrace{\begin{bmatrix} p_t \\ q_t \end{bmatrix}}^{e_t} 
	\\\;\\
	\begin{bmatrix}p_{t+1} \\ q_{t+1} \end{bmatrix} = \begin{bmatrix} 1 - 2 \eta a & 0 \\ 0 & 1 - 2 \eta b \end{bmatrix} \begin{bmatrix} p_t \\ q_t \end{bmatrix} = \begin{bmatrix} (1 - 2 \eta a) p_t\\ (1 - 2\eta b) q_t \end{bmatrix}
\end{aligned}
$$

So we get two separate evolution of the parameter components/coordinates as follows

$$
\begin{aligned}
p_{t+1} = (1 - 2 \eta a) p_t \\
q_{t+1} = (1 - 2 \eta b) q_t
\end{aligned}
$$

For a recursion like this, we get
$$
\begin{aligned}
	p_{t} = (1 - 2 \eta a) \underline{p_{t-1}} = (1 - 2 \eta a) \underline{(1 - 2 \eta a) p_{t-2}} \\
	= (1 - 2\eta a)^2 p_{t-2} \\
	= ( 1 - 2 \eta a)^3 p_{t-3}\\.\\
	= ( 1 - 2 \eta a)^k p_{t - k}\\.\\
	= ( 1 - 2 \eta a)^t p_0
\end{aligned}
$$

Similarly we get $$q_t = (1 - 2\eta b)^t q_0$$

If $e_t = w_t - c \rightarrow 0$ and hence $w_t \rightarrow c$.  
This means gradient descent makes the parameter $w_t$ converge to the minima $c$.

To make $e_t \rightarrow 0$, we need $p_t \rightarrow 0$ and $q_t \rightarrow 0$.

This happens when $|1 - 2 \eta a| < 1$ and $ |1 - 2 \eta b| < 1$.

This means, we must have $-1 < 1 - 2 \eta a < 1 $ and $ -1 < 1 - 2 \eta b < 1$  
This means, we must have $-2 < - 2 \eta a < 0 $ and $ -2 < - 2 \eta b < 0$  
This means, we must have $0  < 2 \eta a < 2 $ and $ 0 < 2 \eta b < 2$  
This means, we must have $0  <  \eta < 1/a $ and $ 0 < \eta  < 1/b$  
This means, we must have $0  <  \eta < \min(1/a, 1/b)$  
This means, we must have $0  <  \eta < \frac{1}{\max(a, b)} = \frac{2}{\lambda_{max}(H)} = \frac{2}{|H|_2} = \frac{2}{\sigma_{max}({H})}$

where $|M|_2$ is the spectral norm or the largest singular value of $M$, and $\lambda_{max}(H) = 2\max(a,b)$. The step $\sigma_{max}(H) = \lambda_{max}(H)$ only because $H$ is positive definite; for a general symmetric $H$ this is not sufficient by itself — you additionally need $\lambda_{min}(H) > 0$ (i.e. $f$ strongly convex), since a negative eigenvalue makes gradient descent diverge along that direction for every $\eta > 0$.

### Rates of convergences of the coordinates of parameter $w$.

Since $p_t = (1 - 2 \eta a)^t p_0$ and $q_t = (1 - 2 \eta b)^t q_0$, the rates of convergences to zero of the two components of $e_t$ are different if $a \neq b$.  
This means the rate of convergence of the two coordinate/components of $w_t = [x_t, y_t]^T$ to $c = [\alpha , \beta]^T$ are dependent on $a$ and $b$ respectively.

### Observations: exact convergence in finitely many steps

1. **$a = b$: converges in one step.** Both coordinate factors are the same, $1 - 2\eta a = 1 - 2 \eta b$, so a single learning rate can zero them out simultaneously. Setting $\eta^\star = \frac{1}{2a} = \frac{1}{2b}$ gives $p_1 = (1 - 2\eta^\star a)p_0 = 0$ and $q_1 = (1 - 2\eta^\star b) q_0 = 0$. So $w_1 = c$ exactly, regardless of $w_0$.

2. **$a \neq b$: converges in two steps, using a two-step schedule.** No single fixed $\eta$ can zero both coordinates at once here, since $1 - 2\eta a = 0$ and $1 - 2\eta b = 0$ demand $\eta = \frac{1}{2a}$ and $\eta = \frac{1}{2b}$ respectively — two different, incompatible values. But nothing stops us from using a different $\eta$ at each step. Take $\eta_1 = \frac{1}{2a}$ for step 1 and $\eta_2 = \frac{1}{2b}$ for step 2:
   $$
   \begin{aligned}
   p_1 = (1 - 2\eta_1 a) p_0 = 0, \qquad q_1 = (1 - 2\eta_1 b) q_0 = \Big(1 - \frac{b}{a}\Big) q_0 \\
   p_2 = (1 - 2\eta_2 a) \, p_1 = (1 - 2\eta_2 a)\cdot 0 = 0, \qquad q_2 = (1 - 2\eta_2 b) \, q_1 = 0 \cdot q_1 = 0
   \end{aligned}
   $$
   Step 1 zeros out $p$ exactly and leaves $q$ nonzero; step 2 zeros out $q$ exactly, and $p$ — already zero — stays zero. So $w_2 = c$ exactly. The order doesn't matter: running $\eta_1 = \frac{1}{2b}$ then $\eta_2 = \frac{1}{2a}$ works the same way, zeroing $q$ then $p$.

   This is a first glimpse of a general fact: for a quadratic with Hessian $H$ having $k$ distinct eigenvalues $\lambda_1, \dots, \lambda_k$, cycling the learning rate through $\eta_i = 1/\lambda_i$ zeros one eigen-coordinate per step (in the eigenbasis of $H$; here $H$ is already diagonal, so the eigen-coordinates are just $p$ and $q$ with eigenvalues $\lambda_1 = 2a$, $\lambda_2 = 2b$), giving exact convergence in $k$ steps — the same mechanism behind why methods like conjugate gradient solve a quadratic exactly in at most (number of distinct eigenvalues) iterations, rather than only asymptotically.
