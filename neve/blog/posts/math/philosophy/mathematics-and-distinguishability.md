---
date: 2026-11-01
title: Mathematics and the Problem of Distinguishability
tags: [math, philosophy-of-math, structuralism, identity-of-indiscernibles, model-theory, category-theory, foundations]
summary: When does agreement on a family of properties imply identity? Separation, classification, reconstruction, and definability, from Leibniz's identity of indiscernibles to Yoneda and univalence.
authors: [sampad]
---

A recurring question in mathematics is whether two objects can be distinguished by their properties. Given objects $x$ and $y$, we might ask whether they are equal because certain properties agree, or whether some further property can distinguish them.

More precisely, given a collection of properties $\mathcal F$, when does

$$
\forall P\in\mathcal F,\quad P(x)=P(y)
$$

imply $x=y$?

This question appears in different forms across mathematics: separating points by functions, classifying objects by invariants, determining probability distributions from moments, and reconstructing structures from their representations.

It is also closely related to Leibniz's *identity of indiscernibles* and to mathematical structuralism. The connections are substantial, although the philosophical principle and its mathematical counterparts are not identical.

## A unifying roadmap

The common starting point is a collection of objects $X$ and a family of properties or observations $\mathcal F$.

Each observation $f\in\mathcal F$ assigns a value $f(x)$ to an object $x$. Collecting these values gives a representation

$$
\Phi(x)=(f(x))_{f\in\mathcal F}.
$$

This induces an equivalence relation:

$$
x\sim_{\mathcal F}y
\iff
\Phi(x)=\Phi(y).
$$

Two objects are indistinguishable *relative to $\mathcal F$* precisely when they belong to the same equivalence class.

From this construction arise four related questions:

| Question | Mathematical formulation | Main connection |
|---|---|---|
| **Separation** | Does $\Phi(x)=\Phi(y)$ imply $x=y$? | Separating functions, linear functionals |
| **Classification** | Does $\Phi(x)=\Phi(y)$ characterize a chosen equivalence $x\sim y$? | Invariants, structuralism, isomorphism |
| **Reconstruction** | Can the object or its structure be recovered from $\Phi(x)$? | Representation theorems, moment problems, Yoneda |
| **Definability** | Which distinctions can be expressed using the available properties? | Model theory, automorphisms, mathematical logic |

These questions are related but not equivalent. In particular, reconstruction may concern an entire structure, not merely the identification of individual elements, and classification generally concerns equivalence rather than literal equality.

They provide a route through the article:

- **Sections 1–3:** What does it mean for objects to be indistinguishable? Leibniz's principle, separating families, and mathematical structuralism.
- **Sections 4–6:** Which properties suffice to classify or reconstruct objects? Complete invariants, representation theorems, and definability.
- **Sections 7–8:** How should mathematical identity relate to structural equivalence? The Yoneda lemma and univalent foundations.
- **Section 9:** What does this perspective explain about mathematical practice, and where are its limits?

A distinction runs through the entire discussion:

$$
\boxed{
\text{Equality}
\;\ne\;
\text{structural equivalence}
\;\ne\;
\text{indistinguishability under }\mathcal F
}
$$

These notions can coincide under additional assumptions, but they should not be identified without justification.

## 1. Leibniz and the identity of indiscernibles

Leibniz's principle of the identity of indiscernibles (PII) states, roughly, that distinct objects cannot agree in every property.

One formulation is

$$
\left[\forall P,\;P(x)\iff P(y)\right]
\implies x=y.
$$

The difficulty lies in specifying which properties are allowed.

If we include the property "being identical to $x$," the implication is trivial: $x$ possesses this property, and any distinct $y$ does not. To obtain a substantive principle, philosophers generally restrict attention to properties that do not merely specify an object's identity.

This motivates the distinction between *qualitative* and *non-qualitative* properties, as well as distinctions involving intrinsic and relational properties. Different restrictions produce different versions of PII [1].

Max Black's well-known thought experiment illustrates the difficulty. Imagine a universe containing exactly two otherwise identical iron spheres, symmetrically situated. If such a universe is possible, the spheres are numerically distinct without being distinguished by the relevant qualitative properties. Whether this defeats PII depends on the version being considered.

The mathematical question is usually more restricted. Rather than asking whether agreement on every admissible property implies identity, we specify a particular collection of properties and ask whether it suffices to distinguish the objects under study.

## 2. Separation by properties

Let $X$ be a set and let $\mathcal F$ be a family of functions $f:X\to Y_f$. Define

