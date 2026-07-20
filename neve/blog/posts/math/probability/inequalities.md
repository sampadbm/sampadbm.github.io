---
date: 2026-06-02
title: Some Useful Inequalities and Equalities
tags: [math, inequalities, convexity]
summary: A short note on Jensen’s inequality and some consequences, including AM-GM, AM-QM, AM-HM, Markov and Chebyshev-type inequalities, variance decomposition, and Stein’s lemma.
authors: [sampad]
---

## Jensen's Inequality

Assume $f \in C^2$ is a smooth function. Then $\exists c \in [\min(x_0,x), \max(x_0,x)]$ such that
$$
	f(x) = f(x_0) + f'(x_0)(x-x_0) + \frac{1}{2} f''(c)(x-x_0)^2
$$

Let $X$ be a random variable with $\mathbb E[X] = \mu$. Now $Y = f(X)$ is a random variable.

If $f$ is convex, then $f'' \geq 0$ and hence 
$$
\begin{aligned}
	f(x) \geq f(\mu) + f'(\mu) (x - \mu) \\
\implies \underset{x \sim X}{\mathbb E} \; f(x) \geq f(\mu) + f'(\mu) (\underset{x \sim X}{\mathbb E}\;x - \mu) = f(\mu) + f'(\mu)(\mu - \mu) = f(\mu)\\
\implies \underset{x \sim X}{\mathbb E}[f(x)] \geq f(\mu) = f(\underset{x \sim X}{\mathbb E} x) \\
\implies \boxed{\mathbb E f(X) \geq f(\mathbb E X)}
\end{aligned}
$$

For $f \notin C^2$, but still nice (convex, continuous but not differentiable), we can approximate them using a sequence $(f_n) \in C^2$ such that the above inequality can be proved by passing limits via integration/expectations ($f$ may require regularities like Fubini, Dominated Convergence, etc. to hold)

>Corollary: If $f$ is concave, $\mathbb E[f(X)] \leq f(\mathbb E[X])$ 

### Some examples
1) $f(x) = x^2$, then $\mathbb E [X^2] \geq [\mathbb E X ]^2$
2) $f(x) = |x|$, then $\mathbb E [|X|] \geq |\mathbb E X |$
3) $f(x) = \exp(\lambda x)$, $\lambda >0$,  then $\underbrace{\mathbb E [\exp(\lambda X)]}_{M.G.F \; of \; X} \geq \exp(\lambda \; \mathbb E X ) \implies M_X(\lambda) \geq \exp(\lambda \; \mathbb EX)$
4) $f(x) = |x|^p$, $p \geq 1$, then $\mathbb E [|X|^p] \geq |\mathbb E X |^p$


### AM-GM Inequality

$$
	AM = \frac{a_1 + ...+ a_n}{n} \geq (a_1 ... a_n)^{1/n} = GM
$$

Let $X$ be a random variable with support on the set $\{ a_1,..,a_n\}$ and with equal probabilities of $p_i = 1/n$. 

Set $f = \log$ which is concave. 
$$
\begin{aligned}
	\mathbb E f(X) \leq f(\mathbb E X) \\
	\implies \frac{1}{n} \sum_i^n \log(a_i) \leq \log \frac{1}{n} \sum_i^n a_i \\
\implies \sum_i^n \log a_i^{1/n} \leq\log AM \\
\implies \log \prod_i^n a_i^{1/n} \leq \log AM \\
\implies \log GM \leq \log AM \\
\implies GM \leq AM \quad \blacksquare \\ \because \log \text{is monotone increasing}
\end{aligned}
$$

In general, $AM = \sum_i^n  p_i a_i \geq \prod_i^n a_i^{p_i} = GM$ and the proof is exaclty the same. 

### AM-QM Inequality

Quadratic mean (QM) is larger than the arithmetic mean (AM).

$$
	AM = \frac{a_1 + ...+a_n}{n} \leq \frac{a_1^2 + ... + a_n^2}{n} = QM
$$

Set $f(x) = x^2$ which is convex and hence $\mathbb E f(X) \geq f(\mathbb E X)$ which gives $\sum_i^n p_i a_i^2 \geq \sum_i p_i a_i$. Now set $p_i = 1/n$ to complete the proof.

### AM-HM Inequality
Let $a_i \geq 0$, then 

$$
AM = \frac{a_1 + ... + a_n}{n} \geq \frac{n}{\frac{1}{a_1}+...+\frac{1}{a_n}} = \frac{1}{HM}
$$ 

Set $f(x) = 1/x$ which is convex in $\mathbb R_+$. 

$$
\begin{aligned}
	\mathbb E f(X) \geq f(\mathbb E X) \\
	\sum_i^n \frac{p_i}{a_i} \geq \frac{1}{\sum_i^n p_i a_i} \\
	\sum_i^n p_i a_i \geq \frac{1}{\sum_i^n \frac{p_i}{a_i}}
\end{aligned}
$$

Setting $p_i = 1/n$, we recover the inequality.

### Holder Inequality
>TODO

### Variance Decomposition
$$
\begin{aligned}
0 \leq Var(X) = \mathbb E [(X - \mu)^2] = \underset{x \sim X}{\mathbb E}[(x - \mu)^2] \\
= \underset{x \sim X}{\mathbb E} [x^2 - 2 \mu x + \mu^2] = \underset{x \sim X}{\mathbb E} x^2 - 2\mu \underset{x \sim X}{\mathbb E}x - \mu^2 \\
= \underset{x \sim X}{\mathbb E}x^2 - 2\,u^2 + \mu^2 = \underset{x \sim X}{\mathbb E} x^2 - \mu^2 \\
= \underset{x \sim X}{\mathbb E} x^2 -  [\underset{x \sim X}{\mathbb E} x]^2 = \mathbb E X^2 - [\mathbb E X]^2 \\
\implies  [\mathbb E X]^2 \leq \mathbb E X^2  
\end{aligned}
$$

