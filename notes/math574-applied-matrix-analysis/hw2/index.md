---
themes: ["colorful"]
---

# MATH574 : Homework-1
<p style="text-align:center; color:#7A306C"> <b>9th October, 2021</b> </p>
<p style='text-align:center;color:green'><b>
Notes from MATH574: Applied Matrix Analysis (Prof. Robert Guralnik).</b></p>


---

##### Q1: page 75 - 2.43
![](q1.png)

##### Solution:


##### Q2: page 75 - 2.44
![](q2.png)

##### Solution:


Let $f(x) = a_0 + \sum_{n=1}^{\infty}{a_n x^n} \in \mathbb{K[x]}$


$$

\begin{aligned}

D(f) = \sum_{n=1}^{\infty}{ n \;a_n \; x^{n-1}}
\\
A(f) = \sum_{n=0}^{\infty}{ \frac{a_n \; x^{n+1}}{n+1}} + c

\end{aligned}
$$

$$
\begin{aligned}
(D \odot A)(f) = D \Big(   \sum_{n=0}^{\infty}{ \frac{a_n \; x^{n+1}}{n+1}} + c  \Big) =  \sum_{n=0}^{\infty}{ \frac{ (n+1) \;a_n \; x^{n+1 -1}}{n+1}} = \sum_{n=0}^{\infty}{a_n x^n} = a_0 + \sum_{n=1}^{\infty}{a_n x^n}

\\

\implies (D \odot A)(f) = f


\end{aligned}
$$



Hence $A \odot D = id_p $

However, 

$$

\begin{aligned}

(A \odot D) (f) = A( \; D(f) \;) = A \Big( \sum_{n=1}^{\infty}{ n \;a_n \; x^{n-1}} \Big) = \sum_{n=1}^{\infty}{ \frac {n \; a_n \; x^{n-1+1}}{n-1+1}  } = \sum{a_n x^n} + c_0 \neq f

\end{aligned}

$$

where $c_0$ is the constant of integration/antiderivative.

To prove that the map $D$ is surjective, we need to shaow that eacf $f \in \mathbb{K[x]}$ has atleast one pre-image in $\mathbb{K[x]}$ since that is our domain for $D$

Let any arbitrary $f =  f(x) = a_0 + \sum_{n=1}^{\infty}{a_n x^n} = a_0 + a_1x + a_2x^2 + ...$ , we can always construct the polynomal $g = \sum_{n=0}^{\infty}{  \frac{1}{n+1}\;  a_n x^{n+1} } = a_0x + \frac{1}{2}a_1x^2 + \frac{1}{3}a_2x^3 + ... = A(f)$ such that $D(g)=f$.

However, there are more than just one such $g$. i.e $D$ is many to one -  all members of the set  $ \{ g(x) + k : \; \forall \; k \in \mathbb{R} \}$ when operated by $D$ yield $f(x)$.

Since $D$ is linear and that it is injective (many-to-one), it must be true that its kernel is non trivial since for linear operators, if $D(g) = f$, then $D(g) + ker(D)$ also equals $f$. Clearly $D(k)=0 \; \forall \; k  \in \mathbb{R}$ and hence $ker(D) \neq 0$

$A$, unlike $D$, is however one to one in the sense that every $f$ has a different image (but multiple of them which form an equivalence class). This is clear from the form of $A(f)$ above - i.e we can easily show by equating coefficient of $A(f_1)$ and $A(f_2)$ that $f_1 = f_2$ if their anti derivatives are equal.



##### Q3: page 75 - 2.46
![](q3.png)

##### Solution:
a) 

$$

\begin{aligned}

A = [a_{ij}] \;,\;B = [b_{ij}]
\\
\alpha A = [\alpha \; a_{ij}] \; 
\;,\;
\beta B = [\beta \; b_{ij}] \; \; where \; \alpha,\beta \in \mathbb{R}

\\
C = \alpha A + \beta B = [\alpha a_{ij} + \beta b_{ij}] = [c_{ij}]

\\
then \; Tr(C) = \sum_{i=1}^{n}{c_ii} = \sum_{i=1}^{n}{\alpha a_{ii} + \beta b_{ii}} = \alpha \sum_{i=1}^{n}{a_{ii}} + \beta \sum_{i=1}^{n}{b_{ii}} = \alpha Tr(A) + \beta Tr(B).


\end{aligned}

$$

Hence $Tr : M(n,\mathbb{K}) \rightarrow \mathbb{K}$ is a linear map.

b)

To prove - $ Tr(AB) = Tr(BA) $
Let $A \in \mathbb{K}^{n \times n}$ and $B \in \mathbb{K}^{n \times n}$

Let $C = AB$ and $D = BA$.

We know that,
$$
\begin{aligned}

C = AB = \Big[ \sum_{r=1}^{n}{a_{ir} * b_{rj}} \Big] = [c_{ij}]
\\
 
\implies Tr(C) = \sum_{i=1}^{n}{c_{ii}} = \sum_{i=1}^{n} { \sum_{r=1}^{n}{a_{ir} * b_{ri}}  } \;\; \color{green}  ( eq1
 )\\
where \; c_{ii} = \sum_{r=1}^{n} { a_{ir} * b_{ri} }

\end{aligned}
$$


Similarly,
$$
\begin{aligned}

D = BA = \Big[ \sum_{q=1}^{n}{b_{iq} * a_{qj}} \Big] = [d_{ij}]
\\

\implies Tr(D) = \sum_{j=1}^{n}{d_{jj}} = \sum_{j=1}^{n} \sum_{q=1}^{n}{b_{jq} * a_{qj}} 
\\
where \; d_{jj} = \sum_{r=1}^{n}{b_{jq} * a_{qj}} 

\end{aligned}
$$

Since summation orders can be exchanged, 

$$
 Tr(D) = \sum_{j=1}^{n}{d_{jj}} = \sum_{j=1}^{n} \sum_{q=1}^{n}{b_{jq} * a_{qj}} =  \sum_{q=1}^{n} \sum_{j=1}^{n}{b_{jq} * a_{qj}}
$$

Due to commutativity of scalars, 

$$
 Tr(D) =  \sum_{q=1}^{n} \sum_{j=1}^{n}{b_{jq} * a_{qj}} = \sum_{q=1}^{n} \sum_{j=1}^{n}{a_{qj} * b_{jq}}
$$

Clearly, with change of dummy variable from $q \rightarrow i$ and $j \rightarrow r$

$$
Tr(D) = \sum_{j=1}^{n}{d_{jj}} = \sum_{i=1}^{n} \sum_{r=1}^{n}{a_{ir} * b_{ri}} \color{brown} \;\; (eq2)
$$

From $\color{green}(1)\color{default} \;and \;\color{brown}(2)$, we get $Tr(BA) = Tr(D) = Tr(C) = Tr(AB)$
$_\blacksquare$

Corollary : 
$$
	Tr(ABC) = Tr(CAB) = Tr(BCA)
$$
which can be proved by lumping together product of any two of the matrices and then applying the above results.

>Takeaway:$\\$
Trace as an operation is invariant to the cycling commutation of its operands under multiplicaiton. 

c) 

If $B = SAS^{-1}$ is a valid operation and $S \in M(n,\mathbb{K})$ means $A \in M(n,\mathbb{K})$.
So, $SAS^{-1} = (SA)(S^{-1})$ where $SA \in M(n,\mathbb{K})$

So, using the icorollary from part b)

$$ 
Tr(SAS^{-1}) = Tr( S^{-1}SA ) = Tr(IA) = Tr(A)

\;\;_\blacksquare
$$

