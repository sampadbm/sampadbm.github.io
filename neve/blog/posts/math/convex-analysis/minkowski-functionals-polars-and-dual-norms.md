---
date: 2026-10-28
title: "Convex Geometry and Duality, Part 1: Gauges and Polars"
tags: [math, convex-analysis, optimization, tutorial]
summary: The gauge of a convex body, its polar, and why the gauge of the polar is the dual norm
authors: [sampad]
---

### The gauge

Work in $\mathbb{R}^n$ with the Euclidean pairing $\langle x,y\rangle=x^\top y$.
We represent functionals in the dual space as vectors in the primal space via this inner product:
$y\longleftrightarrow f_y$, where $f_y(x)=\langle x,y\rangle$.
All polar sets and dual norms below use this identification.

For any $S\subseteq\mathbb{R}^n$, its **Minkowski functional**, or **gauge**, is

$$
\boxed{p_S(x)=\inf\{t>0:x\in tS\}
=\inf\{t>0:x/t\in S\}.}
$$

The gauge is the infimum of the scale factors needed for $S$ to contain $x$.
Equivalently, rescale $x$ until it lies in $S$.
If no positive scaling of $S$ contains $x$, then $p_S(x)=+\infty$, using $\inf\emptyset=+\infty$.

| Geometry | Consequence | Picture |
|:---|:---|:---|
| $0 \in \operatorname{int}(S)$ | $p_S(x) < \infty$ for all $x$ | <img src="/neve/blog/posts/math/convex-analysis/images/gauge-finite.png" width="260" alt="Every direction is absorbed"> |
| $0 \in \operatorname{int}(S)$ and $S$ is unbounded | Still $p_S(x) < \infty$ for all $x$, but $p_S(x)$ may be $0$ for $x \ne 0$.<br>Example: $S = \mathbb{R} \times [-1,1]$ gives $p_S(a,b) = \lvert b \rvert$. | <img src="/neve/blog/posts/math/convex-analysis/images/gauge-unbounded-strip.png" width="260" alt="An unbounded strip has zero gauge along its axis"> |


### When the gauge is a norm

Let $K \subseteq \mathbb{R}^n$ be a compact convex set with $0 \in \operatorname{int}(K)$,
and suppose $K = -K$ (symmetry about the origin). Then the gauge $p_K$ is a norm on $\mathbb{R}^n$.

The assumptions have distinct roles: $0\in\operatorname{int}(K)$ gives finiteness, boundedness gives positivity
away from zero, convexity gives subadditivity, and symmetry gives absolute homogeneity.
Closedness will ensure that $K$ is exactly the closed unit ball of $p_K$.

**Finiteness and positive definiteness.** Let $B_2 = \{u : \|u\|_2 \le 1\}$ be the closed Euclidean unit ball.
Since the origin is an interior point and $K$ is bounded, there are $0 < r \le R < \infty$ such that

$$
rB_2 \subseteq K \subseteq RB_2.
$$

For $x \ne 0$, the first inclusion gives $rx/\|x\|_2 \in K$, so $x \in (\|x\|_2/r)K$.
The second inclusion shows that whenever $x \in tK$, we have $\|x\|_2 \le tR$.
Taking the infimum over such $t > 0$ yields

$$
0 < \frac{\|x\|_2}{R} \le p_K(x) \le \frac{\|x\|_2}{r} < \infty.
$$

Also, $0 \in tK$ for every $t>0$, so $p_K(0)=0$.

**Absolute homogeneity.** A norm requires $p_K(\alpha x)=|\alpha|p_K(x)$ for every real $\alpha$.
For $\alpha>0$, substituting $t=\alpha s$ gives positive homogeneity, without using symmetry:

$$
\begin{aligned}
p_K(\alpha x)
&= \inf\{t > 0 : \alpha x \in tK\} \\
&= \inf\{\alpha s : s > 0,\ x \in sK\} \\
&= \alpha p_K(x).
\end{aligned}
$$

