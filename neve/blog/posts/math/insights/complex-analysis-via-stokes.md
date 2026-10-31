---
date: 2026-10-28
title: "Complex Analysis via Multivariate Calculus"
tags: [math, insight, complex-analysis, differential-forms, topology]
summary: Cauchy's theorem and the residue theorem as Stokes' theorem, with singularities detected by closed but non-exact forms.
authors: [sampad]
---

### Complex Analysis via Multivariate Calculus

The connection between conservative vector fields and the residue theorem is an instance of the same **local-to-global principle**: a differential form can have zero exterior derivative wherever it is defined, yet its integral around a closed loop can detect a hole or a singularity.

### From Stokes to Cauchy's theorem

The generalized Stokes theorem states

$$
\int_{\partial D}\omega=\int_D d\omega.
$$

For a complex-valued 1-form $\omega=f(z)\,dz$, we have

$$
d(f(z)\,dz)=\frac{\partial f}{\partial\bar z}\,d\bar z\wedge dz.
$$

If $f$ is holomorphic, the Cauchy–Riemann equations give $\partial f/\partial\bar z=0$. Thus, when $f$ is holomorphic on a neighborhood of $D$ and its boundary,

$$
\boxed{\oint_{\partial D}f(z)\,dz=0.}
$$

This is Cauchy's theorem arising from Stokes (in the smooth setting). Green's theorem is the two-dimensional version of this same argument.

### Why residues appear

If $f$ has isolated poles $a_1,\ldots,a_m$ inside $D$, Stokes cannot be applied across them. Instead, remove small disks around the poles. The new region has an outer boundary and negatively oriented inner boundaries. Since $d(f\,dz)=0$ away from the poles,

$$
\oint_{\partial D} f(z)\,dz
=\sum_{k=1}^{m}\oint_{|z-a_k|=\varepsilon}f(z)\,dz
=2\pi i\sum_{k=1}^{m}\operatorname{Res}(f,a_k),
$$

where the small circles are traversed counterclockwise and are chosen sufficiently small. The last equality comes from the coefficient of $(z-a_k)^{-1}$ in each Laurent expansion. **The residue theorem is Stokes' theorem applied away from singularities, together with a local calculation around each singularity.**

For the simplest example, $f(z)=1/z$,

$$
\operatorname{Im}\!\left(\frac{dz}{z}\right)
=\frac{-y\,dx+x\,dy}{x^2+y^2}.
$$

This is the circulation 1-form of a curl-free vector field on $\mathbb R^2\setminus\{0\}$, but its integral around the unit circle is $2\pi$. It is **closed but not globally exact**: locally it is $d\arg z$, while a single-valued global argument does not exist on the punctured plane. This is why zero curl need not mean conservative on a domain with holes. The residue and the winding number quantify the obstruction.

### Where to read the connection

1. **Tristan Needham, [*Visual Complex Analysis*](https://academic.oup.com/book/52945)** — **Chapter 7**, *Winding Numbers and Topology*, explains the role of winding; **Chapter 8**, *Complex Integration: Cauchy's Theorem*, develops contour integration; **Chapter 9**, *Cauchy's Formula and Its Applications*, includes the calculus of residues; **Chapters 10–11**, *Vector Fields: Physics and Topology* and *Vector Fields and Complex Integration*, make the circulation/complex-integration connection especially visual. **Best for geometric intuition.**

2. **Tristan Needham, [*Visual Differential Geometry and Forms*](https://doi.org/10.2307/j.ctv1cmsmx5)** — In **Act V**, start with **§32.6** (*The Gradient as a 1-Form*), then **§36.4** (*Closed and Exact Forms*, including **§36.4.3** on the Cauchy–Riemann equations). **§37.3** develops generalized Stokes, **§37.7** applies it to Cauchy's theorem, **§37.8** discusses the Poincaré lemma, and **§37.9** introduces de Rham cohomology and circulation around holes. **Best for seeing how differential forms unify the ideas.**

3. **Serge Lang, [*Fundamentals of Differential Geometry*](https://link.springer.com/book/10.1007/978-1-4612-0541-8)** — **Chapter XVII**, *Stokes' Theorem* (pp. 475–488), establishes the general theorem; **Chapter XVIII**, *Applications of Stokes' Theorem*, contains **§5, Cauchy's Theorem** (p. 503), and **§6, The Residue Theorem** (p. 507). **Best for a rigorous derivation directly from Stokes.**

4. **[*Complex Analysis and Riemann Surfaces: A Graduate Path to Algebraic Geometry*](https://arxiv.org/pdf/2601.06868)** (free notes) — **§1.10** covers poles and the residue theorem; **§3.3–3.4** reformulate complex line integrals using differential forms and Stokes; especially **§3.4.3**, *Deriving the Cauchy–Green Formula from Stokes' Theorem*. **§3.6** takes the connection toward de Rham cohomology and periods. **Best for a free, computation-first bridge.**

The unifying language is **de Rham cohomology**: exact forms have zero integrals around closed loops; closed forms may have nonzero periods that reveal the topology of the domain. In complex analysis, residues are a particularly concrete way those periods arise.
