---
title: Technical Terms & Phenomena
date: 2026-03-29
tags: [reference, glossary, definitions]
summary: A living collection of technical terms, concepts, and phenomena with short readable descriptions.
---

## Loewner Order

A partial ordering on symmetric (or Hermitian) matrices where $A \succeq B$ if and only if $A - B$ is positive semi-definite — essentially a way to say one matrix is "greater than or equal to" another by generalizing the notion of $\geq$ from scalars to matrices.

## Tensor Product of Hilbert Spaces

A construction that combines two Hilbert spaces $\mathcal{H}_1$ and $\mathcal{H}_2$ into a new Hilbert space $\mathcal{H}_1 \otimes \mathcal{H}_2$ by taking the algebraic tensor product, equipping it with the inner product $\langle u_1 \otimes u_2, v_1 \otimes v_2 \rangle = \langle u_1, v_1 \rangle \langle u_2, v_2 \rangle$, and completing the space — used extensively in quantum mechanics to describe composite systems.

## Universal Property

A way of defining a mathematical object by specifying how it relates to all other objects of a given kind — if an object $X$ satisfies a universal property, then any other object doing the same thing must factor through $X$ uniquely, characterizing $X$ up to unique isomorphism. This is the core idea behind constructions like products, coproducts, tensor products, and free objects in category theory.

## K-SVD

A dictionary learning algorithm that iteratively learns an overcomplete dictionary $D$ and sparse codes $X$ to represent data as $Y \approx DX$, by alternating between sparse coding (e.g. via OMP) and updating each dictionary atom using a rank-1 SVD approximation — a generalization of K-means where each signal can use multiple atoms instead of just one.

## Sparse Approximation

The problem of representing a signal $y$ as a linear combination of as few columns as possible from a (typically overcomplete) dictionary $D$, i.e. finding the sparsest $x$ such that $y \approx Dx$ — solved approximately via methods like matching pursuit, OMP, or basis pursuit ($\ell_1$ relaxation).

## Sparse Dictionary Learning

The problem of jointly learning a dictionary $D$ *and* sparse codes $X$ from data $Y$, unlike sparse approximation which assumes a fixed dictionary — the learned dictionary adapts to the data and typically yields much sparser representations than predefined bases like Fourier or wavelets. Algorithms include K-SVD, MOD, and online dictionary learning.

## Sparse Autoencoder (SAE)

An autoencoder with a sparsity constraint on the hidden layer activations — by penalizing the network so that only a few neurons activate for any given input, it learns a compressed, interpretable overcomplete representation. Recently used in mechanistic interpretability to decompose neural network activations into human-readable features.

## Sparse Coding (Neuroscience)

A neural coding strategy where only a small fraction of neurons are active at any given time to represent a stimulus — proposed by Olshausen & Field (1996) as a principle the visual cortex uses, where sparse activations over an overcomplete basis yield efficient, robust, and disentangled representations of natural scenes.

## Sparse PCA

A variant of PCA that adds a sparsity constraint (e.g. $\ell_1$ penalty) on the loadings so that each principal component depends on only a few original variables — trading off some explained variance for much more interpretable components.

## Nonlinear Eigenproblem

A generalization of the standard eigenvalue problem $Ax = \lambda x$ to $M(\lambda)x = 0$, where the matrix $M$ depends nonlinearly on the eigenvalue $\lambda$ — arises naturally in vibration analysis, stability problems, and delay differential equations.

## Generalized Eigenvalue Problem

The problem of finding scalar $\lambda$ and vector $x$ satisfying $Ax = \lambda Bx$ for two matrices $A$ and $B$ — reduces to the standard eigenvalue problem when $B = I$. Common in mechanics (mass and stiffness matrices), Fisher's discriminant analysis, and canonical correlation analysis.

## Quadratic Eigenvalue Problem

Finding $\lambda$ and $x$ satisfying $(\lambda^2 M + \lambda C + K)x = 0$ — a special case of the nonlinear eigenproblem where the matrix depends quadratically on $\lambda$. Arises in damped vibration systems where $M$, $C$, and $K$ are the mass, damping, and stiffness matrices respectively.

