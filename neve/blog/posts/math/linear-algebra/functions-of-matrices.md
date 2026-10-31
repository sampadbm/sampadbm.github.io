---
date: 2026-10-26
title: Functions of Matrices
tags: [math, linear-algebra, functional-calculus]
summary: How to make sense of f(A) for a square matrix A.
authors: [sampad]
---

For a polynomial $p$, the expression $p(M)$ is defined by matrix addition and multiplication. Extending this notation to a scalar function $f$ requires a definition that agrees with polynomial substitution. When $M$ is diagonalizable, interpolation gives such a definition using only the values of $f$ at the eigenvalues.

### Recap

#### Conventions

Unless stated otherwise, matrices are square with complex entries. The conjugate transpose $M^* = \overline{M}^{\top}$ is also called the **adjoint**.

| Symbol | Matrix class | Defining property |
|---|---|---|
| $M$ | general | no additional assumptions |
| $S$ | real symmetric | $S^\top = S$ |
| $H$ | Hermitian | $H^* = H$ |
| $A$ | real skew-symmetric (antisymmetric) | $A^\top = -A$ |
| $K$ | skew-Hermitian (anti-Hermitian) | $K^* = -K$ |
| $U$ | unitary | $U^*U = I$ |
| $Q$ | real orthogonal | $Q^\top Q = I$ |
| $N$ | normal | $N^*N = NN^*$ |

We write $\Lambda = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$ for a diagonal matrix of eigenvalues. The direct sum $\oplus$ places matrices along the diagonal:

$$
B_1 \oplus B_2 = \begin{bmatrix} B_1 & 0 \\ 0 & B_2 \end{bmatrix}.
$$

#### Diagonalizable matrices

A nonzero vector $v$ is an **eigenvector** of $M$ with **eigenvalue** $\lambda$ if $Mv=\lambda v$. A matrix is **diagonalizable** if it has a basis of eigenvectors: $n$ linearly independent eigenvectors for an $n\times n$ matrix.

Put these vectors into the columns of $V=\begin{bmatrix}v_1&\cdots&v_n\end{bmatrix}$. The equations $Mv_i=\lambda_i v_i$ become

$$
MV=V\Lambda,
\qquad
\Lambda=\begin{bmatrix}
\lambda_1&&\\
&\ddots&\\
&&\lambda_n
\end{bmatrix}.
$$

The columns form a basis, so $V$ is invertible and

$$
\boxed{M=V\Lambda V^{-1}.}
$$

Conversely, such a factorization supplies an eigenvector basis through the columns of $V$. Repeated eigenvalues are allowed, and the eigenvectors need not be orthogonal. The **spectrum** $\sigma(M)$ is the set of eigenvalues, with repetitions removed.

#### Normal matrices are unitarily diagonalizable

An eigenvector basis is **orthonormal** if its vectors have length $1$ and are mutually perpendicular. The matrix $U$ of such a basis is unitary, so $U^{-1}=U^*$. Normality characterizes when this choice is possible.

**Spectral theorem.** A matrix $N \in \mathbb{C}^{n \times n}$ is normal if and only if $N = U\Lambda U^*$ for some unitary $U$ and diagonal $\Lambda$.

<details>
<summary>Proof via Schur decomposition</summary>

**Proof.** If $N = U\Lambda U^*$, then $\Lambda^*$ and $\Lambda$ commute, so

$$
N^*N = U\Lambda^*\Lambda U^* = U\Lambda\Lambda^*U^* = NN^*.
$$

Conversely, suppose $N$ is normal. The Schur decomposition gives $N = UTU^*$ with $U$ unitary and $T$ upper triangular:

$$
T = \begin{bmatrix}
{\color{#a855f7}t_{11}} & {\color{#d97706}t_{12}} & {\color{#d97706}\cdots} & {\color{#d97706}t_{1n}} \\
0 & {\color{#0d9488}t_{22}} & {\color{#0d9488}\cdots} & {\color{#0d9488}t_{2n}} \\
\vdots & {\color{#0d9488}\ddots} & {\color{#0d9488}\ddots} & {\color{#0d9488}\vdots} \\
0 & {\color{#0d9488}\cdots} & {\color{#0d9488}0} & {\color{#0d9488}t_{nn}}
\end{bmatrix}
= \begin{bmatrix}
{\color{#a855f7}t_{11}} & {\color{#d97706}r} \\
0 & {\color{#0d9488}T'}
\end{bmatrix}.
$$

The purple entry is the $1\times1$ block $[t_{11}]$, the orange row is $r=\begin{bmatrix}t_{12} & \cdots & t_{1n}\end{bmatrix}$, and the teal block $T'$ is the remaining $(n-1)\times(n-1)$ upper-triangular matrix.

Normality passes to $T$:

$$
T^*T = U^*N^*NU = U^*NN^*U = TT^*.
$$

Compare the $(1,1)$ entries. The first column of $T$ has only one potentially nonzero entry, so

$$
(T^*T)_{11} = \lvert t_{11} \rvert^2,
\qquad
(TT^*)_{11} = \lvert t_{11} \rvert^2 + \sum_{j=2}^n \lvert t_{1j} \rvert^2.
$$

Equality forces $t_{12} = \cdots = t_{1n} = 0$, so the entire orange row $r$ vanishes. Thus

$$
T = \begin{bmatrix}
{\color{#a855f7}t_{11}} & {\color{#d97706}0} \\
0 & {\color{#0d9488}T'}
\end{bmatrix}
= [t_{11}] \oplus T',
$$

where $T'$ is still upper triangular. To see that it is also normal, multiply the blocks:

$$
\begin{aligned}
T^*T
&=\begin{bmatrix}
\overline{t_{11}} & 0 \\
0 & (T')^*
\end{bmatrix}
\begin{bmatrix}
t_{11} & 0 \\
0 & T'
\end{bmatrix}
=\begin{bmatrix}
|t_{11}|^2 & 0 \\
0 & {\color{#0d9488}(T')^*T'}
\end{bmatrix}, \\
TT^*
&=\begin{bmatrix}
t_{11} & 0 \\
0 & T'
\end{bmatrix}
\begin{bmatrix}
\overline{t_{11}} & 0 \\
0 & (T')^*
\end{bmatrix}
=\begin{bmatrix}
|t_{11}|^2 & 0 \\
0 & {\color{#0d9488}T'(T')^*}
\end{bmatrix}.
\end{aligned}
$$

Since $T^*T=TT^*$, their lower-right blocks agree: $(T')^*T'=T'(T')^*$. Thus $T'$ is normal, and we can repeat the calculation inside this smaller block.

If $T'$ is larger than $1\times1$, write

$$
T'=\begin{bmatrix}
t_{22} & {\color{#d97706}r_2} \\
0 & {\color{#0d9488}T''}
\end{bmatrix},
\qquad
r_2=\begin{bmatrix}t_{23} & \cdots & t_{2n}\end{bmatrix}.
$$

Comparing the $(1,1)$ entries of $(T')^*T'$ and $T'(T')^*$ gives

$$
|t_{22}|^2=|t_{22}|^2+r_2r_2^*
\quad\Longrightarrow\quad
\sum_{j=3}^n|t_{2j}|^2=0.
$$

So $r_2=0$, and the full matrix becomes

$$
T=\begin{bmatrix}
{\color{#a855f7}t_{11}} & 0 & 0 \\
0 & t_{22} & 0 \\
0 & 0 & {\color{#0d9488}T''}
\end{bmatrix}.
$$

The same block multiplications show that $T''$ is normal. Each repetition clears the entries to the right of the next diagonal entry and leaves a smaller normal upper-triangular block. Once the remaining block is $1\times1$, every off-diagonal entry is zero:

$$
T=\operatorname{diag}(t_{11},\dots,t_{nn})=\Lambda,
\qquad N=U\Lambda U^*.
$$

$\blacksquare$

</details>

<details>
<summary>Alternate proof via the SVD</summary>

The **nullspace** $\ker M=\{x:Mx=0\}$ consists of the vectors that $M$ sends to zero. The SVD shows that a normal matrix and its adjoint have the same nullspace. Applied to $N-\lambda I$, this lets us split off the eigenvalue $\lambda$ as a separate block.

**1. Nullspaces.** Take a **singular value decomposition (SVD)** $M=U\Sigma W^*$ of the square matrix $M$. Here $U,W$ are unitary, and $\Sigma$ is diagonal with nonnegative entries, called the **singular values**. Multiplication gives

$$
M^*M=W\Sigma^2W^*,
\qquad
MM^*=U\Sigma^2U^*.
$$

Since $\Sigma$ and $\Sigma^2$ have zeros in the same positions, $\ker\Sigma=\ker\Sigma^2$. Hence

$$
\begin{aligned}
\ker M
&=W\ker\Sigma
=W\ker\Sigma^2
=\ker(M^*M), \\
\ker M^*
&=U\ker\Sigma
=U\ker\Sigma^2
=\ker(MM^*).
\end{aligned}
$$

Here $W\ker\Sigma$ means $\{Wz:\Sigma z=0\}$. If $M$ is normal, $M^*M=MM^*$, so the two lines give

$$
\boxed{\ker M=\ker M^*.}
$$

**2. Eigenvectors.** Over $\mathbb{C}$, choose a unit eigenvector $x$ with $Nx=\lambda x$. The matrix $M=N-\lambda I$ is normal, because

$$
\begin{aligned}
M^*M&=N^*N-\lambda N^*-\bar\lambda N+|\lambda|^2I, \\
MM^*&=NN^*-\lambda N^*-\bar\lambda N+|\lambda|^2I.
\end{aligned}
$$

Now $Mx=0$, so Step 1 gives $M^*x=0$. Equivalently,

$$
Nx=\lambda x,
\qquad N^*x=\bar\lambda x,
\qquad x^*N=\lambda x^*.
$$

**3. Block decomposition.** Complete $x$ to an orthonormal basis and write its matrix as $P=\begin{bmatrix}x&Z\end{bmatrix}$. Then $P$ is unitary and $x^*Z=0$. Block multiplication gives

$$
\begin{aligned}
P^*NP
&=\begin{bmatrix}
x^*Nx & x^*NZ \\
Z^*Nx & Z^*NZ
\end{bmatrix} \\
&=\begin{bmatrix}
{\color{#a855f7}\lambda} & \lambda x^*Z \\
\lambda Z^*x & {\color{#0d9488}B}
\end{bmatrix}
=\begin{bmatrix}
{\color{#a855f7}\lambda} & 0 \\
0 & {\color{#0d9488}B}
\end{bmatrix},
\qquad B:=Z^*NZ.
\end{aligned}
$$

The lower-left block vanishes because $Nx=\lambda x$; the upper-right block vanishes because Step 2 also gives $x^*N=\lambda x^*$.

**4. The remaining block.** The matrix $D=P^*NP$ is normal, so

$$
D^*D=\begin{bmatrix}
|\lambda|^2 & 0 \\
0 & {\color{#0d9488}B^*B}
\end{bmatrix}
=DD^*=\begin{bmatrix}
|\lambda|^2 & 0 \\
0 & {\color{#0d9488}BB^*}
\end{bmatrix}.
$$

The lower-right blocks give $B^*B=BB^*$. If $B$ is larger than $1\times1$, repeat the argument to obtain a unitary $P_2$ with $P_2^*BP_2=[\lambda_2]\oplus B_2$. In the full matrix,

$$
\begin{bmatrix}1&0\\0&P_2^*\end{bmatrix}
\begin{bmatrix}{\color{#a855f7}\lambda}&0\\0&{\color{#0d9488}B}\end{bmatrix}
\begin{bmatrix}1&0\\0&P_2\end{bmatrix}
=\begin{bmatrix}
{\color{#a855f7}\lambda}&0&0\\
0&\lambda_2&0\\
0&0&{\color{#0d9488}B_2}
\end{bmatrix}.
$$

Each repetition reduces the remaining block by one dimension. Continue with $I_2\oplus P_3$, then $I_3\oplus P_4$, until only scalar blocks remain. The product $V=P([1]\oplus P_2)(I_2\oplus P_3)\cdots$ is unitary and satisfies

$$
V^*NV=\Lambda
\qquad\Longrightarrow\qquad
\boxed{N=V\Lambda V^*.}
$$

$\blacksquare$

</details>

### Polynomials

Let $p(z)=a_0+a_1z+\cdots+a_dz^d$. For any square matrix $M$, define

$$
p(M):=a_0I+a_1M+\cdots+a_dM^d.
$$

This finite sum is defined for every square matrix. For example, $p(z)=z^2-3z+2$ gives $p(M)=M^2-3M+2I$.

Now suppose $M$ is diagonalizable, with $M=V\Lambda V^{-1}$. Multiplying shows

$$
M^2=(V\Lambda V^{-1})(V\Lambda V^{-1})
=V\Lambda\underbrace{V^{-1}V}_{I}\Lambda V^{-1}
=V\Lambda^2V^{-1}.
$$

The same cancellation gives $M^k=V\Lambda^kV^{-1}$ for every integer $k\geq0$, including $M^0=I=VIV^{-1}$. Substituting into the polynomial,

$$
\begin{aligned}
p(M)
&=a_0VIV^{-1}+a_1V\Lambda V^{-1}+\cdots+a_dV\Lambda^dV^{-1} \\
&=V\bigl(a_0I+a_1\Lambda+\cdots+a_d\Lambda^d\bigr)V^{-1} \\
&=V\begin{bmatrix}
p(\lambda_1) & & \\
& \ddots & \\
& & p(\lambda_n)
\end{bmatrix}V^{-1}.
\end{aligned}
$$

In particular, if two polynomials agree at every eigenvalue of a diagonalizable matrix, they give the same matrix when evaluated at $M$.

### From polynomials to general functions

Let $M=V\Lambda V^{-1}$, and let $f:D\to\mathbb{C}$ be a scalar function. Its **domain** $D$ is the set of inputs at which it is defined. Assume $\sigma(M)\subseteq D$. We can then construct a polynomial matching $f$ at the finitely many eigenvalues of $M$ and use polynomial substitution to define $f(M)$.

#### Interpolation at the eigenvalues

Start with a matrix whose distinct eigenvalues are $1$ and $2$. The polynomial

$$
p_f(z)=f(1)(2-z)+f(2)(z-1)
$$

satisfies $p_f(1)=f(1)$ and $p_f(2)=f(2)$. Its value at $M$ is

$$
p_f(M)=f(1)(2I-M)+f(2)(M-I).
$$

For distinct eigenvalues $\mu_1,\dots,\mu_r$, define

$$
q_j(z)=\prod_{\substack{1\leq k\leq r\\k\neq j}}
\frac{z-\mu_k}{\mu_j-\mu_k}.
$$

Every denominator is nonzero. At $z=\mu_j$, every factor is $1$; at another eigenvalue $\mu_k$, one factor is $0$. Therefore

$$
p_f(z):=\sum_{j=1}^r f(\mu_j)q_j(z)
\qquad\text{satisfies}\qquad
p_f(\mu_j)=f(\mu_j).
$$

If there is only one distinct eigenvalue, use the constant polynomial $p_f(z)=f(\mu_1)$. Matching prescribed values with a polynomial is called **polynomial interpolation**.

#### Definition of the matrix function

Define

$$
\boxed{f(M):=p_f(M).}
$$

The result does not depend on which matching polynomial we choose: Section 2 showed that polynomials agreeing at the eigenvalues agree when evaluated at $M$. If $f$ is itself a polynomial, we can choose that polynomial, so the new definition agrees with the original one.

Since $p_f(\lambda_i)=f(\lambda_i)$, the formula from Section 2 becomes

$$
\boxed{
f(M)=V\begin{bmatrix}
f(\lambda_1) & & \\
& \ddots & \\
& & f(\lambda_n)
\end{bmatrix}V^{-1}.
}
$$

The construction of $p_f(M)$ uses no eigenvectors, so the result is also independent of the chosen eigenvector basis. Repeated eigenvalues receive the same value of $f$. No continuity, derivatives, or values away from the spectrum are needed.

#### Normal matrices are a special case

If $N$ is normal, choose the orthonormal eigenbasis supplied by the spectral theorem. Since $U^{-1}=U^*$,

$$
f(N)=U\begin{bmatrix}
f(\lambda_1) & & \\
& \ddots & \\
& & f(\lambda_n)
\end{bmatrix}U^*.
$$

#### The domain of the scalar function

For a diagonalizable matrix, the condition on $f$ is exactly that it be defined at every eigenvalue. For example:

| Scalar function | Required eigenvalues |
|---|---|
| A polynomial $p(z)$, or $e^z$ | Any complex numbers |
| $1/z$ | All nonzero |
| The nonnegative real square root $\sqrt{t}$ | All real and nonnegative |
| The real logarithm $\log t$ | All real and strictly positive |

For $f(z)=1/z$, this definition gives the usual inverse:

$$
M\left(V\operatorname{diag}(\lambda_1^{-1},\dots,\lambda_n^{-1})V^{-1}\right)
=V\Lambda\Lambda^{-1}V^{-1}=I.
$$

For complex logarithms, we must also specify which scalar values to use: $w$ and $w+2\pi i$ have the same exponential. A standard choice is

$$
\operatorname{Log}(re^{i\theta})=\log r+i\theta,
\qquad r>0,\quad -\pi\lt\theta\lt\pi.
$$

This **principal branch** has domain $\mathbb{C}\setminus(-\infty,0]$. Thus $\operatorname{Log}M$ requires the eigenvalues to avoid zero and the negative real axis. A matrix excluded by this choice may still have logarithms defined using other scalar values; see [Higham's explanation](https://nhigham.com/2020/11/17/what-is-the-matrix-logarithm/).

#### Power series

A **power series** represents a function by an infinite sum of powers. Suppose

$$
f(z)=\sum_{k=0}^{\infty}a_k(z-c)^k,
\qquad |z-c|\lt R.
$$

The series represents $f$ at points within distance $R$ of $c$. If every eigenvalue lies there, then

$$
f(M)=\sum_{k=0}^{\infty}a_k(M-cI)^k
\qquad\text{when}\qquad
\max_i|\lambda_i-c|\lt R.
$$

To justify this, stop the sum at $k=m$ and call the resulting polynomial $p_m$. For every $m$, $p_m(M)=Vp_m(\Lambda)V^{-1}$. Each diagonal entry $p_m(\lambda_i)$ converges to $f(\lambda_i)$, so every entry of $p_m(M)$ converges to the corresponding entry of $f(M)$. At an eigenvalue with $|\lambda_i-c|=R$, the scalar series must be checked separately for convergence to $f(\lambda_i)$.

For example, the geometric series gives

$$
(I-M)^{-1}=\sum_{k=0}^{\infty}M^k
\qquad\text{if}\qquad \max_i|\lambda_i|\lt 1.
$$

The inverse exists whenever $1$ is not an eigenvalue. For $M=2I$, it is $-I$, but the series diverges. The restriction $\max_i|\lambda_i|\lt1$ belongs to the series representation, not to the definition of the inverse.

#### What changes without diagonalizability?

When $M$ has no basis of eigenvectors, values at the eigenvalues can be insufficient. Consider

$$
J=\begin{bmatrix}\lambda&1\\0&\lambda\end{bmatrix}
=\lambda I+E,
\qquad
E=\begin{bmatrix}0&1\\0&0\end{bmatrix},
\qquad E^2=0.
$$

The polynomials $p(z)=0$ and $q(z)=z-\lambda$ agree at the only eigenvalue, but $p(J)=0$ and $q(J)=E\neq0$. So matching values alone no longer determines the matrix function.

Because $E^2=0$, expanding $(\lambda I+E)^k$ leaves only $\lambda^k I+k\lambda^{k-1}E$ for $k\geq1$. Consequently $p(J)=p(\lambda)I+p'(\lambda)E$, where $p'$ is the derivative of $p$. Extending this rule to $f$ requires its derivative at $\lambda$:

$$
f(J)=f(\lambda)I+f'(\lambda)E
=\begin{bmatrix}f(\lambda)&f'(\lambda)\\0&f(\lambda)\end{bmatrix}.
$$

A matrix with $m$ copies of $\lambda$ on the diagonal, ones immediately above them, and zeros elsewhere is called a **Jordan block**. The same expansion uses derivatives through order $m-1$. Having a convergent power series near each eigenvalue is therefore a sufficient condition for defining $f(M)$ for any square matrix. The construction using these blocks is described in [Higham's account of matrix functions](https://nhigham.com/2020/06/09/what-is-a-matrix-function/) and the [spectral mapping theorem post](post.html?file=posts/math/linear-algebra/spectral-mapping-theorem.md).

### Examples: positivity and rotations

#### Nonnegative functions give positive semidefinite matrices

A real symmetric matrix $S$ has a real orthogonal diagonalization $S=Q\Lambda Q^\top$, with real eigenvalues $\lambda_i$. For any function $f:\mathbb{R}\to[0,\infty)$,

$$
f(S)=Q\operatorname{diag}\bigl(f(\lambda_1),\dots,f(\lambda_n)\bigr)Q^\top
$$

is again real symmetric. For any real vector $x$, set $y=Q^\top x$. Then

$$
x^\top f(S)x
=y^\top\operatorname{diag}\bigl(f(\lambda_1),\dots,f(\lambda_n)\bigr)y
=\sum_{i=1}^n f(\lambda_i)y_i^2\geq0.
$$

Thus $f(S)$ is **positive semidefinite**: $x^\top f(S)x\geq0$ for every $x$. It is **positive definite** when the inequality is strict for every nonzero $x$.

The displayed sum is strictly positive for every nonzero $x$ exactly when every $f(\lambda_i)>0$. If $f(\lambda_i)=0$, the corresponding eigenvector gives a nonzero $x$ for which the sum vanishes.

#### Exponentials of symmetric matrices

The scalar series $e^z=\sum_{k=0}^{\infty}z^k/k!$ converges for every complex $z$. For a diagonalizable matrix, the preceding construction therefore gives

$$
e^M=\sum_{k=0}^{\infty}\frac{M^k}{k!}
=V\operatorname{diag}(e^{\lambda_1},\dots,e^{\lambda_n})V^{-1}.
$$

For a real symmetric matrix $S=Q\Lambda Q^\top$, this gives

$$
e^S=Q\operatorname{diag}(e^{\lambda_1},\dots,e^{\lambda_n})Q^\top.
$$

Each $\lambda_i$ is real, so each $e^{\lambda_i}>0$. The preceding quadratic-form calculation therefore proves that $e^S$ is positive definite.

#### Exponentials of skew-symmetric matrices

Let $A$ be real with $A^\top=-A$. Its exponential is real, since every term of its defining series is real. Transposing that series gives

$$
(e^A)^\top=e^{A^\top}=e^{-A}.
$$

Also, $A$ is normal: $A^*A=AA^*=-A^2$. Write $A=U\Lambda U^*$. Multiplying in this eigenbasis gives

$$
e^{-A}e^A
=U\operatorname{diag}(e^{-\lambda_1}e^{\lambda_1},\dots,e^{-\lambda_n}e^{\lambda_n})U^*
=I.
$$

Thus $(e^A)^\top e^A=I$, so $e^A$ is orthogonal. To determine its determinant, recall that the **trace** $\operatorname{tr}M$ is the sum of the diagonal entries. Since $\operatorname{tr}(BC)=\operatorname{tr}(CB)$, a diagonalization gives $\operatorname{tr}M=\sum_i\lambda_i$, and hence

$$
\det(e^M)=\prod_{i=1}^n e^{\lambda_i}
=e^{\sum_i\lambda_i}=e^{\operatorname{tr}M}.
$$

The exponential series also converges for matrices that are not diagonalizable. In Schur form, each power $T^k$ is upper triangular with diagonal entries $t_{ii}^k$. Hence $e^T$ has diagonal entries $e^{t_{ii}}$, proving $\det(e^M)=e^{\operatorname{tr}M}$ in that case as well.

Every diagonal entry of $A$ is zero, so $\operatorname{tr}A=0$ and $\det(e^A)=1$. Therefore

$$
\boxed{e^A\in SO(n):=\{R\in\mathbb{R}^{n\times n}:R^\top R=I,\ \det R=1\}.}
$$

This is the **special orthogonal group**, whose matrices describe rotations. Orthogonal matrices can also have determinant $-1$, as reflections do; those cannot be exponentials of real skew-symmetric matrices.

In two dimensions, put $J=\begin{bmatrix}0&-1\\1&0\end{bmatrix}$. Since $J^2=-I$, the even and odd powers in the exponential series give the rotation through angle $\theta$:

$$
e^{\theta J}
=\cos\theta\,I+\sin\theta\,J
=\begin{bmatrix}
\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta
\end{bmatrix}.
$$

### Singular value transformation

For a diagonalizable matrix, $f(M)$ acts on an eigenvector by multiplying it by $f(\lambda)$. The SVD suggests a different construction: change the factors by which a matrix scales its singular vectors. This construction applies to every matrix, including rectangular ones.

Write the **singular value decomposition** of $M\in\mathbb{C}^{m\times n}$ as

$$
M=U\Sigma V^*,\qquad
U\in\mathbb{C}^{m\times m},\quad
\Sigma\in\mathbb{R}^{m\times n},\quad
V\in\mathbb{C}^{n\times n}.
$$

Here $U,V$ are unitary, and $\Sigma$ has nonnegative entries $\sigma_1,\dots,\sigma_k$ on its main diagonal, where $k=\min(m,n)$, and zeros elsewhere. These entries are the **singular values**. For the corresponding columns $u_i,v_i$ of $U,V$,

$$
Mv_i=\sigma_i u_i\qquad(1\leq i\leq k).
$$

The vectors $v_i$ are called **right singular vectors**, and $u_i$ are **left singular vectors**. If $n>m$, the remaining columns of $V$ belong to the nullspace of $M$.

#### Polynomial transformations

Set $B=M^*M$, an $n\times n$ Hermitian matrix. The SVD gives

$$
B=V(\Sigma^*\Sigma)V^*.
$$

The matrix $\Sigma^*\Sigma$ is diagonal, with the squared singular values on its diagonal and additional zeros if $n>m$. For any polynomial $q$, the calculation from Section 2 gives

$$
\begin{aligned}
q(B)&=Vq(\Sigma^*\Sigma)V^*,\\
Mq(B)&=(U\Sigma V^*)(Vq(\Sigma^*\Sigma)V^*)
=U\Sigma q(\Sigma^*\Sigma)V^*.
\end{aligned}
$$

An **even polynomial** contains only even powers, so it has the form $p(t)=q(t^2)$ and satisfies $p(-t)=p(t)$. An **odd polynomial** contains only odd powers, so $p(t)=tq(t^2)$ and $p(-t)=-p(t)$. Following [Gilyén, Su, Low, and Wiebe](https://arxiv.org/abs/1806.01838), define their **singular value transformations** by

$$
\boxed{
p^{\mathrm{SV}}(M):=
\begin{cases}
Mq(B),&p(t)=tq(t^2)\quad\text{(odd)},\\[4pt]
q(B),&p(t)=q(t^2)\quad\text{(even)}.
\end{cases}
}
$$

To read their action, use $Bv_i=\sigma_i^2v_i$:

$$
\begin{aligned}
Mq(B)v_i&=q(\sigma_i^2)Mv_i=p(\sigma_i)u_i
&&\text{(odd)},\\
q(B)v_i&=q(\sigma_i^2)v_i=p(\sigma_i)v_i
&&\text{(even)}.
\end{aligned}
$$

The odd transform maps right singular vectors to left singular vectors and has size $m\times n$. The even transform acts within the right singular-vector basis and has size $n\times n$. On the nullspace of $M$, these formulas give zero in the odd case and multiplication by $p(0)$ in the even case.

For a square matrix, the same definitions read $Up(\Sigma)V^*$ and $Vp(\Sigma)V^*$, respectively, where $p(\Sigma)=\operatorname{diag}(p(\sigma_i))$. The expressions in $M$ and $B$ establish that neither definition depends on the choice of SVD.

For example:

| Scalar polynomial $p(t)$ | Singular value transformation $p^{\mathrm{SV}}(M)$ |
|---|---|
| $1$ | $I_n$ |
| $t$ | $M$ |
| $t^2$ | $M^*M$ |
| $t^3$ | $MM^*M$ |

For example, transforming by $p(t)=t^2$ gives $M^*M$, which generally differs from $M^2$. They agree when $M$ is Hermitian. More generally, $H^*H=H^2$ gives

$$
p^{\mathrm{SV}}(H)=
\begin{cases}
Hq(H^2)=p(H),&p\text{ odd},\\
q(H^2)=p(H),&p\text{ even}.
\end{cases}
$$

#### Even and odd scalar functions

The polynomial definitions use a function of $B=M^*M$, followed by multiplication by $M$ in the odd case. We can extend them by defining the corresponding scalar function on the eigenvalues of $B$.

Every eigenvalue $s$ of $B$ is nonnegative. Suppose $f$ is defined at $\pm\sqrt{s}$ for each such $s$ and is either even or odd on these inputs. In particular, $f(0)$ must be defined if $M$ has a nonzero nullspace.

**Even functions.** If $f(-t)=f(t)$, define

$$
h(s)=f(\sqrt{s})\quad\text{for }s\in\sigma(B),
\qquad
\boxed{f^{\mathrm{SV}}(M):=h(B).}
$$

Here $h(B)$ is the matrix function constructed in Section 3: choose a polynomial $q$ with $q(s)=h(s)$ at each distinct eigenvalue of $B$, and set $h(B)=q(B)$. Such a polynomial exists by interpolation, and all matching polynomials give the same matrix because $B$ is diagonalizable. On a right singular vector,

$$
h(B)v_i=h(\sigma_i^2)v_i=f(\sigma_i)v_i.
$$

On the nullspace of $M$, the result is multiplication by $h(0)=f(0)$.

**Odd functions.** If $f(-t)=-f(t)$, the extra factor $M$ already supplies a factor of $\sigma_i$. We therefore define, on the eigenvalues of $B$,

$$
g(s)=\begin{cases}
\dfrac{f(\sqrt{s})}{\sqrt{s}},&s>0,\\[4pt]
0,&s=0,
\end{cases}
\qquad
\boxed{f^{\mathrm{SV}}(M):=Mg(B).}
$$

Construct $g(B)$ by the same interpolation rule. For $\sigma_i>0$,

$$
Mg(B)v_i=g(\sigma_i^2)Mv_i
=\frac{f(\sigma_i)}{\sigma_i}\,\sigma_i u_i
=f(\sigma_i)u_i.
$$

If $Mx=0$, then $Bx=0$ and $Mg(B)x=g(0)Mx=0$. Thus the value assigned to $g(0)$ has no effect on the product. This agrees with $f(0)=0$, which oddness requires whenever zero is among the inputs.

These definitions use only scalar values at finitely many points. Neither continuity nor a convergent series is required. When $f$ is a polynomial, they recover the matrix products in Section 5.1.

For a rectangular example, take

$$
M=\begin{bmatrix}0&2\end{bmatrix},
\qquad B=M^*M=\begin{bmatrix}0&0\\0&4\end{bmatrix}.
$$

The even function $f(t)=|t|$ gives $h(s)=\sqrt{s}$, hence

$$
f^{\mathrm{SV}}(M)=h(B)=\begin{bmatrix}0&0\\0&2\end{bmatrix}.
$$

Instead, let $f(t)$ be $1$ for positive $t$, $-1$ for negative $t$, and $0$ at zero. This function is odd. Here $g(0)=0$ and $g(4)=1/2$, so

$$
f^{\mathrm{SV}}(M)
=\begin{bmatrix}0&2\end{bmatrix}
\begin{bmatrix}0&0\\0&1/2\end{bmatrix}
=\begin{bmatrix}0&1\end{bmatrix}.
$$

#### Polynomial approximation

Suppose $p$ and $f$ are both even or both odd, and

$$
|p(\sqrt{s})-f(\sqrt{s})|\leq\varepsilon
\qquad\text{for every }s\in\sigma(B).
$$

Then the same error bound holds for their action on vectors:

$$
\bigl\|(p^{\mathrm{SV}}(M)-f^{\mathrm{SV}}(M))x\bigr\|
\leq\varepsilon\|x\|.
$$

Here $\|x\|$ denotes Euclidean length. To prove the bound, write $x=\sum_{i=1}^n c_i v_i$, where $Bv_i=s_i v_i$, and put $\delta_i=p(\sqrt{s_i})-f(\sqrt{s_i})$. In the even case, orthonormality gives

$$
\bigl\|(p^{\mathrm{SV}}(M)-f^{\mathrm{SV}}(M))x\bigr\|^2
=\sum_{i=1}^n |\delta_i|^2|c_i|^2
\leq\varepsilon^2\sum_{i=1}^n|c_i|^2
=\varepsilon^2\|x\|^2.
$$

In the odd case, the output uses the orthonormal left singular vectors for $s_i>0$; the terms with $s_i=0$ vanish. The same sum, restricted to $s_i>0$, proves the bound. Thus a polynomial approximation at the singular values gives a matrix approximation with the same error bound, independently of the matrix dimensions.

### References

- R. F. Rinehart (1955), [The Equivalence of Definitions of a Matric Function](https://www.tandfonline.com/doi/abs/10.1080/00029890.1955.11988651), *The American Mathematical Monthly* **62**(6), 395–414.
- Cleve Moler and Charles Van Loan (2003), [Nineteen Dubious Ways to Compute the Exponential of a Matrix, Twenty-Five Years Later](https://doi.org/10.1137/S00361445024180), *SIAM Review* **45**(1), 3–49.
- Nicholas J. Higham (2008), [Functions of Matrices: Theory and Computation](https://doi.org/10.1137/1.9780898717778), Society for Industrial and Applied Mathematics, Philadelphia, PA, USA.
- András Gilyén, Yuan Su, Guang Hao Low, and Nathan Wiebe (2018), [arXiv:1806.01838](https://arxiv.org/abs/1806.01838), introduction and the definitions of singular value transformation.
- Nicholas J. Higham and Edvin Hopkins (2020), [A Catalogue of Software for Matrix Functions, Version 3.0](https://eprints.maths.manchester.ac.uk/2754/), MIMS preprint.
