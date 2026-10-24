---
date: 2026-10-24
title: The Spectral Mapping Theorem
tags: [math, linear-algebra, spectral-theory, functional-calculus]
summary: Why the eigenvalues of f(A) are exactly f applied to the eigenvalues of A, and how the spectral decomposition of A tells you the eigenprojections and eigennilpotents of f(A).
authors: [sampad]
---

The slogan is short: **the spectrum of $f(A)$ is $f$ of the spectrum of $A$.** If $\lambda$ is an eigenvalue of $A$, then $\sin\lambda$ is an eigenvalue of $\sin A$, $e^{t\lambda}$ is an eigenvalue of $e^{tA}$, and $1/\lambda$ is an eigenvalue of $A^{-1}$, and nothing else is. These notes distill the statement, why it holds, and the more useful refinement: the spectral decomposition of $A$ maps to the spectral decomposition of $f(A)$.

### Setup: the spectral decomposition

Every $A \in M_n(\mathbb{C})$, diagonalizable or not, has a unique **spectral decomposition**
$$A = \sum_{\lambda \in \sigma(A)} \bigl(\lambda P_\lambda + D_\lambda\bigr),$$
where for each eigenvalue $\lambda$:

- $P_\lambda$ is the **eigenprojection**, a projection whose range is the generalized eigenspace $\mathcal{E}_\lambda = \ker(A - \lambda I)^{m_\lambda}$ ($m_\lambda$ the algebraic multiplicity);
- $D_\lambda = (A - \lambda I)P_\lambda$ is the **eigennilpotent**, with $D_\lambda^{m_\lambda} = 0$.

These satisfy

1. $P_\lambda P_\mu = 0$ for $\lambda \neq \mu$, and $\sum_\lambda P_\lambda = I$ (the projections split $\mathbb{C}^n$ into generalized eigenspaces);
2. $P_\lambda D_\lambda = D_\lambda P_\lambda = D_\lambda$, and $P_\mu D_\lambda = D_\lambda P_\mu = 0$ for $\mu \neq \lambda$.

$A$ is semisimple (diagonalizable) exactly when every $D_\lambda = 0$. One way to get the $P_\lambda$ and $D_\lambda$ is from the partial-fraction expansion of the resolvent $R_A(z) = (zI - A)^{-1}$.

**Uniqueness.** If projections $Q_\lambda$ and nilpotents $C_\lambda$ satisfy the same properties 1–2 and $A = \sum_\lambda (\lambda Q_\lambda + C_\lambda)$, then $Q_\lambda = P_\lambda$ and $C_\lambda = D_\lambda$. The proof is short. Multiplying the decomposition by $Q_\mu$ gives $AQ_\mu = \mu Q_\mu + C_\mu$, so $C_\mu = (A - \mu I)Q_\mu$, the same formula that defines $D_\mu$. So it suffices to show $Q_\mu = P_\mu$. The range of $Q_\mu$ is again $\mathcal{E}_\mu$, so $P_\mu Q_\mu = Q_\mu$ and $P_\mu Q_\lambda = 0$ for $\lambda \neq \mu$. Then for any $v$,
$$P_\mu v = P_\mu \sum_\lambda Q_\lambda v = P_\mu Q_\mu v = Q_\mu v.$$
Uniqueness is what makes the next theorem useful: if you can write $f(A)$ in this form, you have found *its* spectral decomposition.

### The theorem

> **Spectral Mapping Theorem.** Let $A \in M_n(\mathbb{C})$ and let $f$ be holomorphic on an open set containing $\sigma(A)$. Then
> $$\sigma\bigl(f(A)\bigr) = f\bigl(\sigma(A)\bigr) = \{ f(\lambda) : \lambda \in \sigma(A) \}.$$
> Moreover, eigenvectors are preserved: if $Ax = \lambda x$ with $x \neq 0$, then $f(A)x = f(\lambda)x$.

