---
themes: ["muted","colorful"]
category: science, optimization
---


## Nuclear Norm Ball - The convex hull of rank-1 matrices
<p style="text-align:center; color:#7A306C"> <b>10th Jan, 2025</b> </p>



### Rank-1 Matrices
The column rank of a matrix is the number of independent columns vectors.
The row rank of a matrix is the number of independent row vectors.
For a matrix (tensor of order 2), the row rank equals the column rank and we call this the rank of the matrix
Let $M_1$ be the set of rank-1 $n \times n$ matrices. 
Let $X = \{ uv^T  \;|\; u,v \in \mathbb{R^n} \}$ be the matrices that can be written as the outer product of two vectors $u,v \in \mathbb{R^n}$.
It is true that $M_1 = X$.


### Singular Value Decomposition (SVD)
The SVD of a rank-k matrix is one of many decomposition of a matrix into a linear combination of $k$ rank-1 matrices.
$$
	M = \sum_{i=1}^k \sigma_i u_i v_i^T = U \Sigma V^T \\
$$
where $\sigma_i \geq 0$, $u_i,v_i \in \mathbb{R^n}$ with $\langle u_i,u_j \rangle = \langle v_i, v_j \rangle = \delta_{ij}$.


### Nuclear Norm and Balls

The nuclear norm of a rank-k matrix is defined as the sum of its singular values.  
This means if $M = \sum_{i=1}^k \sigma_i u_i v_i^T = U \Sigma V^T$, then the nuclear norm of $M$ is given by
$|M| = \sum_{i=1}^k \sigma_i = Tr(\Sigma)$

Note that $|M| = Tr(\sqrt{M^TM}) = Tr(\sqrt{V \Sigma U^T U \Sigma V^T}) = Tr(\sqrt{V \Sigma^2 V^T}) = Tr(\sqrt{\Sigma^2 V^TV}) = Tr(\sqrt{\Sigma^2}) = Tr(\Sigma)$.  
Similarly, also $|M| = Tr(\sqrt{MM^T})$

The unit nuclear norm ball is the set of matrices $B = \{ M \; | \; |M| = \sum_{i=1}^k \sigma_i \leq 1 \}$

