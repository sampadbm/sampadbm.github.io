---
date: 2026-04-04
title: Understanding SVD filtering
tags: [math, linear-algebra, tutorial, signal-processing, inverse-problems, EE592]
summary: Some views on SVD filtering
authors: [sampad]
---
### Notations
$$[N] = \{1,2,...,N\}$$

If $U \in \mathbb{R}^{m \times n}$, we represent the columns of $U$ as $u_i, i \in [n]$. Similary the columns of a matrix $V$ are $v_i$.


### Preliminaries : Algebra 
#### Minima of a single variable quadratic
$$
\begin{equation}
\underset{z}{\text{argmin }} (\sigma z - c)^2 \rightarrow z^* = \frac{c}{\sigma}
\end{equation}
$$

$$
\begin{equation}
\underset{z}{\text{argmin }} (\sigma z - c)^2 + \lambda z^2 \rightarrow z^* = \frac{c}{\sigma + \lambda}
\end{equation}
$$

#### Minima of a two variable separated quadratic
$$
\begin{equation}
\underset{z}{\text{argmin }} (\sigma_1z_1 - c_1)^2  + (\sigma_2z_2 - c_2)\rightarrow z_i^* = \frac{c_i}{\sigma_i}, i \in \{1,2\}
\end{equation}
$$

$$
\begin{equation}
\underset{z_1,z_2}{\text{argmin }} (\sigma_1z_1 - c_1)^2 + \lambda_1 z_1^2 + (\sigma_2z_2 - c_2)^2 + \lambda_1 z_2^2 \rightarrow z_i^* = \frac{c_i}{\sigma_i + \lambda_i}, i \in \{1,2\}
\end{equation}
$$

What we observe here is that the optimization separates over the variables (called separability in optimizaiton theory) because we can just optimize the terms $(\sigma_1z_1 - c_1)^2$ and $(\sigma_2 z_2 - c_2)^2$ independently.  

#### Non unique solutions
Now let us have $n$ quadratic terms with $n$ variables $z_1,z_2,...z_n$. 

Let $i \in [n]$ and $\sigma_i = \begin{cases} \text{ non-zero} & i \leq k \\  \text{ zero} & i >k \end{cases}$.


