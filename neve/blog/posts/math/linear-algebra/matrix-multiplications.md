---
date: 2026-03-07
title: Understanding Matrix Multiplications
tags: [math, linear-algebra, tutorial]
summary: Some views on matrix multiplications.
---

### Notations

If $X$ is a $m \times n$ matrix, then $x_i$ and $x^j$ are the $i^{th}$ row and $j^{th}$ columns of $X$.  
$X_i^j = x_i^j$ is the $ij$ entry of $X$ where $i$ is row index and $j$ column index. 

### Matrix Vector
Assume $A \in \mathbb{C}^{m \times n}$ and $x \in \mathbb{C}^{n}$

$$
	[A x]_i =  a_i x = \langle a_i , x \rangle
$$

$$
	Ax = \sum_{k=1}^n a^k x_k 
$$


### Matrix Matrix
Assume $A \in \mathbb{C}^{m \times n}$ and $B \in \mathbb{C}^{n \times p}$
$$
	[AB]_i^j = a_i b^j = \langle a_i , b^j \rangle
$$

$$
	AB = \sum_{k=1}^m a^k b_k
$$

$$
	[AB]^j = A b^j
$$

$$
	[AB]_i = a_i B
$$

### Quadratic form 
Assume $A \in \mathbb{C}^{m \times n}$ and $x \in \mathbb{C}^{m \times 1}$ and $ y \in \mathbb{C}^{n \times 1}$.

$$
	[x^T A y] =  \langle A , xy^T \rangle_F
$$

### Matrix Matrix Matrix

Assume $X \in \mathbb{C}^{m \times n}$ and $A \in \mathbb{C}^{n \times p}$ and $Y \in \mathbb{C}^{p \times q}$.

$$
		[XAY]_i^j = \langle A, x_i^T {y^j}^T\rangle
$$

$$
		[XAY] = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Proof: 

$$
	XAY = XA \\; IY = \sum_{i=1}^n x^i a_i \sum_{j=1}^{p} e^j y_j = \sum_{ij} x^i (a_i e^j) y_j = \sum_{i,j=1}^{n,p} x^i a_i^j y_j = \sum_{i,j=1}^{n,p} a_i^j \cdot x^i y_j
$$

#### Special case:
When $A$ is diagonal (as in the case of eigenvalue or singular value decoposition)
$$
	XAY = \sum_{i=j} a_i^j \cdot x^i y_j = \sum_i a_i^i \cdot x^i y_i
$$

### Matrix Matrix Matrix Matrix $XABY$

There are multiple ways to think about this. But we will focus on two different ways. Look at $AB$ entrywise or look at $AB$ as sum of outer products. 

$X$ is $m \times n$, $A$ is $n \times p$ $B$ is $p \times q$ and $Y$ is $q \times r$.

$$
	X \quad AB \quad Y = \sum_{i,j=1}^{n,q} \langle a_i , b_j \rangle \cdot x^i y_j
$$

$$
	[X \quad AB \quad Y]_i^j = \overset{p}{\underset{i=1}{\sum}} \langle a^k b_k , x_i^T {y^j}^T\rangle_F
$$
