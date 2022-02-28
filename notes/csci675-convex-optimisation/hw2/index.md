---
themes: ["default", "colorful"]
---

# CSCI675 : Homework-2
<p style="text-align:center; color:#7A306C"> <b>26th February, 2022</b> </p>
<p style='text-align:center;color:green'><b>


---

>edits -\
init: 26th February, 2022


> ==========
[Textbook: Convex Optimisation, Stephen Boyd and Lieven Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
> ==========


Find the question here - [Homework2 Questions](hw2questions.pdf)


### Q1 : Midpoint Convexity and closed set 
![](q1.png)


### Q2 : Convex Sets 
![](q2.png)
Axioms
------
A1) Halfspaces are convex. $\\$
A2) Intersection of convex sets is convex. $\\$
A3) Union of convex sets is not necessarily convex.
A4) Affine transformation of a convex set is convex, i.e convexity is preserved under affine transformations.
A5) Set of points closer to point x than to point y is a halfspace, say $H(x,y)$.


| **part** | **convex / non-convex** | **reasoning** |
-----------|-------------------------|---------------|
|a| convex | Slab = intersection of halfspaces $ \alpha \leq a^T x $ and $a^T x \leq \beta$.$\\$ Apply A1 and A2. |
|b| convex | Rectangle = intersection of axis aligned slabs (i.e $\;a$ is an element of the standard basis or a multiple of it in the formulation in part a). $\\$ Apply A1 and A2.|
|c| convex | Wedge = intersection of halfspaces. $\\$ Apply A1 and A2.|
|d| convex | Let $S$ be the described set and $x_0$ be the point. $\\$ Let a generic point $y_i \in S$. $\\$ The halfspace $H(x_0,y_i)$ describe all the points closer to $x_0$ than the point $y_i$. $\\$ Let $S_i = H(x_0,y_i)$. $\\$ Clearly, $S = \bigcap_{i} S_i = \bigcup_{i} H(x_0,y_i)$ since all $y_i \in S$ are closer to $x_0$ than any point in $T$. $\\$ Apply A1 and A2.
|e| non-convex | An easy conterexample in $\mathbb{R^2}$ - set A = {(-1,0), (1,0)} and B={(0,0)}. The set Q of all points in A than in B is the union of the halfspaces $x>0.5$ and $x < -0.5$.$\\$ In general, Q is the union of the convex sets $S_i$ where $S_i$ is the set described in part (d), i.e $S_i$ is the convex set that is closer to $a_i$ than set $B$ for an arbitrary point $a_i \in A$. Apply axiom A3 |
|f| convex | $S_1$ is the translation of $S_2$ by the vector $\vec{x}$. Translation is an affine transformation (f(\vec{p}) = I \vec{p} + \vec{x}). $\\$ Apply axiom A4.|
|g| convex | Turns out that this set is the interior of a circle centered at one of the points because $0 \leq \theta \leq 1$. | 

### Q3) Probability Distributions and Convexity

![](q3.png)

