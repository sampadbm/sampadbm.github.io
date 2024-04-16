---
themes: ["muted","colorful"]
category: mathematics
---

# SVD and trace
<p style="text-align:center; color:darkred"> 
<b>16th April, 2024 - Proof of trace equaling sum of square of singular values</b><br> 
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

Alternatively, 

$$
	Tr(X^TX) = Tr(V \Sigma^2 V^T) = Tr(V^TV \Sigma^2) \;\;\; \because \text{trace is invariant to cyclic commutation} \\
	\implies Tr(X^TX) = Tr(I \Sigma^2) = Tr(\Sigma^2) = \sum_i \sigma_i^2 \;\;\; \blacksquare
$$
