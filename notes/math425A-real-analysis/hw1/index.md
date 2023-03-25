### 1 
#### a)
$$
    0 \leq x \text{ and } 0 \leq y \implies 0 \leq xy \;\;\;\; (1)
$$

$$
    x \leq y \text{ and } z \geq 0 \implies xz \leq yz \;\;\;\; (2)
$$

We want to show $(1)  \iff (2)$

First let us assume $(1)$ and show that  $(1) \implies (2)$.

If $x \leq y$ then $0 \leq y-x$. Since we already have $0 \leq z$, we can apply $(1)$ as $0 \leq (y-x)z$ which implies
$$
    0 \leq yz - xz \\
    \implies xz \leq yz
$$

Now let us show the other way, i.e $(2) \implies (1)$. 
Let $t=0$. Then in $(1)$ we have $t \leq x$ and $y \geq 0$ and hence by $(2)$ we have 
$$
    ty \leq xy \\
    \implies 0y \leq xy \\
    \implies 0 \leq xy
$$ 

Hence proved.

#### b) Let us assume that if $0 \leq x$ and $y \leq 0$ implies $0 \leq xy$ in the irdered field axiomatic.
**Subpart a)** 

Clearly $x$ and $y=-x$ have opposite signs $\forall x$.

Hence by our assumption, $0 \leq xy$ or $0 \leq -x^2$ or $x^2 \leq 0$.

**Subpart b)** 

Let $x=1$, then $x^2 = 1$ and hence by **subpart a**, we have $0 \leq 1$.

How do the rules of sign change?

- pos * neg = pos
- pos * pos = neg
- neg * neg = neg


### 2


### 3
By definition of lower bound $\alpha$
$$
  \alpha \leq t \forall t \in A
$$

By definition of upper bound $\beta$
$$
  t \leq \beta \forall t \in A
$$

Let $x \in A$, then $\alpha \leq x$ and $x \leq \beta$ which implies $\alpha \leq x \leq \beta$ and hence $\alpha \leq \beta$ $\;\;\;\;\blacksquare$


#### 4
Let $\alpha = \inf(A)$.
Let $B=-A$ where $B = \{ -x | x \in A \}$.
We want to show 
$$
    \alpha = \inf(A) = -\sup(-A) = -\sup(B) \\
    \implies \sup(B) = l.u.b(B) = -\alpha = \beta
$$

We will first show that $\beta = - \alpha$ is an upper bound of $B$ and then show that $\beta$ is the lowest such upper bound.

By definition of $\alpha = g.l.b(A)$
$$
    \alpha \leq x \; \forall \; x \in A \\
    \implies - \alpha \geq -x \; \forall \; x \in A \\
    \implies \beta \geq -x \; \forall x \in A \\
    \implies \beta \geq y \; \forall \; y \in B \\
    \implies \beta = u.b(B)
$$

Now we need to show that $\beta$ is $l.u.b(B)$.
By definition of $\alpha = g.l.b(A)$,
$$
    \forall \epsilon>0, \exists x \in A \; s.t \; x < \alpha + e \\
    \implies \forall \epsilon >0, \exists x \in A \; s.t \; -x > -\alpha - \epsilon \\
    \implies \forall \epsilon >0, \exists x \in A \;s.t. \; -x > \beta - \epsilon \\
    \implies \forall \epsilon > 0, \exists y \in B \; s.t \; y > \beta - \epsilon \\
    \beta = l.u.b(B) = \sup(B) \;\;\;\; \blacksquare   
$$

### 5a)
First let us note the following
$$
    \{ x+y \;|\; x \in A , y\in B \} \equiv \{ z \;|\; z \in A+B \}
$$

Let $\sup(A) = \alpha$ and $\sup(B)=\beta$.

We want to show $\alpha + \beta$ is $l.u.b(A+B)$. Let us first show that $\alpha + \beta$ is an upper bound. 