The above is Jensen's inequality applied with the function $f(x) = x^2$ which is convex and hence $\mathbb E$
## Chebyshev Type Inequalities

>Fact: $$h(x) \geq g(x) \; \forall \; x \; \implies \int_a^b h(x) \geq \int_a^b g(x)$$  
Since the pdf $f(x) \geq 0 \; \forall \; x$, we have  
$$\begin{aligned} 
h(x) \geq g(x) \; \forall \; x\\
\implies h(x) f(x) \geq g(x) f(x) \; \forall \; x \\
\implies \int_{-\infty}^{+\infty} h(x)f(x) dx \geq \int_{-\infty}^{+\infty} g(x)f(x) dx \\ 
\implies \mathbb E h(X) \geq \mathbb E g(X) 
\end{aligned}$$ 


### Case I : Markov's Inequality
Let $Z$ be a positive random variable, i.e $Z \geq 0$. Then for $a > 0$ we have
$$
	P(Z \geq a) \leq \frac{\mathbb E Z}{a}
$$

Proof:
$$
\begin{aligned}
	g(z) := \mathbb 1 [Z \geq a] \leq  \frac{Z}{a} \mathbb 1[Z \geq a] \quad \quad \because \frac{Z}{a} \geq 1 \\
=  \frac{Z}{a} \mathbb 1[Z \geq a] + 0 \cdot \mathbb 1[Z < a] \\ \leq \frac{Z}{a}\mathbb  1[Z \geq a] + \frac{Z}{a}\mathbb 1[Z < a]  \\
= \frac{Z}{a} =: h(x) \\
\implies \mathbb E g(z) \leq \mathbb E h(x) \\
\implies \boxed{P(Z \geq a) \leq \frac{\mathbb E Z}{a}}
\end{aligned}
$$

Alternatively: Let $f$ be the pdf of $Z$. 
$$
\begin{aligned}
	a \cdot P(Z \geq a) = \int_{a}^{+ \infty} a f(z)dz \\
\leq  \int_a^{+\infty} \overbrace{z}^{\geq a} \; f(z)dz \\
\leq \int_a^{+ \infty} z f(z) dz  + \underbrace{\int_0^a z f(z)dz}_{\geq 0} \\
= \int_0^{+\infty} zf(z)dz  = \mathbb E[Z] \\
\implies \boxed{P(Z \geq a) \leq \frac{\mathbb E[Z]}{a}}
\end{aligned}
$$

Oneliner:

$$
\mathbb E Z = \mathbb E \big[ \underbrace{Z \mathbb 1[X < a]}_{\geq 0} + Z \mathbb 1 [Z \geq a] \big] \geq \mathbb E \big [ Z \mathbb 1 [Z \geq a] \big] \geq \mathbb E \big[ a \mathbb 1 [Z \geq a] \big] = a P(Z \geq a)
$$

>**Inner product interpretation (when things are nice):**  
Let us define the inner product between functions $f$ and $g$ as
$$
	\langle f , g \rangle := \int_{-\infty}^{+\infty} f(x) g(x) dx
$$
Then the above inequality is same as
$$
	\langle f, e \rangle \leq \langle  f, h\rangle
$$
where $e(x) = \mathbb 1[x \geq a]$ and $h(x) = x/a$. 


### Case - II : General form

If $g : \mathbb R \rightarrow \mathbb R_+$ be an increasing function (i.e.  $g \geq 0$ and $g' \geq 0$),  then 

$$
	P(Z \geq a ) \leq \frac{\mathbb E g(Z)}{g(a)}
$$

Proof:

$$
	P(Z \geq a) \underset{g' \geq 0}{=} P\big({\color{red}g(Z)} \geq {\color{green}g(a)} \big) = P({\color{red}Y} \geq {\color{green}b}) \leq \frac{\underset{Y}{\mathbb E} \;Y}{b} \underset{LOTUS}= \frac{\mathbb E \; g(Z)}{g(a)}
$$

>**Inner product interpretation (when things are nice):**  
Then the above inequality is same as
$$
	\langle f, e \rangle \leq \langle  f, h\rangle
$$
where $e(x) = \mathbb 1[x \geq a]$ and $h(x) = g(x)/g(a)$. 

Examples

1)  If $\forall x, \; g>0$ and $a>0$ we have by Markov's inequality $$P(g(X) \geq a) \leq \frac{\mathbb E g(X)}{a}$$ 
2) Setting $g(x) = \exp(\lambda x)$ where $\lambda > 0$ (since we need $g' >0$) for $a > 0$, we have $$ P(X \geq a) =  P(e^{\lambda X} \geq e^{\lambda a}) \leq \frac{\mathbb E e^{\lambda X}}{e^{\lambda a}} = e^{-\lambda a} \; M_X(t)$$
3) Let $\mathbb E X = \mu$ and $Var(X) = \underset{X}{\mathbb E} |X - \mu|^2 = \sigma^2$.  
Let $Y := |X - \mu|$, then setting $g(y)=y^2$ which is positive and increasing in $[0,+\infty)$, we get 
$$\begin{align}
P(Y \geq k \sigma) \leq \frac{\underset{Y}{\mathbb E}\; g(Y)}{g(k \sigma)} = \frac{\underset{Y}{\mathbb E} \; Y^2}{k^2 \sigma^2} \underset{LOTUS}= \frac{\underset{X}{\mathbb E} |X - \mu|^2}{k^2 \sigma^2 } =\frac{\sigma^2}{ \sigma^2 k^2} = \frac{1}{k^2} \\
\implies \boxed{P(|X - \mu| \geq k \sigma) \leq  \frac{1}{k^2}}
\end{align}$$
4) In general, we have the *"Standard Chebyshev's inequality"*
$$
\begin{aligned}
	P(|X - \mu| \geq t) \leq \frac{\mathbb E |X-\mu|^2}{t^2} = \frac{Var(X)}{t^2} \\
\implies \boxed{P(|X - \mu| \geq t) \leq \frac{Var(X)}{t^2}} 
\end{aligned}
$$

