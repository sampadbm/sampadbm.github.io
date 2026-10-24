---
date: 2026-10-24
title: Courses Worth Revisiting
tags: [reference, courses, lecture-notes]
summary: Outlines of courses from other universities whose public lecture notes and slides are worth coming back to.
---

## BYU Math 346 — Lennard Bakker (Winter 2020)

[Course page](http://uamte.math.byu.edu/~bakker/Math346/) · [Lecture notes index](http://uamte.math.byu.edu/~bakker/Math346/M346LecNotes.html) · [Beamer slides (Lec 28–38)](http://uamte.math.byu.edu/~bakker/Math346/BeamerSlides/)

Second semester of BYU's applied-math core, taught by Lennard Bakker. It runs from calculus on Banach spaces through Lebesgue integration and complex analysis, and ends with a spectral theory of matrices built from the resolvent and contour integrals. The section numbering appears to follow Humpherys, Jarvis & Evans, *Foundations of Applied Mathematics, Volume 1*. Each section has a PDF of lecture notes; Chapters 11–12 also have Beamer slides, plain and annotated. The final chapter is the standout: it derives Jordan structure, Cayley–Hamilton, the spectral mapping theorem, Perron–Frobenius, and the Drazin inverse from one idea, integrating the resolvent $(zI - A)^{-1}$ around the eigenvalues. My write-up of §12.7 is [The Spectral Mapping Theorem](post.html?file=posts/math/linear-algebra/spectral-mapping-theorem.md).

### Ch. 6 — Differentiation

- **6.1 The Directional Derivative**: tangent vectors, directional derivatives, partial derivatives
- **6.2 The Fréchet Derivative in $\mathbb{R}^n$**
- **6.3 The General Fréchet Derivative**: the Fréchet derivative on Banach spaces; derivatives on Cartesian products
- **6.4 Properties of the Derivative**: linearity, the product rule, the chain rule
- **6.5 Mean Value Theorem and FTC**: the mean value theorem; single-variable FTC; integral mean value theorem; change of variable formula
- **6.6 Taylor's Theorem**: higher-order derivatives, higher-order directional derivatives, Taylor's theorem

### Ch. 7 — Contraction Mappings and Applications

- **7.1 Contraction Mapping Principle**
- **7.2 Uniform Contraction Mapping Principle**
- **7.3 Newton's Method**: convergence; scalar version; a quasi-Newton method; vector version
- **7.4 The Implicit and Inverse Function Theorems**
- **7.5 Conditioning**: condition number of a function; condition number of a matrix

### Ch. 8 — Integration

- **8.1 Multivariable Integration**: multivariable step functions; multivariable, Banach-valued integration; integration over subsets of $[a,b]$
- **8.2 Overview of Daniell–Lebesgue Integration**: the problem; a sketch of Daniell–Lebesgue integration
- **8.3 Measure Zero and Measurability**
- **8.4 Monotone Convergence and Integration on Unbounded Domains**: basic integral properties; monotone convergence theorem; unbounded domains
- **8.5 Fatou's Lemma and the Dominated Convergence Theorem**
- **8.6 Fubini's Theorem and Leibniz's Integral Rule**: Fubini; interchanging the order of integration; Leibniz's rule
- **8.7 Change of Variables**: diffeomorphisms; the change of variables theorem; polar, spherical, and hyperspherical coordinates

### Ch. 10 — Calculus on Manifolds

- **10.1 Curves and Arclength**: smooth parameterized curves, equivalent curves, arclength
- **10.2 Line Integrals**: line integrals of functions and of vector fields
- **10.3 Parameterized Manifolds**: parameterizations and equivalent manifolds; tangent spaces and normals
- **10.5 Green's Theorem**: the Jordan curve theorem; Green's theorem

### Ch. 11 — Complex Analysis

- **11.1 Holomorphic Functions**: differentiation on $\mathbb{C}$; the Cauchy–Riemann equations
- **11.2 Properties and Examples**: basic properties; convergent power series are holomorphic (Abel–Weierstrass lemma); Euler's formula
- **11.3 Contour Integrals**: contour integration; the Cauchy–Goursat theorem
- **11.4 Cauchy's Integral Formula**: Gauss's mean value theorem; Riemann's theorem; Cauchy's differentiation formula
- **11.5 Consequences of Cauchy's Integral Formula**: Liouville's theorem; the fundamental theorem of algebra; the maximum modulus principle
- **11.6 Power Series and Laurent Series**: power series; zeros of analytic functions (local isolation of zeros); Laurent expansion
- **11.7 The Residue Theorem**: isolated singularities; residues and winding numbers; the residue theorem

### Ch. 12 — Spectral Calculus

- **12.1 Projections**: projections; invariant subspaces and their projections; eigenprojections for simple operators
- **12.2 Generalized Eigenvectors**: the index of an operator; generalized eigenspaces
- **12.3 The Resolvent**: properties of the resolvent $R_A(z) = (zI - A)^{-1}$; local properties
- **12.4 Spectral Resolution**: spectral projections as contour integrals of the resolvent; the spectral resolution theorem; Cayley–Hamilton as a corollary
- **12.5 Spectral Decomposition I**: Laurent expansion of the resolvent around an eigenvalue
- **12.6 Spectral Decomposition II**: eigennilpotents; the spectral decomposition theorem $A = \sum_\lambda (\lambda P_\lambda + D_\lambda)$; $f(A)$ for holomorphic $f$
- **12.7 Spectral Mapping Theorem**: $\sigma(f(A)) = f(\sigma(A))$; uniqueness of the spectral decomposition; mapping the spectral decomposition; the power method
- **12.8 The Perron–Frobenius Theorem**: Perron's theorem for positive matrices; Perron–Frobenius for nonnegative matrices
- **12.9 The Drazin Inverse**: definition and spectral decomposition
