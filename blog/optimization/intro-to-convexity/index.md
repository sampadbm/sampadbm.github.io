---
themes: ["muted","colorful"]
category: science, optimization
---


# Introduction to Convexity
<p style="text-align:center; color:#7A306C"> <b>13th Nov, 2024</b> </p>


### Concepts

> CONVEX FUNCTION  
Any function $f:\mathbb{R}^n \rightarrow \mathbb{R}$ that satisfies
$$
    f(\alpha x_1 + (1-\alpha)x_2) \leq \alpha f(x_1) + (1-\alpha) f(x_2) \text{ for some } \alpha \in [0,1] 
$$

> CONVEX SETS  
Any set $S \subset \mathbb R^n$ such that 
$$
    s_1,s_2 \in S, \alpha \in [0,1] \implies s = \alpha s_1 + (1 - \alpha)s_2 \in S 
$$
>
> Examples:  
>0. Fullspace " $\mathbb R^n$
>1. Halfspaces : $H := \{ \vec x \;|\; \bold A \vec x + \vec b \leq 0 \}$  
>2. Unit ball using any norm |.|: $ B:= \{ \vec x \;|\; |\vec{x}| \leq 1 \}$ 

> OBSERVATIONS:  
>
>0. The notion of convexity requires some notion of interpolation between the elements of a set. It is easy to unserstand this interpolation in a vector space structure because it allows for additon of its elements and also scaling/multiplicaiton by a scalar from some field. Hence in our discussions we only talk about convexity in vector spaces. There are alternative notions of convexity that do not require as much structure as vector spaces, for example there are notions of convexity
on metric spaces (to be precises, geodesic metric spaces) and also on graphs.   
>1. The intersection of arbitrary convex sets is convex.  
>Proof: We will prove here for countable number of convex sets but it works for arbitrary including uncountably infinite. Let $S_i$ be convex setsi and let $S = \cap_i S_i$.
Let $x_1,x_2 \in S$. We need to show $x_0 = \alpha x_1 + (1-\alpha)x_2 \in S$ when $\alpha, (1-\alpha) \geq 0$. Since $S$ is the intersection of all the sets $S_i$, $x_1,x_2 \in S_i$ for all $i$. Let us pick any one of the $S_i$, lets say $S_1$ without any loss of generality as the sets can always be renames/reindexed. Since $S_1$ is convex by assumption, $x_0$ must lie in $S_1$. Similar arguments yeild that $x_0$ must lie in $S_1, S_2, s_3,...,S_i,...$ and hence $x_0$ is common to all $S_i$ and hence must lie in their intersection $S \;\;\; _\blacksquare$ 
>
>2. The epigraph of a function $f: \underbrace{D}_{ \;\;\;\;\; \subset \mathbb{R}^n} \rightarrow \mathbb{R}$ is the set  $epi(f) \subset \mathbb{R}^{n+1}$ defined as $epi(f) := \{(\vec x,y) \in \mathbb{R}^{n+1} \;|\;  y \geq f(\vec x), \vec x \in D \}$.  
Given a convex domain $D$, the epigraph of a convex function $f$ is convex.  
>Proof: Let $\vec x_1, \vec x_2 \in D$. Since $D$ is convex, $D \ni \color{brown}\vec x_0 \color{default}:= \alpha \vec x_1 + (1- \alpha) \vec x_2$ for $\alpha, 1 - \alpha \geq 0$.  Let $\vec p_1:=(\vec x_1,y_1),\vec p_2 := (\vec x_2, y_2) \in epi(f)$. This means $$ f(\vec x_1) \leq y_1 \;\;\;\;\; \color{green}(1.1)\color{default}\\ f(\vec x_2) \leq y_2 \;\;\;\;\; \color{green}(1.2)$$
Now, consider the point $\vec p_0 \in \mathbb{R}^{n+1}$ define as  
$$
\vec p_0 := \alpha \vec p_1 + (1-\alpha)\vec p_2 \\
= \alpha (\vec x_1, y_1) + (1 - \alpha) (\vec x_2, y_2) \;\;, \alpha,1-\alpha \geq 0\\
    = (\alpha \vec x_1 , \alpha y_1) + ((1 - \alpha) \vec x_2, (1- \alpha)y_2) \\
    = (\underbrace{\alpha \vec x_1 + (1- \alpha)\vec x_2}_{\color{brown}\vec x_0\color{default} \in D}, \underbrace{\alpha y_1 + (1 - \alpha)y_2}_{\color{blue}y_0\color{default}}) \\
    =: (\color{brown}\vec x_0 \color{default} , \color{blue} y_0 \color{default})
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
> 3. Any affine transformation of a convex set $S \in \mathbb{R}^n$ is also convex, i.e convexity of sets is preserved under affine transformations (convexity as a property is invariant under affine transformations)  
> Proof: Let $a:\mathbb{R}^n \rightarrow \mathbb{R}^m$ be any affine transformation. Any affine transfrom can always be represented using a matrix $\bold A$ and a translation $\vec b$, i.e $a(\vec x) := \bold A \vec x + \vec b$. We want to show that the set $Q := \{ y \;|\; y = a(x); x \in S \}$ is a convex set. In another word, if $a_{set}: 2^{\mathbb{R}^n} \rightarrow 2^{\mathbb{R}^m}$ be the image set function corresponding to $a$, then $Q = a_{set}(S)$ is a convex set. 
> If $\vec q_1, \vec q_2 \in Q$, we need to show $Q \ni \vec q_0 = \alpha \vec q_1 + (1 - \alpha) \vec q_2$.
>Since $\vec q_1, \vec q_2 \in Q = a_{set}(S)$, there must exist, by definition of $Q$, vectors $\vec x_1, \vec x_2 \in S$ such that $\vec q_1 = a(\vec x_1), \vec q_2 = a(\vec x_2)$. Also, since $S$ is a convex set, $ S \ni \vec x_0 := \alpha \vec x_1 + (1 - \alpha) \vec x_2$
$$
    \vec q_0 = \alpha \vec q_1 + ( 1 - \alpha) \vec q_2 = \alpha  a(\vec x_1) + (1-\alpha)a(\vec x_2) \\
    = \alpha (\bold A \vec x_1 + \vec b) + ( 1 - \alpha) (\bold A \vec x_2 + \vec b) \\
    = \alpha \bold A \vec x_1 + \alpha \vec b + (1-\alpha) \bold A \vec x_2 + (1-\alpha) \vec b \\
    = \bold A (\alpha \vec x_1 + (1 - \alpha) \vec x_2) + \vec b (\alpha + 1 - \alpha) \\
    = \bold A \vec x_0 + \vec b = a(\vec x_0)
