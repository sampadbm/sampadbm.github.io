---
date: 2026-11-03
title: Understanding Tensor Multiplications
tags: [math, linear-algebra, tensors, tutorial]
summary: Some views on tensor multiplications, as a sequel to the matrix multiplication post.
authors: [sampad]
---

A sequel to [Understanding Matrix Multiplications](post.html?file=posts/math/linear-algebra/matrix-multiplications.md). Each identity below reduces to the matrix one when the order is $K=2$.

### Notations

$T \in \mathbb{R}^{N_1 \times \cdots \times N_K}$ is a tensor of order $K$ with entries $T_{i_1 \ldots i_K}$. Index $k$ is called **mode** $k$. A **mode-$k$ fiber** fixes every index except $i_k$, the analogue of a row or column.

The **mode-$k$ unfolding** $T_{(k)} \in \mathbb{R}^{N_k \times \prod_{l \neq k} N_l}$ has the mode-$k$ fibers as its columns (see [Some notes on tensors](post.html?file=posts/math/linear-algebra/some-notes-on-tensors.md)). For a matrix, $T_{(1)} = T$ and $T_{(2)} = T^T$.

As in the matrix post, $u^j$ is column $j$ of a matrix $U$ and $u_i$ is row $i$.

### Outer product

$$
	[u_1 \circ u_2 \circ \cdots \circ u_K]_{i_1 \ldots i_K} = [u_1]_{i_1} [u_2]_{i_2} \cdots [u_K]_{i_K}
$$

This is a rank-one tensor. For $K = 2$, $u \circ v = uv^T$.

### Tensor vector

Contract mode $k$ with $v \in \mathbb{R}^{N_k}$:

$$
	[T \,\bar\times_k\, v]_{i_1 \ldots i_{k-1} i_{k+1} \ldots i_K} = \sum_{i_k=1}^{N_k} T_{i_1 \ldots i_K}\, v_{i_k}
$$

Each mode-$k$ fiber is replaced by its inner product with $v$, the analogue of $[Ax]_i = \langle a_i, x \rangle$. The order drops by one.

### Multilinear form

Contracting every mode gives a scalar:

$$
	T(u_1, \ldots, u_K) = T \,\bar\times_1\, u_1 \cdots \bar\times_K\, u_K = \langle T,\, u_1 \circ \cdots \circ u_K \rangle_F
$$

For $K = 2$ this is $x^T A y = \langle A, xy^T \rangle_F$.

### Inner product with a rank-one tensor is a contraction by its factors

Take $T \in \mathbb{R}^{N_1 \times N_2 \times N_3}$ and a rank-one tensor $u \circ v \circ w$ of the same shape. Then

$$
	\langle T,\, u \circ v \circ w \rangle_F = T \,\bar\times_1\, u \,\bar\times_2\, v \,\bar\times_3\, w
$$

#### Proof:

$$
	\langle T,\, u \circ v \circ w \rangle_F
	= \sum_{i,j,k} T_{ijk}\, [u \circ v \circ w]_{ijk}
	= \sum_{i,j,k} T_{ijk}\, u_i v_j w_k
	= \sum_{k} w_k \sum_{j} v_j \underbrace{\sum_{i} T_{ijk}\, u_i}_{[T \,\bar\times_1\, u]_{jk}}
	= T \,\bar\times_1\, u \,\bar\times_2\, v \,\bar\times_3\, w
$$

Each sum contracts one mode with one factor. The sums can be taken in any order, so the modes can be contracted in any order. The same argument works for any order $K$:

$$
	\langle T,\, u_1 \circ \cdots \circ u_K \rangle_F = T \,\bar\times_1\, u_1 \cdots \bar\times_K\, u_K
$$

#### Rank-$R$ tensors

Let $S = \sum_{r=1}^{R} \lambda_r\, u^r \circ v^r \circ w^r$ have rank at most $R$. The inner product is linear in its second argument, so applying the rank-one case to each term gives

$$
	\langle T,\, S \rangle_F
	= \sum_{r=1}^{R} \lambda_r\, \langle T,\, u^r \circ v^r \circ w^r \rangle_F
	= \sum_{r=1}^{R} \lambda_r\; T \,\bar\times_1\, u^r \,\bar\times_2\, v^r \,\bar\times_3\, w^r