For polynomials and diagonalizable $A$ this is the familiar fact you can check by hand: $A = V\Lambda V^{-1}$ gives $p(A) = V p(\Lambda) V^{-1}$. The theorem removes both restrictions: $A$ can be defective, and $f$ can be any holomorphic function such as $e^z$, $\sin z$, $1/z$, or $\log z$ on a suitable domain.

### Mapping the spectral decomposition

The refinement says exactly what the eigenprojections and eigennilpotents of $f(A)$ are. Expand $f$ in a Taylor series around each eigenvalue,
$$f(z) = f(\lambda) + \sum_{k \geq 1} a_{k,\lambda}\,(z - \lambda)^k, \qquad a_{k,\lambda} = \frac{f^{(k)}(\lambda)}{k!}.$$
Then
$$f(A) = \sum_{\lambda \in \sigma(A)} \Bigl( f(\lambda)\,P_\lambda + \sum_{k=1}^{m_\lambda - 1} a_{k,\lambda}\, D_\lambda^k \Bigr).$$
The inner sum is finite because $D_\lambda^{m_\lambda} = 0$. Only the first $m_\lambda - 1$ derivatives of $f$ at $\lambda$ matter.

Group the terms by the value $\nu = f(\lambda)$. Several eigenvalues of $A$ can land on the same $\nu$, as when $f(z) = z^2$ sends both $1$ and $-1$ to $1$. For each $\nu \in \sigma(f(A))$:
$$P^{f(A)}_\nu = \sum_{\mu \in \sigma(A),\, f(\mu) = \nu} P_\mu, \qquad D^{f(A)}_\nu = \sum_{\mu \in \sigma(A),\, f(\mu) = \nu} \; \sum_{k=1}^{m_\mu - 1} a_{k,\mu}\, D_\mu^k.$$
These sums satisfy properties 1–2 (the projections for different $\nu$ annihilate each other, and each nilpotent is a polynomial in the $D_\mu$ sitting inside its own projection), so by uniqueness they *are* the spectral decomposition of $f(A)$.

**Why the theorem follows.** Read off the eigenvalues: each $P^{f(A)}_\nu$ is nonzero, so $\sigma(f(A)) = \{\nu\} = f(\sigma(A))$. Concretely, on each generalized eigenspace $\mathcal{E}_\lambda$, $f(A)$ acts as $f(\lambda)I$ plus a nilpotent, so its only eigenvalue there is $f(\lambda)$. For the eigenvector statement: if $Ax = \lambda x$ then $P_\lambda x = x$, $P_\mu x = 0$ for $\mu \neq \lambda$, and $D_\lambda x = (A - \lambda I)x = 0$. Every term of $f(A)x$ vanishes except $f(\lambda)P_\lambda x = f(\lambda)x$.

**What can change.** $f$ can merge eigenvalues, as above. It can also shorten a Jordan chain: if $f'(\lambda) = 0$, the $D_\lambda$ term drops out. For example, $f(z) = z^2$ at $\lambda = 0$ turns the nilpotent $D_0$ into $D_0^2$.

### Examples

**Matrix exponential without computing it.** Take
$$A = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix}, \qquad \lambda_1 = 3,\ \xi_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}, \qquad \lambda_2 = -1,\ \xi_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}.$$
The solution of $x' = Ax$ is $x(t) = e^{tA}x_0$. With $f(z) = e^{tz}$ (entire), the theorem says $\xi_1, \xi_2$ are eigenvectors of $e^{tA}$ with eigenvalues $e^{3t}$ and $e^{-t}$. So $e^{tA}\xi_2 = e^{-t}\xi_2 \to 0$ as $t \to \infty$ and $e^{tA}\xi_1 = e^{3t}\xi_1 \to 0$ as $t \to -\infty$. You get the stable and unstable directions without ever computing $e^{tA}$.