$$  
By definition of $Q$, if $\vec x \in S \implies a(\vec x) \in Q$. Since $\vec x_0 \in S$, we have $Q \ni \vec q_0 = a(\vec x_0) \;\;\; _\blacksquare$ 
>
>**COROLLARY 3.0**: Linear transforms preserve convexity. Linear transforms ($a(\vec x) = \bold A x$) are subset of affine transforms (where $\vec b = 0$).
>
>**COROLLARY 3.1**: Rigid transformation of convex sets are convex (which is intuitive). Proof: Rigid transformations are a subset of affine transforms. Affine transforms include shearing, stretching and linear projections in addition to rigid transforms.   
>
>COROLLARY 3.2: Linear Projections preserve convexity. Proof: Projections are linear transforms  
>
>**COROLLARY 3.3**: The set of points obtained by dropping a fixed coordinate/component of points on a convex set yeilds a convex set. Proof: This is a linear projection on the the rest of the coordinates. Note: the coordinate system need not be orthogonal, it can be oblique (the projection is oblique but still linear). Example: Let $C \subset \mathbb R^{n+1}$ be a convex set whose members are the points $(\vec x,y)$ where $\vec x \in \mathbb R^n$ are the first $n$ coordinates/components and $y \in \mathbb R$ is the last one. The sets $C_{proj[:-1]} := {(\vec x, 0) \;|\; (\vec x, y) \in C }$ and  $\mathbb R^n \supset C_{[:-1]} := { \vec x \;|\; (\vec x, y) \in C}$ obtained by zeroing/dropping the last coordinate are convex.     
>
>**COROLLARY 3.4**: If $f:\mathbb R^n \rightarrow \mathbb R$ is a convex function, then the subset $\mathbb R^n \supset C := \{ \vec x \;|\; f(\vec x) \leq c \}$ (subset in domain of $f$) is a convex set.  
Proof: Domain of $f$ is the fullspace $\mathbb R^n$ which is convex. Since $f$ is convex, $epi(f) := \{ (\vec x, y) \; | \; f(\vec x) \leq y \}$ is convex by observation(2).  Consider the halfspace $\mathbb R^{n+1} \supset H := \{(\vec x,y) \;|\: y \leq c\}$ which is convex. By observation(1), $E := H \cap epi(f) = \{ (\vec x, y) \;|\; f(\vec x) \leq y , y \leq c\} = \{ (\vec x, y)\;|\; f(\vec x) \leq c \}$ is convex. By dropping the last coordinate/component $y$ from the points $(\vec x, y)$ in $E$, we obtain the set $C = \{ \vec x \;|\; f(\vec x) \leq c  \}$ which is convex by corollary (3.3) $_\blacksquare$.
>
>4. Sum of convex functions is convex.  
Proof: Let $f,g$ be convex functions. To show : $h := f + g$ is convex  
$f(\alpha \vec x_1 + (1- \alpha) \vec x_2) \leq \alpha f(\vec x_1) + (1-\alpha) f(\vec x_2) $  
$g(\alpha \vec x_1 + (1- \alpha) \vec x_2) \leq \alpha g(\vec x_1) + (1-\alpha)g(\vec x_2) $  
Adding LHS  
$$
    f(\alpha \vec x_1 + (1 - \alpha)\vec x_2) + g(\alpha \vec x_1 + (1-\alpha) \vec x_2) \\ = (f + g)(\alpha \vec x_1 + (1-\alpha) \vec x_2) \\
    = h(\alpha \vec x_1 + (1-\alpha)\vec x_2)