$$
\Phi:X\longrightarrow\prod_{f\in\mathcal F}Y_f,
\qquad
\Phi(x)=(f(x))_{f\in\mathcal F}.
$$

The family $\mathcal F$ *separates points* if

$$
x\ne y
\implies
\exists f\in\mathcal F:\ f(x)\ne f(y).
$$

Equivalently, $\Phi$ is injective.

This gives a precise formulation of distinguishability relative to a prescribed family of observations.

For example, if $V$ is a vector space over a field $\mathbb F$, its algebraic dual $V^*$ separates points:

$$
\left[\forall f\in V^*,\ f(x)=f(y)\right]
\implies x=y.
$$

Indeed, for $x\ne y$, there exists a linear functional $f$ with $f(x-y)\ne0$.

In functional analysis, the Hahn–Banach theorem provides the corresponding separation result for continuous linear functionals on a Hausdorff locally convex topological vector space.

The important point is that no single functional need identify a vector uniquely. The entire collection can nevertheless distinguish every pair.

### When the properties are insufficient

If $\Phi$ is not injective, define

$$
x\sim y
\iff
\Phi(x)=\Phi(y).
$$

This is an equivalence relation. The observations distinguish equivalence classes in $X/{\sim}$, even though they cannot distinguish all elements of $X$.

There are then two possibilities: find additional properties that separate the original objects, or treat objects with identical observations as equivalent.

Both are common mathematical constructions.

## 3. Structuralism: identity through relations

Mathematical structuralism holds, in its various forms, that mathematics concerns structures and the positions objects occupy within them, rather than the particular nature of the objects used to realize those structures.

Paul Benacerraf's *What Numbers Could Not Be* (1965) is an important starting point [2].

The natural numbers admit different set-theoretic constructions. For example, in the von Neumann construction,

$$
0=\varnothing,\quad
1=\{\varnothing\},\quad
2=\{\varnothing,\{\varnothing\}\},
$$

whereas the Zermelo construction uses

$$
0=\varnothing,\quad
1=\{\varnothing\},\quad
2=\{\{\varnothing\}\}.
$$

These constructions disagree about the set-theoretic membership relations involving the numbers, but both can represent the natural-number structure.

Benacerraf argued that identifying numbers with one particular set-theoretic construction mistakes features of the representation for features essential to arithmetic.

Michael Resnik subsequently developed the view that mathematics studies patterns and positions within them [3]. Stewart Shapiro defended an account in which structures and their positions are themselves legitimate mathematical objects [4].

These positions differ philosophically, but each assigns a central role to structural relationships.

### A difficulty: structural indiscernibility

Consider a graph with two vertices $a,b$ and no edges. The permutation exchanging $a$ and $b$ is an automorphism: it preserves every relation specified by the graph.

Consequently, every parameter-free, one-variable property definable in the language of graphs has the same truth value at $a$ and $b$.

Yet $a\ne b$.

This illustrates an important limitation: structural properties need not distinguish every position in a structure.

More generally, an automorphism sends each element to another element satisfying the same parameter-free formulas. Two distinct elements in the same automorphism orbit therefore cannot be separated by such formulas.

One must distinguish *numerical identity* from *structural indiscernibility*. They are not interchangeable.

This problem is discussed extensively in the philosophical literature on structuralism [5].

## 4. Invariants and classification

Many classification problems ask which properties distinguish objects up to a specified notion of equivalence.

Let $X$ be a collection of mathematical objects, equipped with an equivalence relation $\sim$. A function $I:X\to Y$ is an invariant if

$$
x\sim y\implies I(x)=I(y).
$$

An invariant is *complete* if the converse also holds:

$$
I(x)=I(y)\iff x\sim y.
$$

For instance, the rank of a matrix is invariant under multiplication by invertible matrices on the left and right. Over a field, it is also a complete invariant for this equivalence:

$$
A=PBQ,\quad P,Q\text{ invertible}
\iff
\operatorname{rank}(A)=\operatorname{rank}(B).
$$

By contrast, rank is not a complete invariant for matrix similarity. Two matrices of the same rank need not be similar.

Thus, whether a property is sufficient depends on which notion of equivalence we are trying to characterize.

This is the distinction between a necessary condition for equivalence and a complete characterization of it. Much of classification theory consists in finding sufficiently discriminating invariants.

## 5. Reconstruction from observations

Separation asks whether observations distinguish objects. Reconstruction asks whether the observations contain enough information to recover the object or structure.

Several representation theorems provide precise answers.

### Stone representation

Stone's representation theorem associates a Boolean algebra $B$ with a space of ultrafilters and establishes an isomorphism

