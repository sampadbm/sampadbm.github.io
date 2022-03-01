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
| **We will solve this using 4 methods -** $\\$ 1. Using algebraic definition of convex sets  $\\$ 2. Projecting and then taking Minkowski sum of the projections. $\\$ 4. Using multilinear operator and tensor algebra $\\$ 2. Using direct sum of convex sets and then projecting|


Let $f((x,y_1), (x,y_2)) = (x, y_1 + y_2))$ where $f: \mathbb{R^m} \times \mathbb{R^n} \rightarrow \mathbb{R^{m+n}}$ is a multilinear function.

Let $\\$
$A_1 = (x,a_1), B_1 =(x,b_1) \; s.t \; A_1,B_1 \in S_1$ and $\\$
$B_1 = (x,a_2), B_2 = (x,b_2) \; s.t \; A_2, B_2\in S_2$.$\\$


$S_1$ is convex, $\color{purple} M_1 = \theta A_1 + (1 - \theta)B_1 = (x, \theta a_1 + (1- \theta) b_1) \in S_1 \; \forall \; \theta \in [0,1]$.

Similarly, $\color{blue}M_2 = \theta A_2 + (1 - \theta)B_2 = (x, \theta a_2 + (1- \theta) b_2) \in S_2 \; \forall \; \theta \in [0,1]$.

By definition, $F_A = f(A_1,A_2) = (x,a_1 + a_2) \in S_1$ and $F_B = f(B_1, B_2) = (x,b_1 + b_2) \in S_2$.

We need to show that $F = \theta F_A + (1 - \theta) F_B \in S \; \forall \; \theta \in [0,1]$.

