---
date: 2026-10-08
title: "Modulo the Kernel: Every Linear Map is a Change of Basis"
tags: [math, insight, linear-algebra, abstract-algebra, pedagogy]
summary: A look at how the First Isomorphism Theorem reframes our understanding of matrices.
authors: [sampad]
---

When we first encounter matrices, they are introduced as active transformations: they stretch, rotate, squash, and project vectors across different dimensions. A matrix $A$ mapping $\mathbb{R}^n$ to $\mathbb{R}^m$ feels like a machine that fundamentally alters the input it receives.

But there is a more elegant, structural way to view linear mappings. If we step back and look through the lens of abstract algebra—specifically by utilizing quotient spaces—every linear transformation is, at its core, simply a change of basis. 

Here is how the First Isomorphism Theorem allows us to reframe any linear map as an identity matrix in disguise.

### The Anatomy of a Linear Map

Consider a linear transformation $T: V \to W$ represented by a matrix $A$. If $T$ is neither injective (one-to-one) nor surjective (onto), it loses information and fails to cover the entire target space. To understand what $T$ is actually doing, we decompose the spaces $V$ and $W$ into their structural components:

1. **The Kernel ($\ker T$):** The subspace of $V$ consisting of all vectors that $T$ maps to the zero vector in $W$. This represents the "lost" information—the directions that are completely squashed.
2. **The Image ($\text{im}\, T$):** The subspace of $W$ containing all possible outputs of $T$. This is the actual footprint of the transformation in the target space.

If we want to turn $T$ into a bijective map (an isomorphism), we need to handle the squashed inputs and the unreachable outputs. We solve the latter by restricting our target space to just $\text{im}\, T$. To solve the former, we need quotient spaces.

### Constructing the Quotient Space

To prevent multiple inputs from mapping to the same output, we group them together. We define the quotient space $V / \ker T$. 

Instead of looking at individual vectors in $V$, the elements of $V / \ker T$ are affine subspaces (cosets) of the form $v + \ker T$. Two vectors $v_1$ and $v_2$ belong to the same coset if and only if they differ by an element in the kernel. Consequently, $T(v_1) = T(v_2)$. 

By treating entire cosets as single elements in our new domain, we eliminate the redundancy that caused $T$ to be non-injective. We are effectively saying, "Ignore any variations that happen along the kernel directions."

### The First Isomorphism Theorem

With the domain redefined as $V / \ker T$ and the codomain restricted to $\text{im}\, T$, we define a new induced map, $\overline{T}$:

$$ \overline{T}: V / \ker T \longrightarrow \text{im}\, T $$
$$ \overline{T}(v + \ker T) = T(v) $$

The First Isomorphism Theorem guarantees that $\overline{T}$ is well-defined, linear, and most importantly, **bijective**. 

Because $\overline{T}$ is an isomorphism between finite-dimensional vector spaces, it means $V / \ker T$ and $\text{im}\, T$ have the exact same dimension, which is equal to the rank of the original matrix $A$. 

### The Matrix is Just a Coordinate Change

What does an isomorphism between two spaces of the same dimension look like structurally? 

Because $\overline{T}$ is a bijection, it perfectly pairs each independent direction in $V / \ker T$ with an independent direction in $\text{im}\, T$. If we choose a basis $\mathcal{B}$ for the quotient domain and a corresponding basis $\mathcal{C}$ for the image such that $\overline{T}(b_i) = c_i$, the matrix representation of $\overline{T}$ with respect to these bases is simply the identity matrix, $I_r$, where $r$ is the rank of the transformation.

$$ \begin{bmatrix} \overline{T} \end{bmatrix}_{\mathcal{B}}^{\mathcal{C}} = \begin{bmatrix} 1 & 0 & \dots & 0 \\ 0 & 1 & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & 1 \end{bmatrix} $$

From this perspective, the transformation is not squashing or stretching anything. It is merely taking the coordinates of a vector expressed in the basis of the quotient space and rewriting them in the basis of the image space. 

Modulo its kernel, every linear transformation is just a change of basis. We aren't changing the vector; we are just shifting our framework for how we measure it.