$$
\begin{equation}
\underset{z}{\text{argmin }} \sum_{i \in [n]}(\sigma_iz_i - c_i)^2 \rightarrow z_i^* = \begin{cases} \frac{c_i}{\sigma_i} & i \leq k \\ \text{don't care} & i > k \end{cases}
\end{equation}
$$

Since $z_i^*$ are arbitrary don't care terms for $i > k$ , there are infinite solutions. 

However, if we introduce the regularizing terms $\lambda_i z_i^2$, then we are back to unique solution
$$
\begin{equation}
\underset{z}{\text{argmin }} \sum_{i \in [n]}(\sigma_iz_i - c_i)^2 + \lambda_iz_i^2 \rightarrow z_i^* = \begin{cases} \frac{c_i}{\sigma_i + \lambda} & i \leq k \\ \; 0 & i > k \end{cases}
\end{equation}
$$


#### Minimum Norm Solution 
When we have non-unique solutions, we can ask for the one which has the smallest length (under some measure of length). If we measure length of the solution vector $z^*$ in the usual euclidean sense, then we must set the don't care terms to zero so that the minimum norm solution is 

$$
	z_i^* = \begin{cases} \frac{c_i}{\sigma_i} & i \leq k \\ 0 & i >k \end{cases}
$$


### Preliminaries: Linear Algebra
#### Some useful things
Let $z \in \mathbb{R}^n$

$$
	||z||_{l_2} = \sum_{i=1}^n z_i^2
$$

Let $Z \in \mathbb{R}^{m \times n}$ and its columns be $z_i, i \in [n]$ and rows be $Z[j,:], j \in [m]$. Then the norm of the matrix $Z$ induced by the [Frobenius inner product](https://en.wikipedia.org/wiki/Frobenius_inner_product) $\langle \cdot, \cdot \rangle$ is given by

$$
	||Z||_F^2 = \langle Z , Z \rangle_F = tr(Z^TZ) = tr(ZZ^T) = \sum_{i=1}^n  ||z_i||^2_{l_2} = \sum_{j \in [m]} ||Z[j,:]||_{l_2}^2
$$

$$
	(a_1z_1 - c_1)^2 + (a_2z_2 - c_2)^2 = \begin{bmatrix}a_1 & 0 \\ 0 & a_2\end{bmatrix} \begin{bmatrix} z_1 \\ z_2 \end{bmatrix} - \begin{bmatrix}c_1 \\ c_2\end{bmatrix}
$$

#### Orthonormal/Unitary transforms
> Isometry:  
> Let $(X,d_X)$ and $(Y,d_Y)$ be metric spaces.  
> A map $f:X \rightarrow Y$ is an isometry if
> $$ d_X(a,b) = d_Y(f(a),f(b))$$

If $Q \in \mathbb{R}^{m \times n}$ be an orthonormal matrix, i.e, its columns are all unit length and orthogonal (implies $m \geq n$), then $Q^TQ = I_{n}$. 

An orthonormal transform is an isometry from $(\mathbb{R^n},l_2)$ to $(\mathbb{R}^n, l_2)$ where the $l_2(a,b) = ||a - b||_{l_2}$ is the euclidean distance. 
 
If $z \in \mathbb{R^n}$, then
$$
	||Qz||_{l_2}^2 = z^T Q^T Q z = z^T I_n z = z^T z = ||z||_{l_2}^2
$$ 

_The same goes for unitary transforms._

#### Rank-1 Resolution of the Identity Operator
Let $U \in \mathbb{R}^{m \times m}$ be any orthonormal matrix. Then $U^TU = I_m = QQ^T$. 

Also, if $u_i, \; i \in [m]$ are the $m$ columns of the matrix $U$, and we define $P_i := u_i u_i ^T$ ($P$ for projections)

$$
\begin{equation}
	I_m = UU^T = \sum_{i \in [m]} u_i u_i^T = \sum_{i \in [m]} P_i
\end{equation}
$$

where $P_i = u_i u_i^T$ are orthogonal projectors, called resolvents. This is called the rank-1 resolution of the identity operator. 

> Remark 0:
$$
	P_i^T = (u_i u_i^T)^T = u_i u_i^T = P_i \qquad \forall i \in [m]
$$
> Remark 1:
$$
\begin{aligned}
	\langle P_i , P_j \rangle_F = tr(P_i^T P_j) = tr({\color{green}u_iu_i^T} {\color{purple}u_j u_j^T}) = tr(\underbrace{{\color{purple}u_j^T}{\color{green}u_i}}_{\delta_{ij}} \; \underbrace{{\color{green}u_i^T}{\color{purple}u_j}}_{\delta_{ij}}) = tr(\delta_{ij}^2) = \delta_{ij}
\end{aligned}
$$
Hence the resolvents are orthonormal w.r.t the Frobenius inner product.

> Remark 2:
$$
P_i P_j = {\color{green}P_i^T} {\color{purple}P_j} = {\color{green}u_i} \underbrace{{\color{green}u_i^T} {\color{purple}u_j}}_{\delta_{ij}}{\color{purple}u_j^T} = \delta_{ij} {\color{green}u_i}{\color{purple}u_j^T} = \begin{cases} P_i & i = j \\ \mathbf{0}_{m \times m} & \text{otherwise} \end{cases}
$$ 

> **Resolution of the identity operator is not various orthonormal matrices $V$ give various resolutions.**

Just like a $n$ dimensional vector $x$ can be resolved into $n$ orthogonal components, the identity operator $I_n$ can be resolved into $n$ projections. 

Infact, the resolution of the identity applied to $x$ gives use the $n$ orthogonal components of $x$ via  $x = I_n x = \sum_{i \in [n]} \underbrace{P_i x}_{x_i} = \sum_{i \in [n]} x_i$. 

Clearly,

$$\begin{aligned}
x_i^T x_j = (P_i x)^T (P_j x)) = x^T P_i^T P_j x_j \\\;\\
= x^T u_i \; \underbrace{u_i^T  u_j}_{\delta_{ij}} \;u_j^T x \\\;\\
= \delta_{ij} x^Tu_iu_j^Tx = \delta_{ij}tr(x^T u_iu_j^Tx) \\\;\\
\end{aligned}$$
If $i \neq j$, then $\delta_{ij} = 0$ and hence we have $x_i \perp x_j$ which means $x_i$ are in fact components obtained by orthogonal resolution of the vector $x$.

We also point out that if index sets $I,J \subset [n]$ such that $I \cup J = 0$ (disjoint), then $x_I := \sum_{i \in I}x_i$ and $x_J := \sum_{j \in J} x_J$ are orthogonal.

$$
	x_I^T \; x_J = \sum_{i \in I}x_i^T \sum_{j \in J}x_j = \sum_{i \in I, j \in J} \underbrace{x_i^T x_j}_{0} = 0
$$

> In simple words, $P_I$ takes $x$ onto the subspace spanned by $v_i , i \in I$ and $P_J$ takes onto the subspace spanned by $v_i, i \in I$ and since the two subspaces are orthogonal, $x_I$ and $x_J$ must be orthogonal.

#### General resolution of the Identity Operator

If $I \sqcup J = [n]$ (i.e $I \cup J = [n]$ and $I \cap J = \emptyset$ which means $I,J$ form  a partition of $[n]$), then we can write the identity operator $I_n$ as

$$
	I_n = \sum_{k \in [n]} P_k = \sum_{i \in I} P_i + \sum_{j \in J} P_j = P_I + P_J. 
$$

We can $I_n = P_I + P_J$ a general resolution of the $I_n$ since $P_I$ and $P_J$ are not necessarily rank-1. In general, we can have a partition that has more than two disjoint subsets like $I, J, K, L, ...$ and then we have the general resolution as $I_n = P_I + P_J + P_K + P_L + ...$

> Remark 0:
$$
	P_I^T = \sum_{i \in I} P_i^T = \sum_{i \in I} P_i = P_I
$$
Similarly, $P_J^T = P_J, P_K^T = P_K, P_L^T = P_L...$

> Remark 1: 
$$
\begin{aligned}
	\langle P_I , P_J \rangle_F = \bigg\langle \sum_{i \in I} P_i \; , \sum_{j \in J} P_j \bigg\rangle_F \\
= \sum_{i \in I, j \in J} \big\langle P_i , P_j \rangle 
= \sum_{i \in I, j\in J}\underbrace{\delta_{ij}}_{0,1} \\
= \text{dimension of shared between $P_I$ and $P_J$}
\end{aligned}
$$
If $I \cap J = \emptyset$, then $\langle P_I, P_J \rangle = 0$.

> Remark 2:
$$
\begin{aligned}
	P_I P_J = \sum_{i \in I} P_i \sum_{j \in J} P_j = \sum_{i \in I, j \in J} \;\; \underbrace{P_i P_j}_{\delta_{ij} u_i u_j^T}  = \sum_{i \in I, j \in J} \delta_{ij} u_i u_j^T \\
=\sum_{k \in I \cap J} \underbrace{\delta_{kk}}_{1} u_ku_k^T+ \sum_{i \in I, j \in J \backslash I} \underbrace{\delta_{ij}}_{0} u_iu_j^T + \sum_{i \in I \backslash J, j \in J } \underbrace{\delta_{ij}}_{0} u_i u_j^T \\
= \sum_{k \in I \cap J} u_k u_k^T = P_{I \cap J}
\end{aligned}
$$
Hence $P_IP_J = P_I^T P_J = P_I P_J^T = P_I^T P_J^T = P_{I \cap J}$.  
If $I \cap J = \emptyset$, then $P_I P_J = \mathbf{0}_{m}$, the zero matrix of shape $m \times m$.

#### Rank-1 resolution of arbitrary matrices : Singular Value Decomposition (SVD)
Any matrix $A \in \mathbb{R}^{m \times n}$ with rank $k$ admits an efficient/truncated singular value decomposition given by 
$$
\begin{equation}
	A = U\Sigma V^T = \sum_{i=1}^k \sigma_i u_i v_i^T = \sigma_i \color{crimson}{A_i}
\end{equation}
$$

where $U \in \mathbb{R}^{m \times k}$ and $V \in \mathbb{R}^{n \times k}$ are orthonormal and $\Sigma$ is diagonal with positive entries (entries $\sigma_i >0 \; \forall \; i \in [k]$) sorted in descending order on the primary diagonal and $\color{crimson}{A_i = u_i v_i^T}$ are rank-one matrices.

In general, the full SVD is given by
$$
	A = U \Sigma V^T = \underbrace{\sum_{i=1}^{\min(m,n)} \sigma_i u_iv_i^T}_{\text{full}} = \underbrace{\sum_{i \in [k]} \sigma_i u_i v_i^T}_{\text{truncated}} = \sum_{i \in [k]} \sigma_i A_i
$$

where $U \in \mathbb{R}^{m \times m},V \in \mathbb{R}^{n \times n}$ and $\Sigma$ has a shape that makes the multiplication in $U\Sigma V^T$ work out, i.e $\mathbb{R}^{m \times n}$, and the entries on the primary diagonal of $\Sigma$ are allowed to be non-negative ($\sigma_i \geq 0$) and descending.

>Remark 1:
$$
    \langle A_i , A_j \rangle_F = tr(A_i^T A_j) = tr(v_i u_i^T u_jv_j^T) = tr(\underbrace{v_j^T v_i}_{\delta_{ij}} \; \underbrace{u_i^T u_j}_{\delta_{ij}}) = tr(\delta_{ij}^2) = tr(\delta_{ij})
$$
Hence, $A_i$ and $A_j$ are orthonormal in the sense of Frobenius inner product. 

> Remark 2:
$$
\begin{aligned}
	A_i^T A_j = v_i u_i^T \;\;  u_j v_j^T =  v_i \; \underbrace{u_i u_j}_{\delta_{ij}} \; v_j^T = \delta_{ij} \;  v_i v_j^T = \begin{cases}  v_i v_i^T & i=j \\ \mathbf{0}_{n \times n} & i \neq j \end{cases} \\\;\\
A_i A_j^T =  u_i v_i^T \;\;  v_j u_j^T =  u_i \underbrace{v_i^T v_j}_{\delta_{ij}} u_j^T = \delta_{ij} \; u_i u_j^T  = \begin{cases}   u_i u_i^T & i=j \\ \mathbf{0}_{m \times m} & i \neq j \end{cases}
\end{aligned}$$
Also,
$$
\begin{aligned}
{\color{green}A_i^T A_i} {\color{crimson}A_j^T} = {\color{green} v_i} \;\; \underbrace{{\color{green}v_i^T} {\color{crimson} v_j}}_{\delta_{ij}} \;\; {\color{crimson}u_j^T} =  \delta_{ij} \;{\color{green} v_i} {\color{crimson}u_j^T} =  \begin{cases} {\color{crimson}A_j^T} & i = j \\ \mathbf{0}_{n \times m} & i \neq j \end{cases} \; \bigg\} = \delta_{ij} \; {\color{crimson}A_j^T} \\\;\\
{\color{crimson}A_iA_i^T}{\color{green}A_j} = {\color{crimson}u_iu_i^T}\;{\color{green}u_jv_j^T} = \delta_{ij}\; {\color{crimson} u_i}{\color{green}v_j^T} = \begin{cases} {\color{green}A_j} & i = j \\ \mathbf{0}_{m \times n} & i \neq j \end{cases} \;  \bigg\} =  \delta_{ij} \; {\color{green}A_j}
\end{aligned}
$$
And hence,
$$
	\forall i \in [k] \;,\; {\color{crimson}A_i A_i^T} A = {\color{crimson}A_i^T A_i} \sum_{t \in [k]} {\color{green}A_t} = 
