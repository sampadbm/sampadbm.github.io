---
themes: ["muted","colorful"]
category: mathematics
---

# Notes on Linear Algebra

<p style="text-align:center; color:darkred"> <b>19th December, 2021</b> </p>

<p style='text-align:center;color:green'><b> 
Interesting results in Linear Algebra
</b></p>

---
### Equivalent Matrices
$\\ \; \\$
##### <p style="color:darkgreen">Geometric Interpretation:</p>
<p style="color:darkgreen">
Equivalent matrices represent the same physical linear transformation when we choose different bases for the input and output spaces. Given a base $B_{1E}$ for the input space $E$ and a base $B_{1F}$ for output space $F$, a matrix $M_1$ represents the linear transformation $L(E,F)$. Given different bases $B_{2E}$ and $B_{2F}$, the matrix $M_2$ representing the same linear transform $L(E,F)$ is equivalent to $M_1$.
</p>
$$
	\color{darkgreen}{B = Q^{-1} A P}
$$

<p style="color:darkgreen">
Where $A$ is equivalent to $B$ and $P,Q$ are change of basis matrices for the input and output spaces $E$ and $F$ respectively.
</p>

<p style="color:darkgreen">
 Similar matrices are a special case of equivalent matrices when the input and output spaces are the same, i.e E=F in $L(E,F)$ making $L(E,F)$ an <u>endomorphism</u> and $B_{1E} = B_{1E} = B_1$ and $B_{2E} = B_{2F} = B_2$.
</p> 
$$
	\color{darkgreen}{B = P^{-1}AP}
$$
<p style="color:darkgreen">
Where $P$ is the change of basis matrix on the input=output space $E=F$.
</p>
$\\ \; \\$

- Matrices that can be reached from one another using elementary row operations (EROs) are called equivalent matrices.
- For example, all the matrices that are formed along gaussian elimination to get Row Echelon Form (REF) or the Reduced Row Echelon Form (RREF) are equivalent to the original matrix and to each other including the REF and RREF.
- Equivalent matrices form an equivalence class and these equivalence classes partition the space of all matrices.
- Nullspace of the equivalent matrices are the same i.e nullspace is an invariant of the equivalence class i.e all the matrices belonging to the same equivalence class have the same nullspace. This point is related to the gaussian elimination and as to why we can extract the solution (nullspace) of the original equations(matrix) from the REF or RREF form. This also tells us that nullspace of a matrix is invariant under EROs. 


###  Matrix representation of the linear transform captured in a Matrix Matrix Multiplication

Let us define an operator $L_{A}$ as given by $Y = L_A(X) = AX$  where $A \in \mathbb{R}^{m \times n}$ is a matrix. The operator $L_A$ acts on the input matrix $X$ to produce the matrix $Y$.

Now, is the operator $L_A$ linear? If so, can we find a matrix representation of the operator? 
Note that every linear operator can be represented as a matrix such that the application of the operator on an input is same as its matrix representation multiplied by the vector representation of the input.

Let us first find out if the operator $L_A$ is linear. 

$$
	 L_A(X_1 + X_2) = A(X_1 + X_2) = AX_1 + AX_2 
	 \\ = L_A(X_1) + L_A(X_2) \;\;\; \color{green} \rightarrow eq.1 
 $$
$$
	L_A(\alpha X) = A(\alpha X) = \alpha AX 
	\\ = \alpha L_A(X) \;\;\; \color{green} \rightarrow eq.2
$$

From $eq.1$ and $eq.2$, we get that $L_A$ is a linear transform.

Now we want to represent $L_A$ in terms of a matrix. Let the representation be called $\phi_{L_A}$ and the vector representation of te input $X$ be $vec(X)$ (we have no idea so far what this vector representation is exactly but we know that it somehow encodes all the information that is in X and is a column vector).

By convention, the matrix representation of a linear operator can be **right** multiplied by the vector representation of the input to get the vector representation of the output obtained when the operator is applied to the input. Symbolically it means - 
$$
		vec(Y) = \phi_{L_A} \; vec(X) \;\;\; \color{green} \rightarrow eq.3
$$ 

Now we need to figure out how to construct the vector representations of $X$ and $Y$ and the matrix representation of $\phi_{L_A}$ so that we are self consistent and are consistent with the above definition in $eq.3$ 