>Note that this is not simply a consequence of applying the general Chebyshev inequality using the function $g(x) = |x - \mu|^2$ since this function is not monotone. The first step is application of change of variable and then using the random variable $|X - \mu|$ which is positive, we apply the monotone function $g(x) = x^2, \; \forall x \geq 0$ which is increasing in the domain $x \geq 0$. 

#### How tight are these bounds?
For $X \sim \mathcal N(\mu,\sigma^2)$, we know that $P(|X - \mu| \geq 2 \sigma) \leq 5\%$. Using Chebyshev's inequality, we get $P(|X - \mu| \geq 2 \sigma) \leq \frac{1}{4} = 25\%$ which is not that tight. Using different $g$, we may obtain tighter bounds. 

>**Example:**
A fair coin is tossed 80 times. Show that the probability of getting larger than 50 heads is less than $\frac{1}{10}$.  
**Solution:** Let us define the random variable $X$ which is a function from outcomes to the reals such that $X(H) = 1$ and $X(T)=0$. Then we have
$$
\begin{aligned}
	\mathbb E X = 0 \cdot P(X=0) + 1 \cdot P(X=1) = \frac{1}{2} \\
	Var(X) = \frac{1}{4} \cdot P(X=0) + \frac{1}{4} \cdot P(X=1) = \frac{1}{4}
\end{aligned}
$$ 
Let $Z = \sum_{i=1}^{80} X_i$ such that $\mathbb E Z = \sum_{i=1}^{80} \mathbb E X_i = 40$ and $\sigma^2 = Var(Z) = \sum_{i=1}^{80}Var(X_i) = 20$. Hence $\sigma = \sqrt 20$.
Using Markov's inequality, we get
$$
	P(Z \geq 50)  \leq \frac{\mathbb E Z}{50} = \frac{40}{50} = \frac{8}{10}
$$
which is much larger than the expected $\frac{1}{10}$.  
Let us use the Chebyshev bound now,  
$$
	P(|Z - 40| \geq 10) = P(|Z-40| \geq \sqrt{5} \times \sigma) \leq \frac{1}{\sqrt{5}^2} \leq \frac{1}{5}
$$
$$
\begin{aligned}
\frac{1}{5} \geq P(|Z - 40| \geq 10) = P(X \geq 50 | X \leq 30) \\ = \underbrace{P(X \geq 50)}_{K} + \underbrace{P(X \geq 30)}_{K} = 2K \qquad \because \text{symmetry}  \\
\implies K = P(X \geq 50) \leq \frac{1}{10}
\end{aligned}
$$
><p style='color:blue'>Both
Markov’s and Chebyshev’s inequalities are sharp, meaning that they cannot be improved in
general. This means that there exist distributions where Markov and Chebyshev inequalities are tight. However, as seen in the above examples, for certain distributions, they can be loose. [Ch. 2, HDS Book, Wainwright]</p>

#### Concentration using Chebyshev's Inequality
$$
\begin{aligned}
	P(|X - \mu| \leq t) = 1 - P(|X - \mu| > t) \underset{why?}{=} 1 - P(|X - \mu| \geq t) \geq 1 - \frac{Var(X)}{t^2} \\
\implies \boxed{P(|X - \mu| \leq t) \geq 1 - \frac{Var(X)}{t^2}}
\end{aligned}
$$
This last statement is a concentration inequality on the random variable $X$ with an upper bound on probability of $X$ concentrating within $t$ distance of the mean $\mu$.

### Chernoff Bound

Let $Z$ be a positive random variable. In the last example, we saw that the choice of $g$ affects how tight a bound we can obtain using the Chebyshev type inequalities.

Now, if we picked a class of parametrized functions $g_{\lambda} \in G$ given as $g_{\lambda}: \mathbb R \to \mathbb R_+$ that are increasing for the parameters $\lambda \in \Lambda$,

$$
	P(Z \geq a) \leq \frac{\mathbb E g_{\lambda}(Z)}{g_{\lambda}(a)}
$$

Since we do not know which of the functions in the class $G$ give us the tighest bound, we take the infimum over the set $\Lambda$ (we need $g_{\lambda}$ to be increasing)

$$
	P(Z \geq a) \leq  \underset{\lambda \in \Lambda}\inf \frac{\mathbb E \; g_{\lambda}(Z)}{g_{\lambda}(a)}
$$

Now, let us take $g_{\lambda}(x) = \exp(\lambda x)$ with positive range and increasing for $\lambda \in \Lambda = \mathbb R_+$, i.e $\lambda \geq 0$. 

$$\boxed{
	P(Z \geq a) \leq \underset{\lambda > 0}\inf \; \frac{\mathbb E \exp(\lambda Z)}{\exp(\lambda a)} =\underset{\lambda > 0}\inf \; e^{- \lambda a} \; \mathbb E \exp(\lambda Z)  =  \underset{\lambda > 0}\inf \; e^{- \lambda a}\; M_Z(\lambda) }
$$

Note that for $\lambda = 0$, the bound we get is trivial, i.e $P(Z \geq a) \leq 1$ and hence we take infimum over $\lambda > 0$. 

><p style=color:blue>The above inequality is called the Chernoff bound or the Laplace transform.</p>

If we take $0 \leq Z := |X - \mu|$ where $\mu := \mathbb E Z$, then we get

$$
	P(|X - \mu| \geq a ) \leq \underset{\lambda > 0}\inf \; e^{- \lambda a} \; \mathbb E \exp(\lambda |X - \mu|)
$$

However, it is hard to compute the expectation of the exponential of an absolute value function on $X - \mu$. if the distribution is symmetric, use $Z = X - \mu$ and bound the events $A := \{ Z \geq a\}$ and $B := \{ Z \leq -a \}$ separately to get good concentration bounds via the Bonferonni's Inequality <span style=color:blue>[Ch. 1, SI, Casella]</span> which states
$$
	P(A \cap B) \geq P(A) + P(B) - 1
