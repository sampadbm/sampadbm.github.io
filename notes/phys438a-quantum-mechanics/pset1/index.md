q---
themes: ["colorful"]
category: courses

---

<p style="text-align:center; color:#7A306C"> <b>PSET 1 Solutions</b> </p>

<p style='text-align:center;color:green'><b> 
18th January, 2025
</b></p>

---

![pset1](pset1.png)
*[questions pdf](pset1.pdf)*

---

### 1.

$$
z = \frac{4}{2 + 3i}
  = \frac{4}{2 + 3i} \cdot \frac{2 - 3i}{2 - 3i}
  = \frac{8 - 12i}{2^2 + 3^2} = \frac{8 - 12i}{4 + 9}
  = \frac{8 - 12i}{13}
$$

Hence the conjugate is,

$\bar z = \frac{1}{13} \cdot (8 + 12i)$

and mod square is,

$$
|z|^2 = \frac{|8 - 12i|^2}{13^2} = \frac{64 + 144}{169} = \frac{208}{169} 
$$

Note that we could have also gotten this directly as follows,

$$
|z|^2 = \frac{4^2}{|2 + 3i|^2} = \frac{16}{4 + 9} = \frac{16}{13}
$$

Real and imaginary parts are, 

$$
Re(z) = \frac{8}{13} \;\;,\;\; Im(z) = -\frac{12i}{13}
$$

### 2.

We are identifying  complex numbers $\mathbb{C}$ in the Argand plane with vectors in $\mathbb{R}^2$. More precisely this means that there exits an isomorphism between the two set of objects. 

Let the isomorphism be defined as $f(z) = \begin{bmatrix} Re(z) \\ Im(z) \end{bmatrix}$

We want to show that the operation of multiplying $e^{i\theta}$ on $Z$ corresponds to the operation of multiplying the rotation matrix $R(\theta) = \begin{bmatrix} cos\theta & -sin\theta \\ sin\theta & cos\theta \end{bmatrix}$.

Category theoritical  diagram

![diag](pset1.png)

We want to show - 

$$
f(e^{i \theta} \cdot z) = R(\theta) \cdot f(z)
$$

Proof:

Let $\mathbb{C} \ni z = Ae^{i \alpha} = Acos\alpha + iAsin\alpha$

Then,

$$
LHS = f(e^{i \theta} \cdot A e^{i \alpha}) = f(A e^{i(\alpha + \theta)}) 
= A\begin{bmatrix} cos(\alpha + \theta) \\ sin(\alpha + \theta)\end{bmatrix}
$$

$$
RHS 
= \begin{bmatrix} cos\theta & -sin\theta \\ sin\theta & cos\theta\end{bmatrix} \cdot
f(Ae^{i\alpha})
= \begin{bmatrix} cos\theta & -sin\theta \\ sin\theta & cos\theta\end{bmatrix} \cdot
\begin{bmatrix} Acos\alpha \\ Asin\alpha\end{bmatrix} \\\;\\
= A \begin{bmatrix} cos\theta & -sin\theta \\ sin\theta & cos\theta\end{bmatrix} \cdot
\begin{bmatrix} cos\alpha \\ sin\alpha\end{bmatrix} \\\;\\
= A \begin{bmatrix} cos\theta cos\alpha - sin\theta sin\alpha \\
 sin\theta cos\alpha + cos\theta sin\alpha \end{bmatrix} \\\;\\

= A \begin{bmatrix} cos(\alpha + \theta) \\ sin(\alpha + \theta)\end{bmatrix} \\\;\\
= LHS \;\;\; {\blacksquare}
$$

### 3.

We roll a six sided die. 

Let $X_1, X_2$ be the random variables associated with the two rolls of the die respectively. We note that $X_1,X_2$ are indepentent random variables.

#### 3a.

The expected value ot the sum of two consecutive rolls.



Let $X = X_1 + X_2$ be the random variable of our interest. 

$$

E[X] = E[X_1 + X_2] = E[X_1] + E[X_2] = 2 E[X_1] \;\;\; \because X_1,X_2 \text{ are identically distributed} \\

E[X_1] = (1 + 2 + 3 + 4 + 5 + 6)/6 = \frac{6 \cdot 7}{2 \cdot 6} = 3.5 \\

\therefore E[X] = 2 * E[X_1] = 2 * 3.5 = 7
$$



#### 3.b

Expected value of a single roll is $E[X_1] = 3.5$ as seen in part **a** above.



#### 3.c

We are looking for $E[X_1X_2]$ and since they are independent, 

$E[X_1 X_2] = E[X_1]E[X_2] = \frac{7}{2} \cdot \frac{7}{2} = \frac{49}{4}$



### 4.