$$
    \alpha \geq x \; \forall \;  x \in A \\
    \beta \geq y \; \forall \; y \in B \\
    \implies \alpha+\beta \geq x+y \;\forall\; x\in A, y \in B 
$$

Now we have to show that it is the least upper bound. Let us use what we already know about the least upper bound. 
$$
    \forall \frac{\epsilon}{2} > 0 , \exist \; x \in A \; s.t \;  x > \alpha - \frac{\epsilon}{2}  \\ \; \\
    \forall \frac{\epsilon}{2}>0, \exist \; y \in B \; s.t \; y > \beta - \frac{\epsilon}{2} \\ \; \\
    \implies \forall \epsilon, \exist \; x \in A, y \in B \; s.t \; x+y > \alpha + \beta + \epsilon   \\ \; \\
    \implies \forall \epsilon, \exist \; z \in A+B \; s.t \; z > \alpha + \beta + \epsilon 
$$
and hence $\alpha + \beta$ is $l.u.b(A + B)$. 

### 5b)
No. Let $A=\{-1\}$ and $B = \{1,2\}$.
Then $AB = \{ -2, -1 \}$
$\alpha = \sup(A)=-1$, $\beta = \sup(B)=2$

However, $\sup(AB) = -1 \neq \alpha \beta$.

### 6
Given 
$$
    ( x \geq 0 ) \land (\forall n \in \mathbb{N}, x < \frac{1}{n})
$$ 

By Archimedian property, 
$$
    \forall y \in \mathbb{R},y>0, \exist \; \mathbb{N(y)} \;s.t \; \forall \; n > \mathbb{N(y)} ,  \frac{1}{n} < y 
$$

Hence the sequence $\frac{1}{n}$, $n \in \mathbb{N}$ converges to $0$. Since $x$ is less than the sequence for all $n \in \mathbb{N}$, it follows that $x=0$.

### 8

We define $|x| = max\{x,-x\}$.

$$
    LHS = |x + y| = max\{x+y,-x-y\} 
$$
$$
    RHS = |x| + |y|
$$

Proof by exhaustion

|$x$|$y$|ORDER|LHS|RHS|LHS ? RHS|
|---|---|-----|---|---|---------|
|+ve|+ve|any|$x+y$|$x+y$|  $\leq$ |
|+ve|-ve|$x \leq -y$|$-x-y$| $x-y$| $\leq$ |
|+ve|-ve|$x \geq -y$|$x+y$| $x-y$| $\leq$ |
|-ve|+ve|$-x \leq y$|$x+y$|$-x+y$| $\leq$ |
|-ve|+ve|$-x \geq y$|$-x-y$|$-x+y$| $\leq$ |
|-ve|-ve|any|$-x-y$|$-x-y$| $\leq$ |

Alternative proof:
$$
LHS^2 = |x+y|^2 = (x+y)^2 = |x|^2 + |y|^2 + 2xy \\
\leq |x|^2 + |y|^2 + 2max(x,-x)*max(y,-y) \\
 = |x|^2 + |y|^2 + 2|x||y| = (|x|+|y|)^2 = RHS^2 \\

 \implies LHS \leq RHS

$$

### 9
Clearly the statement  $|x_1 + x_2| \leq |x_1| + |x_2|$ and is true. Lets call it statement $S_1$.
Let us assume $S_n$ is true, i.e $|x_1 + x_2 + ... + x_n| \leq |x_1| + |x_2| + ... + |x_n|$ is true.

Then, we have 

$$
    LHS = |(x_1 + x_2 + ... + x_n) + (x_{n+1})| \leq |x_1 + x_2 + ... + x_n| + |x_{n+1}| \;\;\;\; \because S_1 \\
    \leq |x_1| + |x_2| + ... + |x_n| + |x_{n+1}| = RHS \;\;\; \because S_n \\ \; \\
    \implies LHS  \leq RHS \;\;\;\;\;\; \blacksquare
$$


