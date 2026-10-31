---
date: 2026-10-28
title: "The Basel Problem via Parseval's Identity"
tags: [math, insight, fourier-analysis, hilbert-spaces, series]
summary: Summing 1/n² by applying the Pythagorean theorem in infinite dimensions to f(x) = x.
authors: [sampad]
---

### The Basel Problem: $\sum_{n=1}^{\infty}1/n^2$ via Parseval's Identity

Parseval's identity, the infinite-dimensional analogue of the Pythagorean theorem, states that $\|f\|^2=\sum_n|\langle f,e_n\rangle|^2$ for an orthonormal basis. Consider $f(x)=x$ on $[-\pi,\pi]$, with the normalized sine basis $e_n(x)=\sin(nx)/\sqrt{\pi}$. Its Fourier coefficients, computed by integration by parts, are

$$
\begin{aligned}
\langle f,e_n\rangle
&=\frac{1}{\sqrt{\pi}}\int_{-\pi}^{\pi}x\sin(nx)\,dx\\
&=\frac{1}{\sqrt{\pi}}
\left[-\frac{x\cos(nx)}{n}
+\frac{\sin(nx)}{n^2}\right]_{-\pi}^{\pi}\\
&=\frac{2\sqrt{\pi}(-1)^{n+1}}{n}.
\end{aligned}
$$

Consequently, $|\langle f,e_n\rangle|^2=4\pi/n^2$. Since $\|f\|^2=\int_{-\pi}^{\pi}x^2\,dx=2\pi^3/3$, Parseval yields

$$
\frac{2\pi^3}{3}=4\pi\sum_{n=1}^{\infty}\frac{1}{n^2}
\quad\Longrightarrow\quad
\boxed{\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}}.
$$

Thus, the famous Basel sum follows directly from the orthogonality of Fourier modes.