$$
This is no different in information than the union bound given as $P(A \cup B) \leq P(A) + P(B)$.

><p style=color:crimson>Exercise 1: Moment generating Function of Gaussian random variable. </p> 
If $Z \sim \mathcal N(0,\sigma^2)$, then show that $\forall \lambda \in \mathbb R$, $M_Z(\lambda) = \mathbb E \exp(\lambda Z) = \exp(\lambda^2 \sigma^2 / 2)$.  
Also find the MGF of $Y \sim \mathcal N (\mu, \sigma^2)$ using the properties of MGF for sum of independent random variables.

>Solution:
$$
\begin{aligned}
	M_Z(\lambda) = \mathbb E \exp(\lambda Z) = \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty} \exp(\lambda z) \exp(-z^2/2\sigma^2) dz \\
= \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty} \exp( \lambda z - z^2/2\sigma^2) dz \\
= \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty} \exp \bigg[ \bigg(2\sigma^2\lambda z - z^2 - \sigma^4\lambda^2 + \sigma^4\lambda^2 \bigg)/2\sigma^2\bigg] dz \\
= \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty} \exp \bigg[\bigg(\sigma^4\lambda^2 - (z - \sigma^2 \lambda)^2 \bigg)/2\sigma^2 \bigg] dz \\
= \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty} \exp \big(\sigma^2\lambda^2/2 \big) \exp \big[ - (z - \sigma^2 \lambda)^2 /2\sigma^2) \big] dz \\
=  \exp \big(\sigma^2\lambda^2/2 \big) \quad \frac{1}{\sqrt{2\pi \sigma^2}} \int_{-\infty}^{+\infty}\exp \big[ - (z - \sigma^2 \lambda)^2 /2\sigma^2) \big] dz \\
=  \exp \big(\sigma^2\lambda^2/2 \big) \quad \underbrace{\int_{-\infty}^{+\infty} \mathcal N(\sigma^2 \lambda, \sigma^2) dz}_{1} \\ =  \exp \big(\sigma^2\lambda^2/2 \big) \quad \quad \blacksquare
\end{aligned}
$$   
For $Y \sim \mathcal N (\mu, \sigma^2)$, we define a constant random variable $X = \mu$ which is independent of $Z \sim \mathcal N (0, \sigma^2)$ such that $Y = X + Z$. Let $T = \exp(\lambda Y)$.
$$
\begin{aligned}
	M_Y(\lambda) = \underset{T}{\mathbb E} [T] \underbrace{=}_{\text{LOTUS}} \underset{Y}{\mathbb E} [\exp(\lambda Y)]\\
 \underbrace{=}_{\text{multivariate LOTUS}} \underset{X,Z}{\mathbb E} [\exp(\lambda(X + Z))] \\
= \underset{X,Z}{\mathbb E} [\exp(\lambda X) \exp(\lambda Z)] \\
 \underbrace{=}_{\text{independence}} \underset{X}{\mathbb E} [\exp(\lambda X)]  \underset{Z}{\mathbb E} [\exp(\lambda Z)]\\
= \underset{X}{\mathbb E} \exp(\lambda \mu) \; M_Z(\lambda) \\
= \exp(\lambda \mu) \exp(\sigma^2 \lambda^2 / 2) \\
= \exp(\lambda \mu + \frac{\sigma^2 \lambda^2}{2} )
\end{aligned}
$$

><p style=color:crimson> Exercise 2:</p>If we have $Z \sim \mathcal N(\mu, \sigma^2)$, what do you think the value for $\mathbb E \exp \big(\lambda (Z - \mu) \big)$ is?

>Solution: Answer is same as above. Proof uses shift invariance of integral when both function and the density are shifted and since the area is not changed under the shift when integrating all over real line. Or you can view it as the random variable $Z - \mu$ having the same distribution as $\mathcal N (0, \sigma^2)$.

><p style=color:crimson>Exercise 3: Tail Concentration of Gaussian Random variable </p>
Find the Chernoff bound on a  gaussian random variable $Z \sim \mathcal N(0,\sigma^2)$.

>Solution:
Let $a \in \mathbb R$; then
$$
\begin{aligned}
	P(Z \geq a) \leq \underset{\lambda > 0}{\inf} e^{- \lambda a}  M_Z (\lambda) = \underset{\lambda > 0}{\inf} e^{- \lambda a} \exp(\sigma^2 \lambda^2 / 2)  \\
= \underset{\lambda > 0}{\inf} e^{- \lambda a} \exp(\sigma^2 \lambda^2 / 2)  = \underset{\lambda > 0}{\inf} \exp(\sigma^2 \lambda^2 / 2 - \lambda a)  \\ 
= \exp \bigg( \underset{\lambda > 0}{\inf} \big[ \frac{\sigma^2 \lambda^2}{2} - \lambda a \big] \bigg) \quad \because \exp(.) \text{ strictly increasing}\\
= \exp \bigg( \frac{1}{2} \underset{\lambda > 0}{\inf} \big[ \lambda (\sigma^2 \lambda - 2a)  \big] \bigg) \\
\end{aligned}
$$
The roots are $\lambda = 0, 2a/\sigma^2$ and the midpoint of the roots is the minima, i.e $\lambda^* = a/\sigma^2$. Alternatively, set the derivative of the exponent/argument in the expression to zero. The minimum value of the exponent is $\frac{1}{2}\lambda^* (\sigma^2 \lambda^* - 2a) = \frac{1}{2} \frac{a}{\sigma^2} (a - 2a) = -a^2/2\sigma^2$.  
Hence the Chernoff bound for $Z \sim \mathcal N(0,\sigma^2)$ is given by $P(Z \geq a) \leq \exp(-a^2/2\sigma^2)$.   
For the general Gaussian $Z \in \mathcal N(\mu,\sigma^2)$ which is just a shifted version of $\mathcal N(0,\sigma^2)$, we have the Chernoff bound given as 
$$\begin{aligned}
P(Z \geq \mu + a) \leq \exp(-a^2/2\sigma^2) \\ 
\text{ or } 
P(Z - \mu \geq a)  \leq \exp(-a^2 / 2 \sigma^2)
\end{aligned}
$$