$$
B\cong\operatorname{Clop}(S(B)),
$$

where $S(B)$ is its Stone space and $\operatorname{Clop}(S(B))$ is the Boolean algebra of clopen subsets.

Stone duality goes further, relating Boolean algebras contravariantly to Stone spaces [6].

### Gelfand representation

For a commutative unital $C^*$-algebra $A$, the Gelfand representation gives

$$
A\cong C(\Delta(A)),
$$

where $\Delta(A)$ is the compact Hausdorff space of nonzero multiplicative linear functionals on $A$, and the isomorphism is an isometric $*$-isomorphism.

The algebra can therefore be recovered from the continuous functions on its spectrum.

These theorems do more than establish that observations distinguish elements. They show how entire mathematical structures can be represented and recovered, up to the relevant isomorphism.

### The moment problem

Reconstruction is not always possible.

For a probability measure $\mu$ on $\mathbb R$ with moments of all orders, define

$$
m_n=\int_{\mathbb R}x^n\,d\mu(x),
\qquad n=0,1,2,\ldots.
$$

Does the sequence $(m_n)$ determine $\mu$?

Not necessarily. Distinct probability measures can possess exactly the same moments of every order. Such cases are called *indeterminate moment problems*.

Under additional hypotheses, uniqueness can be recovered. For instance, Carleman's condition is a sufficient condition for determinacy of the Hamburger moment problem.

This example shows why agreement on even infinitely many properties need not establish identity: the properties must form a sufficiently rich family.

## 6. Model theory and definability

Model theory studies mathematical structures through the formulas of a formal language.

Two structures $M$ and $N$ are *elementarily equivalent* if they satisfy exactly the same first-order sentences:

$$
M\equiv N
\iff
\forall\varphi\,
\bigl(M\models\varphi\iff N\models\varphi\bigr),
$$

where $\varphi$ ranges over first-order sentences in their common language.

Elementary equivalence does not imply isomorphism.

For example, by the Löwenheim–Skolem theorem, a first-order theory with an infinite model in a countable language has models of different infinite cardinalities. These models can satisfy exactly the same complete first-order theory while being non-isomorphic.

A related notion is that of *indiscernibles*: sequences of elements whose finite increasing subsequences of the same length satisfy the same formulas over a specified parameter set.

Model theory therefore makes distinguishability relative to a formal language particularly explicit. Changing the language, its parameters, or its expressive strength can change what is distinguishable [7].

## 7. Category theory and the Yoneda lemma

Category theory supplies another version of the reconstruction idea.

For an object $A$ in a locally small category $\mathcal C$, consider its contravariant representable functor

$$
h_A=\operatorname{Hom}_{\mathcal C}(-,A).
$$

This assigns to every object $X$ the set of morphisms $X\to A$, together with the corresponding action on morphisms.

The Yoneda lemma states that, for every presheaf $F:\mathcal C^{op}\to\mathbf{Set}$,

$$
\operatorname{Nat}(h_A,F)\cong F(A).
$$

In particular, the Yoneda embedding is fully faithful, so

$$
h_A\cong h_B
\iff A\cong B,
$$

where the isomorphism on the left is natural.

Thus, an object is determined **up to isomorphism** by the representable functor describing all morphisms into it.

The qualification matters. Yoneda does not establish literal equality of $A$ and $B$. Nor does it say that merely having equally many morphisms from each object is sufficient. The naturality and functorial structure carry essential information.

This result has an evident connection to mathematical structuralism: an object can be characterized by its relations to other objects. Awodey develops the philosophical relevance of this categorical approach in *Structure in Mathematics and Logic: A Categorical Perspective* [8].

## 8. From isomorphism to identity: univalent foundations

Ordinary set-theoretic foundations distinguish equality from isomorphism. Two groups, for instance, can be isomorphic without being equal as sets equipped with operations.

Univalent foundations provide a different formal treatment of identity.

In homotopy type theory, the univalence axiom asserts, for types $A,B$ in a suitable universe, that the canonical map

$$
(A=B)\longrightarrow(A\simeq B)
$$

is an equivalence.

Here $A=B$ denotes the identity type and $A\simeq B$ denotes the type of equivalences.

This does not assert that every pair of equivalent mathematical objects is definitionally equal. Rather, it relates identity of types to equivalence in a precise type-theoretic sense.

Univalence is therefore relevant to the question of whether structurally equivalent mathematical objects should be identified within a foundational system.

Awodey discusses its relationship to structuralism and invariance [9], while the *Homotopy Type Theory* book gives the formal development [10].

## 9. What does this say about mathematics?