\sum_{t \in [k]} {\color{crimson}A_i^T A_i} {\color{green}A_t} = \sum_{t \in [k]} \delta_{it} {\color{green}A_t} = A_i
$$
$$
	\forall i \in [k] \;,\; {\color{green}A_i^TA_i} A^T =  {\color{green}A_i^TA_i} \sum_{t \in [k]} {\color{crimson}A_t^T} = 
\sum_{t \in [k]} {\color{green}A_i^TA_i} {\color{crimson}A_t^T} = \sum_{t \in [k]} \delta_{ij}{\color{crimson}A_t^T} = A_i^T
$$

> Remark 3:  
Let $I,J \in [k]$ be index sets where $k$ is the rank of $A \in \mathbb{R}^{m \times n}$, and let us define $A_I := \sum_{i \in I} A_i$ and $A_J := \sum_{j \in J} A_j$. Also, let $Q_i$ be the rank-1 resolvents of the identity $I_n$ via the orthonormal matrix $V$ from the SVD of $A$ i.e $Q_i = v_i v_i^T$. Similarly, let $P_i = u_i u_i^T$ be rank-1 resolvents of $I_m$ via $U$ from SVD of $A$.
$$
\begin{aligned}
	A_I^T A_J = \sum_{i \in I} A_i \sum_{j \in J} A_j \\
