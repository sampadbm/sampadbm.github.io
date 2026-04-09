---
authors: Sampad
date: 2026-04-06
title: Some notes on tensors
tags: [MATH647, linear-algebra, tensors] 
---


### Notations
$[N] := \{1,2,3,...,N-1,N\}$


### Preliminaries

#### Some identities on Summations

Let $I$ be an index set. A partition on this index set $P = \{P_1,P_2,...,P_K\}$ is a set of disjoint subsets of $I$, i.e $I_k \in I \; \forall k \in [K]$ and $k \neq l \implies I_k \cap I_l = \emptyset$. Then

$$
\sum_{i \in I} a_i = \sum_{k \in [K]}\sum_{i_k \in I_K} a_i
$$

Let $I$ and $J$ be index sets of same cardinality and let $\phi : I \to J$ be a bijection. Then

$$
\begin{aligned}
\sum_{j \in J} b_j = \sum_{i \in I} b_{\phi(i)} \\
\sum_{i \in I} a_i = \sum_{j \in J} a_{\phi^{-1}(j)}
\end{aligned}
$$
Let $A$ and $B$ be multisets such that $|A| = |B|$ (same cardinalities) . Let $I$ and $J$ be index sets such that there exist bijections $\alpha : I \to A$ with $A \ni a_i = \alpha(i) \; \forall i \in I$ and $\beta: J \to B$ with $B \ni b_j = \beta(j) \; \forall j \in J$. If $\phi: I \to J$ is a bijection on the index sets, then it is clear that there exist a bijection $\gamma: A \to B$ via $\color{green}\gamma =  \beta \; \circ \; \phi \; \circ \; \alpha^{-1}$. 

$$
\begin{equation}
	\sum_{ j \in J} b_j = \sum_{j \in J} \beta(j) = \sum_{i \in I} \beta (\phi(i)) = \sum_{i \in I} \big( \; \overbrace{\beta \circ \phi \circ \alpha^{-1}}^{\gamma} \circ \alpha \; \big) (i) = \sum_{i \in I} \gamma (\alpha(i)) = \sum_{i \in I} \gamma(a_i)
\end{equation}
$$

In addition, if $\gamma$ is an **identity map**, then $\gamma(a) = a$. This means that the sets are equal, i.e $A = B$ and $\gamma$ is a permutation map via $\color{green} \gamma = \beta \circ \phi \circ \alpha^{-1}$. 

> **Note**:  
If $\gamma$ is the identity function, i.e. $\gamma(\cdot) = \cdot\;$, then $\quad \boxed{j = \phi(i) \iff a_i = b_j}$   
Proof ($\implies$) 
$$b_j = \beta(j) = \beta(\phi(i)) = (\overbrace{\beta \circ \phi \circ \alpha^{-1}}^{\gamma} \circ \alpha) (i) = \gamma(\alpha(i)) = \alpha(i) = a_i$$  
Proof ($\impliedby$)  
$$
\begin{aligned}
	b_j = a_i \implies \beta(j) = \alpha(i) 
\implies \beta(j) = \gamma(\alpha(i)) \\\;\\
\implies j = (\beta^{-1} \circ {\color{green}\gamma} \circ \alpha)(i) \\\;\\\
\implies j = (\beta^{-1} \circ {\color{green}{\beta \circ\phi \circ \alpha^{-1}}}  \circ \alpha)(i) \\\;\\
\implies j = \phi(i)
\end{aligned}
$$

From above, we get

$$
\begin{equation}
\begin{aligned}
	\sum_{j \in J} b_j = \sum_{i \in I} \gamma(a_i) = \sum_{i \in I} a_i \\
\boxed{\therefore \sum_{j \in J} b_j = \sum_{i \in I} a_i}
\end{aligned}
\end{equation}
$$




### Tensors

A tensor of order $K$ in field $\mathbb{F}$ denoted by $T \in \mathbb{F}^{N_1 \times N_2 \times ... \times N_K}$ and has $K$ indices such that the $k^{th}$ index $i_k \in [N_k]$ where $N_k \in \mathbb{N}$ such that $T_{i_1, i_2,...,i_K} \in \mathbb{F} \;, \forall i_k \in [N_k] \; \forall k \in [K]$.  
The shape of this tensor is $(N_1, N_2, ..., N_K)$
 
> $T \in \mathbb{R}^{10 \times 20 \times 30}$ is an order $3$ tensor with indices $i_1, i_2, i_3$ such that $i_1 \in [10], i_2 \in [20], i_3 \in [30]$. The shape is $(10,20,30)$.