Symmetry supplies the missing case of scaling by $-1$:
$K=-K$ implies $-x\in tK$ if and only if $x\in tK$, hence $p_K(-x)=p_K(x)$.
For $\alpha<0$, combine this with positive homogeneity:

$$
p_K(\alpha x)=p_K(|\alpha|(-x))
=|\alpha|p_K(-x)=|\alpha|p_K(x).
$$

The case $\alpha=0$ follows from $p_K(0)=0$. Thus

$$
p_K(\alpha x) = |\alpha|p_K(x) \qquad \text{for every } \alpha \in \mathbb{R}.
$$

**Triangle inequality.** Fix $x,y \in \mathbb{R}^n$ and $\varepsilon > 0$.
By the definition of the infimum, choose $a,b > 0$ such that

$$
x \in aK, \qquad y \in bK, \qquad
a < p_K(x) + \varepsilon, \qquad b < p_K(y) + \varepsilon.
$$

Both $x/a$ and $y/b$ belong to $K$. Convexity therefore gives

$$
\frac{x+y}{a+b}
= \frac{a}{a+b}\frac{x}{a} + \frac{b}{a+b}\frac{y}{b}
\in K.
$$

Thus $x+y \in (a+b)K$, and

$$
p_K(x+y) \le a+b < p_K(x) + p_K(y) + 2\varepsilon.
$$

Letting $\varepsilon \downarrow 0$ proves $p_K(x+y) \le p_K(x) + p_K(y)$.
$\square$

### When the gauge is convex

If $S$ is convex and contains $0$, its gauge is convex (possibly taking $+\infty$).
The positive homogeneity and subadditivity arguments above give, for $0<\lambda<1$,

$$
p_S(\lambda x+(1-\lambda)y)
\le \lambda p_S(x)+(1-\lambda)p_S(y).
$$

Symmetry and boundedness are not needed here. For nonconvex $S$, the gauge need not be convex.
For example, take the union of two rectangles

$$
S=([-2,2]\times[-1,1])\cup([-1,1]\times[-2,2]).
$$

Then $p_S(2,1)=p_S(1,2)=1$, but $p_S(3/2,3/2)=3/2>1$, violating the midpoint inequality.

### A gauge need not be symmetric

Consider $K=[-1,2] \subseteq \mathbb{R}$. It is compact and convex, with the origin in its interior,
but $K \ne -K$. Since $tK=[-t,2t]$ for $t>0$, its gauge is

$$
p_K(x)=
\begin{cases}
x/2, & x \ge 0, \\
-x, & x \lt 0.
\end{cases}
$$

For $x>0$, membership in $tK$ requires $t \ge x/2$; for $x \lt 0$, it requires $t \ge -x$.
At $x=0$, every $t>0$ is admissible, so the infimum is zero.
In particular,

$$
p_K(1)=\tfrac12, \qquad p_K(-1)=1.
$$

The gauge retains finiteness, positivity away from zero, positive homogeneity, and subadditivity.
But $p_K(-1)\ne p_K(1)$: without symmetry, it need not be a norm.

### Polars

For an arbitrary set $S \subseteq \mathbb{R}^n$, define its polar by

$$
S^\circ = \{y : \langle y,x\rangle \le 1 \text{ for every } x \in S\}
= \bigcap_{x \in S}\{y : \langle y,x\rangle \le 1\}.
$$

The polar consists of vectors whose functionals are bounded above by $1$ on $S$.
**The polar exists independent of an inner product as a set of linear functionals in the dual space.
Its representation in the primal space, via identification by an inner product, depends on the chosen inner product.**
See [Convex Geometry and Duality, Part 2: Dual Spaces, Dual Norms, and Inner Products](post.html?file=posts/math/convex-analysis/dual-spaces-dual-norms-and-inner-products.md).