These examples suggest a common problem that appears in several different mathematical settings:

Given a family of properties or representations, what distinctions can it detect?

Sometimes the answer is complete separation, as with linear functionals separating vectors. Sometimes the properties characterize objects only up to equivalence, as with matrix rank under left-right equivalence or representable functors under categorical isomorphism. Sometimes they fail to determine the object at all, as in indeterminate moment problems.

These situations should not be conflated.

In particular, three claims deserve to be distinguished:

1. **Mathematical claim:** A specified family of properties separates or classifies a specified collection of objects.
2. **Methodological claim:** Separation, classification, and reconstruction are recurring methods across mathematics.
3. **Ontological claim:** Mathematical objects have no identity beyond their properties or structural relations.

The first is established by individual theorems. The second is supported by mathematical practice. The third is a philosophical position, and it remains disputed.

This is also why the identity of indiscernibles cannot simply be treated as a theorem underlying all mathematics. Results about injectivity, definability, automorphisms, and representation are relative to particular structures and notions of equivalence. Leibniz's principle makes a much broader claim.

Nevertheless, the resemblance is not superficial. Mathematical arguments regularly turn on whether a set of conditions characterizes an object uniquely, whether an invariant is complete, or whether a representation loses information.

The question *which properties are sufficient to distinguish two objects?* is therefore both a concrete mathematical problem and a useful way to understand a substantial part of mathematical practice.

It need not provide a definition of mathematics to be philosophically significant.

---

## References

### Philosophy and structuralism

[1] Rodriguez-Pereyra, G. [*The Identity of Indiscernibles*](https://plato.stanford.edu/entries/identity-indiscernible/). *Stanford Encyclopedia of Philosophy*. Discusses formulations of PII, qualitative properties, and objections.

[2] Benacerraf, P. (1965). *What Numbers Could Not Be*. *The Philosophical Review*, 74(1), 47–73. [DOI](https://doi.org/10.2307/2183530).

[3] Resnik, M. D. (1997). *Mathematics as a Science of Patterns*. Oxford University Press.

[4] Shapiro, S. (1997). [*Philosophy of Mathematics: Structure and Ontology*](https://academic.oup.com/book/32743). Oxford University Press.

[5] Reck, E., and Schiemer, G. [*Structuralism in the Philosophy of Mathematics*](https://plato.stanford.edu/entries/structuralism-mathematics/). *Stanford Encyclopedia of Philosophy*. Covers structural indiscernibility, ontological and methodological structuralism, and categorical approaches.

### Mathematical separation and reconstruction

[6] Stone, M. H. (1936). *The Theory of Representations for Boolean Algebras*. *Transactions of the American Mathematical Society*, 40(1), 37–111. [Original paper](https://www.ams.org/tran/1936-040-01/S0002-9947-1936-1501865-8/S0002-9947-1936-1501865-8.pdf).

[7] Marker, D. (2002). [*Model Theory: An Introduction*](https://link.springer.com/book/10.1007/b98860). Springer. For elementary equivalence, definability, automorphisms, and indiscernibles.

### Category theory and foundations

[8] Awodey, S. (1996). [*Structure in Mathematics and Logic: A Categorical Perspective*](https://academic.oup.com/philmat/article-abstract/4/3/209/1415991). *Philosophia Mathematica*, 4(3), 209–237.

[9] Awodey, S. (2014). [*Structuralism, Invariance, and Univalence*](https://doi.org/10.1093/philmat/nkt030). *Philosophia Mathematica*, 22(1), 1–11.

[10] The Univalent Foundations Program. (2013). [*Homotopy Type Theory: Univalent Foundations of Mathematics*](https://homotopytypetheory.org/book/). Institute for Advanced Study.

[11] Mac Lane, S. (1998). [*Categories for the Working Mathematician*](https://link.springer.com/book/10.1007/978-1-4757-4721-8), 2nd ed. Springer. Chapter III, especially the Yoneda lemma.

### Additional sources

[12] [*First-order Model Theory*](https://plato.stanford.edu/entries/modeltheory-fo/). *Stanford Encyclopedia of Philosophy*.

[13] [*Moment Problem*](https://encyclopediaofmath.org/wiki/Moment_problem). *Encyclopedia of Mathematics*.

[14] [*Hahn–Banach Theorem*](https://encyclopediaofmath.org/wiki/Hahn%E2%80%93Banach_theorem). *Encyclopedia of Mathematics*.

[15] [*Category Theory*](https://plato.stanford.edu/entries/category-theory/). *Stanford Encyclopedia of Philosophy*.
