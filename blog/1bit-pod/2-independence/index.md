---
themes: ["muted","colorful"]
category: science
---


### AXIOMS OF PROBABILITY
> <u>KOLMOGOROV AXIOMS</u>
>
> - Let P,Q be propositions.  
> - C(P) and C(Q) assign our confidence/probability in propositions P and Q.  
> - This is different from propositional logic since in propositional logic we either have confidence of 1 or 0.  
> - Two propositions are said to be mutually exclusive if they occur together in no world. See [Phil122B](/notes/phil122-reasoning-and-argument/) notes for more details.  
>
>KA1. Non-Negativity: $C(P) \geq 0$  
>
>KA2. Normality: $C(P) = 1$ iff $P$ is a tautology  
>
>KA3. Finite Additivity: $C(P \lor Q) = C(P) + C(Q)$  
for mutually exclusive $P$ and $Q$.   

### DERIVED IDENTITIES
> D1. $P \lor \neg P$ is a tautology. Hence by KA3, $C(P \lor \neg P) = 1$ 
>
> D2. Since $P$ and $\neg P$ are mutually exclusive, $C(P \lor \neg P) = C(P) + C(\neg P)$ by KA3, we also have $C(P) + C(\neg P) = 1$ or equivalently $C(\neg P) = 1 - C(P)$  

### PROBLEM STATEMENT
><p style='color:teal'>Given $P(X|Y) = P(X)$, i.e A and B are independent, prove that $P(\neg X | \neg Y) = P(\neg X)$, i.e not A and not B are also independent.</p>

> <u>THEOREMS</u>
>
> T0: $\color{purple}P(X|Y) = P(X) \Rightarrow P(Y|X) = P(Y)$  
Proof: $P(X|Y) = P(X) \Rightarrow \frac{P(X \land Y)}{P(Y)} = P(X) \Rightarrow \frac{P(X \land Y)}{P(X)} = P(Y) \\ \Rightarrow P(Y|X) = P(Y)$
>
> T1: If $X$ and $Y$ are independent, so are $\neg X$ and $Y$,  
i.e $\color{purple}P(X|Y) = P(X) \implies P(\neg X | Y) = P(\neg X)$  
>
> Proof: $P(X|Y) = P(X) \implies 1-P(X|Y) = 1 - P(X) \implies P(\neg X|Y) = P(\neg X)$

>Proof:  
>$$
    P(X|Y) = P(X) \\
    \Rightarrow P(Y|X) = P(Y) \;\;\; \because T0 \\
    \Rightarrow P(\neg Y | X) = P(\neg Y) \;\;\; \because T1 \\
    \Rightarrow P(X | \neg Y) = P(X) \;\;\; \because T0 \\
    \Rightarrow P(\neg X | \neg Y) = P(\neg X) \;\;\; _\blacksquare
$$
