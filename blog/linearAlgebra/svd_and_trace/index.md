---
themes: ["muted","colorful"]
category: mathematics
---

# SVD and trace
<p style="text-align:center; color:darkred"> 
<b>16th April, 2024 - Proof of trace equaling sum of square of singular values</b><br> 
<i> (A student from CS567-ML asked for a proof, hence this post) </i>
</p>


### Trace of covariance matrix is sum of square of singular values

Let $X$ be a matrix whose SVD is $X = U \Sigma V^T$ where $U,V$ are orthonormal and $\Sigma$ is diagonal.

Since diagonal, hence symmetric and hence $\Sigma^T = \Sigma$.

Since orthonormal, $U^TU = UU^T = I$ and $V^TV = VV^T = I$ and $U^{-1} = U^T$ and $V^{-1} = V^T$.

$$
	X^TX = (U \Sigma V^T)^T (U \Sigma V^T) = (V \Sigma^T U^T )(U \Sigma V^T) = V \Sigma U^T U \Sigma V^T = V \Sigma I \Sigma V^T = V \Sigma^2 V^T
$$

Now, we know that the trace of a matrix is sum of its eigenvalues. 

Since $X^TX$ is symmetric, its SVD is also its eigendecomposition. 

Hence $X^TX = V \Sigma^2 V^T = V \Sigma^2 V^{-1}$ is both SVD and eigendecomposition of $X^TX$ which means that the eigenvalues are contained in the diagonal matrix $\Sigma^2$. 

Hence $Tr(X^TX) = \sum_i \sigma_i^2$

Alternatively, if we do not know that the trace in the sum of eigenvalues, then we can show 

$$
	Tr(X^TX) = Tr(V \Sigma^2 V^T) = Tr(V^TV \Sigma^2) \;\;\; \because \text{trace is invariant to cyclic commutation} \\
	\implies Tr(X^TX) = Tr(I \Sigma^2) = Tr(\Sigma^2) = \sum_i \sigma_i^2 \;\;\; \blacksquare
$$


### Proof for Tr(Y) is sum of eigenvalues.


#### Proof 1
Any matrix $Y$ has a Jordan Canonical Form $PJP^{-1}$ where $J$ is upper triangular. 
Now, $Tr(Y) = Tr(PJP^{-1}) = Tr(P^{-1}PJ) = Tr(J)$

Since $Y$ and $J$ are similar, they share the same eigenvalues (including multiplicities). Since $J$ is upper diagonal,
the eigenvalues of $J$ lie on the diagonals. Hence $Tr(J) = \sum_i \lambda_i(J) = \sum_i \lambda_i(Y)$.

Note that the same can be argued by using Schur decomposition instead of Jordan decomposition. 
The Schur decompositions say $Y = Q T Q^T$ where $Q$ is unitary and $T$ is upper triangular.

#### Proof 2

The characteristic polynomial $P(t)$ of a matrix $Y$ is $det(Y - t I)$. The roots of $P$ are the eigenvalues of $Y$ and so are the roots of $-P(t) = det(t I - Y)$. Let the roots be $\lambda_i$ for $i \in \{ 1,2,3...\}$

Since $P(\lambda)$ also equals $(t - \lambda_1)(t - \lambda_2)....$, the coefficient of $t^{n-1}$ is $-\sum_i \lambda_i$ (by Vieta's formula or you can just think of picking $t$ from all the terms but one to get $t^{n-1}$ and tally).

However, when we stare at the $t I - Y$ long enough, we realize that the coefficients of $t^{n-1}$ in the determinant are $\sum_k - Y_{kk} = - Tr(Y)$. Equating, we get $Tr(Y) = \sum_i \lambda_i$.


### Proof of Det(Y) is product of eigenvalues.

#### Proof 1

Fact: Determinant of a triangular matrix is product of diagonals. 

$Det(Y) = Det(PJP^{-1}) = Det(P) Det(J) Det(P^{-1}) = Det(J) = \prod_i \lambda_i(J) = \prod_i \lambda_i(Y)$


#### Proof 2

Let $Y \in \mathbb{R}^{n \times n}$.

The constant term in $P(t) = \prod_{i=1}^n (t - \lambda_i)$ is $ (-1)^n \prod_{i=1}^n \lambda_i$. Hence $P(0) = (-1)^n \prod_i \lambda_i$.

On the otherhand, $P(0) = det(-Y) = (-1)^n det(Y)$.

Comparing the two expressions, $det(Y) = \prod_{i=1}^n \lambda_i$
