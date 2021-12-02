---
themes: ["colorful"]
---

# MATH574 : Homework-3
<p style="text-align:center; color:#7A306C"> <b>1st November, 2021</b> </p>
<p style='text-align:center;color:green'><b>
Notes from MATH574: Applied Matrix Analysis (Prof. Robert Guralnick).</b></p>

---

Q5.
![](q5.png)

Properties of a Skew Symmetric Matrix A of shape n x n - 

$$
	A + A^T = 0 \; (by \; definition.) \; - eq(1)
$$

$$
	det(A) = 0 \iff n = odd
	\\\;\\
	proof - 
	\\
	det(A^T) = det(A) \; (property \; of \; det)\\
	\implies det(-A) = det(A) \\
	\implies (-1)^n det(A) = det(A) \; (\because det(kA) = k^n det(A)) \\
	\implies - det(A) = det(A) \\
	\implies det(A) = 0
$$

Other useful facts for any matrix B - 

$$
	e^B = I + B + \frac{B^2}{2!} + \frac{B^3}{3!} + . . . = \sum_{i=0}^{\infty} \frac{B^n}{n!}
$$

$$

	(e^B)^T = I + B^T + \frac{(B^T)^2}{2!} + \frac{(B^T)^3}{3!} + . . . = \sum_{i=0}^{\infty} \frac{(B^T)^n}{n!}  = e^{B^T} \\

	\implies \color{blue} (e^B)^T = e^{B^T} \; \color{black} - eq(2)
$$


**Lemma 1:** *The exponent of a skew symmetric matrix A is an orthonormal matrix.*

**Proof:** To show that any matrix Q is orthonormal, we need to show $Q^T Q = I = Q Q^T$ i.e $Q^{-1} = Q^T$.