$$

That is a sum of $R$ terms, and each term contracts $T$ with the factors of one rank-one component. For order $K$, replace $u^r \circ v^r \circ w^r$ with $u_1^r \circ \cdots \circ u_K^r$.

For $K = 2$, with $X = [x^1 \cdots x^R]$, $Y = [y^1 \cdots y^R]$, and $\Lambda = \mathrm{Diag}(\lambda)$,

$$
	\Big\langle A,\, \sum_{r=1}^{R} \lambda_r\, x^r {y^r}^T \Big\rangle_F
	= \sum_{r=1}^{R} \lambda_r\, {x^r}^T A\, y^r
	= \operatorname{tr}\!\big(\Lambda X^T A Y\big)
$$

### Positive semidefinite tensors

A matrix $A$ is PSD when it is symmetric and $x^T A x \ge 0$ for all $x$. Both conditions extend to tensors through the multilinear form.

A tensor $T \in \mathbb{R}^{N \times \cdots \times N}$ of order $K$ is **symmetric** if its entries are unchanged by any permutation of the indices, e.g. $T_{ijk} = T_{jik} = T_{kji} = \cdots$. Write $x^{\circ K} = x \circ \cdots \circ x$ ($K$ times). By the contraction result above,

$$
	T(x, \ldots, x) = \langle T,\, x^{\circ K} \rangle_F = \sum_{i_1, \ldots, i_K} T_{i_1 \ldots i_K}\, x_{i_1} \cdots x_{i_K}
$$

which is a homogeneous polynomial of degree $K$ in $x$. A symmetric tensor $T$ is **positive semidefinite** if

$$
	T(x, \ldots, x) \ge 0 \quad \text{for all } x \in \mathbb{R}^N
$$

(Qi, 2005). For $K = 2$ this is exactly $x^T A x \ge 0$.

**Only even orders are interesting.** For odd $K$, $T(-x, \ldots, -x) = -T(x, \ldots, x)$. So nonnegativity for all $x$ forces $T(x, \ldots, x) = 0$ for every $x$, and for a symmetric tensor that means $T = 0$.

**Eigenvalues.** For a matrix, $\min_{\|x\| = 1} x^T A x = \lambda_{\min}(A)$. For a symmetric tensor, the critical points of $T(x, \ldots, x)$ on the unit sphere satisfy

$$
	T \,\bar\times_2\, x \cdots \bar\times_K\, x = \lambda x, \qquad \|x\|_2 = 1
$$

These $\lambda$ are the **Z-eigenvalues** of $T$. At a critical point, $T(x, \ldots, x) = \langle x, \lambda x \rangle = \lambda$. So for even $K$, $T$ is PSD if and only if its smallest Z-eigenvalue is nonnegative.

#### Sums of even powers are PSD

Let $K$ be even and $T = \sum_{r=1}^{R} \lambda_r\, (a^r)^{\circ K}$ with every $\lambda_r \ge 0$. Then $T$ is PSD.

#### Proof:

By the rank-$R$ result above and $\langle a^{\circ K}, x^{\circ K} \rangle_F = \langle a, x \rangle^K$ (from [Some notes on tensors](post.html?file=posts/math/linear-algebra/some-notes-on-tensors.md)),

$$
	T(x, \ldots, x) = \sum_{r=1}^{R} \lambda_r\, \langle (a^r)^{\circ K},\, x^{\circ K} \rangle_F = \sum_{r=1}^{R} \lambda_r\, \langle a^r, x \rangle^K \ge 0
$$

because $K$ is even.

For $K = 2$ this is $A = \sum_r \lambda_r\, a^r {a^r}^T$, and here the converse also holds: every PSD matrix has this form, by its eigendecomposition. **For tensors the converse fails.** The polynomial $T(x, \ldots, x)$ of a sum of even powers is a sum of squares, $\sum_r \big(\sqrt{\lambda_r}\, \langle a^r, x \rangle^{K/2}\big)^2$. But some nonnegative polynomials are not sums of squares (Hilbert, 1888). An example is the degree-6 Motzkin polynomial $x^4 y^2 + x^2 y^4 + z^6 - 3x^2 y^2 z^2$, which comes from a PSD tensor of order 6 on $\mathbb{R}^3$ that is not a sum of even powers.

