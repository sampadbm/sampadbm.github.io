---
themes: ["muted","colorful"]
category: science
---



# Convex Programming and Extreme Points
<p style="text-align:center; color:#7A306C"> <b>13th Nov, 2024</b> </p>

<p style='text-align:center;color:green'><b> 
Extreme Points - only solutions of maximizing convex programs
</b></p> 

### Problem Statement
Prove that there exists an extreme point (of the feasible set) as a solution for maximizing the objective of any convex problem with a bounded feasible set.

#### Solution

##### Concepts

> CONVEX FUNCTION  
Any function $f$ that satisfies
$$
    f(\alpha x_1 + (1-\alpha)x_2) \leq \alpha f(x_1) + (1-\alpha) f(x_2) \text{ for some } \alpha \in [0,1] 
$$

> CONVEX SETS  
Any set $S$ such that 
$$
    s_1,s_2 \in S, \alpha \in [0,1] \implies s = \alpha s_1 + (1 - \alpha)s_2 \in S 
$$
>

> OBSERVATIONS:  
>
>0. The intersection of arbitrary convex sets is convex.  
>Proof: We will prove here for countable number of convex sets but it works for arbitrary including uncountably infinite. Let $S_i$ be convex setsi and let $S = \cap_i S_i$.
Let $x_1,x_2 \in S$. We need to show $x_0 = \alpha x_1 + (1-\alpha)x_2 \in S$ when $\alpha, (1-\alpha) \geq 0$. Since $S$ is the intersection of all the sets $S_i$, $x_1,x_2 \in S_i$ for all $i$. Let us pick any one of the $S_i$, lets say $S_1$ without any loss of generality as the sets can always be renames/reindexed. Since $S_1$ is convex by assumption, $x_0$ must lie in $S_1$. Similar arguments yeild that $x_0$ must lie in $S_1, S_2, s_3,...,S_i,...$ and hence $x_0$ is common to all $S_i$ and hence must li in their intersection $S \;\;\; _\blacksquare$ 
>
>1. The epigraph of a function $f: \mathbb{R}^n \rightarrow \mathbb{R}$ is the set  $epi(f) \subset \mathbb{R}^{n+1}$ defined as $epi(f) := \{(\vec x,y) \in \mathbb{R}^{n+1} \;|\;  y \geq f(\vec x)\}$.  
The epigraph of a convex function of $f$ is a convex set.  
>Proof: Let $\vec p_1:=(\vec x_1,y_1),\vec p_2 := (\vec x_2, y_2) \in epi(f)$. This means $$ f(\vec x_1) \leq y_1 \;\;\;\;\; \color{green}(1.1)\color{default}\\ f(\vec x_2) \leq y_2 \;\;\;\;\; \color{green}(1.2)$$
Now, consider the point $\vec p_0 \in \mathbb{R}^{n+1}$ define as  
$$
\vec p_0 := \alpha \vec p_1 + (1-\alpha)\vec p_2 \\
= \alpha (\vec x_1, y_1) + (1 - \alpha) (\vec x_2, y_2) \;\;, \alpha,1-\alpha \geq 0\\
    = (\alpha \vec x_1 , \alpha y_1) + ((1 - \alpha) \vec x_2, (1- \alpha)y_2) \\
    = (\underbrace{\alpha \vec x_1 + (1- \alpha)\vec x_2}_{\color{brown}\vec x_0\color{default}}, \underbrace{\alpha y_1 + (1 - \alpha)y_2}_{\color{blue}y_0\color{default}}) \\
    := (\color{brown}\vec x_0 \color{default} , \color{blue} y_0 \color{default})
$$
To show $epi(f)$ is a convex set, we need to show that $\vec p_0 = \alpha \vec p_1 + (1 - \alpha) \vec p_2$ lies in $epi(f)$ too.  Now, 
$$
f(\color{brown}\vec x_0 \color{default}) \\ 
= f(\alpha \vec x_1 + (1 - \alpha) \vec x_2)\\
\leq \alpha f(\vec x_1) + (1 - \alpha)f(\vec x_2)  \;\;\; \because \text{convexity of $f$}\\
\leq \alpha y_1 + (1 - \alpha) y_2 \;\;\;\;\;  \because \color{green}\;(1.1)\color{default}, \color{green}(1.2) \color{default}, \alpha, 1-\alpha \geq 0\\
= \color{blue}y_0 \color{default} \\\;\\
\implies f(\color{brown}\vec x_0\color{default}) \leq \color{blue}y_0\color{default} \\ 
\implies (\color{brown}\vec x_0 \color{default}, \color{blue}y_0\color{default}) \in epi(f) \\
\implies \vec p_0 \in epi(f) \;\;\; _\blacksquare
$$
>
> 2. Any affine transformation of a convex set is also convex, i.e convexity of sets is preserved under affine transformations (convexity as a property is invariant under affine transformations)
> Proof: Let $a$


> EXTREME POINTS  
If $C$ is a convex set, $x$ is an extreme point of $C$ iff  
$$
    \nexists \; x_0,x_2,\alpha \in [0,1] \in C \text{ such that }  x = \alpha x_1 + (1 - \alpha)x_2  
$$


> CONVEX PROBLEMS  
Any optimization problem of the form 
$$
    \underset{\vec{x}}{min} \; f(\vec{x}) \\
    \text{s.t }  g_i(\vec{x}) \leq c_i 
$$
where $f$ and $g_i$ are convex functions and $c_i$ are constants.


> MAXIMIZING THE OBJECTIVE  
If the minimization of the convex function is switched to a maxmization like below
$$
    \underset{\vec{x}}{max} \; f(\vec{x}) \\
    \text{s.t } g_i(\vec{x}) \leq c_i
$$

Can we do it on a linear function $f$ which ofcourse is convex?
Well, let's see. Let $S = \{ \vec{x} | g_i(\vec{x}) \leq c_i \}$ be the feasible set which is convex. Let $M$

$$
   f(s) = f(\alpha s_1 + (1 - \alpha)s_2) = \alpha f(s_1) + (1 - \alpha)f(s_2) \;\;\; \because \text{ $f$ is linear} \\
   f(s) = 
$$