= \sum_{i \in I \cap J} \underbrace{\delta_{ii}}_{1} v_i v_i^T + \sum_{i \in I, j \in J \backslash I } \underbrace{\delta_{ij}}_{0} v_i v_j^T + \sum_{i \in I \backslash J, j \in J}  \underbrace{\delta_{ij}}_{0} v_i v_j^T \\
= \sum_{i \in I \cap J} v_iv_i^T = \sum_{i \in I \cap J} P_i
\end{aligned}
$$ 
Similarly, 
$$
A_I A_J^T = \sum_{i \in I \cap J} u_i u_i^T = \sum_{i \in I \cap J} Q_i
$$ 

>Remark 4:
If $A$ has rank $k$, the projection operator onto the range/colspace of $A$ i.e $\mathcal{R}(A)$  given by $P_{\mathcal{R}}(A)$ is 
$$
	P_{\mathcal{R}(A)} = \sum_{i \in [k]} u_i u_i^T = \sum_{i \in [k]} A_i A_i^T
$$

#### Inverse and pseudoinverses
If $A$ has the SVD $\sum_{i=1}^k \sigma_i u_i v_i^T$, the pseudoinverse of $A$ is given by : 

$$
	A^\dagger = \sum_{i=1}^k g(\sigma_i) v_i u_i^T = \sum_{i=1}^k \frac{1}{\sigma_i}v_iu_i^T = \sum_{i \in[k]} \frac{1}{\sigma_i}A_i^T