> Although, we did not prove it, Nuclear Norm is a proper norm and follows all the properties of a matrix norm (like triangle inequality). It is, infact, one of many 
> of the [Ky-Fan family of norms](https://en.wikipedia.org/wiki/Singular_value_decomposition#Ky_Fan_norms). The Ky Fan 1-norm is the 
> Operator norm or the spectral norm of a matrix i.e the largest singular value. 

### Rank-1 matrices formed by outer products of vectors of unit length
Let $u,v \in \mathbb{R^n}$ be unit vectors, i.e $|u| = |v| = 1$ where $|.|$ is the euclidean norm.  
Let $W := \{  uv^T \; | \; u,v \in \mathbb{R^n}, |u| = |v| = 1 \}$

#### Properties 
For any matrix $R \in W$, we have  
$$
 |R| = Tr(\sqrt{RR^T}) = Tr(\sqrt{uv^T\;vu^T}) = Tr(\sqrt{u \; |v|^2 \; u^T}) = Tr(\sqrt{uu^T}) = Tr(\sqrt{u^Tu}) = Tr(\sqrt{|u|^2}) = Tr(1) = 1
$$

This could also have been seen easily via SVD of $R$ as it is just $R = \sum_i^k \sigma_i u_iv_i^T$ where $k=1$ and $u_1 = u$, $v_1 = v$ and $\sigma_1 = 1$  
which makes $|R| = \sum_i^k \sigma_i = \sigma_1 = 1$.

Hence, we have just shown that $W \subset B$.



### $Co(W)$ is same as $B$
We claim that the convex hull of the set $W$ defined as $Co(W)$ is same as the set $B$.

PROOF:  
To show that, we need to show $Co(W) \subset B$ and $B \subset Co(W)$. 

Let us start by the definition of $Co(W)$.

$$
	Co(W) := \{ \sum_i \alpha_i W_i \; | \; W_i \in W, \Sigma_i \alpha_i = 1, \alpha_i \geq 0\}
$$

>First, we show that $B \subset Co(W)$. 

Pick any matrix $P \in B$. Let $P = \sum_i \sigma_i u_i v_i^T$ be the SVD of $P$. By definition of SVD, $|u_i| = |v_i| = 1$  
and hence $\underbrace{u_i v_i^T}_{:=W_i} \in W$.
  
By definition, $|P| \leq 1$ or $\sum_i \sigma_i \leq 1$. 

<u>Case 1:</u>
 
If $|P| = 1$, $P = \sum_i \sigma_i u_i v_i^T = \sigma_i W_i$ where $\Sigma_i \sigma_i = 1$ and $W_i \in W$.  
In other words, $P$ is a convex combination of $W_i \in W$ with the convex coefficients $\alpha_i = \sigma_i$.

Hence $P \in Co(W)$

<u>Case 2:</u> 

If $|P| < 1$, then the problem is we can no longer interpret the singular values $\sigma_i$ directly as the convex coefficients $\alpha_i$ which need to sum to 1.
  
If the matrix $0$ belonged to $W$, we could have put the rest of the weight into it to make up for the sum to reach 1, i.e we could have
written $P = \sum_i \underbrace{\sigma_i}_{\alpha_i} W_i + \underbrace{(1 - \Sigma_i \sigma_i)}_{\beta} 0$ which would bring the 
sum of convex coefficients $\alpha_i + \beta$ to 1. Unfortunately, $0 \notin W$.

We have a different way to settle this though. We are less from 1 by $1- \Sigma_i \sigma_i := \beta > 0$.
For any pair of vectors $u,v$ which are unit length, so is the pair $-u,v$. Hence both $E := uv^T$ and $F := -uv^T$ belong to $W$.  
We also note that $\frac{\beta}{2} E + \frac{\beta}{2} F = 0$.

Hence $P = \sum_i \sigma_i W_i + \frac{\beta}{2} E + \frac{\beta}{2} F$. Now, have $W_i, E, F \in W$ and at the same time we have $P$ 
as a convex combination of them as the coefficients sum upto $\Sigma_i \sigma_i + \frac{\beta}{2} + \frac{\beta}{2} = \Sigma_i \sigma_i + \beta = \Sigma_i \sigma_i + 1 - \Sigma_i \sigma_i = 1$.

Hence $P \in Co(W)$.  

>This proves that $B \subset Co(W) \;\;\;  _\blacksquare$

> Next, we show that $Co(W) \subset B$

Pick any matrix $T \in Co(W)$. By definition, 
$$
	T = \sum_{i=1}^k \alpha_i W_i = \sum_{i=k} \alpha_i u_i v_i^T \\ \; \\
    
    \alpha_i \geq 0, \; \Sigma_i^k \alpha_i = 1, \; |u_i| = |v_i| = 1
$$

<u>Remark:</u> How do we know that we will not have an infinite number of terms/supports in the convex combination for $T$ instead of finite $k$? 
Because of [Caretheodory theorem](https://en.wikipedia.org/wiki/Carath%C3%A9odory%27s_theorem_(convex_hull), we can say that $k \leq n^2 +1$
as the matrices lie in $\mathbb{R^n}$.
And even more than that, for our particular case, we can even say $k \leq n$, because the objects we are dealing with are not arbitrary
$n^2$ objects but infact matrices and we always have an SVD of $T$ that guarantees that we have a representation of the above form with 
at max $k=n$ factors (singular vectors, values triplets). 


One's mind eagerly wants to do the reverse of what we did earlier, i.e to interpret the above as the SVD of T such that the 
convex coefficients $\alpha_i$ become the singular values and since they already sum upto 1, we can say that $|T| = 1$ 
which leads us happily to $T \in B$. But there is a subtle problem in that argument. SVD requires us to have 
$\langle u_i,u_j\rangle  = \langle v_i,v_j\rangle = 0$ for all $i \neq j$ but in the above definition of $T$, there is no
such constraint. This fails $\sum_{i=1}^k \alpha_i u_i v_i^T$ to be qualified as an SVD (of T or any other matrix). 

However, we have a different way to settle this - by using the properties of norm - the tringle inequality.  
We had noted in earlier section that for any $R \in W$, $|R| = 1$. Hence, since $W_i \in W$, $|W_i| = 1$
$$
	|T| = |\sum_{i=1}^k \alpha_i W_i| \color{red}\leq\color{default} \sum_{i=1}^k |\alpha_i W_i| = \sum_{i=1}^k \alpha_i \underbrace{|W_i|}_{1} = \sum_{i=1}^k \alpha_i = 1 \\
    \; \\
    |T| \color{red} \leq \color{default} 1
$$

which implies $T \in B$.

> This proves $Co(W) \subset B \;\;\; _\blacksquare$


> Hence we have proved that the Co(W) := convex hull of 
> (W := set of rank-1 matrices obtained from outer product of unit vectors) is the unit nuclear norm ball $B$.