$$
Adding RHS  
$$
    \alpha f(\vec x_1) + (1-\alpha)f(\vec x_2) + \alpha g(\vec x_1) + (1-\alpha)g(\vec x_2) \\
    = \alpha [ f(\vec x_1) + g(\vec x_1)] + (1-\alpha)[f(\vec x_2) + g(\vec x_2)] \\
    = \alpha (f+g)(\vec x_1) + (1-\alpha)(f+g)(\vec x_2) \\
    = \alpha h(\vec x_1) + (1-\alpha)h(\vec x_2)
$$
Observing that sum of LHS $\leq$ sum of RHS, we have  
$h(\alpha \vec x_1 + (1-\alpha) \vec x_2 ) \leq \alpha h(\vec x_1) + (1- \alpha)h(\vec x_2)$ which shows that $h = f + g$ is convex. 
>5. Composition of convex functions is convex under some conditions.
Let $f: \mathbb R \rightarrow \mathbb R$ and $g: \mathbb R^n \rightarrow \mathbb R$ be convex functions and $h := f \circ g$ be the composition. To show : $h$ is convex.  
For $\alpha, \beta \leq 1$ and $\alpha + \beta = 1$,  
$$
    g(\alpha \vec x_1 + \beta \vec x_2 ) \leq \alpha \underbrace{g(\vec x_1)}_{z_1} + \beta \underbrace{g(\vec x_2)}_{z_2} \;\;\; \because \; g \text{ is convex}\\ 
   => g(\underbrace{\alpha \vec x_1 + \beta \vec x_2}_{\vec x_0}) \leq  \underbrace{\alpha z_1 + \beta z_2}_{z_0}  \\
   => g(\vec x_0) \leq z_0
$$
Also at the same time,
$$
    f(z_0) = f(\alpha z_1 + \beta z_2) \leq  \alpha f(z_1) + \beta f(z_2) \;\;\; \because \; f \text{ is convex} \\
    => f(z_0) \leq \alpha f(g(\vec x_1)) + \beta f(g(\vec x_2)) \\
    => f(z_0) \leq \alpha h(\vec x_1) + \beta h(\vec x_2) 
$$
If only we had $f(g(\vec x_0)) \leq f(z_0)$, then we could have used the last inequality to get - 
$$
   f(g(\vec x_0)) \leq f(z_0) \leq \alpha h(\vec x_1) + \beta h(\vec x_2) \\
   => f(g(\vec x_0)) \leq \alpha h(\vec x_1) + \beta h(\vec x_2) \\
   => h(\vec x_0) \leq \alpha h(\vec x_1) + \beta h(\vec x_2) 
