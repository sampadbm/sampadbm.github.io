---
date: 2026-10-05
title: Outer Measures
tags: [math, realanalysis]
summary: Notes from 525A/Follands
authors: [sampad]
---

### Remark on notations

We follow Follands' notation where $\subset$ is not proper subset but could be the whole set itself. 


### Outer Measure

Let $X$ be a non empty set. Then $\mu^* : \mathcal{P}(X) \rightarrow [0,\infty]$ is an **outer measure** if it satisfies

$$
	\boxed{
	\begin{array}{l}
	i) \quad \mu^*(\emptyset) = 0 \\
	ii) \;\; A \subseteq B \implies \mu^*(A) \leq \mu^*(B) \\
	iii) \; \mu^*(\cup_1^\infty A_j) \leq \sum_1^\infty \mu^*(A_j)
	\end{array}
	}
$$

The second and third properties are called monotonicity and countable sub-additivity of the outer measure.
An outer measure is close in notion to a measure except its not required to volume the union of disjoint sets as sum of their volumes. The outer measure is more relaxed, the volume of the union can be lesser. 


### Outer measures from a vague notion of measure.

Let $\mathcal{E} \subset \mathcal{P}(X)$ where $\mathcal{E}$ is called an **elementary set**. $\mathcal{E}$ is not a $\sigma$-algebra but it has some properties of one like $\emptyset , X \in \mathcal{E}$. Let $\rho : \mathcal{E} \rightarrow [0,\infty]$ be a vague notion of measure on the elementary set $\mathcal{E}$. From this vague notion $\rho$ defined only on the elelementary sets, we construct an extention on the power set of $X$ which is an outer measure $\mu^* : \mathcal{P}(X) \rightarrow [0,\infty]$. We want to finally construct a measure but we do it gradually by first getting to an outer measure $\mu^*$ which has properties closer to a measure than vague notion $\rho$.

Let $A \in \mathcal{P}(X)$, i.e. $A \subset X$.  

Then we define the outer measure as the **sum of the vague measures of the sets $E_j$ in $\mathcal{E}$ that most <span style='text-decoration:underline'>efficiently</span> cover $A$**.

$$
	\boxed{\mu^*(A) : \inf \Big\{  \sum_1^\infty \rho(E_j) : E_j \in \mathcal{E} \text{ and } A \subset \bigcup_1^\infty E_j \Big\}}
$$
><div style='color:crimson; font-size: 65%'> There is a typo on page 29 in Folland 2nd edition. In the above definition, they mistakenly use $\mu$ instead of $\rho$ and $\mu$ isn't defined anywhere.
Nor does it mean a measure since we do not have a measure yet - infact we want to construct one from the vague $\rho$.</div>

Claim : $\mu^*$ is an outer measure. Proof follows by verifying outer measure properties.

Property I : $\mu^*(\emptyset) = 0$  
By definition, $\mu^*(\emptyset) := \inf \big\{  \sum_i^\infty \rho(E_j) : E_j \in \mathcal{E} \text{ and } A \subset \bigcup_i^\infty E_j \big\}$.  
Since $\rho(.) \geq 0$, the lowest we can achieve is $0$. Now we achieve that by setting $E_j = \emptyset$ since we have $\rho(\emptyset) = 0$.  

Property II - Monotonicity: $\mu^* (A) \leq \mu^*(B)$ when $A \subset B$  
Since $ B \supset A$, any cover of $B$ is also a cover of $A$. Take the most $\rho$-efficient cover of $B$ which has efficiency $\mu^*(B)$. Now this is also a cover or $A$ and hence the most efficient cover for $A$, i.e. $\mu^*(A)$, must be atmost (as good as) $\mu^*(B)$.  

