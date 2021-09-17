---
themes: ["colorful"]
---

# Some results on optimising convex functions under simple constraints
<p style="text-align:center; color:#7A306C"> <b>16th September, 2021</b> </p>
<p style='text-align:center;color:green'><b>
Notes from talk at CS Theory Lunch by Prof. David. M. Kempe on his new paper
</b></p>

---

### Problem-1
Minimize $\color{blue}f(x,y) = x^2 + y^2$ under the constraint $\color{darkgreen}x+y=c$.
### Solution
$$
x+y=c \;
\implies \partial{x} + \partial{y} = 0  \;
\implies \frac{\partial{x}}{\partial{y}} = -1 \;

\\\;\\

\\
\frac{\partial{f(x,y)}}{\partial{x}} = 2x +  2y.\frac{\partial{y}}{\partial{y}} = 0
\implies 2x - 2y = 0 \implies x = y \;

\\\;\\

\therefore \; \underset{x,y}{argmin}\;f(x,y) = (c/2,c/2)  

$$
$$

f_{xx} = 2,\; f_{xy} = 0 = f_{yx} \; f_{yy} = 2

\\\;\\

H_f = \begin{vmatrix}
   f_{xx} & f_{xy} \\
   f_{yx} & f_{yy}
\end{vmatrix}

=\begin{vmatrix}
   2 & 0 \\
   0 & 2
\end{vmatrix} = 2\mathbb{I}

\; \forall \; (x,y)
\\\;\\

\vec{v} := [x \; y]^T \\
\vec{v}^T * H_f * \vec{v} = 2 \vec{v}^T*\vec{v} = |\vec{v}|^2 \geq 0

$$

Since the Hessian matrix is positive semi-definite for all (x,y), 
the function is convex and hence a critical point can only be a 
minimum since the Hessian evaluated at the critical point $H_{f}(c/2,c/2)$ will also
be positive. Hence the **minimum is obtained when x and y are equal**.

 
### Problem-2
Minimize $\color{blue} f(x,y) = h(x) + h(y)$ subject to the constraint $\color{darkgreen}x+y=k$ if given 
that $h: \mathbb{R}\rightarrow\mathbb{R}$ is convex.

### Solution

Since $h$ is convex, hence 
$$
\begin{aligned}
h''(x) > 0 \; \forall\; x\in\mathbb{R}, \; 

or\; equivalently,
\\
 
a < b \iff h(a) < h(b) \; \forall \; a,b \in \mathbb{R}
\end{aligned} \;\\

$$

> So $h'$ is monotonically increasing and hence is one-one.
> Hence $ \color{yellow} h'(u)=h'(v) \iff u=v  \;\;\;\;\; eq0 $


Define $ \color{brown} g(x,y) = x + y - c$. \
Now our constraint is $\color{brown} g(x,y) = 0 \;\;\;\;\;\; eq1 $

![lagrange multiplier](https://www.pnas.org/content/pnas/early/2020/10/09/2015192117/F6.large.jpg?width=800&height=600&carousel=1)
*lagrange multiplier intuition*

The gradients of $f(x,y)$ and $g(x,y)$ are parallel at the critical points.

$$
  \exists \alpha \in \mathbb{R} ;  \nabla f(x,y) = \alpha \nabla g(x,y) \\
  \implies \nabla f(x,y) - \alpha \nabla g(x,y) \\
  let \; \lambda := -\alpha \\

  \implies \nabla f(x,y) + \lambda \nabla g(x,y) = \vec{0} 

  \\\;\\

  \implies  \nabla ( f + \lambda g ) = \vec{0}  \\
  \implies \color{turquoise} f_x + \lambda g_x = 0 \; , \; f_y + \lambda g_y = 0 \;\;\;\;\; eq2
$$

To find the optimum $(x_0,y_0)$, we need to find 
three unknowns - $x_0$, $y_0$ and $\lambda$.

We have three equations, 1 from $\color{brown}eq1$ and 2 from $\color{turquoise}eq2$. 

$$
\begin{aligned}
	 let\; p(x,y) := f + \lambda g = f(x,y) + \lambda g(x,y)\\
	 	= h(x)+h(y)+\lambda(x+y) \\
	 	= {h(x)+\lambda x} + {h(y)+\lambda y} 
	 	\\\;\\

	 	\implies \nabla p = [p_x,\;\; p_y] = [h'(x)+\lambda \;\; ,\;\;h'(y)+\lambda]
	 	
	  
\end{aligned}
$$

So, we have from $\color{turquoise}eq2$
$$	 

\begin{aligned}
	\nabla p =  \nabla (f+\lambda g) = \vec{0} \\
	\implies [p_x,\;\;p_y] = \vec{0} \\
	\implies [h'(x)+\lambda, \;\; h'(y)+\lambda] = \vec{0}  = [0,\;\;0]
	\\\;\\
	\therefore h'(x) + \lambda = h'(y) + \lambda \\
	\implies h'(x) = h'(y) \\
	\iff x = y \;\;  \color{yellow}\because eq0
\end{aligned}
$$

Now that we know that $x=y$, we can use $\color{brown}eq1$ to get
$$
	\color{darkgreen} x+y=k \\
	\color{black}
	\implies x+x = y+y = k \\
	\color{purple}
	\implies x = y = k/2
$$

>
> Hence the critical point occurs when $\color{purple}x=y=\frac{k}{2}$. 
>

To find if the critical point is minimum or maximum, we can check its
Hessian matrix.


### Problem-3 (Multivariable extension of Problem-2)

If $\vec{x}=[x_1,\;x_2,\;,x_3,\;....\;x_n]$,
 then minimize $\color{blue}f(\vec{x}) = \sum_{i}^{n}{h(x_i)}$ 
 where $g: \mathbb{R}\rightarrow\mathbb{R}$
is convex and subject to the constraint $\color{darkgreen}\sum_{i}^{n}{x_i} = k$.


