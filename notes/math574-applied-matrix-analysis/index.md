---
themes: ["colorful"]
---

# Some results on optimising convex functions under simple constraints
<p style="text-align:center; color:#7A306C"> <b>19th September, 2021</b> </p>
<p style='text-align:center;color:green'><b>
Notes from MATH574: Applied Matrix Analysis (Prof. Robert Guralnik).</b></p>


---

>edits -\
init: 19th September, 2021


> ==========
[Textbook: Linear Algebra-I, Greenleaf and Sohie](https://www.maa.org/press/maa-reviews/linear-algebra-i)
> ==========

#### Notes from Chapter1

**Basis**: A spanning set of vectors which are also independent. (page 21)

$$
B = \{ \vec{v_i | i \in 1,2,3,.... } \} \; is \; a \; basis \; of \; V 

\\\;\\ \Big\Updownarrow \\\;\\

spanning \equiv \sum_{i=1,2,3,...}{c_i \vec{v_i}} = V \;  
\\\;\\ and \\\;\\
 \; independence \equiv \sum_{i=1,2,3,...}{c_i \vec{v_i}} = 0 \implies c_i = 0 \; \forall \; i=1,2,3,.. 
$$

**Existence and Construction of Basis (page 21):**
Every finite field has a basis.
There are two ways of constructing a basis - a.**pruning** and b. **extending**

*Pruning* - we start from a spanning set of vectors for $V$, we can always prune to make
them independent (if they already aren't).

*Extending* - we start with a set of independent vector $S$ and add one vector $v_1$ at a time 
to $S$ where $v_1$ is not in $span(S)$ already. $S_1 = S \cup {v}$ In this way, 
we can can finally make $S_r$ as basis of $V$ (if S wasn't already)

If we can not find a finite set of vectors using the extension method, then the 
vector space $V$ is said to be infinite dimensional.

> The space of all polynomials in the field $\mathbb{K}$ is denoted by $\mathbb{K}[x]$ is infinite dimensional. 
> The set of polynomials of degree n is, however, finite. A basis for this space is 
> given by $\{ 1, x^2, x^3,....,x^n \}$.


**Proposition-1.53 (page 23):** If $S \subseteq T$ is an independent set of vectors in a finite 
dimensional vector space V, and T a finite set of vectors that span V, we can adjoin 
certain vectors from $T$ to $S$ to get a basis for $V$ that contains the original set
of independent vectors in $S$.

**Theorem 1.54 (page 24):** All bases in a finite-dimensional vector space have the same
cardinality. More generally, if $V$ is finite dimensional , and $S$ is a finite spanning
set (with $|S|=n$), every independent set of vectors $L \subseteq V$ has cardinality 
$|L| \leq |S|$. In other words, the size of any independent set is always less than or 
equal to that of a spanning set.


**Corollary 1.55 (page 25):** In a finite-dimensional vector space, all bases have the same
cardinality, which we refer to as the dimension $dim_{\mathbb{K}}(V)$ or simply $dim(V)$ or
 $|V|$ when the underlying ground field $]mathbb{K}$ is understood. 

> Always, $dim_{\mathbb{K}}(\mathbb{K^n}) = n$ and the standard basis is $\{1,e_2,....,e_n \}\\$
> Hence, $dim_{\mathbb{C}}(\mathbb{C^n}) = n\\$
> however, $dim_{\mathbb{R}}(\mathbb{C^n})=2n$


> The basis for $\mathbb{C^n}$ over field $\mathbb{C}$ is the standrad basis $ \{e_1,e_2,...,e_n \}$
> i.e the coefficients/coordinates of the basis are elements of $\mathbb{C}\\$



> The basis for $\mathbb{C^n}$ over field $\mathbb{R}$ is $\{ e_1,e_2,....,e_n,ie_1,ie_2,....,ie_n \}$
> 

**Exercise 1.57 (page25):** If $V$ is a finite dimensional vector space and $W \subseteq V$
a subspace, explain why $W$ must also be finite dimensional.
**Solution:** By pruning the basis $B_V$ of $V$ which definitely spans $V$ and has finite cardinality,
we must be able to get a basis $B_W$ for $W$ - but this means $W$ must have finite dimension as the
cardinality of $B_W$ must lie between 0 and $|B_V|$.

Alternatively, using proposition 1.53 above, we can extend a basis $B_W$ of $W$ to a basis of 
$B_V$, i.e $dim(V) = |B_V| \geq |B_W| = \infty$ and hence is not finite dimensional as given in question



**Implicit and Parametric Description of Subspaces (Revisited) (page 26):**
Every $V$ of dimension n can be identified in a natural way with $\mathbb{K^n}$ once a basis 
$\{ f_1, f_2, ....,f_n\}$ in $V$ has been determined, so we can always restrict attention to
 describing subspaces $W$ of coordinate space $\mathbb{K^n}$.

 Given a basis 
 	$\mathfrak{X} = \{ f_i \}$ in $V$, the map $j_{\mathfrak{X}}:\mathbb{K^n} \rightarrow  V$ given
 	by $$ x = (x_1,...,x_n) \rightarrow j_{\mathfrak{X}}(x) = \sum_{i=1}^{n}{x_i f_i} $$
 is a bijection that respects all vector space operations in the sense that
 $$
 j_{\mathfrak{X}}(\lambda \cdot x) = \lambda \cdot j_{\mathfrak{X}}(x)
 \\\;\\and\\\;\\
 j_{\mathfrak{X}}(x+y) = j_{\mathfrak{X}}(x) + j_{\mathfrak{X}}(y) 
 $$

**It is an *isomorphism* between $\mathbb{K^n}$ and $V$, by which properties of one space 
can be matched with those of the other.**




<div style="page-break-after: always;"></div>

### Homework-1

**page39: Q2,Q3**
![](p39q2q3.png)

**Solution-q2a:**
Requirements for a vector space $V$ over field $\mathbb{K}$ - 
1. $0 \in V$
2. $x,y \in V \implies x+y \in V$
3. $\lambda \in \mathbb{K}, v \in V \implies \lambda \cdot v \in V $

Let $f_1. f_2 \in E$ such that $f_1 = \sum_{n \geq r}{c_nx^n}$ and
 $f_2 =  \sum_{n \geq r}{d_nx^n}$.

1. Since $\mathbb{K}$ is a field, it contains the additive identity $0$ of the field.
If we set $z_n = 0, \; \forall \;  n \geq r$, then clearly 
$ 0 = \sum_{n \geq r}{z_n x^n} = f_0 \in E.\\\;$


2. Also $f_1 + f_2 = \sum_{n \geq r}{(c_n + d_n)x^n} = \sum_{n \geq r}{k_n x^n}$.Since $\mathbb{K}$ is a field, closure under $+$ gives 
$\forall \; c_n,d_n \in \mathbb{K} \implies c_n + d_n = k_n \in K$.
Hence $f_1 + f_2 = \sum_{n \geq n}{k_n x_n} \in E$.

3. Since $\mathbb{K}$ is a field, hence closure under the $\times$ operation gives
$ \lambda , t_n \in \mathbb{k} \implies \lambda t_n = k_n \in \mathbb{K} $.
For $f_3 = \sum_{n \geq r}{t_n x^n}, \lambda f_3 = \sum_{n \geq r}{\lambda t_n x^n} 
= \sum_{n \geq r}{k_n x^n} \in E$

Hence $E$ is a vector space over $\mathbb{K}$. Now all that needs to be shown is 
that it is a subspace of the space of all polynomials $\mathbb{K[x]}$. 

Clearly, we know that the polynomials of maximum degree $r-1$ of the form $g = \sum_{n < r}{c_nx^n}$ form a 
vector space $G$. This can be verified by applying the above 3 conditions.

Similarly, a basis for $G$ is given by $\{ 1,x,x^2,....,x^{k-1} \}$. Hence clearly $dim(G) = k$.
$\forall g \in G \implies g \in \mathbb{K[x]}$, however, $g \not\in E$.

Also $\forall f in E, \implies f \in \mathbb{K[x]}$. Hence $E \subseteq G$

Hence clearly $E \subseteq \mathbb{K[x]}$ but cannot span all of $\mathbb{K[x]}$. Hence $E$ must
be a subspace of $\mathbb{K[x]}$.

Also $ F+G = \mathbb{K[x]}$ and  $F \cap G = \phi $.


**Solution-q3b**


**Solution-q3:**

One direction is obvious - Let $ W_1 \subseteq W_2 $, then $ W_1 \cup W_2 = W_2$ and hence is 
the subspace $W_2$.

The other direction is - $ W_1 \cup W_2 $ is a subspace,
 without loss of generality, implies $ W_1 \subseteq W_2 $. 


![](p39a3.png)

Let us assume $W_1 \not\subseteq W_2$ or $W_2 \not\subseteq W_1$.

Let $\color{seagreen}x \in W_1 -  W_2$ and $\color{blue}y \in W_2$.
Then, $x,y \in W_1 + W_2$ and  hence $ x+y \in W_1 + W_2$.

However, this means 
$x+y \in W_1$ or $x+y \in W_2$ since 
$ z \in A \cup B \iff z \in A \; or \; z \in B$ by definition of set uinion. 


First, we show that $x+y$ cannot be in $W_2$. If $ x+y \in W_2$, then since $W_2$ is a 
subspace and $ y \in W_2$, $  x = \color{blue}(x+y) - y \in W_2 $ due to $W_2$ being closed under 
addition/subtraction. However we started with $ x \in \color{seagreen} W_1 - W_2$. This leads to a contradiction
as $ \color{seagreen}(W_1 - W_2) \color{default} \cap \color{blue} W_1 \color{default}= \phi $ ie. $x$ cannot belong to both $\color{seagreen} W_1 - W_2$ and
 $\color{blue}W_2$ simultaneously.

Second, if $x+y \in W_1$, then $ y = (x+y) - x \in W_1 $ since $x \in W_1$ and $W_1$ is a subspace.
However we started with  $ y \in W_2$. So $\color{blue}y \in W_2$ and $y \in W_1$. This means
$ y \in W_1 \cap W_2$. However we started with arbitrary $\color{blue}y \in W_2$. This means 
that the argument above works for any arbitrary $y \in W_2$ and
 hence $\forall y \in W_2, y \in W_1 \cap W_1$. Hence we must have $W2 \subseteq W1$. 
 

