---
themes: ["default"]
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
A3) Set of points closer to point x than to point y is a halfspace, say $H_{xy}$.


| **part** | **convex / non-convex** | **reasoning** |
-----------|-------------------------|---------------|
|a| convex | Slab = intersection of halfspaces $ \alpha \leq a^T x $ and $a^T x \leq \beta$.$\\$ Apply A1 and A2. |
|b| convex | Rectangle = intersection of axis aligned slabs (i.e $\;a$ is an element of the standard basis or a multiple of it in the formulation in part a). $\\$ Apply A1 and A2.|
|c| convex | Wedge = intersection of halfspaces. $\\$ Apply A1 and A2.|
|d| convex | Let $S$ be the described set and $y$ be the point. $\\$ Let $x \in S$. $\\$
