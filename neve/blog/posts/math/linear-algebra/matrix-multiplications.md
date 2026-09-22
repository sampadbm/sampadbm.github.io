---
date: 2026-03-24
title: Understanding Matrix Multiplications
tags: [math, linear-algebra, tutorial]
summary: Some views on matrix multiplications.
authors: [sampad]
---

### Notations

If $X$ is a $m \times n$ matrix, then $x_i$ and $x^j$ are the $i^{th}$ row and $j^{th}$ columns of $X$.  
$X_i^j = x_i^j$ is the $ij$ entry of $X$ where $i$ is row index and $j$ column index. 

### Matrix Vector
Assume $A \in \mathbb{C}^{m \times n}$ and $x \in \mathbb{C}^{n}$

$$
	[A x]_i =  a_i x = \langle a_i , x \rangle
$$

$$
	Ax = \sum_{k=1}^n a^k x_k 
$$


### Matrix Matrix
Assume $A \in \mathbb{C}^{m \times n}$ and $B \in \mathbb{C}^{n \times p}$
$$
	[AB]_i^j = a_i b^j = \langle a_i , b^j \rangle
$$

$$
	AB = \sum_{k=1}^m a^k b_k
$$

$$
	[AB]^j = A b^j
$$

$$
	[AB]_i = a_i B
$$

### Quadratic form 
Assume $A \in \mathbb{C}^{m \times n}$ and $x \in \mathbb{C}^{m \times 1}$ and $ y \in \mathbb{C}^{n \times 1}$.

$$
	[x^T A y] =  \langle A , xy^T \rangle_F
$$

### Matrix Matrix Matrix

Assume $X \in \mathbb{C}^{m \times n}$ and $A \in \mathbb{C}^{n \times p}$ and $Y \in \mathbb{C}^{p \times q}$.

$$
		[XAY]_i^j = \langle A, x_i^T {y^j}^T\rangle
$$

$$
		[XAY] = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Proof: 

$$
	XAY = XA \\; IY = \sum_{i=1}^n x^i a_i \sum_{j=1}^{p} e^j y_j = \sum_{ij} x^i (a_i e^j) y_j = \sum_{i,j=1}^{n,p} x^i a_i^j y_j = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Special case:
When $A$ is diagonal (as in the case of eigenvalue or singular value decoposition)
$$
	XAY = \sum_{i=j} a_i^j \cdot x^i y_j = \sum_i a_i^i \cdot x^i y_i
$$

### Matrix Matrix Matrix Matrix $XABY$

There are multiple ways to think about this. But we will focus on two different ways. Look at $AB$ entrywise or look at $AB$ as sum of outer products. 

$X$ is $m \times n$, $A$ is $n \times p$ $B$ is $p \times q$ and $Y$ is $q \times r$.

$$
	X \quad AB \quad Y = \sum_{i,j=1}^{n,q} \langle a_i , b_j \rangle \cdot x^i y_j
$$

$$
	[X \quad AB \quad Y]_i^j = \overset{p}{\underset{i=1}{\sum}} \langle a^k b_k , x_i^T {y^j}^T\rangle_F
$$

### Other products seen as linear transfroms by reduction to Matrix-Vector products

Stack columns: $\mathrm{vec}(B) = [{b^1}^T \; {b^2}^T \; ... \; {b^p}^T]^T$, and
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
Apply $\mathrm{vec}$ to the outer product expansion above, which sends the basis
matrix $e^i {(e^j)}^T$ to $x^i y_j$:

$$
	\mathrm{vec}(XAY) = \sum_{i,j=1}^{n,p} a_i^j \cdot \left( y_j^T \otimes x^i \right) = (Y^T \otimes X) \, \mathrm{vec}(A)
$$

Matrix-Matrix is the case $Y = I$ or $X = I$; the quadratic form is $m = q = 1$,

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

For matrices it acts entrywise, so the block diagonal of the Matrix-Matrix case
degenerates to a diagonal one: each output entry depends on a single input entry,
against a whole column for $AB$.

$$
	\mathrm{vec}(A \odot B) = \mathrm{Diag}(\mathrm{vec}(A)) \, \mathrm{vec}(B)
$$

Composing with the rules above,

$$
	\mathrm{vec}(X (A \odot B) Y) = (Y^T \otimes X) \, \mathrm{Diag}(\mathrm{vec}(A)) \, \mathrm{vec}(B)
$$

And $\odot$ is $\otimes$ restricted to the matched index pairs,

$$
	A \odot B = S^T (A \otimes B) S
$$

where $S$ selects the rows and columns of $A \otimes B$ with repeated indices.

#### Why bother
Any *linear* matrix equation becomes a square system. For Sylvester,

$$
	AX + XB = C \quad \Longleftrightarrow \quad \left( I \otimes A + B^T \otimes I \right) \mathrm{vec}(X) = \mathrm{vec}(C)
$$

Solvability, conditioning and the spectrum then come from one matrix: its
eigenvalues are the pairwise sums $\lambda_i(A) + \lambda_j(B)$, so the equation
is uniquely solvable exactly when none of them vanish. The cost is size
($mn \times mn$), making this a lens for analysis, not a recipe for computation.
