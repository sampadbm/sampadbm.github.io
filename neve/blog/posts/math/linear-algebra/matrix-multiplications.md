---
date: 2026-03-24
title: Understanding Matrix Multiplications
tags: [math, linear-algebra, tutorial]
summary: Some views on matrix multiplications.
authors: [sampad]
---

### Notations

We work over $\mathbb{R}$, with $T$ denoting ordinary transpose and
$\langle U,V\rangle_F = \operatorname{tr}(U^T V)$ denoting the Frobenius inner product.
For complex matrices, conjugate transpose is written $U^* = \overline{U}^T$, and
$\langle U,V\rangle_F = \operatorname{tr}(U^* V)$. The inner-product expressions below
would then need conjugations; the multiplication and vectorization identities still
use ordinary transpose, so $T$ cannot simply be redefined as conjugate transpose.

If $X$ is a $m \times n$ matrix, then $x_i$ and $x^j$ are the $i^{th}$ row and $j^{th}$ columns of $X$.  
$X_i^j = x_i^j$ is the $ij$ entry of $X$ where $i$ is row index and $j$ column index. 

### Matrix Vector
Assume $A \in \mathbb{R}^{m \times n}$ and $x \in \mathbb{R}^{n}$

$$
	[A x]_i =  a_i x = \langle a_i , x \rangle
$$

$$
	Ax = \sum_{k=1}^n a^k x_k 
$$


### Matrix Matrix
Assume $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$
$$
	[AB]_i^j = a_i b^j = \langle a_i , b^j \rangle
$$

$$
	AB = \sum_{k=1}^n a^k b_k
$$

$$
	[AB]^j = A b^j
$$

$$
	[AB]_i = a_i B
$$

### Bilinear form
Assume $A \in \mathbb{R}^{m \times n}$ and $x \in \mathbb{R}^{m \times 1}$ and $ y \in \mathbb{R}^{n \times 1}$.

$$
	[x^T A y] =  \langle A , xy^T \rangle_F
$$

For square $A$, setting $y=x$ gives the quadratic form $x^T A x$.

### Matrix Matrix Matrix

Assume $X \in \mathbb{R}^{m \times n}$ and $A \in \mathbb{R}^{n \times p}$ and $Y \in \mathbb{R}^{p \times q}$.

$$
		[XAY]_i^j = \langle A, x_i^T {y^j}^T\rangle_F
$$

$$
		[XAY] = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Proof: 

$$
	XAY = (XA)(I_pY) = \sum_{i=1}^n x^i a_i \sum_{j=1}^{p} e^j y_j = \sum_{ij} x^i (a_i e^j) y_j = \sum_{i,j=1}^{n,p} x^i a_i^j y_j = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Special case:
When $A$ is diagonal (as in the case of eigenvalue or singular value decomposition)
$$
	XAY = \sum_{i=1}^{\min(n,p)} a_i^i \cdot x^i y_i
$$

### Matrix Matrix Matrix Matrix $XABY$

There are multiple ways to think about this. But we will focus on two different ways. Look at $AB$ entrywise or look at $AB$ as sum of outer products. 

$X$ is $m \times n$, $A$ is $n \times p$ $B$ is $p \times q$ and $Y$ is $q \times r$.

$$
	X \quad AB \quad Y = \sum_{i,j=1}^{n,q} \langle a_i , b^j \rangle \cdot x^i y_j
$$

$$
	[X \quad AB \quad Y]_i^j = \sum_{k=1}^{p} \langle a^k b_k , x_i^T {y^j}^T\rangle_F
$$

### Other products seen as linear transforms by reduction to Matrix-Vector products

For $B \in \mathbb{R}^{n \times p}$, stack columns: $\mathrm{vec}(B) = [{b^1}^T \; {b^2}^T \; ... \; {b^p}^T]^T$, and
recall $\mathrm{vec}(u v^T) = v \otimes u$.

#### Matrix-Matrix
$[AB]^j = A b^j$: output column $j$ depends on input column $j$ only, so the
transform is block diagonal.

$$
	\mathrm{vec}(AB) = \begin{bmatrix} A & 0 & \cdots & 0 \\ 0 & A & \cdots & 0 \\
						 \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & A
		\end{bmatrix}
		\begin{bmatrix}
			b^1 \\ b^2 \\ \vdots \\ b^p
		\end{bmatrix}
		= (I_p \otimes A) \, \mathrm{vec}(B)
$$

Varying $A$ instead gives the row view $[AB]_i = a_i B$, one copy of $B$ per row:

$$
	\mathrm{vec}(AB) = (B^T \otimes I_m) \, \mathrm{vec}(A)
$$

#### Matrix-Matrix-Matrix
The map $A \mapsto XAY$ sends the basis matrix $e^i {(e^j)}^T$ to $x^i y_j$.
Apply $\mathrm{vec}$ to its outer product expansion:

$$
	\mathrm{vec}(XAY) = \sum_{i,j=1}^{n,p} a_i^j \cdot \left( y_j^T \otimes x^i \right) = (Y^T \otimes X) \, \mathrm{vec}(A)
$$

Matrix-Matrix is the case $Y = I$ or $X = I$; the bilinear form is the case $m = q = 1$,

$$
	x^T A y = (y^T \otimes x^T) \, \mathrm{vec}(A) = \mathrm{vec}(x y^T)^T \mathrm{vec}(A) = \langle A , x y^T \rangle_F
$$

#### Matrix-Matrix-Matrix-Matrix $XABY$
Compose, using $(P \otimes Q)(R \otimes S) = PR \otimes QS$. The factor depends on
which of $A, B$ is the unknown:

$$
	\mathrm{vec}(XABY) = (Y^T \otimes XA) \, \mathrm{vec}(B) = \left( (BY)^T \otimes X \right) \mathrm{vec}(A)
$$

#### Special case: Hadamard products
Write $\mathrm{Diag}(a)$ for the diagonal matrix carrying $a$ on its diagonal. For
vectors, $\odot$ is already a matrix-vector product:

$$
	a \odot b = \mathrm{Diag}(a) \, b = \mathrm{Diag}(a) \mathrm{Diag}(b) \mathbf{1},
	\qquad \mathrm{Diag}(a \odot b) = \mathrm{Diag}(a) \mathrm{Diag}(b)
$$

For matrices $A,B$ of the same shape it acts entrywise, so the block diagonal of the Matrix-Matrix case
degenerates to a diagonal one: each output entry depends on a single input entry,
against a whole column for $AB$.

$$
	\mathrm{vec}(A \odot B) = \mathrm{Diag}(\mathrm{vec}(A)) \, \mathrm{vec}(B)
$$

Composing with the rules above,

$$
	\mathrm{vec}(X (A \odot B) Y) = (Y^T \otimes X) \, \mathrm{Diag}(\mathrm{vec}(A)) \, \mathrm{vec}(B)
$$

For $A,B \in \mathbb{R}^{m \times n}$, $\odot$ is $\otimes$ restricted to the matched index pairs,

$$
	A \odot B = S_m^T (A \otimes B) S_n
$$

where $S_d \in \mathbb{R}^{d^2 \times d}$ is defined by $S_d e^i = e^i \otimes e^i$.
The two selectors coincide when $m=n$.

#### Why bother
Any *linear* matrix equation becomes a linear system, possibly rectangular. For the
Sylvester equation, let $A \in \mathbb{R}^{m \times m}$, $B \in \mathbb{R}^{n \times n}$,
and $X,C \in \mathbb{R}^{m \times n}$. Then

$$
	AX + XB = C \quad \Longleftrightarrow \quad \left( I_n \otimes A + B^T \otimes I_m \right) \mathrm{vec}(X) = \mathrm{vec}(C)
$$

Solvability, conditioning and the spectrum then come from one matrix: its
eigenvalues are the pairwise sums $\lambda_i(A) + \lambda_j(B)$, so the equation
is uniquely solvable for every $C$ exactly when none of them vanish. The cost is size
($mn \times mn$), making this a lens for analysis, not a recipe for computation.

#### Change of basis

We know that for three matrices $A,B,$ and $C$, we have

$$
[ABC]_{ij} = \langle B, a_i^T {c^j}^T \rangle_F
$$

Let $A,B \in \mathbb{R}^{n \times n}$ satisfy $B = PAW^{-1}$ for invertible
$P,W$. Write $Q = (W^{-1})^T$, so $B = PAQ^T$. Then

$$
B_{ij} = p_i A q_j^T = \langle A, \underbrace{p_i^T q_j}_{R_{ij}} \rangle_F.
$$

The $n^2$ rank-one matrices $R_{ij}$ form a basis of $\mathbb{R}^{n \times n}$.
Indeed, for a coefficient matrix $D=(d_{ij})$,

$$
\sum_{i,j=1}^n d_{ij} R_{ij} = P^T D Q = 0
\quad\Longrightarrow\quad D=0,
$$

because $P$ and $Q$ are invertible.

For a general basis, these inner products give coordinates in the *dual* basis
$T_{ij}=P^{-1}e^i(e^j)^TQ^{-T}$, where $Q^{-T}=(Q^{-1})^T$:

$$
\langle T_{ij},R_{kl}\rangle_F = \delta_{ik}\delta_{jl},
\qquad A = P^{-1}BQ^{-T} = \sum_{i,j=1}^n B_{ij}T_{ij}.
$$

If $P,W$ are orthogonal, then $Q$ is also orthogonal, $T_{ij}=R_{ij}$, and

$$
\langle R_{ij},R_{kl}\rangle_F
= (p_i p_k^T)(q_j q_l^T)
= \delta_{ik}\delta_{jl}.
$$

Thus the rank-one matrices $R_{ij}$ form an orthonormal basis. The simplest example is $P=Q=I_n$,
where $R_{ij}=e^i(e^j)^T$ are the standard matrix units.

In this standard basis, a **sparse** matrix uses only as many nonzero coefficients
as it has nonzero entries. Matrices supported on a fixed set of positions form a
subspace; allowing the support to vary does not in general give a subspace.
Diagonal matrices form an $n$-dimensional subspace with basis $R_{11},\ldots,R_{nn}$.

For a matrix diagonalizable over $\mathbb{R}$, the eigenvalue decomposition
$A=V\Lambda V^{-1}$ gives

$$
A=\sum_{i=1}^n \lambda_i v^i w_i,
$$

where $w_i$ is row $i$ of $V^{-1}$. These $n$ rank-one matrices are linearly
independent but need not be orthogonal. They depend on the chosen eigenbasis;
they are not a fixed basis for all diagonalizable matrices. The same expansion
holds over $\mathbb{C}$ for matrices diagonalizable over $\mathbb{C}$.

For any real $n\times n$ matrix, the singular value decomposition $A=U\Sigma V^T$ gives

$$
A=\sum_{i=1}^n \sigma_i u^i(v^i)^T.
$$

These $n$ rank-one matrices $R_{ii}=u^i(v^i)^T$ are orthonormal in the Frobenius inner product and
depend on the chosen singular vectors. Exactly $\operatorname{rank}(A)$ coefficients
are nonzero. Over $\mathbb{C}$, use $V^*$ and $u^i(v^i)^*$ instead.