><p style=color:blue> <b>Takeaway</b>: Gaussian random variables have tail concentrations that decay fast with exponential of the quadratic of $a$ but scaled down by the variance $\sigma^2$. This also means that the random variable is concentrated pretty much close to the mean given the variance is small.</p>

 Plot 1 — Chernoff bound
  ```vegalite
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 240,
    "title": "Chernoff Bound: P(Z ≥ a) ≤ exp(−a²/2σ²)",
    "data": {"sequence": {"start": 0, "stop": 4.05, "step": 0.05, "as": "a"}},
    "transform": [
      {"calculate": "exp(-datum.a * datum.a / 1.0)", "as": "s05"},
      {"calculate": "exp(-datum.a * datum.a / 2.0)", "as": "s1"},
      {"calculate": "exp(-datum.a * datum.a / 4.0)", "as": "s2"},
      {"fold": ["s05", "s1", "s2"], "as": ["key", "bound"]},
      {"calculate": "datum.key === 's05' ? 'σ²=0.5' : datum.key === 's1' ? 'σ²=1' : 'σ²=2'", "as": "variance"}
    ],
    "mark": {"type": "line", "strokeWidth": 2},
    "encoding": {
      "x": {"field": "a", "type": "quantitative", "title": "Threshold a"},
      "y": {"field": "bound", "type": "quantitative", "title": "Bound value", "scale": {"domain": [0, 1]}},
      "color": {"field": "variance", "type": "nominal", "title": "σ²", "sort": ["σ²=0.5", "σ²=1", "σ²=2"]}
    }
  } 
  ```



## Sub-Gaussian Random Variables

  Plot 2 — PDF tails
  ```vegalite
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 240,
    "title": "Sub-Gaussian vs Gaussian vs Heavy-Tailed PDFs",
    "data": {"sequence": {"start": -4.5, "stop": 4.55, "step": 0.05, "as": "x"}},
    "transform": [
      {"calculate": "exp(-datum.x * datum.x / 2) / 2.5066", "as": "gaussian"},
      {"calculate": "exp(-datum.x * datum.x) / 1.7725", "as": "subgaussian"},
      {"calculate": "0.5 * exp(-abs(datum.x))", "as": "laplace"},
      {"fold": ["gaussian", "subgaussian", "laplace"], "as": ["key", "pdf"]},
      {"calculate": "datum.key === 'gaussian' ? 'Gaussian N(0,1)' : datum.key === 'subgaussian' ? 'Sub-Gaussian N(0,0.5)' :
  'Laplace (heavier tails)'", "as": "Distribution"}
    ],
    "mark": {"type": "line", "strokeWidth": 2},
    "encoding": {
      "x": {"field": "x", "type": "quantitative", "title": "x"},
      "y": {"field": "pdf", "type": "quantitative", "title": "PDF f(x)"},
      "color": {"field": "Distribution", "type": "nominal"}
    } 
  }
  ```



A centered random variable is sub-Gaussian if its exponential moments are bounded by those of some centered Gaussian. This implies Gaussian-rate decay of its tail probabilities. The moment generating function (M.G.F) captures how fast the tail of the pdf decays (think of the similarity to Laplace transforms in signals and systems). Intuitively, you can think that we want to compare the tail behaviour that is far away towards the plus infinity of the given/test pdf with the Gaussian pdf. Intuitively, we could set a cutoff that is really far away and then measure the area under the two pdfs and the one that has higher total probability mass after the cutoff is heavy tailed. However, setting a hard cutoff distance/farness is arbitrary and hence we use a soft and weighted mass that is weighted by the function $\exp(\lambda z)$ where $\lambda$ controls the softness/weight (the exponential function is low initially and grows fast as we move towards plus infinity).

<p><b><u style="color:blue">Some more intuition (inaccurate but useful):</u></b></p>
Let us ponder on this a bit more. Let there be a centered distribution  (assume on x-axis with CDF given by $F(x)$, PDF $f(x)$) such that for thresholds $\lambda \geq 5$, the standard normal (CDF $N(x)$, PDF $n(x)$) has more mass than our distribution, i.e 
$$ \int_{\lambda}^{\infty} n(x) dx = 1 - N(\lambda) \geq 1 - F(\lambda) = \int_{\lambda}^{\infty} f(x) dx, \; \forall x \geq \lambda$$.  
Now, it is not true for $x <  \lambda$. So for example, $1 - N(4) \ngeq 1 - F(4)$. We can try to find a possibly non standard gaussian (CDF $G_{\sigma}(x)$) with variance $\sigma^2$ ($\sigma$ maynot be 1) such that no matter what threshold $\lambda$ is chosen, $1 - G_{\sigma}(x) \geq 1 - F(x)$, i.e it holds for all $x > 0$. We can associate/characterize the distribution $F(x)$ with the smallest $\sigma$ that makes the statement $\forall \; x > 0, 1 - G_{\sigma}(x) \geq 1 - F(x)$. We can call all these distributions $\color{green}\sigma\text{-pseudo-subgaussian random variables}$. 

Now imagine using a soft threshold/weighting instead of a hard threshold with the weight given by $\exp(\lambda)$. The smallest $\sigma$ such that 
$$
\int_{-\infty}^{+\infty} \exp(\lambda x)f(x) dx =  M_F(\lambda) \leq M_{G_{\sigma}}(\lambda) = \int_{-\infty}^{+\infty} \exp(\lambda x)g_{\sigma}(x) dx, \; \forall \; \lambda >0
$$
 is a characteristic of the distribution $F(x)$. All distributions that satisfy the above condition for a given $\sigma$ are called $\color{green}\text{$\sigma$-subgaussian}$ distributions (or random variables). 
>Note: Since $\exp(\lambda x)$ decays fast on the negative $x$-axis, integrating over the whole real axis is fine. 


