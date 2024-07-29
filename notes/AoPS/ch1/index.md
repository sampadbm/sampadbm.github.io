---
themes: ["muted"]
category: AoPS
---


# Problems


### 1

$$
 \log_5 \frac{125 \cdot 625}{25} = \log {125 \cdot 25} = \log 125 + \log 25 = \log_5 5^3 + \log_5 5^2
\\
= 3 + 2 = 5
$$


### 2

$$
	\log_3 27 \sqrt[4]9 \sqrt[3]9  = \log 3^3 + \log 3^{2/4} \log 3^{2/3} 
	= 3 + 1/2 + 2/3 = 4\frac{1}{6}
$$

### 3 
$$ 
\sqrt 2 + \frac{1}{2 + \sqrt 2} + \frac{1}{\sqrt 2 - 2} = 
\sqrt 2 + \frac{2 - \sqrt 2}{4 - 2} + \frac{\sqrt 2 + 2}{2 - 4} \\
= \sqrt 2 + 1 - \frac{\sqrt 2}{2} - \frac{\sqrt 2}{2} - 1 \\
= \sqrt 2 + 1 - \sqrt 2 - 1 = 0
$$ 

### 4
$$
 (-3)^{-2} + (-2)^{-1} + (-1)^0 + 0^1 + 1^2 + 2^3 + 3^4\\
= \frac{1}{9} - \frac{1}{2} + 1 + 0 + 1 + 8 + 81 = 91\frac{1}{9} - \frac{1}{2}
$$

### 5
$$
	81^{-(2)^{-2}} = 81^{-\frac{1}{4}} = (3^4)^{-\frac{1}{4}} = 3^{-1} = \frac{1}{3}
$$

### 6
$$
	\frac{1}{2}^{-1/2} + \frac{3}{2}^{-3/2} + \frac{5}{2}^{-5/2} = \sqrt 2 + \frac{2\sqrt 2}{3\sqrt 3} + \frac{4\sqrt 2}{25\sqrt 5} \\
	= \sqrt{2} + \frac{2\sqrt 6}{9} + \frac{4\sqrt 10}{125}
$$

### 7

$$
\frac{\sqrt 2}{\sqrt 2 + \sqrt 3 - \sqrt 5} = \frac{\sqrt 2 \cdot (\sqrt 2 + \sqrt 3 + \sqrt 5)}{2 + 3 + 3\sqrt6 - 5} \\\;\\ = \frac{\sqrt 2 \cdot (\sqrt 2 + \sqrt 3 + \sqrt 5)}{3\sqrt6} \cdot \frac{\sqrt3}{\sqrt3} = \frac{\sqrt 3 \cdot (\sqrt 2 + \sqrt 3 + \sqrt 5)}{9} 
$$

### 8

$$
 \log_{\sqrt 3}{\sqrt[3]9} = \log_{3^{1/2}} 3^{2/3} = \log_{3^{1/2}} {(3^{1/2})}^{4/3} = 4/3
$$

### 9
$$
\sqrt{1 + \sqrt{2 + \sqrt{n}}} = 2 \implies 2 + \sqrt n = 3^2 = 9 \\
\implies \sqrt n = 7 \implies n = 49
$$

### 10
$$
	2^{16^x} = 16^{2^x} \\
	 \implies 2^{2^{4x}} = 2^{4 \cdot 2^x} \\
	 \implies 2^{4x} = 4 \cdot 2^x \\
	 \implies 2^{4x} = 2^{2+x} \\
	 \implies 4x = 2 + x \\
	 \implies x = 2/3
$$

### 11
$$
	\log_{2x} 216 = x  \\
	\implies 216 = (2x)^x \\ 
	\implies 27*8 = 2^x x^x \\
	\implies 3^3 2^3 = 2^x x^x \\
	\implies x = 3\text{ is atleast one solution where it is an integer}
$$

### 12 Find the value of $AB$ if

$$
	\log_AB = \log_BA \text{ where } A,B \neq 1 , A \neq B
$$

Remark - 
$$
	log_xy = t \implies y = x^t \\
	\implies y^{1/t} = x \\
	 \implies \log_yx = 1/t \\\;\\
	 \implies \log_yx = 1/\log_xy
$$

Hence - 
$$
	\log_AB = \log_BA \\ 
	\implies \log_AB = 1 / \log_AB \\
	\implies (\log_AB) ^ 2 = 1 \\
	\implies \log_AB = \pm 1 \\
	\implies B = A^{\pm 1} \\
	\implies B = \frac{1}{A} \text{ or } A
$$

But since it is given that $A \neq B$, we are left with $B = \frac{1}{A} \implies AB = 1$

Alternatively, we can solve without the above remark.

Let $AB = k$, then $\log_AB = \log_BA$
 
$$
\implies \log_A\frac{k}{A} = \log_{\frac{k}{A}}{A} \\
\implies \log_Ak - \log_AA = \log_{\frac{k}{A}}A \\
\implies \log_Ak - 1 = \log_{\frac{k}{A}}A \\
\implies \log_Ak = \log_{\frac{k}{A}}A + 1 = \log_{\frac{k}{A}}A + \log_{\frac{k}{A}}\frac{k}{A} \\
\implies \log_Ak = log_{\frac{k}{A}}{A \cdot \frac{k}{A}} = \log_{\frac{k}{A}}k \\\;\\
\implies \log_Ak  = \log_{\frac{k}{A}}k = t \text{, say} \\
\implies k = A^t = (\frac{k}{A})^t \\
\implies A^t = \frac{k^t}{A^t} \\ \; \\
\implies k^t = A^{2t} = (A^2)^t \\
\implies k^t - (A^2)^t = 0
$$

The above can happen if $k = A^2$ or it $t = 0$. 

If $k=A^2$, then $AB = k = A^2 \implies AB - A^2 = 0 \implies A(B-A)=0 \implies A=B \text{ or } A=0$. But question says $A \neq B$ and if $A=0$, then $\log_AB$ is not defined. Hence $k$ cannot equal $A^2$.

Hence $t=0 \implies \log_Ak = \log_{\frac{k}{A}}k=0 \implies k = 1 \implies AB=1$

Hence $AB=1$

### 13

$N = 8.10^8.x^{-3/2} = 800$
$$
	\implies x^{-3/2} = 10^{-6} \\
	\implies x = (10^{-6})^{\frac{-2}{3}} = 10^{-6 \times \frac{-2}{3}} = 10^4
$$

Hence the minimum income of the wealthiest 800 individual is atleast 10,000 dollars. 


### 14

$$
	a^x = c^q \implies a = c^{q/x} \\	
$$

$$
	c^y = a^z \implies c^y = (c^{q/x})^z \implies c=0,1 \text{ or } y = qz/x 
$$

But if $c=0$, then $a=0$ and the question says that $a \neq c$.


If $c=1$,  $x=0$
If $a=1$,  $y=0$
But the above two imply that $0 = xy = qz = 0$.

Hence $y = qz/x \text{ or } xy = qz$.


### 15

$$
	3^a > 2^{102} \\
	\implies a > 102 \log_32 \\
	\implies a > 102 * 0.631 = 63.100 + 1.262 = 64.362 \\
	\implies a > 64.362
$$

If $a$ has to be an integer, it has to be atleast 65.

### 16

Let $x=\log_6 2$ and $y=\log_6 3$
$$
	2 = 6^x, 3 = 6^y \\
	\implies 2 \times 3 = 6^x \times 6^y \\
	\implies 6 = 6^{x+y} \\
	\implies x+y = 1 \\
	\implies log_6 2 + \log_6 3 = 1
$$