$$

where $g(z) = \frac{1}{z}$.

If we use the full SVD $\sum_{i=1}^{\min(m,n)} \sigma_i u_i v_i^T$, then $g(z) := \frac{1}{z} \mathbb{1}[z > 0] = (\frac{1}{z})_+$ where $(t)_+ := t \cdot \mathbb{1}[t > 0]$ which clips the output to $0$ if $t$ is non-positive.

_Note: This is the standard pseudoinverse but there exist many general pseudoinverses of a rank deficient matrix $A$. See [Moore-Penrose Pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse)._

#### Vector differentiation
$$
\begin{aligned}
	\frac{\partial}{\partial x}(Ax) = A \\
\frac{\partial}{\partial x}(x^T A) = A^T
\end{aligned}
$$

Special cases: When $A = a^T$, a row vector, $\frac{\partial}{\partial x}(a^Tx) = a^T$ and $\frac{\partial}{\partial x} (x^T a) = \frac{\partial}{\partial x}(a^Tx) = a^T$

### Minimum Norm Least Squares solutions

Let $A \in \mathbb{R}^{m \times n}$ be of rank $k \leq \min(m,n)$, $b \in \mathbb{R}^m$ and $x \in \mathbb{R}^n$. Let $A = U\Sigma V$ be the full SVD of $A$ so that $U \in \mathbb{R}^{m \times m}$ and $UU^T = U^TU = I_m$. $\Sigma \in \mathbb{R}^{m \times n}$ has only $k$ non-zero positive entries on the primary diagonal.

