---
themes: ["muted","colorful"]
category: mathematics
---

# Notes on Linear Algebra

<p style="text-align:center; color:darkred"> <b>17th September, 2022</b> </p>

<p style='text-align:center;color:green'><b> 
Matrix Differentiation
</b></p>


People studying optimization must already be very familiar withe notion of gradients which are derivatives of scalar valued functions with respect to vectors. Although the matrix space is also a vector space, there is additional structure in this matrix vector space that is not present in just a "vector"vector space. In this blog, we focus on differentiations of matrices and their properties with respect to matrices and their properties. The properties are eigenvals, eigenvecs, trace, det, etc. Although, in principle, we could vectorize the matrix (via any consistent vectorization/serialization) and then take the gradient with respect to the vectorized matrix, we will actively try to aviod doing that and alwasy represent the gradients wrt a matrix in the same shape as the matrix. This will preserve important interesting properties of the matrix gradient, if there are any.

### 1. Derivative of the quadratic form

Let $f(X) = u^T X v$. Then what is the derivative $\frac{\parfial f}{\partial X}$ ?


We know that $ u^T X v = \langle X, uvT \rangle$.
Hence, $\frac{\parfial f}{\partial X} = uv^T$.