Let us inspect the input matrix $X$. Since $A$ has shape $m \times n$, $X$ must have a shape $n \times p$. Clearly $X$ has dimension $np$ and if we could take a guess, we can construct a standard basis for $X$ using the $0-1$ matrices $E_{ij} = \vec{c_i}  \; \vec{r_j}^T$ where $\vec{c_i}$ and $\vec{r_j}$ are column and row vectors fo shapes $n$ and $p$ respectively with their $i^{th}$ and $j^{th}$ entry $1$ and all other entries $0$.

We will consider a small example to help us in our constructions and then later the generalizations. Let $A$ be in $\mathbb{R}^{4 \times 3}$.
$$
	A = \begin{bmatrix}
		a_{1,1} & a_{1,2} & a_{1,3} \\
		a_{2,1} & a_{2,2} & a_{2,3} \\
		a_{3,1} & a_{3,2} & a_{3,3} \\
		a_{4,1} & a_{4,2} & a_{4,3} \\
	\end{bmatrix}
	= \begin{bmatrix}
	\; a_1 & | & a_2 & | & a_3
	\end{bmatrix}
$$

where $a_i, \; i = \{ 1,2,3\}$ are the column vectors, each of size $4$.


 Let $X$ be in $\mathbb{R}^{3 \times 2}$. The standard basis for $X$ are $E_{ij} \; \forall  \; i \in \{ 1,2,3\} \; ,  \; j \in \{ 1, 2\}$. 

$$
    E_{1,1}  = \begin{bmatrix} 
	1 & 0 \\
	0 & 0 \\
	0 & 0 
	\end{bmatrix},
	E_{1,2}  = \begin{bmatrix}  
	0 & 1 \\
	0 & 0 \\
	0 & 0 
	\end{bmatrix}, \\ \; \\
	E_{2,1}  = \begin{bmatrix} 
	0 & 0 \\
	1 & 0 \\
	0 & 0 
	\end{bmatrix},
	E_{2,2}  = \begin{bmatrix} 
	0 & 0 \\
	0 & 1 \\
	0 & 0 
	\end{bmatrix}, \\ \; \\
	E_{3,1}  = \begin{bmatrix} 
	0 & 0 \\
	0 & 0 \\
	1 & 0 
	\end{bmatrix},
	E_{3,2}  = \begin{bmatrix} 
	0 & 0 \\
	0 & 0 \\
	0 & 1 
	\end{bmatrix}
$$

Now, let us try to see what the outputs are as we feed the elements of the standard basis as the input to the linear operator $L_A$. 

$$
	L_A( E_{1,1} ) = \begin{bmatrix} 
	\; a_1 & | & 0 \;
	\end{bmatrix}, \;
	L_A( E_{1,2} ) = \begin{bmatrix} 
	\; 0 & | & a_1 \;
	\end{bmatrix} \\ \; \\ 
	L_A( E_{2,1} ) = \begin{bmatrix} 
	\; a_2 & | & 0 \;
	\end{bmatrix}, \;
	L_A( E_{2,2} ) = \begin{bmatrix} 
	\; 0 & | & a_2 \;
	\end{bmatrix} \\ \; \\ 
	L_A( E_{3,1} ) = \begin{bmatrix} 
	\; a_3 & | & 0 \;
	\end{bmatrix}, \;
	L_A( E_{3,2} ) = \begin{bmatrix} 
	\; 0 & | & a_3 \;
	\end{bmatrix}
$$ 