The minimum norm least squares solution to  $\underset{x}{\text{argmin }}{||Ax - b||^2_{l_2}}$ is given by 

$$\boxed{x^* = A^\dagger b = \sum_{i \in [k]} \bigg( \frac{u_i^Tb}{\sigma_i} \bigg) v_i = \frac{1}{\sigma_i} A_i^T b}$$.

Proof:

$$
\begin{aligned}
	||Ax - b||_{l_2}^2 = ||U\Sigma V^Tx - I_mb||^2_{l_2} = || U \Sigma V^T x - UU^Tb||_{l_2}^2 \\\;\\
\underbrace{=}_{\text{isometry}} ||\Sigma V^Tx - U^Tb||_{l_2}^2 
\end{aligned}
$$

Set $z:=V^Tx \in \mathbb{R}^n$

Set $c:=U^Tb \in \mathbb{R}^m$


$$\begin{aligned}
||Ax - b||_2^{l_2} = ||\Sigma z - c||^2_{l_2} \\\;\\
= \Bigg| \Bigg| \underbrace{\begin{bmatrix} \sigma_1 & 0 & 0 & . & . & . \\ 0 & \sigma_2  & 0 & . & . & .\\0  & .  & . & . & . & . \\. & . & .& \sigma_k & 0 & .\\ . & . & .& . & . & . \\0 & 0 & 0 & 0 & 0 & 0 \\\end{bmatrix}}_{m \times n} 
\begin{bmatrix} z_1 \\ z_2 \\ . \\ .\\. \\. \\. \\ z_n \end{bmatrix} - \begin{bmatrix} c_1 \\ c_2 \\ . \\. \\. \\ c_m \\\end{bmatrix} \Bigg| \Bigg|_{l_2}^2 \\\;\\
= \sum_{i \in [k]} (\sigma_i z_i -c_i)^2 + \sum_{ k+1 \leq j \leq m} c_j^2
\end{aligned}$$

Hence the minima is 
$$
	z_i^* =  \begin{cases} \frac{c_i}{\sigma_i} & i \leq k \\ \text{anything} & i>k \end{cases} \; \\
$$

For minimizing the norm of the solution $\big(i.e. \; ||z^*||_{l_2}^2\big)$, 

$$z_i^{*MNLS} = \begin{cases} \frac{c_i}{\sigma_i} & i \leq k \\ 0 & i >k \end{cases}$$

Recall:

$\mathbb{R}^n \ni z=V^Tx \implies Vz = VV^Tx = I_n x = x \implies Vz = x \implies x = \sum_{i=1}^n z_i v_i$

Hence, 

$$
\begin{aligned}
x^{*MNLS} = Vz^{*MNLS} = \sum_{i=1}^n z_i^{*MNLS}\;v_i \\
= \sum_{i \in [k]} z_i^{*MNLS}\;v_i + \sum_{i=k+1}^n \underbrace{z_i^{*MNLS}}_{0}\;v_i \\
= \sum_{i \in [k]} z_i^{*MNLS}\; v_i 
= \sum_{i \in [k]}  \frac{c_i}{\sigma_i}v_i
\end{aligned}
$$

Also recall:

$\mathbb{R}^m \ni c=U^Tb \in \mathbb{R}^m \implies c_i = u_i^T b$.

Hence,

