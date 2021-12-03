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

Properties of orthogonal(Q)/unitary(U) matrix

$$
	\color{brown} U^T U = I \color{black} \; (by \; def.) \\
	\implies  U^T (U^T U) = U^T I = U^T \\
	\implies U^T (U^T U) U = U^T U \\
	\implies U I U^T = U^T U = I \\
	\implies \color{brown}U U^T = I
$$

An orthonormal/unitary matrix is an isometry, i.e it conserves lengths when applied any vector.
Let $y = Ux$
$$
	|y|^2 = y^T y = (Ux)^T (Ux) - x^T U^T U x =  x^T (U^TU) x = x^T I x = x^x = |x|^2 
	\\ \; \\
	
	\implies |y| = |x| \;\;\; _\blacksquare	  
$$

The eigenvalues of a orthonormal/unitary matrix are always of magnitude 1, i.e lie on the unit circle in the Argand plane. Let $(\lambda , x )$ be an eigenvalue,eigenvector pair of the orthonormal/unitary matrix Q/U.

So we have  $Ux = \lambda x = y$

We know that $|y|=|x|$. So,
$$
	| y |^2 = | x |^2 \\ 
	\implies | \lambda x |^2 = |x|^2 \\
	\implies |\lambda|^2 |x|^2 = |x|^2 \\
	\implies ( |\lambda|^2 - 1 ) |x|^2 = 0 \\\;\\
	\implies   |\lambda|^2 - 1 = \frac{0}{|x|^2} = 0 \; \color{green} \\

	\because \; x \neq 0 \; as \; x \; is \; eigenvector \color{black} \\\;\\

	\implies |\lambda|^2 = 1 \\\;\\
	
	\implies |\lambda| = 1 \;\;\; _\blacksquare	
	
$$
 

Other useful facts - 

$$
	e^{\alpha}  e^{\beta} = e^{\alpha + \beta} \; if \; \alpha \; and \; \beta \; commute. 
$$

Let $( \color{darkred} \lambda,x \color{black})$ be the eigenvalue and eigenvector pair of a matrix $M$. Then $(\color{darkred} \lambda^t, x) \color{black}$ is an eigenvector, eigenvalue pair for the matrix $M^t$.

$$
	M^tx  = M^{t-1}Mx = M^{t-1}\lambda x =  \lambda M^{t-1}x = \lambda^2 M^{t-2}x = ... = \lambda^t x
$$

**Lemma 1:** The exponent of a skew symmetric matrix A is an orthonormal matrix.

**Proof:** To show that any matrix Q is orthonormal, we need to show $Q^T Q = I = Q Q^T$ i.e $Q^{-1} = Q^T$.

$$
	\color{green} (e^A)^T (e^A) \color{black} = e^{A^T} (e^A) = e^{-A}(e^A) = e^{-A + A} = e^0 = \color{green}I \\\;\\
	\implies (e^A)^T (e^A) = I \\\;\\
	
	\implies e^A \; is \; orthonormal \;\;\; _\blacksquare 
$$

**Lemma 2:** Let $f = a_0 + a_1 x + a_2 x^2 + ...$ be a polynomial. If $( \color{darkred} \lambda,x \color{black})$ is an eigenvalue,eigenvector pair of a matrix M, then $( \color{darkred} f(\lambda),x  \color{black})$ is an eigenvalue of $f(M)$

**Proof:**
$$
	\color{green} f(M) x \color{black} = (a_0 I + a_1 M + a_2 M^2 + ...) x \\
	= a_0 I x+ a_1 M x + a_2 M^2 x + ... \\
	= a_0 x + a_1 \lambda x + a_2 \lambda^2 x + ... \\
	= (a_0  + a_1 \lambda + a_2 \lambda^2 + ...) x \\
	= \color{green} f(\lambda) x \color{black}  
$$

**Lemma 3:** Let $(\lambda, x)$ be eigenvalue, eigenvector pair for a matrix $M$. Then $(e^{\lambda}, x)$ is a eigenvalue, eigenvector pair for the matrix $e^M$.

**Proof:** 
$$
	e^z = 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + ... = f_e(z) \; is \; a \; polynomial.

	\\\;\\

	So,\;  f_e(M) x = f_e (\lambda) x \; \color{green} (by \;Lemma 2) \color{black} \\\;\\
	e^M x = e^{\lambda} x \;\;\; _\blacksquare 
$$	

**We will first show that if the skew symmetric matrix is diagonalizable, then its eigenvalues are all purely imaginary.**

If A is diagonalizable, $A = PDP^{-1}$ where D is diagonal with the eigenvalues on the diagonal.

Proof - 
$$
	
$$