At the same time, let us define a vector representation of the input $X$. Let us define the vectorization of $X$ as a vector whose entries are formed by stacking the columns of $X$. Please see this [wiki page on vectorization](https://en.wikipedia.org/wiki/Vectorization_(mathematics)). It is interesting to note that the vectorization operation itself is a linear operations. 

Since $X$ is in $\mathbb{R}^{3 \times 2}$, we have $vec(X)$ in $\mathbb{R}^6$. The standard basis now becomes - 
$$
	vec(E_{1,1}) = e_1  \\
	vec(E_{2,1}) = e_2 \\
	vec(E_{3,1}) = e_3 \\
	vec(E_{1,2}) = e_4 \\
	vec(E_{2,2}) = e_5 \\
	vec(E_{3,2}) = e_6 \\
$$

It should be noted that -
$$
\begin{bmatrix}
\;\; \; e_1 & | & e_2 & | & e_3 & | & e_4 & | & e_5 & | & e_6 & 
\end{bmatrix} = I_{6 \times 6} = I_6
$$

Let $Y_{i,j} = L_A(E_{i,j})$.

Let us now vectorize the outputs $y_i$ which are the outputs corresponding to the element of the standard basis $e_i$.

$$
	vec(Y_{1,1}) = \begin{bmatrix} a_1 \\- \\0  \end{bmatrix},
	vec(Y_{2,1}) = \begin{bmatrix} a_2 \\- \\0  \end{bmatrix},
	vec(Y_{3,1}) = \begin{bmatrix} a_3 \\- \\0  \end{bmatrix} \\ \; \\
	vec(Y_{1,2}) = \begin{bmatrix} 0 \\- \\a_1  \end{bmatrix},
	vec(Y_{2,2}) = \begin{bmatrix} 0 \\- \\a_2  \end{bmatrix},
	vec(Y_{3,2}) = \begin{bmatrix} 0 \\- \\a_3  \end{bmatrix}
$$

Also, let -
$$
y_1 = vec(Y_{1,1}) \\
y_2 = vec(Y_{2,1}) \\
y_3 = vec(Y_{3,1}) \\
y_4 = vec(Y_{2,2}) \\
y_5 = vec(Y_{2,2}) \\
y_6 = vec(Y_{3,2}) \\
$$

We know that the matrix representation of a linear transformation in the standard basis is given as the matrix whose columns are the outputs of the corresponding elements from the ordered standard basis (or equivalently the columns of $I_6$). In other words, the $i^{th}$ column of the matrix $\phi_{L_A}$ is precisely where the vector $e_i$ is sent  by $L_A$.

Hence,
$$
	\phi_{L_A} \\ \; \\
	= \begin{bmatrix}
	\;\; y_1 & | & y_2 & | & y_3 & | & y_4 & | & y_5 & | & y_6  \;\;
	\end{bmatrix} \\ \; \\
	= \begin{bmatrix}
	\;\; a_1 & | & a_2 & | & a_3 & | & 0 & | & 0  & |  & 0 \;\; \\
	\;\; - & \cdot & - & \cdot & - & \cdot & - & \cdot & - & \cdot  & - \;\; \\
	\;\; 0 & | & 0 & | & 0 & | & a_1 & | & a_2 & | & a_3 \;\;
   \end{bmatrix} \\ \; \\
   = \begin{bmatrix}
   \;\; A  & | & 0_{4 \times 3} \; \; \\
   \;\; - & \cdot & - \\
   \;\; 0_{4 \times 3} & | & A
   \end{bmatrix} \\ \; \\
      = \begin{bmatrix}
   \;\; A  & | & 0\; \; \\
   \;\; - & \cdot & - \\
   \;\; 0& | & A
   \end{bmatrix}
$$
Hence we can say -
 $$\color{darkred}
 Y = L_A(X) \iff vec(Y) = \phi_{L_A} vec(X) 
 $$
So, we have - 
$$
	vec(Y) = \phi_{L_A} \; vec(X) \\ \; \\
	= \begin{bmatrix}
   \;\; A  & | & 0_{4 \times 3} \; \; \\
   \;\; - & \cdot & - \\
   \;\; 0_{4 \times 3} & | & A
   \end{bmatrix} \; \; vec(X)
$$

If $\otimes$ is the Kronecker product, then we have - 
 $$
 \phi_{L_A} = I_{2 \times 2} \otimes A
 $$

So we generalize and conclude that - 

$$
Y = L_A(X) \\
\big\Updownarrow  \\
vec(Y) = (I_{p \times p} \; \otimes \; A) vec(X) \\ 
\big\Updownarrow \\
vec(Y) = \phi_{L_A} \; vec(X)
$$

### Representation for pre/left multiplication

Similar to the operator $L_A$, we define the operator $R_A$ as $R_A(X) = XA$. We can show that the matrix representation of this linear operation is given by $\phi_{R_A} = B^T \otimes I$.

As before, let us consider a small example. Let $A$ be of shape $2 \times 3$. 
$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
\end{bmatrix} \\ \;\\ = \begin{bmatrix}
a_1 \\ - \\ a_2
\end{bmatrix}
$$

where $a_1$ and $a_2$ are row vectors of $A$.

Let $X$ of shape $4 \times 2$.

Let us construct the basis for the input space as before - 
$$
	E_{1,1} = 
	\begin{bmatrix}
	\;\; 1 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix}, \;\;
   E_{1,2} = 
	\begin{bmatrix}
	\;\; 0 & 1 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix} \;\; \\ \; \\
   	E_{2,1} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 1 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix}, \;\;
   E_{2,2} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 1 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix} \;\; \\ \; \\
      E_{3,1} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 1 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix}, \;\;
   E_{3,2} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 1 \;\; \\
	\;\; 0 & 0 \;\; \\
   \end{bmatrix} \;\; \\ \; \\
    E_{4,1} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 1 & 0 \;\; \\
   \end{bmatrix}, \;\;
   E_{4,2} = 
	\begin{bmatrix}
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 0 \;\; \\
	\;\; 0 & 1 \;\; \\
   \end{bmatrix} \;\; \\ \; \\