Property III - Countable sub-additivity:  
This is the one which is a bit subtle. Let $\big\{A_j \big\}_1^\infty$ be a sequence of countable subsets of $X$. The most $\rho$-efficient cover for each $A_j$ is the infimum over the covers of $A_j$ which is $\mu^*(A_j)$. By definition of infimum, for any $\epsilon_j > 0$, there exists a cover $C_j$ (i.e. $\bigcup_{Y \in C_j} Y \supset A_j$) whose cost $k(C_j) := \sum_{Y \in C_j} \rho(Y)$ is less than $\mu^*(A_j) + \epsilon_j$. Now, union over the covers, i.e. $\bigcup_1^\infty C_j =: C$ is a cover of the unions, i.e. $\bigcup_1^\infty A_j =: A$. The cost of the cover $k(C)$ is atmost the sum of the costs of each cover since the cost can only be lesser since there could be overlap between the covers whose $\rho$-cost will be double counted. Hence $k(C) \leq \sum_i^\infty k(C_j)$. But again, $C$ is just one of many covers of $A$ and hence the most $\rho$-efficient cover of $A$ whose cost is $\mu^*(A)$ must cost less than $k(C)$. Hence $\mu^*(A) \leq k(C) \leq \sum_1^\infty k(C_j) \leq \sum_1^\infty \mu^*(A_j) + \epsilon_j$. Since $\epsilon_j$ are arbitrary, we set $\epsilon_j = \epsilon / 2^j$ where $\epsilon>0$ is alrbitrary. Then we get $\mu^*(A) \leq \sum_1^\infty \mu^*(A_j) + \epsilon$ and since $\epsilon>0$ is arbitrary, we can drive it as low as we want and still have $\mu^*(A) \leq \sum_1^\infty \mu^*(A_j) \quad {}_\blacksquare$ 

### $\;\mu^*$-measurability

We need the notion of **$\mu^*$-measurable sets** (outer measurability of a set) to move from outer measures to measures.  
If $\mu^*$ is an outer measure on $X$, then we say a set $A \subset X$ (or $A \in \mathcal{P}(X)$) is $\mu^*$-measurable if $\; \forall \; E \subset X$, we have

$$\boxed{
	\mu^*(E) = \mu^*(E \cup A) + \mu^*(E \cup A^c)
	}
$$

>**Remark:**  
Since $E = (E \cap A) \sqcup (E \cap A^c)$, by subadditivty of $\mu^*$, $\mu^*(E) \leq \mu^*(E \cap A) + \mu^*(E \cap A^c)$. Hence we could also define $\mu^*$-measurability of $A$ to be
$$
\boxed{
	\mu^*(E) \geq \mu^*(E \cap A) + \mu^*(E \cap A^c)
	}
$$

>**Intuition:**  
The intuition comes from the way we measure areas/volumes. From middle school, recall how to get the area of
a closed and bounded region drawn on a graph paper.  The sum of the areas of the tiny squares (of the grid) that lie completely inside the
region is a lower bound for the arae of the figure. The sum of the areas of the tiny squares of any cover of the region is an upper bound. We define the "outer area" of the region as the area of the most efficient (best) cover for the region. Similarly we can define the inner area as the most efficient (tight) inner cover.   
However, there is more generality here than was there in middle school. The tiny squares of the graph paper were all disjoint which formed the elementary set. However, in the above formulation, the elementary sets do not need to be disjoint. Also the tiny squares in the graph paper were all of the same area where as the vague measure/area assigned to the elementary sets via $\rho$ are not the same and are of varying sizes.  
The other intuition is about inner-measures. The inner measure is intuitively the sum of areas of the tiny squares in the graph that are completely inside the region. But interestingly, we do not need a new definition for inner measure. We can use outer measure to define the inner measure. Building on the graph example, the inner measure can be described in terms of the outer area/measure of the complement of the region. Subtract the outer area/measure of the complement of the region from the total area of
whole region. In that sense, a set $A$ is outer measurable if for a well behaved set containing $A$, i.e. $E \supset A$, the outer measure of $A$ and the inner measure of $A$ coincide. 
$$
	\mu^*(E) = \mu^*(E \cap A) - \mu^*(E \cap A^c) = \mu^*(A) + \mu^*(E \backslash A) \\
	\implies \underbrace{\mu^*(A)}_{\text{outer measure}} = \underbrace{\mu^*(E) - \mu^*(E \backslash A)}_{\text{defn. of inner measure}}
$$
The outer measure definition is quivalent to saying that the inner and outer measures agree for well behaved sets like $E$ containing $A$ to arbitrary set $E$ is a leap. But the outer measure definition accomodates any arbitrary $E \subset X$ and that leapis a large one. This leap is justified by the **Caratheodory's theorem**