$$
	F = \theta F_A \color{crimson}+\color{black} (1 - \theta) F_B \\ \; \\

	= \theta (x \;,\; a_1 + a_2) \color{crimson}+\color{black} (1 - \theta)(x \;,\; b_1 + b_2) \\\;\\
	= (\theta x \; , \; \theta [a_1 + a_2] ) \color{crimson}+\color{black} ( (1-\theta) x \;,\; (1-\theta) [b_1 + b_2]) \\ \;\\

	= (\theta x \color{crimson}+\color{black} (1 - \theta)x \; , \; [\theta a_1 \color{crimson}+\color{black} (1 - \theta)b_1] \color{crimson}+\color{black} [\theta a_2 \color{crimson}+\color{black} (1 - \theta)b_2] ) \\ \; \\

	= ( x \; , \; [\theta a_1 \color{crimson}+\color{black} (1 - \theta)b_1] \color{crimson}+\color{black} [\theta a_2 \color{crimson}+\color{black} (1 - \theta)b_2] ) \\ \; \\

	= f \color{green}\bigg(\color{black} ( x \; , \; \theta a_1 + (1 - \theta)b_1 ) \; , \; (x \; , \; \theta a_1 + (1 - \theta)b_1 \color{green} \bigg)\color{black} \\ \; \\

	= f \color{green}\bigg(\color{black} ( x \; , \; \theta a_1 + (1 - \theta)b_1 ) \; , \; (x \; , \; \theta a_1 + (1 - \theta)b_1 \color{green} \bigg)\color{black} \\ \; \\
	

	= f \color{green}\bigg(\color{purple} ( x \; , \; \theta a_1 + (1 - \theta)b_1 ) \; \color{black}, \color{blue} \; (x \; , \; \theta a_1 + (1 - \theta)b_1 \color{green} \bigg)\color{black} \\ \; \\

	= f \color{green}\bigg(\color{purple} M_1 \; \color{black}, \color{blue} \; M_2 \color{green} \bigg)\color{black} \in S \;\;\; _\blacksquare\\
	
$$

> Theorem 1: Direct Sum of convex sets is convex.$\\ \; \\$
$X,Y$ convex $\implies$ $X \oplus Y$ is convex. $\\$  
If $X \subset \mathbb{R^m}$ and $Y \subset \mathbb{R^n}$ are convex sets. Let us embed $X$ and $Y$ in the first $m$ and the last $n$ dimensions of the space $\mathbb{R^{m+n}}$. Let then the direct sum of the two convex sets can be defined as the set $S = \{ \langle x,y \rangle | \;   x \in X, y \in Y \} $ where $\langle x,y \rangle \in \mathbb{R^{m+n}}$ is the concatenation of the vectors $x \in X$ and $y \in Y$.  Then $S$ is convex. $\\ \; \\$
>Proof: $\\$
Let $x_1, x_2 \in X$ and $y_1,y_2 \in Y$. $\\$
Since $X$ and $Y$ are both convex, $x_3 = \alpha x_1 + (1 - \alpha)x_2 \in X$ and $y_3 = \alpha y_1 + (1 - \alpha)y_2 \in Y$. $\\$
$\\$ Let $s_1 = \langle x_1, y_1 \rangle \in S$ and $ s_2 = \langle x_1, y_1 \rangle \in S$.$\\$
Clearly $s_3 = \langle x_3, y_3 \rangle \in S$ by definition of direct sum.
 We need to show that $s = \alpha s_1 + (1 - \alpha) s_2 \in S$. $\\\;\\$
$$
	s = \alpha s_1 + (1 - \alpha) s_2 \\
	=  \alpha \langle x_1, y_1 \rangle + ( 1 - \alpha ) \langle x_2, y_2 \rangle \\
	= \langle \alpha x_1 + (1 - \alpha) x_2 \; , \; \alpha y_1 + (1 - \alpha) y_2 \rangle \\
	= \langle x_3, y_3 \rangle = s_3 \in S \;\;\; _\blacksquare
$$ 

$\\ \; \\$


> Theorem 2: Projection operator preserves convexity $\\ \; \\$
> Let $P$ be a projector operator such that $ P: \mathbb{R^{m+n}} \rightarrow \mathbb{R^{m}}$. $\\$ Let $X \subset \mathbb{R^{m+n}}$ be convex. $\\$ Then the image of $X$ under $P$ is convex, i.e $P(X)$ ius convex. $\\ \; \\$
>Proof: $\\$
Let $x_1, x_2 \in X$ $\\$
Since X is convex, $\forall \alpha, \; 0 \leq \alpha \leq 1$ we have $x_3 = \alpha x_1 + (1 - \alpha)x_2 \in X$.
Let $p_1 = P(x_1) \in \mathbb{R^m}$ and $p_2 = P(x_2) \in \mathbb{R^m}$ be the projections of $x_1, x_2$ respectively, i.e $p_1$ and $p_2$ are the images of $x_1$ and $x_2$ under the projection operator and hence by definition of images under operators, $p_1, p_2 \in P(X)$ $\\ \; \\$
We need to show that the point $p_3 = \alpha p_1 + (1 - \alpha) p_2 $ belongs to the image of $X$ under $P$, i.e $p_3 \in P(X)$. $\\ \; \\$
$$
	p_3 = \alpha p_1 + ( 1 - \alpha) p_2 \\
	 = \alpha P(x_1) + (1 - \alpha)P(x_2) \\
	 = P(\alpha x_1) + P((1 - \alpha) x_2) \;\; \{ \because P \; is \; linear \} \\
	 = P (\alpha x_1 + (1 - \alpha)x_2 ) \;\; \{ \because P \; is \; linear \} \\
	 = P( x_3 ) \in P(X) \{ \because x_3 \in X \} \;\;\; _\blacksquare 
$$


> Theorem 3: Minkowski sum preserves convexity $\\$
$A + B = \{ a + b \;| \; a \in A, b \in B  \}$ $\\ \; \\$
We are not going to prove the following result about Minkowski sums but here is the [wiki reference.](https://en.wikipedia.org/wiki/Minkowski_addition#Convex_hulls_of_Minkowski_sums) $\\ \; \\$
$Conv(A + B) = Conv(A) + Conv(B)$ $\\$
i.e the convex hull of the Minkowski sum is the Minkowski sum of the convex hull of the sets. [Note that this is a special case of the general case of equivariance if we define the Minkowski sum '+' as a binary operator on convex sets.] $\\ \; \\$
> If $X$ is a convex set, $\iff$ $Conv(X) = X$. $\\ \; \\$
Using the above two results, we can show that the Minkowski sum of two convex sets $A$ and $B$ is convex, i.e we can show that $S = A+B$ is convex $\\$
$$
	Conv(S) = Conv(A + B) \\
	= Conv(A) + Conv(B) \\
	= A + B \;\;\; \{ \because \; A,B \; are \; convex \} \\
	= S \\ \; \\

	\implies Conv(S) = S \\ \therefore \; S=A+B \; is \; convex \;\;\; _\blacksquare
	
$$

Now let's prove what we were asked in the question. We need to show that the image under $f((x,y_1),(x,y_2)) = (x, y_1 + y_2)$ is convex.
Let $ U = P_Y (S_1), V = P_Y(S_2)$ and $W = P_X(S_1) \cap P_X(S_2)$ where $P_Y$ is the projection on to the last $n$ dimensions and $P_X$ is projection onto the first $m$ dimensions.
Clearly $U$ and $V$ are convex since $S_1, S_2$ are convex. Similarly $W$ is convex because it is the intersection of the projection of convex sets $S_1$ and $S_2$ and we know that intersections and projections preserce convexity.

It is easy to see that the compsition $ Minkowskisum (U, V) \oplus W  $ is precisely $f$. Since all the operations that compose $f$ preserve convexity, $f$ preserves convexity too since convexity is preserved under composition if the operations which themselves preserveconvexity as it is basically a chain of convex images.     

$\color{darkred} 
I \; will \; be \; back \; to \; the \; other\; two \; methods \; - \; 3 \; and \; 4\; when \; I \; get \; time \; later .$ 


### Q5: Set of separating hyperplanes

![](q5.png)

Definition of a convex cone: A set S is a cone if $s \in S \iff \alpha s \in S \; \forall \; \alpha > 0$

Clearly when $C$ and $D$ are not separable, $\langle a, b \rangle = \vec{0} \in \mathbb{R^{n+1}}$ and hence is a trivial convex cone. 

When there exists a separating hyperplane, let the $ \langle a,b \rangle$ be a representation of it. Let us call the set of all such representations $H$.

$$
	a^T x \leq b \; \forall \; x \in C \; and \; a^T y \geq b \; \forall \; y \in D \\
	\implies k a^T x \leq k b \; and \; k a^T y \geq kb \; \forall \; k \geq 0 \\
	\implies (ka)^T x \leq kb \; and \; (ka)^T y \geq kb \; \forall \; k \geq 0 \\
$$  

Hence $ \langle ka, kb \rangle = k \langle a,b \rangle \; \forall \; k > 0 $ is also the representation of the separating hyperplane and hence belongs to the set of the separating hyperplanes. Hence the set of the separating hyperplanes is a cone.

Now we will prove that it is convex as well.
Let $ \langle a_1 , b_1 \rangle$ and $\langle a_2, b_2 \rangle$ be in the set $H$.
We have to show that $ \langle a_3, b_3 \rangle = \theta \langle a_1, b_1 \rangle + ( 1 - \theta) \langle a_2, b_2 \rangle = \langle \theta a_1 + (1 - \theta) a_2 \; , \; \theta b_1 + (1 - \theta)b_2   \rangle $ is also in the set $H$ when $0 \leq \theta \leq 1$.

$$
	Let \; x \in C \; and \; y \in D \\ \; \\
	
	a_1 x \leq b_1 \; \color{darkred} and \color{black} \; a_1 y \geq b_1 \\
	a_2 x \leq b_2 \; \color{darkred} and \color{black} \; a_2 y \geq b_2 \\ 

					\Updownarrow \\
					
	\theta a_1 x \leq \theta b_1 \;\color{darkred} and \color{black} \; \theta a_1 y \geq \theta b_1 \\
	( 1 - \theta) a_2 x \leq ( 1 - \theta) b_2 \;  \color{darkred} and \color{black} \; ( 1 - \theta) a_2 y \geq ( 1 - \theta) b_2 \\
	
					\Updownarrow \\
		
	\theta a_1 x + ( 1 - \theta) a_2 x \leq \theta b_1 + ( 1 - \theta) b_2 \; \color{darkred} and \color{black} \; \theta a_1 y + ( 1 - \theta) a_2 y \geq \theta b_1 + ( 1 - \theta) b_2 \; \\

		\Updownarrow \\

		a_3 x \leq b_3 \; \color{darkred} and \color{black} \; a_3 y \geq b_3 

		\\ \; \\
		
	   \implies \langle a_3 , b_3 \rangle \in H \;\;\; _\blacksquare 
$$


Hence the set $H$ is convex in addition to being a cone. Hence $H$, the set of representation of separating hyperplanes is a convex cone. If we restrict the hyperplanes to have a unique representation, then the set might neither be convex or a cone - for example forcing $a$ to be unit length will make the set and arc of the unit circle that is formed when we take the intersection of the convex cone $H$ and the unit circle in $\mathbb{R^{n+1}}$.


### Q6. Support Functions

![](q6.png)

Basically we are looking in the direction of the vector $y$ and trying to see what is the greatest value of the dot product of $y$ with any point/position vector $x$ in the set $C$. 

Why we need the set to be closed is clear from a counterexample. If $C$ is a closed convex set and $D$ is $C$ with a hole cut out in the interior of $C$, in then the support funcitons are the same but the sets $C$ and $D$ are not.

Why we need convexity for the sets $C$ and $D$ for the claim in the question will become evident when we have proved the statement.

We can easily see that since $S_C(y) = y \cdot x$, $S_C(ky) = k y \cdot x = k S_C \; \forall \; k \in \mathbb{R}$ i.e $S_C{ky} = k S_C{y}$. So if $C$ and $D$ are two sets and $S_C(y) = S_D(y)$, then $S_C(ky) = kS_C(y) = k S_D(y) = S_D(ky)$. That means that once we know that the support function for the sets $C$ and $D$ are same given the vector $y$, it is the same for $C$ and $D$ for all vector in that direction (all linear combinations) of them. So we might aswell just look at the directions and not all the vectors. That is exactly what we will do, we will look at all unit vectors $y$, i.e $|y| = 1$.

We observe that if the support functions $S_D(y) = S_C(y) \; \forall \; |y| = 1$, then the closed convex sets $C$ and $D$ are the same. 

** fact 1: ** Recall that the vector form of a hyperplane that has the unit normal $y$ and is $d$ distance away from the origin along the direction $y$ is given by $y \cdot x = d$ or equivalently $y^T x = d$. 

** fact 2: ** $y^T x =   y \cdot x = d$ gives the projection of $x$ in the direction of $y$ when $|y| = 1$.


From the above two facts, we can see that $\color{green}y^T\color{black} \color{blue}x \color{black} = \color{green}S_C(y) \approx max(d) \color{black}$ is a $ \color{orange}hyperplane$ that supports the set $C$ at the point $x^*$ where $\color{green} S_C(y) = y^T x^* \color{black}$.

![](supportfunctions.jpg)
*support function*


Clearly $S_C(y) = S_C(\theta)$ when $y = 1$ and $S_C(\theta) = sup \{ \langle cos \theta , sin \theta \rangle \cdot x \; | \; x \in C \}$.


Hence $y^T x = S_C(y) \; , \; |y|=1$ are the supporting hyperplanes of the set $C$.

Since $S_C(y) = S_D(y) \; \forall \; y$, hence $S_C(y) = S_D(y)$ for $|y| = 1$. 

$$
	S_C(y) = S_D(y) \; \forall \; |y|=1 \\ \; \\
	\implies y^T x = S_C(y) \equiv y^T x = S_D(y) \\ \; \\
	supporting \; hyperplanes \; of \; C \equiv supporting \; hyperplanes \; of \; D. 
$$

If the set of supporting hyperplanes of two convex sets $C$ and $D$ are the same, then the sets are the same since the convex sets are also defined by the set of the separating hyperplanes instead of the set of points. $\;\; _\blacksquare$


### Q7. Euclidean Distance Matrices

![](q7.png)

The distance matrix satisfies $D_{ii} = 0$ and $x^T D x \leq 0$ for all $1^T x = 0 $.

We need to show that the space of distance matrices is a convex cone.

It is not very difficult to see that the space of such matrices form a cone.
Let $C = kD$ where $k \geq 0, k \in \mathbb{R}$.

$$
	C_{ii} = k * D_{ii} = k * 0 = 0 \;\;\; _\blacksquare
  
$$

For $1^T x = 0$

$$
		x^T D x \leq 0 \\
		\implies k x^T D x  \leq 0 \;\;\; \forall k \geq 0 \\
		\implies x^T kD x \leq 0 \\ 
		\implies x^T C x \leq 0 \;\;\; _\blacksquare
		 
$$


Now let us show that the space of such matrices is infact convex. 

Let $D$ and $E$ be two euclidean distance matrices. 
Let $F  = \alpha D + (1 - \alpha)E$ for $0 \leq \alpha \leq 1$
$$
	F_{ii} = \alpha D_{ii} + ( 1 - \alpha ) E_{ii} = \alpha * 0 + ( 1 - \alpha ) * 0 = 0 \;\;\; _\blacksquare
$$

for $1^T x = 0 $
$$
	x^T D x \leq 0 \; and \; x^T E x \leq 0 \\ \; \\

	\alpha x^T D x \leq 0 \; and \; (1 - \alpha) x^T E x \leq 0 \\ \; \\

	x^T \alpha D x \leq 0 \; and \; x^T (1 - \alpha)E x^T \leq 0 \\ \; \\

	\implies x^T [ \alpha D + ( 1 - \alpha ) E ] x \leq 0 \\ \; \\

	\implies x^T F x \leq 0 \;\;\; _\blacksquare   
$$


So the space of euclidean distance matrices is infact a convex cone. 


![](q7p2.png)

We need to find the dual cone of the cone of the euclidean distance matrices. 

The dual of a set $Z$ is defined as the set Y  = $y \; | \; y^T z \leq 1 \; \forall z \in Z$.

For a cone Z, the dual is equilvalently defined as the set Y  = $y \; | \; y^T z \leq 0 \; \forall z \in Z$.

However, we already know that for al euclidean distance matrices $D$ and $1^T x = 0 $
$$
	x^T D x \leq 0 \\ \; \\
	\implies (x x^T) \cdot D \leq 0   
$$