## Natural Gradient

A modification of gradient descent that respects the geometry of the parameter space. Standard gradient descent measures distances via the Euclidean metric $\|\delta\theta\|^2$, but when parameters define a probability distribution $p_\theta$, this is the wrong geometry — a small change in $\theta$ can cause a large or small change in the distribution depending on the parameterization. The natural gradient replaces the Euclidean metric with the Fisher information metric $F(\theta) = \mathbb{E}_{p_\theta}[\nabla \log p_\theta(x)\, \nabla \log p_\theta(x)^\top]$, which locally approximates KL divergence: $D_{\mathrm{KL}}(p_\theta \| p_{\theta+\delta\theta}) \approx \frac{1}{2}\,\delta\theta^\top F(\theta)\,\delta\theta$. The update $\theta \leftarrow \theta - \eta\, F(\theta)^{-1} \nabla L(\theta)$ is the steepest descent direction measured in KL divergence rather than Euclidean distance. It is reparameterization invariant (the trajectory through distribution space is unchanged under coordinate transforms $\theta \to \phi(\theta)$), and $F(\theta)$ is the Riemannian metric tensor on the statistical manifold, making this Riemannian gradient descent. Under regularity conditions (Bartlett identity), the Fisher equals the expected Hessian for maximum likelihood, so natural gradient can be viewed as an always-PSD approximation to Newton's method. Introduced by Amari (1998); since $F(\theta)^{-1}$ is intractable for large models, practical approximations include K-FAC (Kronecker-factored curvature), TRPO/PPO (KL-constrained policy updates in RL), and diagonal approximations loosely related to Adam.

## Symmetric → Normal → Commuting Family

## Preconditioning

$$Ax = b \implies MAx = Mb, \quad M \approx A^{-1}$$

$MA$ has a lower condition number than $A$, so iterative methods converge faster. But a better $M$ means more expensive to compute — at the limit $M = A^{-1}$ you've already solved the problem, so you're always paying part of the cost you were trying to avoid. A common example is ILU (Incomplete LU factorization), which computes an approximate $LU$ decomposition of $A$ by dropping small fill-in entries to keep it sparse, then uses $M = (LU)^{-1}$ as the preconditioner.

## Symmetric → Normal → Commuting Family

A chain of increasingly general diagonalizability results. **Symmetric:** $[A, A^T] = 0$ implies there exists an orthonormal basis of eigenvectors. **Normal:** $[A, A^*] = 0$ implies there exists a unitary matrix that diagonalizes $A$. **Commuting family:** $[A_i, A_j] = 0$ for all normal $A_i, A_j$ implies there exists a single unitary matrix that simultaneously diagonalizes all of them.

## Fat Shattering Dimension

A scale-sensitive complexity measure for classes of real-valued functions, generalizing VC dimension. A set $S = \{x_1, \dots, x_n\}$ is $\gamma$-shattered by a function class $\mathcal{G}$ if there exists a witness vector $r \in \mathbb{R}^n$ such that for every labeling $y \in \{-1, +1\}^n$, some $g \in \mathcal{G}$ satisfies $y_i(g(x_i) - r_i) \geq \gamma$ — meaning $g$ can be pushed at least $\gamma$ above or below each threshold $r_i$ in whichever direction the labeling demands. The fat shattering dimension $\text{fat}_\gamma(\mathcal{G})$ is the size of the largest set that can be $\gamma$-shattered. Unlike VC dimension (which is the $\gamma = 0$ binary case), it captures the margin structure of real-valued function classes and is central to generalization bounds for regression and margin-based classification.

## Resolution of the Identity