#### Rank-1 Tensors 
A tensor $T \in \mathbb{F}^{N_1 \times ... \times N_K}$ has rank-1 if $\exists \;  x^1 \in \mathbb{F}^{N_1},..., x^K \in \mathbb{F}^{N_K}$ such that 
$$T_{i_i,...,i_K} = x^1_{i_1}\;...\;x^{K}_{i_K}$$
In tensor product notation, we write $T = x^1 \otimes... \otimes x^K$.

### Tensor Unfolding 

A tensor $T \in \mathbb{F}^{N_1 \times ... \times N_K}$ of order $K$ can be unfolded into another tensor $S \in \mathbb{F}^{M_1 \times ... \times M_L}$ of order $L$ given a **ordered partition** $P$ of $[K]$ (or equivalently of the indices $\{i_1,...,i_K\}$) with partition size $L = |P|$ such that there is a bijection between the entries of $T$ and $S$. If the indices are  $i_1 \in [N_1],...,i_K\in [N_K]$ for $T$ and =$j_i\in [M_1],...,j_L \in [M_L]$, then $N_1...N_K = M_1...M_L$.

>For example, if $T \in \mathbb{R}^{10\times20\times 30 \times 40\times 50 \times 30 \times 70}$ with indices $i_k \in [N_k], k \in [K=7]$, then given the ordered partition $P := \{\{1,3\},\{2,4\},\{ 5,6,7\} \}$ of $[K=7]$ (or $\{ \{i_1,i_3\}, \{i_2,i_4\}, \{i_5, i_6, i_7 \}  \}$ of $\{i_1,...,i_7\}$) , the unfolded tensor $S \in \mathbb{R}^{300 \times 800 \times 2100}$ has order $L = |P| = 3$ with indices $j_l, l \in [L=3]$.    The indices of $j_1, j_2, j_3$ of $S$ are related to the partitions $\{i_1,i_3\}$, $\{i_2,i_4\}$, and $\{i_5, i_6, i_7\}$ such that $j_1 \in [M_1], j_2 \in [M_2], j_3 \in [M_3]$ with $M_1 = N_1 N_3, M_2 = N_2 N_4, M_3 = N_5 N_6 N_7$.  The exact mapping/relation from $j_1$ to $i_1,i_3$ (or $j_2$ to $i_2,i_4$ or $j_3$ to $i_5,i_6,i_7$) is given by some fixed bijection on indices $\phi_1 : [M_1] \to [N_1] \times [N_3]$ (and similarly for $\phi_2,\phi_3$ . The exact bijection is not of much consequence but they do influence which entries of $T$ go to which entries of $S$ and hence changing those bijections will produce a different unfolding tensor $\tilde S$ of the same shape.

> When the size of the partition $P$ is $L = |P| = 2$, we call it a matrix unfolding or matricization of the tensor. When one of the two elements of the ordered partition (usually the first) is a singleton containing the index $i_k$, then we call $S \in \mathbb{F}^{N_k \times (N_1...N_{k-1}N_{k+1}...N_K)}$ the mode-$k$ matricization of the  order $K$ tensor $T \in \mathbb{F}^{N_1 \times ... \times N_K}$. 


> If the partition $P$ itself is a singleton i.e $P = \{\{1,...,K\}\}$, then we end up with a vector  $\vec S \in \mathbb{F}^{N_1...N_K}$ and this is called the **vectorization** of the tensor $T$. There exists a bijection $\phi: I \to J$ on the index set $I := [N_1]\times...\times[N_K]$ of $T$ and the index set $J := [N_1...N_K]$ of $\vec S$ such that there is a permutation map $\gamma : multiset(T) \to multiset(\vec S)$ via $\phi = \sigma \circ  \phi \circ \tau^{-1}$ where $\vec S_j := \sigma(j)$ and $T_i := \tau(i)$ help use index into and fetch elements of the vector/tensor. Therefore, $j = \phi(i) \iff T_i = \vec S_j$. 

 
### Frobenius Inner Product of Tensors

For tensors $A,B \in \mathbb{F}^{N_1 \times ... \times N_K}$, the Frobenius inner product is given by 
$$
\langle A, B \rangle_F = \sum_{\substack{i_1 \in [N_1]\;\\\\.\\.\\.\\\;\\i_k \in[N_K]}} A_{i_1,...,i_K} \; B_{i_1,...,i_K}
$$

#### Invariance of Frobenius Inner Product under unfolding

If tensors $A,B \in \mathbb{F}^{N_1 \times...\times N_K}$ are unfolded via the same unfolding scheme into tensors $G,H \in \mathbb{F}^{M_1 \times...\times M_L}$, then the Frobenius inner product is preserved. 

$$
\langle A, B \rangle_F = \langle G, H \rangle_F
$$

Proof (via vectorization):

Let $a,b, g, h$  be vectorizations of $A,B,G,H$ respectively. Let the vectorization of $A,B$ be done via the  bijection on indices $\phi: \underbrace{[N_1....N_K]}_{I} \to \underbrace{[N_1] \times ... \times [N_K]}_{J}$ for $A,B$ and $\tilde \phi: \underbrace{[M_1....M_L]}_{\tilde I} \to \underbrace{[M_1] \times ... \times [M_L]}_{\tilde J}$ for $G,H$. 

Also, since $A,B$ are unfolded exactly similarly onto $G,H$ respectively, there is a single bijection of the indices  $\psi:[N_1]\times...\times[N_K] \to [M_1]\times...\times[M_L]$ that corresponds to the unfoldings. 

$$
\begin{aligned}
\langle A , B \rangle_F = \sum_{j_1 \in [N_i],...,j_K \in [N_K]} A_{j_1,...,j_K} \; B_{j_1,...,j_K}  = \sum_{{\color{red}{(j_1,j_2,...,j_K)}} \in J} A_{j_1,...j_K}\;B_{j_1,...,j_K} = \sum_{{\color{red}j} \in J} {\color{lightgreen}A_j} \; {\color{magenta}B_j} \\\;\\
\underbrace{=}_{\text{see preliminaries above  }} \sum_{i \in I} {\color{lightgreen}a_i} \; {\color{magenta}b_i} = \sum_{i \in N_1...N_K} a_i \; b_i = \langle a, b \rangle 
\end{aligned}
$$

Using a similar argument, we get 
$$
	\langle G, H \rangle_F = \langle g, h\rangle
$$

Since the set $I = N_1...N_K = M_1...M_K = \tilde I$, and since there is a bijection of indices $\tilde \phi^{-1} \circ \psi \circ  \phi: I \to \tilde I$ such that $\tilde i = (\tilde \phi \circ \psi \circ \phi)(i) \iff a_i = g_{\tilde i}, b_i = h_{\tilde i}\;$, we get

$$
\begin{aligned}
	\langle a , b \rangle = \sum_{i \in I} a_i \; b_i = \sum_{\tilde i \in \tilde I} g_{\tilde i} \; h_{\tilde i} = \langle g , h \rangle
\end{aligned}
$$


Stringing together the last three arguments, we get 

$$
	\langle A, B \rangle_F = \langle a , b \rangle = \langle g, h \rangle = \langle G, H \rangle_F \qquad \blacksquare
$$

#### Frobenius inner product between rank-1 tensors

Let $A = a^1 \otimes ... \otimes a^K$ and $B = b^1 \otimes ... \otimes b_K$ be rank-1 tensors in $\mathbb{F}^{N_1 \times...\times N_K}$ such that $a^k,b^k \in \mathbb{F}^{N_k}$. By definition of being $rank-1$, $A_{i_1,...,i_K} = a^1_{i_1}...a^K_{i_K}$ and $B_{i_1,...,i_K} = b^1_{i_1}...b^K_{i_K}$. The their Frobenius inner product is given by

$$
\begin{aligned}
	\langle A, B \rangle_F = \sum_{i_1 \in [N_1],...,i_K \in [N_K]} A_{i_1,...,i_K} \;\; B_{i_1,...,i_K} = \sum_{i_1 \in[N_1]} ...\sum_{i_K \in [N_K]} a^1_{i_1}...a^K_{i_K} \qquad b^1_{i_1}...b^K_{i_K} \\\;\\
 = \sum_{i_1 \in[N_1]} a^1_{i_1} \; b^1_{i_1} \;...\sum_{i_K \in [N_K]} a^K_{i_K} \; b^K_{i_K} \\\;\\
= \langle a^1 , b^1 \rangle \;...\; \langle a^K , b^K \rangle \\\;\\
= \prod_{k \in [K]} \langle a^k, b^k \rangle
\end{aligned}
$$

> If $a = a^1 = ... = a^K$ and $b = b^1 = ... = b^K$ such that $A := a^{\otimes K}$ and $B = b^{\otimes k} b$, then 
$$ \begin{aligned}
\langle A , B \rangle_F = \prod_{k \in [K]} \langle a,b \rangle = \langle a, b \rangle^K \\\;\\
\implies \langle a^{\otimes K} , b^{\otimes K} \rangle_F = \langle a, b \rangle^K 
\end{aligned}
$$