It is **closed, convex, and contains the origin**: each constraint defines a closed half-space
(or all of $\mathbb{R}^n$ when $x=0$), and $y=0$ satisfies every constraint.
No assumptions on $S$ are needed.

### Polarity reverses inclusion and scaling

These two facts hold for arbitrary sets, without convexity or symmetry assumptions:

$$
\boxed{A \subseteq B \implies B^\circ \subseteq A^\circ,}
\qquad
\boxed{(tS)^\circ = t^{-1}S^\circ \quad (t>0).}
$$

**Inclusion.** If $y \in B^\circ$, then $\langle y,x\rangle \le 1$ for every $x \in B$.
This holds in particular for every $x \in A$, so $y \in A^\circ$.
A larger set imposes more constraints on its polar, making the polar smaller.

**Scaling.** For $t>0$,

$$
\begin{aligned}
y \in (tS)^\circ
&\iff \langle y,tx\rangle \le 1 \quad \text{for every } x \in S \\
&\iff ty \in S^\circ \\
&\iff y \in t^{-1}S^\circ.
\end{aligned}
$$

Thus doubling a unit ball halves its polar. A Euclidean ball centered at $0$ with radius $r>0$
has polar radius $1/r$.

### Polar and dual cones: the PSD example

**Claim.** For a cone $C$, $\langle x,y\rangle\le1$ for every $x\in C$
if and only if $\langle x,y\rangle\le0$ for every $x\in C$.

**Proof.** If $\langle x,y\rangle>0$ for some $x\in C$, choose $t>1/\langle x,y\rangle$.
Then $tx\in C$ but $\langle tx,y\rangle=t\langle x,y\rangle>1$, a contradiction.
The converse is immediate. $\square$

Thus

$$
\begin{aligned}
C^\circ
&=\{y:\langle x,y\rangle\le1\text{ for every }x\in C\} \\
&=\{y:\langle x,y\rangle\le0\text{ for every }x\in C\}.
\end{aligned}
$$

The **dual cone** uses the opposite inequality:

$$
C^*=\{y:\langle x,y\rangle\ge0\text{ for every }x\in C\},
\qquad C^\circ=-C^*.
$$

Here $C^*$ denotes a dual cone, rather than a dual space or a convex conjugate.

**PSD matrices.** Let $\mathbb{S}^n$ be the space of real symmetric matrices.
The positive semidefinite cone is

$$
\mathbb{S}_+^n=\{X\in\mathbb{S}^n:v^\top Xv\ge0\text{ for every }v\in\mathbb{R}^n\}.
$$

We write $X\succeq0$ when $X$ is PSD. For symmetric $X$, the following are equivalent:

$$
\boxed{
\begin{aligned}
&v^\top Xv\ge0\quad\text{for every }v\in\mathbb{R}^n, \\[4pt]
&X=AA^\top=\sum_i a_i a_i^\top\quad\text{for some }A\in\mathbb{R}^{n\times n}, \\[4pt]
&\operatorname{spec}(X)\subseteq[0,\infty).
\end{aligned}
}
$$

Here $a_i$ are the columns of the factor matrix $A$.

**Trace/Frobenius/Hilbert–Schmidt inner product.**

$$
\langle X,Y\rangle_F
=\operatorname{tr}(X^\top Y)
=\operatorname{tr}(XY^\top)
=\sum_{i,j}X_{ij}Y_{ij}.
$$

**The ambient space matters.** All dual cones and polars in this example are taken within $\mathbb{S}^n$:

$$
A^*=\{Y\in\mathbb{S}^n:\langle X,Y\rangle_F\ge0\text{ for every }X\in A\}.
$$

Thus $Y$ is symmetric by definition. In the space of all real matrices, skew-symmetric matrices
are orthogonal to every symmetric matrix, so the dual of the PSD cone would instead be

$$
\{P+K:P\in\mathbb{S}_+^n,\ K^\top=-K\}.
$$

