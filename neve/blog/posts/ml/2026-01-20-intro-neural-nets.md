---
date: 2026-01-20
title: Introduction to Neural Networks
tags: [ml, neural-networks, deep-learning]
summary: Basic concepts of neural networks from a mathematical perspective.
---

Neural networks are universal function approximators. Let's understand why.

## The Perceptron

A single neuron computes:

$$y = \sigma(w^T x + b)$$

where $\sigma$ is an activation function (ReLU, sigmoid, tanh, etc.).

## Multi-Layer Networks

Stacking layers gives us the ability to learn complex functions. A two-layer network:

$$f(x) = W_2 \sigma(W_1 x + b_1) + b_2$$

## The Universal Approximation Theorem

A feedforward network with a single hidden layer containing a finite number of neurons can approximate any continuous function on compact subsets of $\mathbb{R}^n$, given appropriate activation functions.

This is why neural networks are so powerful - they can learn almost any mapping with enough parameters.

## Backpropagation

Training uses gradient descent. The key insight is the chain rule:

$$\frac{\partial L}{\partial W_1} = \frac{\partial L}{\partial y} \frac{\partial y}{\partial h} \frac{\partial h}{\partial W_1}$$

This allows efficient computation of gradients through automatic differentiation.
