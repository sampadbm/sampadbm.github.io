---
themes: ["muted","colorful"]
category: mathematics
---

# Notes on Linear Algebra

<p style="text-align:center; color:darkred"> <b>17th September, 2022</b> </p>

<p style='text-align:center;color:green'><b> 
Counting the number of free parameters in various matrix decompositions.
</b></p>


For my work on tensor decompositions for imputing traffic data, I needed to find the number of free parameters in low rank matrices and low rank tensors. In this note we will see the number of free parameters in various matrix decompositions. This not was made possible due to the materials present in Prof. Gilbert Strang's lectures on [ MITOCW @ Youtube | Lecture 18: Counting Parameters in SVD, LU, QR, Saddle Points ](https://www.youtube.com/watch?v=xaSL8yFgqig).



### Setup
We consider a square matrix A of size $n \times n$. Hence $A$ has $n^2$ free parameters.

### LU Decomposition
L is lower triangular with all diagonals 1. U is upper triangular.

$ nparams(L) = 1 + 2 + 3 + ... + (n-1) = \frac{(n-1)n}{2}\\$
$ nparams(U) = 1 + 2 + 3 + ... + (n+1) = \frac{n(n+1)}{2}$

Total number of parameters in LU decomposition = $\frac{(n-1)n}{2} + \frac{(n+1)n}{2} = \frac{n}{2} \times (n-1+n+1) = n^2$

### QR Decomposition

Q is orthonormal and R is an upper triangular matrix.

The first column of Q has to be unit length, and hence there is a single constraint on the 1st column. So the first column of Q has $n-1$ free parameters. The next column has $n-2$ since it has to be unit length and also orthogonal to the first column. 

$nparams(Q) = (n-1) + (n-2) + ... +1 = \frac{(n-1)n}{2}\\$


$nparams(U) = 1 + 2 + 3 ... + n = \frac{(n)(n+1)}{2}$


Total number of free parameters in QR decomposition = $\frac{n(n-1)}{2} + \frac{n(n+1)}{2} = \frac{n}{2} \times (n-1 + n+1) = n^2$


### Singular Value Decomposition

For full SVD of $ \mathbb{R}^{m \times n} \ni A = U \Sigma V^T$ where  $m \leq n$ and $U \in \mathbb{R}^{m \times m}, \Sigma \in \mathbb{R}^{m \times n}, V \in \mathbb{n \times n}$.

$nparams(U) = \frac{(m-1)m}{2}\\$
$nparams(\Sigma) = m\\$
$nparams(V) = (n-1) + (n-2) + ... + (n-m) = mn - \frac{m(m+1)}{2}$ since only upto $m$ rows of $V$ are free and the rest don't really matter.


$total = \frac{(m-1)m}{2} + m + mn - \frac{m(m+1)}{2} = mn$

For truncated SVD or rank $k$, we have $A = U \Sigma V^T$ where only the first $k$ rows of $U$, first $k$ diagonal entries of $\Sigma$ and first $k$ columns of $V$ are free parameters.

$nparams(U) = (m-1) + (m-2) + ... + (m-k) = km - \frac{k(k+1)}{2}\\$
$nparams(\Sigma) = k\\$
$nparams(V) = (n-1) + (n-2) + ... + (n-k) = kn - \frac{k(k+1)}{2}\\$

$$
total = km - \frac{k(k+1)}{2} + k +  kn - \frac{k(k+1)}{2} \\ 
= k(m+n) +k - k(k+1) = k(m+n) + k - k^2 -k \\ \; \\
= k(m+n) - k^2
$$