Within $\mathbb{S}^n$, the PSD cone is self-dual under this inner product;
its polar is the negative semidefinite cone:

$$
\boxed{(\mathbb{S}_+^n)^*=\mathbb{S}_+^n,
\qquad (\mathbb{S}_+^n)^\circ=-\mathbb{S}_+^n=\mathbb{S}_-^n.}
$$

**Proof of self-duality.** Write $B=\mathbb{S}_+^n$.

**1. $B\subseteq B^*$.** Let $Y\in B$ and write $Y=\sum_i b_i b_i^\top$.
For every $X\in B$,

$$
\begin{aligned}
\langle X,Y\rangle_F
&=\sum_i\langle X,b_i b_i^\top\rangle_F \\
&=\sum_i b_i^\top Xb_i\ge0,
\end{aligned}
$$

since $X\succeq0$. Hence $Y\in B^*$.

**2. $B^*\subseteq B$.** Inclusion reversal for polars also holds for dual cones:

$$
A\subseteq B
\implies B^\circ\subseteq A^\circ
\implies -B^\circ\subseteq -A^\circ
\implies B^*\subseteq A^*.
$$

Set $A=\{aa^\top:a\in\mathbb{R}^n\}$.
It is a cone: for $s>0$, $saa^\top=cc^\top$ with $c=\sqrt{s}\,a$.
Also $A\subseteq B$, since

$$
v^\top aa^\top v=(a^\top v)^2\ge0\qquad\text{for every }v\in\mathbb{R}^n.
$$

Let $Y\in A^*$ be arbitrary. For every $a\in\mathbb{R}^n$,

$$
0\le\langle aa^\top,Y\rangle_F=a^\top Ya.
$$

Since $Y$ is symmetric, this gives $Y\succeq0$. Thus $A^*\subseteq B$, and

$$
B^*\subseteq A^*\subseteq B.
$$

Together with the first inclusion, this proves $B^*=B$.
The polar identity follows from $B^\circ=-B^*=-B$. $\square$

**Additional observation: $A^*=\mathbb{S}_+^n$.** We already proved $A^*\subseteq\mathbb{S}_+^n$.
For the reverse inclusion, take any $Z\succeq0$. For every $X=aa^\top\in A$,

$$
\langle X,Z\rangle_F=\langle aa^\top,Z\rangle_F=a^\top Za\ge0.
$$

Hence $Z\in A^*$, proving $\mathbb{S}_+^n\subseteq A^*$ and therefore equality.

Testing against rank-one PSD matrices $aa^\top$ is enough to detect whether a symmetric matrix is PSD.

### The bipolar theorem

Taking the polar twice gives the closed convex hull after adjoining the origin:

$$
\boxed{S^{\circ\circ} = \overline{\operatorname{conv}(S \cup \{0\})}.}
$$

**Proof.** Put $C = \overline{\operatorname{conv}(S \cup \{0\})}$.
For any $x \in S$ and $y \in S^\circ$, we have $\langle x,y\rangle \le 1$,
so $S \subseteq S^{\circ\circ}$. Since $S^{\circ\circ}$ is closed, convex, and contains $0$,
it also contains $C$.

For the reverse inclusion, let $z \notin C$. The strict separation theorem gives a vector $a$
and a scalar $\alpha$ such that

$$
\langle a,x\rangle \le \alpha \lt \langle a,z\rangle
\qquad \text{for every } x \in C.
$$

Since $0 \in C$, we have $\alpha \ge 0$. Choose $\beta$ with
$\alpha \lt \beta \lt \langle a,z\rangle$, so $\beta>0$, and set $y=a/\beta$.
Then

$$
\langle y,x\rangle \le \frac{\alpha}{\beta} \lt 1
\quad \text{for every } x \in S,
\qquad
\langle y,z\rangle > 1.
$$

Thus $y \in S^\circ$ but $z \notin S^{\circ\circ}$.
This proves $S^{\circ\circ} \subseteq C$, and hence the claimed equality. $\square$