#### A sufficient test via unfolding

For order 4, group the modes in pairs. Let $M \in \mathbb{R}^{N^2 \times N^2}$ be the unfolding with rows indexed by $(i_1, i_2)$ and columns by $(i_3, i_4)$. Then

$$
	T(x, x, x, x) = (x \otimes x)^T M\, (x \otimes x)
$$

So if $M$ is a PSD matrix, $T$ is a PSD tensor. The converse fails, since $x \otimes x$ ranges over only a small part of $\mathbb{R}^{N^2}$. This makes the matrix test convenient but only sufficient. In general, deciding whether a symmetric tensor of order 4 is PSD is NP-hard (Hillar and Lim, 2013).

### Tensor matrix

For $U \in \mathbb{R}^{J \times N_k}$, multiply every mode-$k$ fiber by $U$:

$$
	[T \times_k U]_{i_1 \ldots j \ldots i_K} = \sum_{i_k=1}^{N_k} U_{j i_k}\, T_{i_1 \ldots i_k \ldots i_K},
	\qquad
	(T \times_k U)_{(k)} = U\, T_{(k)}
$$

This is the column view $[AB]^j = Ab^j$ applied to the unfolding. For a matrix $A$, $A \times_1 X = XA$ and $A \times_2 Y^T = AY$.

### Tensor matrix matrix ... (the analogue of $XAY$)

For $G \in \mathbb{R}^{R_1 \times \cdots \times R_K}$ and $U_k \in \mathbb{R}^{N_k \times R_k}$, apply one matrix in each mode:

$$
	T = G \times_1 U_1 \cdots \times_K U_K = \sum_{j_1, \ldots, j_K} G_{j_1 \ldots j_K}\; u_1^{j_1} \circ \cdots \circ u_K^{j_K}
$$

For $K = 2$, $A \times_1 X \times_2 Y^T = XAY = \sum_{i,j} a_i^j \cdot x^i y_j$.

#### Proof:

Expanding the mode products one at a time gives

$$
	T_{i_1 \ldots i_K} = \sum_{j_1, \ldots, j_K} G_{j_1 \ldots j_K}\, [U_1]_{i_1 j_1} \cdots [U_K]_{i_K j_K}
$$

and $[U_1]_{i_1 j_1} \cdots [U_K]_{i_K j_K}$ is the $(i_1, \ldots, i_K)$ entry of $u_1^{j_1} \circ \cdots \circ u_K^{j_K}$.

#### Special case:

When $G$ is diagonal ($G_{j \ldots j} = \lambda_j$ and zero elsewhere),

$$
	T = \sum_{j} \lambda_j\; u_1^{j} \circ \cdots \circ u_K^{j}
$$

This is the **CP decomposition**, the analogue of the SVD form $XAY = \sum_i a_i^i \cdot x^i y_i$. The general $G$ is the **Tucker decomposition**.

### Vectorization

With $\mathrm{vec}$ stacking indices with the earliest varying fastest, as in the matrix post,

$$
	\mathrm{vec}(u_1 \circ \cdots \circ u_K) = u_K \otimes \cdots \otimes u_1,
	\qquad
	\mathrm{vec}(G \times_1 U_1 \cdots \times_K U_K) = (U_K \otimes \cdots \otimes U_1)\, \mathrm{vec}(G)
$$

For $K = 2$ these are $\mathrm{vec}(uv^T) = v \otimes u$ and $\mathrm{vec}(XAY) = (Y^T \otimes X)\,\mathrm{vec}(A)$.

### References

- Tamara G. Kolda and Brett W. Bader (2009), [Tensor Decompositions and Applications](https://doi.org/10.1137/07070111X), *SIAM Review* **51**(3), 455–500.
- Liqun Qi (2005), [Eigenvalues of a Real Supersymmetric Tensor](https://doi.org/10.1016/j.jsc.2005.05.007), *Journal of Symbolic Computation* **40**(6), 1302–1324.
- Christopher J. Hillar and Lek-Heng Lim (2013), [Most Tensor Problems Are NP-Hard](https://doi.org/10.1145/2512329), *Journal of the ACM* **60**(6), 45.