The statement that the identity operator on a Hilbert space can be decomposed as a sum (or integral) over a complete set of projectors. In the discrete case, given an orthonormal basis $\{|e_i\rangle\}$, this is $I = \sum_i |e_i\rangle\langle e_i|$ — any vector $|v\rangle = \sum_i \langle e_i | v \rangle |e_i\rangle$ is recovered by "inserting the identity." For a self-adjoint operator $T$ with continuous spectrum, the sum generalizes to a projection-valued measure $\Omega_T$: $I = \int_{-\infty}^{\infty} d\Omega_T(\lambda)$, and the spectral theorem gives $T = \int \lambda\, d\Omega_T(\lambda)$. In physics (Dirac notation) the continuous case is written formally as $I = \int |x\rangle\langle x|\,dx$, which is how one inserts a completeness relation to move between position, momentum, or energy representations. The Borel functional calculus extends this further: given the spectral decomposition, any Borel function $h$ can be applied to $T$ via $h(T) = \int h(\lambda)\,d\Omega_T(\lambda)$.

## Woodbury Matrix Identity

For $A \in \mathbb{R}^{n \times n}$, $U \in \mathbb{R}^{n \times k}$, $C \in \mathbb{R}^{k \times k}$, $V \in \mathbb{R}^{k \times n}$ with $A$ and $C$ invertible: $(A + UCV)^{-1} = A^{-1} - A^{-1}U(C^{-1} + VA^{-1}U)^{-1}VA^{-1}$. The key insight is that inverting the $n \times n$ matrix $A + UCV$ reduces to inverting the $k \times k$ matrix $C^{-1} + VA^{-1}U$, so when $k \ll n$ and $A^{-1}$ is already known, the update is much cheaper than a full $O(n^3)$ inversion. When $U = u$ and $V = v^\top$ are vectors (rank-1 case), this reduces to the Sherman–Morrison formula. Derived from block inversion of a $(n+k) \times (n+k)$ matrix via the Schur complement. Central to the Kalman filter (where the state covariance is updated by a low-rank observation model), recursive least squares, and the matrix determinant lemma $\det(A + UCV) = \det(C^{-1} + VA^{-1}U)\,\det(C)\,\det(A)$.

## Sherman–Morrison Formula

Given an invertible matrix $A$ and column vectors $u, v$, the inverse of the rank-1 update $A + uv^\top$ is $(A + uv^\top)^{-1} = A^{-1} - \frac{A^{-1} u v^\top A^{-1}}{1 + v^\top A^{-1} u}$, valid whenever $1 + v^\top A^{-1} u \neq 0$. Instead of recomputing the full inverse from scratch ($O(n^3)$), this updates it in $O(n^2)$ using only matrix-vector products with the already-known $A^{-1}$. A special case of the Woodbury identity $(A + UCV)^{-1} = A^{-1} - A^{-1}U(C^{-1} + VA^{-1}U)^{-1}VA^{-1}$, which handles rank-$k$ updates. Used in quasi-Newton methods (e.g. BFGS, where each step applies a rank-2 update to the approximate inverse Hessian) and online/streaming settings where a matrix is modified one row or column at a time.

## SVD Filtering

Given $A = U \Sigma V^\top$, replace each singular value $\sigma_i$ by $g(\sigma_i)$ for some filter function $g : \mathbb{R}_+ \to \mathbb{R}_+$ (or more generally $G : \mathbb{R}_+^k \to \mathbb{R}_+^k$ acting on the entire singular value vector), producing a modified matrix $\tilde{A} = U\, g(\Sigma)\, V^\top$. Solving $\min \|Ax - b\|$ through the filtered pseudo-inverse $\tilde{A}^\dagger$ yields implicit regularization — the choice of $g$ determines which regularizer. For example, $g(\sigma) = \sigma / (\sigma^2 + \lambda)$ recovers the Tikhonov-regularized solution to $\min \|Ax - b\|^2 + \lambda \|x\|^2$; more generally, $g(\sigma) = \sigma / (\sigma^2 + \lambda \sigma_\Gamma^2)$ where $\sigma_\Gamma$ are the singular values of a penalty matrix $\Gamma$ recovers the general Tikhonov solution $\min \|Ax - b\|^2 + \lambda \|\Gamma x\|^2$. Setting $g(\sigma) = 1/\sigma$ for the top $k$ values and $0$ otherwise gives truncated SVD. The framework unifies many classical regularization methods as different spectral filters on the same decomposition.