$$

Again, we define vectorization here as $vec$ which stacks the columns of a matrix and yields a column vector.
$$
	e_1 = vec(E_{1,1}) , \;\; e_4 = vec(E_{1,2}) \\
	e_2 = vec(E_{2,1}) , \;\; e_6 = vec(E_{2,2}) \\
	e_3 = vec(E_{3,1}) , \;\; e_7 = vec(E_{3,2}) \\
	e_4 = vec(E_{4,1}) , \;\; e_8 = vec(E_{4,2}) \\
$$

We also have - 
$$
R_A(E_{1,1}) = 
\begin{bmatrix}
a_1 \\ - \\ 0 \\ - \\ 0 \\ - \\ 0
\end{bmatrix}, \;\;
R_A(E_{1,2}) = 
\begin{bmatrix}
a_2 \\ - \\ 0 \\ - \\ 0 \\ - \\ 0
\end{bmatrix}
\\ \; \\
R_A(E_{2,1}) = 
\begin{bmatrix}
0 \\ - \\ a_1 \\ - \\ 0 \\ - \\ 0
\end{bmatrix}, \;\;
R_A(E_{2,2}) = 
\begin{bmatrix}
0 \\ - \\ a_2 \\ - \\ 0 \\ - \\ 0
\end{bmatrix}
\\ \; \\
R_A(E_{3,1}) = 
\begin{bmatrix}
0 \\ - \\ 0 \\ - \\ a_1 \\ - \\ 0
\end{bmatrix}, \;\;
R_A(E_{3,2}) = 
\begin{bmatrix}
0 \\ - \\ 0 \\ - \\ a_2 \\ - \\ 0
\end{bmatrix}
\\ \; \\
R_A(E_{4,1}) = 
\begin{bmatrix}
0 \\ - \\ 0 \\ - \\ 0 \\ - \\ a_1
\end{bmatrix}, \;\;
R_A(E_{4,2}) = 
\begin{bmatrix}
0 \\ - \\ 0 \\ - \\ 0 \\ - \\ a_2
\end{bmatrix}
\\ \; \\
$$
Let us define $Y_{ij} = R_A(X_{ij})$ as the output obtained when the elements of the standard basis are operated on by $R_ A$

Now, let us vectorize the output $Y_{ij}$ as follows - 
$$
y_1 = vec(Y_{1,1}), \; \; y_2 = vec(Y_{1,2}) \\
y_3 = vec(Y_{2,1}), \; \; y_4 = vec(Y_{2,2}) \\
y_5 = vec(Y_{3,1}), \; \; y_6 = vec(Y_{3,2}) \\
y_7 = vec(Y_{4,1}), \; \; y_8 = vec(Y_{4,2}) \\
$$

For example, $y_1 = \begin{bmatrix} a_{11} \\ 0 \\ 0 \\0 \\ a_{12} \\ 0 \\0 \\0  \\\ a
_{13} \\ 0 \\0 \\ 0 \\ a_{14} \\0 \\0 \\0 \end{bmatrix}$

Let us say that we want the matrix representation $\phi_{R_A}$ of $R_A$ to produce $y_i$ when we input $e_i$.

Then the matrix $\phi_{R_A}$  must contain columns such that the $i^{th}$ column equals $y_i$

Hence - 
$$
	\begin{bmatrix}
	\;\;  y_1 & | & y_2 & | &  y_3 & | &  y_4 & | & y_5 & | & y_6 &| & y_7 & | & y_8  \;\;
   \end{bmatrix} \\ \; \\
  \begin{bmatrix} 