**Squaring a defective matrix.** Suppose $\sigma(A) = \{1, -1, 2\}$ with spectral decomposition
$$A = P_1 + D_1 - P_{-1} + D_{-1} + 2P_2.$$
For $f(z) = z^2$, the expansions $z^2 = 1 + 2(z-1) + (z-1)^2$ and $z^2 = 1 - 2(z+1) + (z+1)^2$ give $a_{1,1} = 2$ and $a_{1,-1} = -2$. The eigenvalues $\pm 1$ merge into $\nu = 1$, so
$$A^2 = \underbrace{(P_1 + P_{-1})}_{P^{A^2}_1} + \underbrace{(2D_1 - 2D_{-1})}_{D^{A^2}_1} + 4P_2.$$
Squaring the decomposition directly and using $P_\lambda^2 = P_\lambda$, $D_\lambda^2 = 0$, and the cross terms vanishing gives the same answer.

**Inverting via the spectrum.** For invertible $A$, take $f(z) = 1/z$, which is holomorphic away from $0$. Its Taylor coefficients at $\lambda \neq 0$ are $a_{l,\lambda} = (-1)^l / \lambda^{l+1}$, so
$$A^{-1} = \sum_{\lambda \in \sigma(A)} \Bigl( \frac{1}{\lambda}P_\lambda + \sum_{l=1}^{m_\lambda - 1} \frac{(-1)^l}{\lambda^{l+1}}\, D_\lambda^l \Bigr).$$
For example, if $A = 2P_2 + D_2 + 3P_3$ with $D_2^2 = 0$, then $A^{-1} = \tfrac12 P_2 - \tfrac14 D_2 + \tfrac13 P_3$.

### Application: the power method

An eigenvalue $\lambda$ is **semisimple** if its geometric and algebraic multiplicities agree (so $D_\lambda = 0$), and **dominant** if $|\lambda| > |\mu|$ for every other $\mu \in \sigma(A)$.

> **Theorem.** If $1 \in \sigma(A)$ is semisimple and dominant and $P_1 v \neq 0$, then $A^k v \to P_1 v$ in any norm, and $P_1 v$ is an eigenvector for $1$.

Apply the decomposition with $f(z) = z^k$:
$$A^k v = P_1 v + \sum_{\mu \neq 1} \Bigl( \mu^k P_\mu + \sum_{j \geq 1} \tbinom{k}{j} \mu^{k-j} D_\mu^j \Bigr) v.$$
Every term in the second sum is a polynomial in $k$ times $\mu^{k-j}$ with $|\mu| < 1$, so it decays to $0$. Semisimplicity of $1$ means no $D_1$ terms grow with $k$. The decay rate is set by the largest $|\mu|$, so the gap between the dominant eigenvalue and the rest controls convergence. Geometrically, repeated multiplication shrinks every generalized-eigenspace component except the dominant one, leaving the projection of the initial guess onto the dominant eigenspace. A general dominant $\lambda$ reduces to this case by rescaling $A/\lambda$.

**Example.**
$$A = \begin{pmatrix} 1/4 & 3/4 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1/4 \end{pmatrix}, \qquad \sigma(A) = \{1, 1/4\}, \qquad A = P_1 + \tfrac14 P_{1/4},$$
with $P_1 = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix}$. Starting from $v = (1,1,1)^\top$ gives $A^k v = (1, 1, 4^{-k})^\top \to (1,1,0)^\top = P_1 v$.

### Sources

- Lennard Bakker, BYU Math 346, Lecture 37: [12.7 Spectral Mapping Theorem (annotated slides)](http://uamte.math.byu.edu/~bakker/Math346/BeamerSlides/Lec37annotated.pdf). The theorems and examples above follow these slides. The whole course is outlined on my [Courses Worth Revisiting](post.html?file=posts/reference/courses.md) page.
- MSU Math 415: [Spectral Mapping](https://users.math.msu.edu/users/maccluer/Class/415/SpectralMapping.pdf).