If $0 \in S$, the formula becomes
$S^{\circ\circ} = \overline{\operatorname{conv}(S)}$.
If $S$ is also compact, its convex hull is compact in finite dimensions and therefore already closed, so

$$
\boxed{S^{\circ\circ} = \operatorname{conv}(S)
\quad \text{when } S \text{ is compact and } 0 \in S.}
$$

Both qualifications matter in the general formula. For $S=\{1\} \subseteq \mathbb{R}$,
the bipolar is $[0,1]$, not $\operatorname{conv}(S)=\{1\}$.
For $S=(-1,1)$, the bipolar is $[-1,1]$, so the closure cannot be omitted.

For any closed convex set containing $0$, $S^{\circ\circ}=S$.
In particular, polarity recovers a norm's unit ball after two applications;
the corresponding double dual norm equals the original norm.

### The polar is the dual unit ball

Let $K$ satisfy the norm theorem: compact, convex, symmetric, with $0\in\operatorname{int}(K)$.
Write $\|x\|_K=p_K(x)$.

**The unit ball of the gauge.** We have

$$
K = \{x \in \mathbb{R}^n : \|x\|_K \le 1\}.
$$

If $x \in K$, then $t=1$ is admissible in the definition of $p_K(x)$, so $p_K(x) \le 1$.
Conversely, suppose $p_K(x) \le 1$. For every $\varepsilon > 0$, choose $0 < t < 1+\varepsilon$
with $x/t \in K$. Since $K$ is convex and contains $0$,

$$
\frac{x}{1+\varepsilon}
= \frac{t}{1+\varepsilon}\frac{x}{t}
+ \left(1-\frac{t}{1+\varepsilon}\right)0
\in K.
$$

Letting $\varepsilon \downarrow 0$ and using that $K$ is closed gives $x \in K$.

**The dual norm.** Using $f_y(x)=\langle x,y\rangle$, define

$$
\|y\|_{K,*}
:= \|f_y\|_{K,*}
= \sup_{\|x\|_K \le 1} |\langle y,x\rangle|
= \sup_{x \in K} |\langle y,x\rangle|.
$$

It is the largest absolute measurement on $K$, equivalently the least $C$ such that
$|f_y(x)|\le C\|x\|_K$ for all $x$.
It is finite because $K$ is bounded. Absolute homogeneity and the triangle inequality follow
from the corresponding properties of absolute values and the supremum.
If $y \ne 0$, the inclusion $rB_2 \subseteq K$ from the norm proof gives
$ry/\|y\|_2 \in K$, hence $\|y\|_{K,*} \ge r\|y\|_2 > 0$.
Also $\|0\|_{K,*}=0$, completing the norm properties.

**Identify its unit ball.** Since $K=-K$, an upper bound on $\langle y,x\rangle$ for every $x \in K$
also bounds $-\langle y,x\rangle = \langle y,-x\rangle$. Therefore

$$
\begin{aligned}
y \in K^\circ
&\iff \langle y,x\rangle \le 1 \quad \text{for all } x \in K \\
&\iff |\langle y,x\rangle| \le 1 \quad \text{for all } x \in K \\
&\iff \sup_{x \in K}|\langle y,x\rangle| \le 1 \\
&\iff \|y\|_{K,*} \le 1.
\end{aligned}
$$

Thus the polar is exactly the **closed unit ball of the dual norm**:

$$
\boxed{K^\circ = \{y \in \mathbb{R}^n : \|y\|_{K,*} \le 1\}.}
$$

In particular, for $t>0$, we have $y \in tK^\circ$ if and only if $\|y\|_{K,*} \le t$.
Taking the infimum over $t>0$ also shows that the **gauge of the polar is the dual norm**:

$$
\boxed{p_{K^\circ}(y)
= \inf\{t>0 : \|y\|_{K,*} \le t\}
= \|y\|_{K,*}.}
$$

