---
date: 2026-10-29
title: "Convex Geometry and Duality, Part 2: Dual Spaces, Dual Norms, and Inner Products"
tags: [math, convex-analysis, linear-algebra, tutorial]
summary: Dual norms need no inner product; an inner product lets us represent linear functionals as vectors
authors: [sampad]
---

### The dual space

Let $V$ be a finite-dimensional real vector space.
A **linear functional** is a map $f:V\to\mathbb{R}$ satisfying

$$
f(\alpha x+\beta z)=\alpha f(x)+\beta f(z).
$$

Intuitively, $f$ measures a vector: for example, $f(x_1,x_2)=2x_1-x_2$.
The **dual space** $V^*$ consists of all such functionals, with pointwise operations.
Evaluation $f(x)$ requires no inner product.

### The dual norm

A norm on $V$ defines the **dual norm** on $V^*$:

$$
\boxed{\|f\|_* = \sup_{\|x\|\le1}|f(x)|.}
$$

This is the largest absolute measurement on the unit ball, or equivalently the smallest $C$ such that
$|f(x)|\le C\|x\|$ for every $x$.
For example, under $\|\cdot\|_1$, the functional $f(x)=2x_1-x_2$ has dual norm $2$:
$|f(x)|\le2\|x\|_1$, with equality at $(1,0)$.

### Representation by an inner product

An inner product identifies each vector $y\in V$ with the functional $f_y\in V^*$:

$$
y\longmapsto f_y,\qquad f_y(x)=\langle x,y\rangle.
$$

Every $f\in V^*$ equals $f_y$ for a unique $y$. The dual norm on vectors is then

$$
\|y\|_* := \|f_y\|_* = \sup_{\|x\|\le1}|\langle x,y\rangle|.
$$

**For a fixed primal norm, the dual norm on $V^*$ exists independent of an inner product.
Its representation in the primal space $V$, via identification by an inner product, depends on the chosen inner product.**

The primal norm may not be the norm induced by this inner product.
If it is, then $\|x\|=\sqrt{\langle x,x\rangle}$ and $\|y\|_*=\|y\|$:
Cauchy–Schwarz gives the upper bound, attained at $x=y/\|y\|$ for $y\ne0$.

### Changing the inner product

Keep the primal norm fixed. For $\langle x,y\rangle_G=x^\top Gy$ with $G$ symmetric positive definite,

$$
\boxed{\|y\|_{*,G}=\|Gy\|_{*,I},}
$$

where $I$ denotes the Euclidean pairing.
The functional $f(x)=a^\top x$ is represented by $a$ under $I$ and $G^{-1}a$ under $G$.
**Its dual norm stays the same; its representing vector changes.**
The same vector can therefore have different dual norms under different pairings.

### Polars in the dual space

For $S\subseteq V$, its polar is

$$
S^\circ_{V^*}=\{f\in V^*: f(x)\le1\text{ for all }x\in S\}.
$$

It consists of functionals bounded above by $1$ on $S$.
Polarity reverses inclusion and scaling:

$$
A\subseteq B\implies B^\circ_{V^*}\subseteq A^\circ_{V^*},
\qquad
(tS)^\circ_{V^*}=t^{-1}S^\circ_{V^*}\quad(t>0).
$$

A larger set imposes more constraints on its functionals; scaling follows from $f(tx)=t f(x)$.
Both properties hold for arbitrary sets and require no inner product.

For a norm's unit ball $B$, symmetry makes the polar constraint equivalent to $|f(x)|\le1$ on $B$, so

$$
B^\circ_{V^*}=\{f:\|f\|_*\le1\}.
$$

**The polar in $V^*$ is independent of an inner product.
Its representation in the primal space $V$, via identification by an inner product, depends on the chosen inner product:**

$$
S^{\circ,G}=G^{-1}S^{\circ,I}.
$$

For example, $S=[-1,1]$ has vector polar $[-1,1]$ under $xy$, but $[-1/2,1/2]$ under $2xy$.
Both represent the same functionals $f(x)=ax$ with $|a|\le1$.

The gauge of $S$ is unchanged: it uses only membership in $tS$.
See [Convex Geometry and Duality, Part 1: Gauges and Polars](post.html?file=posts/math/convex-analysis/minkowski-functionals-polars-and-dual-norms.md)
for proofs and illustrations.