$\color{green}\text{Definition:}$ A random variable is called $\sigma$-subgaussian if it has a finite expectation and satisfies 
$$
\boxed{
\forall \; \lambda \in \mathbb R, \; M_{X - \mathbb E X}(\lambda) = \mathbb E \big[ \exp \big (\lambda (X - \mathbb E X) \big) \big] \leq \exp\big(\frac{\lambda^2 \sigma^2}{2} \big) 
}$$

>$\sigma$ is known as the variance-proxy of the subgaussian random variable. This is so because on many occasions $\sigma$ behaves exactly how it does for a normal $\mathcal{N}(\mu, \sigma)$. The minimal $\sigma$ for which the above is true is called the optimal variance proxy. 



  ```vegalite
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 280,
    "title": "Hard vs Soft Tail Cutoffs",
    "data": {"sequence": {"start": -3, "stop": 3.05, "step": 0.05, "as": "z"}},
    "transform": [
      {"calculate": "datum.z >= 1 ? 1 : 0", "as": "hard_a1"},
      {"calculate": "datum.z >= 2 ? 1 : 0", "as": "hard_a2"},
      {"calculate": "exp(0.5 * datum.z)", "as": "soft_l05"},
      {"calculate": "exp(1.0 * datum.z)", "as": "soft_l1"},
      {"fold": ["hard_a1", "hard_a2", "soft_l05", "soft_l1"], "as": ["key", "val"]},
      {"calculate": "datum.key === 'hard_a1' ? 'hard a=1' : datum.key === 'hard_a2' ? 'hard a=2' : datum.key === 'soft_l05' ? 'soft
  λ=0.5' : 'soft λ=1'", "as": "label"}
    ],
    "mark": {"type": "line", "strokeWidth": 2, "clip": true},
    "encoding": {
      "x": {"field": "z", "type": "quantitative", "title": "z"},
      "y": {
        "field": "val", "type": "quantitative", "title": "weight",
        "scale": {"domain": [0, 5]}
      },
      "color": {
        "field": "label", "type": "nominal",
        "sort": ["hard a=1", "hard a=2", "soft λ=0.5", "soft λ=1"],
        "scale": {
          "domain": ["hard a=1", "hard a=2", "soft λ=0.5", "soft λ=1"],
          "range": ["#9ecae1", "#3182bd", "#fdae6b", "#e6550d"]
        }
      },
      "strokeDash": {
        "field": "label", "type": "nominal",
        "scale": {
          "domain": ["hard a=1", "hard a=2", "soft λ=0.5", "soft λ=1"],
          "range": [[4,3], [4,3], [1,0], [1,0]]
        },
        "legend": null
      }
    }
  }
  ```



 
 ```vegalite
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 520,
    "height": 300,
    "title": "MGF M(λ) = E[exp(λX)] — Laplace diverges at |λ|=1",
    "data": {"sequence": {"start": -1.2, "stop": 1.22, "step": 0.005, "as": "l"}},
    "transform": [
      {"calculate": "exp(datum.l * datum.l / 2)", "as": "gaussian"},
      {"calculate": "exp(datum.l * datum.l / 4)", "as": "subgaussian"},
      {"calculate": "abs(datum.l) < 0.99 ? 1 / (1 - datum.l * datum.l) : null", "as": "laplace"},
      {"fold": ["gaussian", "subgaussian", "laplace"], "as": ["key", "mgf"]},
      {"calculate": "datum.key === 'gaussian' ? 'Gaussian N(0,1)' : datum.key === 'subgaussian' ? 'Sub-Gaussian N(0,0.5)' :
  'Laplace'", "as": "Distribution"}
    ],
    "layer": [
      {
        "mark": {"type": "line", "strokeWidth": 2.5, "clip": true},
        "encoding": {
          "x": {"field": "l", "type": "quantitative", "title": "λ"},
          "y": {"field": "mgf", "type": "quantitative", "title": "M(λ)", "scale": {"domain": [0, 12]}},
          "color": {
            "field": "Distribution", "type": "nominal", "legend": null,
            "scale": {
              "domain": ["Gaussian N(0,1)", "Sub-Gaussian N(0,0.5)", "Laplace"],
              "range": ["#1f77b4", "#2ca02c", "#d62728"]
            }
          },
          "strokeDash": {
            "field": "Distribution", "type": "nominal", "legend": null,
            "scale": {
              "domain": ["Gaussian N(0,1)", "Sub-Gaussian N(0,0.5)", "Laplace"],
              "range": [[1,0], [6,3], [2,3]]
            }
          }
        }
      },
      {
        "transform": [
          {"filter": "(datum.Distribution === 'Gaussian N(0,1)' && abs(datum.l - 1.15) < 0.003) || (datum.Distribution ===
  'Sub-Gaussian N(0,0.5)' && abs(datum.l - 1.15) < 0.003) || (datum.Distribution === 'Laplace' && abs(datum.l - 0.9) < 0.003)"}
        ],  
        "mark": {"type": "text", "align": "left", "dx": 5, "fontSize": 11, "clip": false},
        "encoding": {
          "x": {"field": "l", "type": "quantitative"},
          "y": {"field": "mgf", "type": "quantitative"},
          "text": {"field": "Distribution"},
          "color": {  
            "field": "Distribution", "type": "nominal", "legend": null,
            "scale": {
              "domain": ["Gaussian N(0,1)", "Sub-Gaussian N(0,0.5)", "Laplace"],
              "range": ["#1f77b4", "#2ca02c", "#d62728"]
            }
          }
        }
      }
    ]
  }
  ```


### Sum of Sub-Gaussian Random Variables

Let $S = \sum_i^n X_i$ be the sum of $n$ independent subgaussian random variables with $\sigma_i$-subgaussianes such that $\mathbb E \sum_i X_i = \sum_i \mathbb E X_i$.