$$
	x^{*MNLS} = \sum_{i=[k]} \bigg(\frac{u_i^Tb}{\sigma_i} \bigg) v_i  = = \sum_{i=[k]}  \frac{1}{\sigma_i} \big( v_iu_i^T \big) b  =  \sum_{i \in [k]} \frac{1}{\sigma_i} A_i^T b \qquad \blacksquare
$$

>**Some Rantings**
Denote $R := P_{\mathcal{R}(A)}$ and $Q := P_{\mathcal{R}(A)^{\perp}}$ as the projection matrices onto the range of the rank-$k$ matrix $A$ and the orthogonal complement of the range. Then $I_m$ is resolved as $I_m = P + Q$ where $P = \sum_{i \in [k]}u_iu_i^T =  \sum_{i \in [k]} A_iA_i^T$ and $Q = \sum_{k+1 \leq i \leq n}u_iu_i^T$. Denote $P_i := u_i u_i^T \; \forall \; i \in [k]$ and $Q_i := u_i u_i^T \;\forall\; k+1 \leq i \leq n$.
Let's see how $A_j, j \in [k]$ and $P_i, i \in [k]$ interact when multiplied.
$$
	A^T_j P_i = A^T_j A_i A_i^T = \delta_{ij}A_j^T
$$
$$
	P_i A_j = A_iA_i^T A_j = \delta_{ij} A_j 
$$
Let's see how $A_j, j \in [k]$ and $P$ interact when multiplied.
$$
	A_j^TP = A_j^T \; \sum_{i \in [k]} P_i = \sum_{i \in [k]}A_j^TP_i = \sum_{i \in [k]} \delta_{ij} A_j^T = A_j^T
$$
$$
	PA_j = (P_1 + ... + P_k) A_j = (\delta_{1j} + ... + \delta_{kj})A_j = A_j
$$
How about $P_j, j \in [k]$ and $A$?
$$
	P_j A = P_j (\sigma_1 A_1 + ... + \sigma_k A_k) = \sigma_1 \delta_{j1}A_1 + ... + \sigma_k \delta_{jk}A_k = \sigma_j A_j
$$
$$
	A^T P_j = \bigg( \sum_{i \in [k]} \sigma_i A^T_i \bigg) P_j  =  \sum_{i \in [k]} \sigma_i A_i^T P_j = \sum_{i \in [k]} \sigma_i \delta_{ji} A_i^T = \sigma_j A_j^T
$$
And now interaction for $A_j, j \in [k]$ and $Q_i, i \in [k+1,n]$ under multiplication
$$ \begin{aligned}
	A_j^T Q_i = v_j \; \underbrace{u_j^T u_i}_{\delta_{ij}} \; u_i^T = \mathbf{0}_{n \times m} \quad \forall i \in [k+1,n], j \in [k] \\\;\\
\implies Q_i A_j = \mathbf{0}_{m \times n} \text{   ( transposing above and $Q_i^T = Q_i$ ) }
\end{aligned}
$$
Now, the interaction between $A_j, j \in [k]$ and $Q$
$$
\begin{aligned}
	A_j^T Q = A_j^T \sum_{i\in [k+1,n]} Q_i = \sum_{i \in [k+1,n]} A_j^T Q_i = \mathbf{0}_{n \times m} \quad \because j \in [k] \\\;\\
Q A_j = \mathbf{0}_{m \times n} \text{  (transposing above and $Q^T = Q$)}
\end{aligned}
$$
Observe that  
$$\forall x = I_m x = (P+Q)x = Px + Qx$$
Since range of $P$ and $Q$ are orthogonal complements, we have
$$
	||x||_{l_2}^2 = ||Px + Qx||_{l_2}^2 = ||Px||_{l_2}^2 + ||Qx||_{l_2}^2
$$
Now, we use the above facts to get 
$$
\begin{aligned}
	||Ax - b||_{l_2}^2 = ||Ax - I_m b||_{l_2}^2 = ||Ax - (P + Q)b||_{l_2}^2 \\\;\\