a_{11} & 0  & 0  & 0  & a_{21} & 0  & 0 & 0 \\
0 & a_{11}  & 0  & 0  & 0 & a_{21}  & 0 & 0   \\
0 & 0  & a_{11}  & 0  & 0 & 0  & a_{21} & 0  \\
0 & 0  & 0  & a_{11}  & 0 & 0  & 0 & a_{21}   \\
a_{12} & 0  & 0  & 0  & a_{22} & 0  & 0 & 0  \\
0 & a_{12}  & 0  & 0  & 0 & a_{22}  & 0 & 0  \\
0 & 0  & a_{12}  & 0  & 0 & 0  & a_{22} & 0   \\
0 & 0  & 0  & a_{12}  & 0 & 0  & 0 & a_{22}  \\
a_{13} & 0  & 0  & 0  & a_{23} & 0  & 0 & 0  \\
0 & a_{13}  & 0  & 0  & 0 & a_{23}  & 0 & 0  \\
0 & 0  & a_{13}  & 0  & 0 & 0  & a_{23} & 0  \\
0 & 0  & 0  & a_{13}  & 0 & 0  & 0 & a_{23} \\
a_{14} & 0  & 0  & 0  & a_{24} & 0  & 0 & 0   \\
0 & a_{14}  & 0  & 0  & 0 & a_{24}  & 0 & 0  \\
0 & 0  & a_{14}  & 0  & 0 & 0  & a_{24} & 0   \\
0 & 0  & 0  & a_{14}  & 0 & 0  & 0 & a_{24}   \\
\end{bmatrix} \\ \; \\
= \begin{bmatrix}
a_{11} I_4 & | & a_{21}I_4 \\
-&\cdot & - \\
a_{12} I_4 & | & a_{22}I_4 \\
-&\cdot & - \\
a_{13} I_4 & | & a_{23}I_4 \\
-&\cdot & - \\
a_{14} I_4 & | & a_{24}I_4
\end{bmatrix}
\\ \; \\
= \begin{bmatrix}
a_{11} & a_{21} \\
a_{12} & a_{22} \\
a_{13} & a_{23} \\
a_{14} & a_{24} \\
\end{bmatrix} \otimes I_4 \\ \; \\
= A^T \otimes I
$$
Clearly, we have - 
$$
vec(Y) = (A^T \otimes I) vec(X) \iff Y = R_{A}(X) 
$$
Hence, the matrix representation $\phi_{R_A} =  A^T \otimes I_4$.

By generalizing, if  $A$ has shape $m \times n$ and  $X$ has shape $p \times m$

$$
\phi_{R_A} = A^T \otimes I_p
$$

Please refer to the HW4 of [Math574: Applied Matrix Analysis (Fall 2021)](/notes/math574-applied-matrix-analysis/hw4/) and this wiki page on [Sylvester Equation](https://en.wikipedia.org/wiki/Sylvester_equation) for more related results and context.


### Matrix factorization of a polynomial
<iframe width="755" height="425" src="https://www.youtube.com/embed/wTUSz-HSaBg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Wiki: Matrix factorization of a polynomial](https://en.wikipedia.org/wiki/Matrix_factorization_of_a_polynomial)

The polynomial $x^2 + y^2$ is irreducible over $\mathbb{R}[x,y]$, but can be written as - 
$$
\begin{bmatrix}
x & -y \\
y & x
\end{bmatrix}
\begin{bmatrix}
x & y \\
-y & x
\end{bmatrix} = 
(x^2 + y^2)
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$

Really cool trick - 
Let $A=\begin{bmatrix} x & -y \\ y & x \end{bmatrix}$ and $B = \begin{bmatrix} x & y \\ -y & x \end{bmatrix}$, then we can factorize $(x^2 + y^2)^2$.

Clearly, $AB = (x^2 + y^2)\; I_2$
Also clearly $AB = BA$

$$
\begin{bmatrix}
0 & | & A \\
-&\cdot & -\\ 
B &| &  0
\end{bmatrix}
\begin{bmatrix}
0 & | & A \\
-&\cdot & -\\ 
B &| &  0
\end{bmatrix}
\\ \; \\
= \begin{bmatrix}
AB & | & 0 \\
-& \cdot &- \\ 
0 & | & BA
\end{bmatrix} \\ \; \\
= \begin{bmatrix}
AB & | & 0 \\
-& \cdot &- \\ 
0 & | & AB
\end{bmatrix} \\ \; \\
= (x^2 + y^2)\begin{bmatrix}
I_2 & | & 0 \\
-& \cdot &- \\ 
0 & | & i_2
\end{bmatrix}\\ \; \\
= (x^2 + y^2) \; I_4
$$

Result by Prof. David Eisenbud - 
Any polynomial which does not contain a term with degree 1 can be factorized using matrix mechanics.