**For a fixed primal norm, the dual norm on the dual space exists independent of an inner product.
Its representation in the primal space, via identification by an inner product, depends on the chosen inner product.**
The gauge of a fixed set requires no inner product: it depends only on membership in $tS$.
See [Convex Geometry and Duality, Part 2: Dual Spaces, Dual Norms, and Inner Products](post.html?file=posts/math/convex-analysis/dual-spaces-dual-norms-and-inner-products.md).

### Standard p-norms and their polar unit balls

For $1 \le p < \infty$, define $\|x\|_p = (\sum_{i=1}^n |x_i|^p)^{1/p}$,
and define $\|x\|_\infty = \max_i |x_i|$.
Write $B_p = \{x \in \mathbb{R}^n : \|x\|_p \le 1\}$ for the closed unit ball.
The conjugate exponent $q$ is determined by

$$
\frac{1}{p} + \frac{1}{q} = 1,
\qquad \frac{1}{\infty} := 0.
$$

The dual of the $\ell_p$ norm is the $\ell_q$ norm. Consequently,

$$
\boxed{B_p^\circ = B_q, \qquad p_{B_p^\circ}(y) = \|y\|_q.}
$$

The pictures below show the unit balls in $\mathbb{R}^2$ on identical coordinate scales:
teal is the primal ball $B_p$, and blue is its polar $B_q$. The identities hold in every finite dimension.

| Primal norm | Dual norm and polar | Unit balls in $\mathbb{R}^2$ |
| :---------- | :------------------ | :-------------------------- |
| $\ell_1$ (taxicab) | $\ell_\infty$<br>$B_1^\circ = B_\infty$ | <img src="/neve/blog/posts/math/convex-analysis/images/lp-1-infinity.svg" width="400" style="min-width: 340px" alt="Diamond and square"> |
| $\ell_{4/3}$ | $\ell_4$<br>$B_{4/3}^\circ = B_4$ | <img src="/neve/blog/posts/math/convex-analysis/images/lp-four-thirds-4.svg" width="400" style="min-width: 340px" alt="Rounded diamond and rounded square"> |
| $\ell_2$ (Euclidean) | $\ell_2$<br>$B_2^\circ = B_2$ | <img src="/neve/blog/posts/math/convex-analysis/images/lp-2-2.svg" width="400" style="min-width: 340px" alt="The Euclidean disk is its own polar"> |
| $\ell_\infty$ (maximum) | $\ell_1$<br>$B_\infty^\circ = B_1$ | <img src="/neve/blog/posts/math/convex-analysis/images/lp-infinity-1.svg" width="400" style="min-width: 340px" alt="Square and diamond"> |

**Why these are the dual pairs.** Hölder's inequality gives

$$
|\langle y,x\rangle| \le \|x\|_p\|y\|_q,
\qquad
\sup_{x \in B_p}|\langle y,x\rangle| \le \|y\|_q.
$$

For $1 \lt p \lt \infty$ and $y \ne 0$, equality is attained by choosing

$$
x_i = \frac{\operatorname{sgn}(y_i)|y_i|^{q-1}}{\|y\|_q^{q-1}}.
$$

Indeed, $(q-1)p=q$ gives $\|x\|_p=1$ and $\langle y,x\rangle=\|y\|_q$.
For $p=1$, choose $x=\operatorname{sgn}(y_j)e_j$, where $|y_j|=\|y\|_\infty$.
For $p=\infty$, choose $x_i=\operatorname{sgn}(y_i)$.
The case $y=0$ is immediate. Thus the supremum equals $\|y\|_q$ in every case,
and the polar identity follows from the preceding section.

The change in shape also illustrates how polarity reverses inclusion:

$$
\begin{aligned}
B_1 &\subseteq B_{4/3} \subseteq B_2 \subseteq B_4 \subseteq B_\infty, \\
B_1^\circ &\supseteq B_{4/3}^\circ \supseteq B_2^\circ \supseteq B_4^\circ \supseteq B_\infty^\circ.
\end{aligned}
$$

