---
title: Technical Terms & Phenomena
date: 2026-03-29
tags: [reference, glossary, definitions]
summary: A living collection of technical terms, concepts, and phenomena with short readable descriptions.
---

## Loewner Order

A partial ordering on symmetric (or Hermitian) matrices where $A \succeq B$ if and only if $A - B$ is positive semi-definite — essentially a way to say one matrix is "greater than or equal to" another by generalizing the notion of $\geq$ from scalars to matrices.

## Tensor Product of Hilbert Spaces

A construction that combines two Hilbert spaces $\mathcal{H}_1$ and $\mathcal{H}_2$ into a new Hilbert space $\mathcal{H}_1 \otimes \mathcal{H}_2$ by taking the algebraic tensor product, equipping it with the inner product $\langle u_1 \otimes u_2, v_1 \otimes v_2 \rangle = \langle u_1, v_1 \rangle \langle u_2, v_2 \rangle$, and completing the space — used extensively in quantum mechanics to describe composite systems.

## Universal Property

A way of defining a mathematical object by specifying how it relates to all other objects of a given kind — if an object $X$ satisfies a universal property, then any other object doing the same thing must factor through $X$ uniquely, characterizing $X$ up to unique isomorphism. This is the core idea behind constructions like products, coproducts, tensor products, and free objects in category theory.

## K-SVD

A dictionary learning algorithm that iteratively learns an overcomplete dictionary $D$ and sparse codes $X$ to represent data as $Y \approx DX$, by alternating between sparse coding (e.g. via OMP) and updating each dictionary atom using a rank-1 SVD approximation — a generalization of K-means where each signal can use multiple atoms instead of just one.

## Sparse Approximation

The problem of representing a signal $y$ as a linear combination of as few columns as possible from a (typically overcomplete) dictionary $D$, i.e. finding the sparsest $x$ such that $y \approx Dx$ — solved approximately via methods like matching pursuit, OMP, or basis pursuit ($\ell_1$ relaxation).

## Sparse Dictionary Learning

The problem of jointly learning a dictionary $D$ *and* sparse codes $X$ from data $Y$, unlike sparse approximation which assumes a fixed dictionary — the learned dictionary adapts to the data and typically yields much sparser representations than predefined bases like Fourier or wavelets. Algorithms include K-SVD, MOD, and online dictionary learning.

## Sparse Autoencoder (SAE)

An autoencoder with a sparsity constraint on the hidden layer activations — by penalizing the network so that only a few neurons activate for any given input, it learns a compressed, interpretable overcomplete representation. Recently used in mechanistic interpretability to decompose neural network activations into human-readable features.

## Sparse Coding (Neuroscience)

A neural coding strategy where only a small fraction of neurons are active at any given time to represent a stimulus — proposed by Olshausen & Field (1996) as a principle the visual cortex uses, where sparse activations over an overcomplete basis yield efficient, robust, and disentangled representations of natural scenes.

## Sparse PCA

A variant of PCA that adds a sparsity constraint (e.g. $\ell_1$ penalty) on the loadings so that each principal component depends on only a few original variables — trading off some explained variance for much more interpretable components.

## Nonlinear Eigenproblem

A generalization of the standard eigenvalue problem $Ax = \lambda x$ to $M(\lambda)x = 0$, where the matrix $M$ depends nonlinearly on the eigenvalue $\lambda$ — arises naturally in vibration analysis, stability problems, and delay differential equations.

## Generalized Eigenvalue Problem

The problem of finding scalar $\lambda$ and vector $x$ satisfying $Ax = \lambda Bx$ for two matrices $A$ and $B$ — reduces to the standard eigenvalue problem when $B = I$. Common in mechanics (mass and stiffness matrices), Fisher's discriminant analysis, and canonical correlation analysis.

## Quadratic Eigenvalue Problem

Finding $\lambda$ and $x$ satisfying $(\lambda^2 M + \lambda C + K)x = 0$ — a special case of the nonlinear eigenproblem where the matrix depends quadratically on $\lambda$. Arises in damped vibration systems where $M$, $C$, and $K$ are the mass, damping, and stiffness matrices respectively.