$$
\begin{aligned}
	M_{S - \mathbb E S} (\lambda) = \mathbb E \big[ \exp \big( \lambda \sum_i (X_i - \mathbb E X_i) \big)  \big] 
	= \prod_i M_{X_i - \mathbb E X_i}(\lambda) \\
	\leq \prod_i \exp(\frac{1}{2} \lambda^2 \sigma_i^2) = \exp(\frac{1}{2}\lambda^2 \;{\color{crimson}{\sum_i \sigma_i^2}}) = \exp(\frac{1}{2} \lambda^2 {\color{crimson}\sigma^2})
	\end{aligned}
$$

Hence $S$ is $\sqrt{\color{crimson}{\sum_i \sigma_i^2}}$-subgausssian random variables add just like normal $\mathcal N (\mu_i, \sigma_i^2[)$ random variables.

### Scalings of Sub-Gaussian Random Variables

Let $X$ be $\sigma$-subgaussian and $Y := aX$ for some $a \in \mathbb R$. Then for $\forall \lambda \in \mathbb R$, we have

$$
\begin{aligned}
	M_{Y - \mathbb EY (\lambda)} = \underset{Y}{\mathbb E} \;  [\exp \big( \lambda (Y - \mathbb E_Y Y) \big) ] \; \underbrace{=}_{LOTUS} \; \underset{X}{\mathbb E} \; [\exp( \lambda (Y - \mathbb E_Y Y))] \\
	= \underset{X}{\mathbb E} \; [\exp \big(\lambda  (aX - a\mathbb E_X X) \big)] = \underset{X}{\mathbb E} [ \exp \big( {\color{green}\lambda a} \; (X - \mathbb E_X X) \big) ] \\
	= M_{X - \mathbb E X}({\color{green}\lambda a}) \\
	\underbrace{\leq}_{X \text{ is subgaussian}} \exp(\frac{1}{2} \lambda^2 {\color{crimson}a^2 \sigma^2}  )
\end{aligned}
$$

Hence $Y = a X$ has variance proxy $\color{crimson} a \sigma$ which is also how a normal random variable ${\color{crimson}a} \; \mathcal N(\mu, {\color{crimson}\sigma^2})$ behaves.


### Shifting by constant.

If $X$ is $\sigma$-subgaussian, so is $X + \mu$.

### Linear combinations of Sub-Gaussian Random Variables

Let $X_i$ be $\sigma_i$-subgaussian. Then $Y := \sum_i^n a_i X_i$ is $\sqrt{{\color{crimson}a_i^2 \sigma_i^2}}$-subgaussian.

### Tail concentration of subgaussian random variables via Chernoff's inequality

Let X be $\sigma$-subgaussian. Let $Y = X - \mu$  where $\mathbb E_X X = \mu$.

By Markov's inequality,

$$
	P(Y \geq t) =  P(e^{\lambda Y} \geq e^{\lambda t}) \leq \frac{\mathbb E_Y e^{\lambda Y} }{e^{\lambda t}} \\
	P(Y \geq t) \leq e^{-\lambda t} \mathbb E_Y e^{\lambda Y} \\
$$

By Chernoff's inequality (optimize over $\lambda$ to get the best bound)

$$
\begin{aligned}
	P(Y \geq t) \leq \inf_\lambda \; e^{-\lambda t} \mathbb E_Y e^{\lambda Y} \underbrace{=}_{LOTUS} \inf_\lambda e^{-\lambda t} M_{X - \mathbb E X}(\lambda) \\
	\leq \inf_\lambda e^{-\lambda t} e^{\frac{1}{2} \lambda^2 \sigma^2} \;\;\; \because \text{subgaussian}\\
	\leq \inf_\lambda \exp\bigg( -\lambda t  + \frac{1}{2} \lambda^2 \sigma^2  \bigg) \\
	\leq \exp \bigg( \inf_\lambda  \frac{1}{2} \lambda^2 \sigma^2 -\lambda t \bigg)  = \exp\bigg(  \inf_\lambda \frac{1}{2} \lambda (\lambda \sigma^2 - 2t)\bigg)
\end{aligned}
$$

The roots of the quadratic are $\lambda = 0,\frac{2t}{\sigma^2}$ and the minima lies at the midpoint of the two roots which is $\lambda_* = \frac{0 + 2t/\sigma^2}{2} = t/\sigma^2$.

Pluggin $\lambda_*$ into the quadratic, we get $\frac{1}{2} \frac{t}{\sigma^2}(\frac{t}{\sigma^2} \sigma^2 - 2t) = - \frac{t^2}{2 \sigma^2}$

Hence we have by Chernoff's inequality

$$
	P(X - \mathbb E X  \geq t) \leq \exp \bigg( -\frac{t^2}{2 \sigma^2} \bigg) -- \color{fuchsia}(1)
$$

Similarly, for the random variable $Z=-X$ which is also $\sigma$-subgaussian, we have

$$
	P(Z - \mathbb E Z \geq t)  \leq \exp \bigg(-\frac{t^2}{2 \sigma^2} \bigg) \\
	\implies P(-X + \mathbb EX \geq t)  \leq \exp \bigg(-\frac{t^2}{2 \sigma^2} \bigg) -- \color{fuchsia}(2) \\
	
$$


From inequalities $\color{fuchsia}(1)$ and $\color{fuchsia}(2)$, for any $\sigma$-subgaussian random variable $X$, we have

$$
	\boxed{
		P(|X - \mathbb EX| \geq t) \leq \exp \bigg( - \frac{t^2}{2 \sigma^2}\bigg)
	}
$$

### Radamacher/Symmetric Bernoulli Random Variables

$X$ is a Radamacher random variable if

$$
	P(X=-1) = P(X=1) = \frac{1}{2}
$$ 

Claim: $X$ is $\color{crimson}1$-subgaussian

Proof:  
 
$\forall \; \lambda \in \mathbb R$, we have
 
$$
\begin{aligned}
	M_{X - \underbrace{\mathbb EX}_{0}}(\lambda) = M_X(\lambda) = \frac{1}{2} (e^\lambda + e^{-\lambda})  \\
	= \frac{1}{2} \bigg( \sum_{k=0}^\infty \frac{\lambda^k}{k!} + \sum_{k=0}^\infty \frac{(-\lambda)^k}{k!} \bigg) 
	= \frac{1}{2} \sum_{k=0}^\infty \frac{2 \lambda^{2k}}{(2k)!} \\ 
	= \sum_{k=0}^\infty \frac{\lambda^{2k}}{1 \cdot 3 \cdot 5\cdot \cdot \cdot (2k-1)\;\;\cdot\;\; 2 \cdot 4 \cdot 6 \cdot \cdot \cdot 2k} \\
	= \sum_{k=0}^{\infty} \frac{\lambda^{2k}}{1 \cdot 2 \cdot 3 \cdot \cdot \cdot (2k-1) \;\; \cdot \;\; 2^k\;\;\cdot 1 \cdot 2 \cdot 3 \;\; \cdot \cdot \cdot (2k)} \\
	\leq \sum_{k=0}^\infty \frac{\lambda^{2k}}{2^k k!} = \sum_{k=0}^\infty \frac{(\lambda^2/2)^k}{k!} = \exp \bigg(\frac{\lambda^2}{2} \bigg) = \exp \bigg( \frac{\lambda^2}{2 \cdot {\color{crimson}1^2}} \bigg)
\end{aligned}
$$

### Hoeffding's Lemma

Any almost surely bounded random variable $X$ (there might be a nullset which is not within the bound but its measure/probability is zero), i.e. $P(a \leq X \leq b) = 1$ is $\color{crimson}\frac{b-a}{2}$ subgaussian.  
See <a target="_blank" style="color:crimson" href=https://en.wikipedia.org/wiki/Hoeffding%27s_lemma>proof</a>.

### Hoeffding's Inequality

Hoeffding's inequality helps us get bounds on a sum of independent (**not necessarily identically distributed**) but bounded random variables.  
Let $S = X_1 + ... + X_n$ be the sum of $n$ independent random variables with each one bounded almost surely in $[a_i,b_i]$,  i.e. $P( a_i \leq X_i \leq b_i) = 1$.  
Let $S_n = \sum_i^n X_i$. Then

$$\boxed{
    P(|S_n - \mathbb E S_n| \geq t) \leq 2 \exp \bigg( - \frac{2 t^2}{\sum_{i=1}^n (b_i - a_i)^2} \bigg)}
$$

Proof:

By Hoeffding's lemma, $X_i$ are $\sigma_i = \frac{b_i - a_i}{2}$ subgaussian. By the algebra of subgaussian random variables, we know that the sum $S_n$ of independent subgaussian random variables have the variance proxy $\sigma$ such that ${\color{crimson}\sigma^2} = \sum_{i=1}^n \sigma_i^2 =  \frac{\sum_{i=1}^n (b_i - a_i)^2}{4}$. By the tail concentration via Chernoff's inequality (see above)

$$
    P(|S_n - \mathbb S_n| \geq t) \leq 2 \exp \bigg( - \frac{t^2}{2 {\color{crimson}\sigma^2}} \bigg) \\\;\\
    
    \implies P(|S_n - \mathbb S_n| \geq t) \leq 2 \exp \bigg( - \frac{2 t^2}{\sum_{i=1}^n (b_i - a_i)^2}\bigg) \qquad {}_\blacksquare
$$
 


## Some equalities

### Stein's Lemma/method

Let $X \sim \mathcal N(0,1)$, and $g$ be a differentiable, nice function (we ommit the technicalities for being a nice function), then Stein's lemma states that

$$
	\boxed{\mathbb E \big[ g'(X) \big] = \mathbb E \big[X g(X) \big]}
$$

**Proof:**  

Recall that if $f(x)$ is the pdf of $\mathcal N(0,1)$, then $f(x) = \frac{1}{\sqrt{2\pi}} \exp(-x^2/2)$ and $f'(x) = - \frac{1}{\sqrt{2\pi}} \; x \; \exp(-x^2/2) = - x f(x)$.

Also one of he niceties on $g$ forces it to be finite at $\pm \infty$.

$$
\begin{aligned}
	\mathbb E \big[ g'(X) \big] = \int_{-\infty}^{+\infty} g'(x)f(x) \\ = f(x) g(x) |_{-\infty}^{+\infty} - \int_{-\infty}^{+\infty} f'(x) g(x) dx \\
= \underbrace{f(+\infty)}_{0} g(+\infty) - \underbrace{f(-\infty)}_{0}g(-\infty) + \int_{-\infty}^{+\infty} xg(x) f(x) dx \\
= \int_{-\infty}^{+\infty} x g(x) f(x) dx = \mathbb E \big[ Xg(X) \big]
\end{aligned}
$$

Further more, if $X \sim \mathcal N(\mu,\sigma^2)$, then 
$$
	 \boxed{\sigma^2 \mathbb E \big[ g'(X) \big] = \mathbb E \big[ (X- \mu) g(X) \big]}
$$

>*From Wiki: On use of Stein's lemma in Gradient Descent*  
Stein's lemma can be used to stochastically estimate gradients.
Define
$$
F(x) := \mathbb E_{\epsilon \sim \mathcal N(0,I)}
\left[g(x+\Sigma^{1/2}\epsilon)\right].
$$
Then Stein's lemma gives
$$
\nabla_x F(x)
=
\Sigma^{-1/2}
\mathbb E_{\epsilon \sim \mathcal N(0,I)}
\left[g(x+\Sigma^{1/2}\epsilon)\epsilon\right].
$$
With IID samples
$$
\epsilon_1,\ldots,\epsilon_N \sim \mathcal N(0,I),
$$
we get the Monte Carlo estimate
$$
\nabla_x F(x)
\approx
\Sigma^{-1/2}
\frac{1}{N}
\sum_{i=1}^N
g(x+\Sigma^{1/2}\epsilon_i)\epsilon_i.
$$
This form has applications in *Stein variational gradient descent* and *Stein variational policy gradient*.