See also [Boyd and Vandenberghe, Appendix A.1.6](https://web.stanford.edu/~boyd/cvxbook/)
for dual norms and the conjugate-exponent rule.

### Generalized Cauchy–Schwarz inequality

Let $K$ be compact, convex, symmetric about the origin, with $0 \in \operatorname{int}(K)$,
as in the norm theorem. The primal and dual norms bound the pairing:

$$
\boxed{|\langle y,x\rangle| \le p_K(x)\,p_{K^\circ}(y).}
$$

**Proof.** If $x=0$, both sides are zero. Otherwise, put $u=x/p_K(x)$.
Homogeneity gives $p_K(u)=1$, so $u \in K$. By the definition of the dual norm,

$$
|\langle y,x\rangle|
= p_K(x)|\langle y,u\rangle|
\le p_K(x)\sup_{v \in K}|\langle y,v\rangle|
= p_K(x)\,p_{K^\circ}(y).
$$

For the Euclidean ball this is the usual Cauchy–Schwarz inequality.
For $K=B_p$, it is Hölder's inequality with conjugate exponents $p$ and $q$.

### Related concepts

- **Support function.** For a set $K \subseteq \mathbb{R}^n$, $h_K(y) = \sup_{x \in K} \langle x, y \rangle$. When $K$ is a
  convex body with $0$ in its interior, $h_K$ is the Minkowski functional of the polar $K^\circ$. In particular, the dual
  norm is the support function of the unit ball: $\|y\|_* = h_{B}(y)$.
- **Convex conjugate.** $f^*(y) = \sup_x (\langle x,y\rangle-f(x))$. The conjugate of the indicator $\delta_K$ ($0$ on $K$, $+\infty$ elsewhere) is the
  support function $h_K$, and the conjugate of a norm is the indicator of the dual unit ball. The Fenchel–Moreau theorem
  ($f^{**}=f$ for proper lower semicontinuous convex $f$) is the functional analogue of the bipolar theorem.
- **Polarity of polytopes.** For a full-dimensional convex polytope with the origin in its interior,
  polarity exchanges vertices and facets. The unit cube and the $\ell_1$ unit ball (the cross-polytope)
  are polar to each other.

### References

- R. Tyrrell Rockafellar (1970), [Convex Analysis](https://doi.org/10.1515/9781400873173), Princeton University Press,
  Sections 12–15 (conjugates, support functions, polars of sets and functions).
- Stephen Boyd and Lieven Vandenberghe (2004), [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/), Cambridge
  University Press, Section 3.3 (conjugate functions) and Appendix A.1.6 (dual norms).
- Alexander Barvinok (2002), *A Course in Convexity*, Graduate Studies in Mathematics **54**, American Mathematical Society.
- Hank Yang, [Semidefinite Optimization and Relaxation: Mathematical Background](https://hankyang.seas.harvard.edu/Semidefinite/background.html),
  Sections 1.1 and 1.2.2 (separation, convexity of polars, and the bipolar theorem).
- Jonathan Kelner (lecturer), Chaithanya Bandi (scribe),
  [Lecture 11: Polars, Norms, and Convex Bodies](https://ocw.mit.edu/courses/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/de0c446f55600a66c250ad6d7be77375_MIT18_409F09_scribe11.pdf),
  MIT 18.409, *An Algorithmist's Toolkit*, October 20, 2009, Section 4.1 (norms, duals, and the polar).
- Wikipedia, [Dual system](https://en.wikipedia.org/wiki/Dual_system): polars and duality for a general pairing
  $\langle X, Y \rangle$, beyond the inner product on $\mathbb{R}^n$.
- Wikipedia, [Dual space: Algebraic dual space](https://en.wikipedia.org/wiki/Dual_space#Algebraic_dual_space): the
  space of linear functionals on which dual norms are defined.