$$
which would mean $h$ is convex as $\vec x_0 = \alpha \vec x_1 + \beta \vec x_2$.  
If we observe closely,we already have $g(\vec x_0) \leq z_0$ because of convexity of $g$. We can get $f(g(\vec x_0)) \leq f(z_0)$ if we require $f$ to be non-decreasing in the range of $g$ (we can also impose the stricter global non-decreasing condition on $f$) in addition to it being convex.  
>> Hence, the following observation holds
>> - If $g:\mathbb R^n \rightarrow \mathbb R$ is convex
>> - If $f: \mathbb R \rightarrow \mathbb R$ is convex and non-decreasing (at least on the range of $g$ or in the best case, globally) $$\\$$ 
>> **Then the composition $h := f \circ g$ is convex.** 
>6. For once differentiable funtions, convexity is equivalent to:  
$\exists \epsilon > 0$ such that $f( \vec x \pm \epsilon \langle \vec \nabla f , \vec x \rangle) \leq f(\vec x)$. In words, it means that to 1st approximation using the tangent along the direction of maximum slope, the approximation lies beneath the graph  
>7. For twice differentiable functions, convexity $\iff \nabla^2 f \geq 0$


> EXTREME POINTS  
If $C$ is a convex set, $x$ is an extreme point of $C$ iff  
$$
    \nexists \; x_1,x_2 \in C,\alpha \in [0,1]  \text{ such that }  x = \alpha x_1 + (1 - \alpha)x_2  
$$
In words, it means that for all line segments in $C$, $x$ is atleast one of the two endpoints of the segment. When it is both of the endpoints, the line segment is degenarate and is the single point $x$.  
OBSERVATIONS:
(0) Extreme points can only lie on the boundary of a set and not on the interior.
Proof: We will prove this by contradiction. Let there be an extreme point $\vec p$ on of a convex set $S$ that lies in the interior. By definition of an interior point, there exists $\epsilon > 0$ such that the ball $S \supset B(\vec p, \epsilon) := \{ \vec x \;|\; |\vec x - \vec p| < \epsilon \} $ for any vector norm $|.|$. Consider such an $\epsilon$. Consider a unit vector $\vec u$ and the two points $\vec p_1 := \vec p + \frac{\epsilon}{2} \vec u$ and $p_2 := \vec p - \frac{\epsilon}{2} \vec u$.  
Now, $\vec p_1, \vec p_2 \in B(\vec p, \epsilon)$.  
Proof: $|\vec p_1 - \vec p| = | \vec p  - \vec p  - \frac{\epsilon}{2} \vec u | = |\frac{\epsilon}{2} \vec u| = \frac{\epsilon}{2}\underbrace{|\vec u|}_{1} = \frac{\epsilon}{2} < \epsilon \;\;\; _\blacksquare$. Similarly for $\vec p_2$.   
$\vec p_1, \vec p_2 \in S$ since $\vec p_1, \vec p_2 \in B(\vec p, \epsilon) \subset S $. Consider $\alpha = 0.5$ such that we have the convex combination $\alpha \vec p_1 + (1-\alpha) \vec p_2 = \vec p$. As point $\vec p \in S$ can be written as a convex combination of two points $\vec p_1, \vec p_2 \in S$, $\vec p$ is not an extreme point of $S$. Hence we arrive at a contradiction to our assumption that $\vec p$ is both an extreme point and an interior point. Hence it cannot be true that $\vec p$ is both an extreme point and an interior point at the same time. Hence an interior point can never be an extreme point.

> CONVEX PROBLEMS  
Any optimization problem of the form 
$$
    \underset{\vec{x}}{min} \; f(\vec{x}) \\
    \text{s.t }  g_i(\vec{x}) \leq c_i 
$$
where $f$ and $g_i$ are convex functions and $c_i$ are constants.
Note: Each set $C_i := g_i(\vec x) \leq c_i$ defines a convex set and we are constrained to minimize $f$ on the set $C := \cap_i C_i$ which is convex as well by observation(1).  