| **part** | **convex / non-convex** | **reasoning** | 
|----------|-------------------------|---------------|
| a | convex | Let $b_i = f(a_i)$. $\\$ $\mathbf{E}f(x) = f(a_i)p_i = b_ip_i$. $\\$ $\alpha \leq \mathbf{E}f(x) \leq \beta \iff \alpha \leq b_ip_i$ and $b_ip_i \leq \beta$ . $\\$ So $p_i$ has to obey two linear inequalities and hence the region defined in p-space is convex.|
| b | convex | Let $a_k \geq \alpha$ for some $k \in \{1,2,...n\}$. $\\$  $ \therefore prob(x > \alpha) \leq \beta = \sum_{i=k}^{n}{p_i} \leq \beta$. $\\$ Above is a linear inequality in p-space when $\alpha$ and $\beta$ are some given constants.
| c | convex | $\mathbf{E}|x^3|= \sum_{i=1}^{n}|a_i|^3p_i$ and $\mathbf{E}|x| = \sum_{i=1}^{n}|a_i|p_i$. $\\$ $\mathbf{E}|x^3| \leq \alpha\mathbf{E}|x| \iff \mathbf{E}|x^3| - \alpha \mathbf{E}|x| \leq 0$ $\\$ or  $|a_i^3|p_i - \alpha |a_i|p_i \leq 0 \iff |a_i^3|p_i - |a_i|p_i$. $\\$ $(|a_i|^3 - |a_i|)p_i \leq 0$. $\\$ Above is a linear inequality in p-space and hence is convex since $a_i$ and $\alpha$ are constants.
| d | convex | $\mathbf{E}x^2 = \sum_{i=1}^{n}a_i^2p_i \leq \alpha$. Above is a linear inequality in p-space.|
| e | convex | $\mathbf{E}x^2 = \sum_{i=1}^{n}a_i^2p_i \geq \alpha$. Above is a linear inequality in p-space.|
| f | non-convex | Let $\mathbf{E}x = \mu = \sum_{i=1}^{n}a_ip_i$. $\\$ $ \mathbf{var}(x) = \mathbf{E}[x - \mu]^2 = \mathbf{E}[ x^2 + \mu^2 - 2x \mu x ]$ $\\$ $= \mathbf{E}x^2 + \mu^2 - 2\mu \mathbf{E}x = \mathbf{E}x^2 + \mu^2 - 2 \mu^2 = \mathbf{E}x^2 - \mu^2$ $\\$ $= \sum_{i=1}^{n}{a_i^2 p_i} - (\sum_{i=1}^n a_i p_i)^2 $. $\\ \; \\$ Let $c_i = a_i^2$ and $\mathbf{c} = [c_1 ... c_i ... c_n]^T$. $\\$ Similarly, let $\mathbf{a} = [a_1 ... a_i ... a_n]^T$. $\\$ Then, $\mathbf{var}(x) = \mathbf{c^Tp} - \mathbf{p^T(aa^T)p}$ $\\$ $\mathbf{var}(x) \leq \alpha \iff \mathbf{c^Tp} - \mathbf{p^T(aa^T)p} \leq \alpha$ $\\$ This may not be convex always. $\\$ For example, if we are in $\mathbb{R^2}$, then the LHS in the above inequality defines a conic section which can be a hyperbola (since there is a -ve sign in the equation). This can cause the failure of convexity if the inequality forces the set to be the two disjoint unbounded sides of the hyperbola.|
|g| convex | using a similar derivation as in part f, we can get $\mathbf{var}(x) = \mathbf{c^T p} - \mathbf{p^T (a a^T) p}$ $\\$ $\mathbf{var}(x) \leq \alpha \implies \mathbf{c^T p} - \mathbf{p^T (a a^T) p} \geq \alpha$ $\\$ Unlike the previous case, there is no -ve sign in the LHS and the entires of the vector $\mathbf{c}$ are all positive since $c_i = a_i^2$. $\\$ Also since $\mathbf{aa^T}$ is always +ve semidefinite for all $\mathbf{a}$, we can guarantee that the corresponding conic section will be a parabola and hence the inequality forces the set to be on the side of parabola that makes the set convex. |
| h | convex | linear inequality |
| i | convex | linear inequality |


### Q4. Operations that preserve convextiy
![](q4.png)

|                                                         |
|---------------------------------------------------------|
| **We will solve this using 4 methods -** $\\$ 1. using algebraic definition of convex sets $\\$ 2. using direct sum of convex sets and then projecting $\\$ 3. projecting and then taking direct sum of the projections. $\\$ 4. Using multilinear operator and tensor algebra|


Let $f((x,y_1), (x,y_2)) = (x, y_1 + y_2))$ where $f: \mathbb{R^m} \times \mathbb{R^n} \rightarrow \mathbb{R^{m+n}}$ is a multilinear function.  