= || \underbrace{Ax - Pb}_{\in \mathcal{R}(A)} + \underbrace{Q b}_{\in \mathcal{R}(A)^{\perp}}||_{l_2}^2 = ||(Ax-Pb)||_{l_2}^2 + ||Q b||_{l_2}^2 \\\;\\
\end{aligned}
$$
Minimizing $||Ax - b||_{l_2}^2$ is now equivalent to minimizing $||Ax - P b||_{l_2}^2$. The best hope is this term vanishes by matching $Ax$ to $P b$, i.e $Ax = Pb$. Since $Pb \in colspace(A)$, this is achieved. 
$$
\begin{aligned}
	Ax = P b 
\implies A_j^T \big(A x =  P b \big) 
\implies  A_j^T A x = A_j^T P b\\
\implies \sigma_j A_j^TA_j x = A_j^T b \quad \because  A_j^T P = \sigma_j A_j^T \\
\implies \underbrace{A_j^T A_j x}_{:= x_j} = \frac{1}{\sigma_j} A_j^T b
\end{aligned}
$$
Now lets add all the $x_j = A_j^T A_j x = v_jv_j^T x$,
$$
\begin{aligned}
	\sum_{j \in [k]} x_j = \sum_{j \in [k]} \frac{1}{\sigma_j} \; A^T_j b \\
\sum_{j \in [k]} v_j v_j^T x = \sum_{j \in [k]} \frac{1}{\sigma_j} A_j^T b 
\end{aligned}
$$

### Regularized case

#### Isotropic Regularization 
Same setting as before with the extra regularization term $\lambda I_n ||x||_{l_2}^2$. 

$$
	x^* \gets \underset{x}{\text{ argmin }} ||Ax - b||_{l_2}^2 + \lambda ||x||_{l_2}^2
$$

Then, $x^* = \sum_{i \in [k]} \frac{1}{\sigma_i + \lambda} A_i^Tb = \bigg( \frac{u_i^T b}{\sigma_i + \lambda} \bigg) v_i$

Proof:

$$
\begin{aligned}
	||Ax - b||_{l_2}^2 + \lambda ||x||_{l_2}^2 = ||U\Sigma V^T x - UU^T b ||_{l_2}^2 + \lambda ||V^Tx||_{l_2}^2 \\\;\\
= ||\Sigma z - c||_{l_2}^2 + \lambda ||z||_{l_2}^2 \\\;\\
 = \sum_{i \in [k]} (\sigma_i z_i - c_i)^2 + \lambda z_i^2 + \sum_{ k+1 \leq j \leq m} c_j^2 + \sum_{ k+1 \leq j \leq n}  \lambda z_j^2
\end{aligned}
$$

The minima is achieved when 
$$
	z_i^* = \begin{cases} \frac{c_i}{\sigma_i + \lambda} & i \in [k] \\ \; 0 & k+1 \leq i \leq n\end{cases}
$$

Now, $z = V^Tx \implies x = Vz = \sum_{i \in [n]} z_i v_i$ . Hence

$$\begin{aligned}
x_i^* =Vz^* =  \sum_{i \in [n]} z_i^*v_i = \sum_{i \in [k]} \frac{c_i}{\sigma_i + \lambda}v_i + \sum_{ k+1 \leq i \leq n} 0 \; v_i 
= \sum_{i \in [k]} \frac{c_i}{\sigma_i + \lambda}v_i \\\;\\
\implies \boxed{x^* = \sum_{i \in [k]} \frac{u_i^Tb}{\sigma_i + \lambda}v_i =  \sum_{i \in [k]} \frac{1}{\sigma_i + \lambda} A_i^T v_i }
\qquad \blacksquare
\end{aligned}
$$

#### Anisotropic/Tikhonov Regularization
Same setting as before but with extra term $||x||_W^2 = x^TWx$ (for some PSD matrix $W$)

$$
	x^* \gets \underset{x}{\text{ argmin }} ||Ax - b||_{l_2}^2 + \lambda ||x||_W^2
$$

