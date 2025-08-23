---
category: research
---
<script>
    // jump to slide 2 and not slide 1 which is frontmatter
    window.location.hash = '2';
</script>
## PhD Thesis Proposal


<img src='res/logos/usc.png' height='25%vh' width='25%vh' />
</br>
</br>
**UNIVERSITY OF SOUTHERN CALIFORNIA**

### <u> Committee members </u>

**Bhaskar Krishnamachari | Aiichiro Nakano |Satish Kumar Thittamaranahalli | Jiapeng Zhang | Robert Guralnick**

##### Presenter: Sampad Bhusan Mohanty
###### 31st July, 2025

---
exclude: true
class: center middle

### Timeline

<pre class="mermaid">
        graph LR
        A["QUALS<br>Summer 2024"] --> B["PROPOSAL<br>Summer 2025"] --> C["DEFENSE<br>Summer 2026"]
</pre>

---
class: center middle

### PRESENTATION OUTLINE
##### 1. Quick Recap of work upto Quals | Summer 2024
##### 2. Updates since Quals | Summer 2024 - Summer 2025
##### 3. Proposed Work | Summer 2025 - 2026
---
class: center middle

<h3 style="color:darkturquoise">QUALS RECAP</h3>
---
### Dataset

GPS logs from Taxi's operating in Beijing and Shanghai, China over a month.

### Problem
- Noisy data
- Lots of missing entries (sensor/network/power failures)
- Cost restrictions - sparse and non-uniform sensor deployment
- Too large to store over longer periods (terrabytes/day)

### Task
Address the challenges
posed by mobility datasets.

	- Denoise and recover missing entries.
	- Store data more efficiently, compression.

---
exclude: true

### Raw data

<img src='res/images/gm_ppt_figures/datatable.png' width='100%vw'>

>>> `GPS Logs from ~ 2500 Taxis over 1 month`

---
### Grid view (Shanghai)

<img src='res/images/gm_ppt_figures/shanghai_grid.png' width='80%vw'>
>>>  30 x 30 grid of traffic density data

---

### Representations

<img src="res/images/gm_ppt_figures/missing-tensor.png" width="45%vw"/>
<img src="res/images/gm_ppt_figures/missing-matrix.png" width="45%vw"/>
>>> Tensor   $\hspace{11em}$   Matrix
---
exclude: true
### Tensor Terminology
![tensors](res/images/gm_ppt_figures/scalar-vector-tensor.png)

- Scalars, vectors, and matrices are $0^{th}, 1^{st},$ and $2^{nd}$ order tensors.

- For us, tensors mean a $3^{rd}$ or higher order tensor.

---
exclude: true
### Clash of cultures
<img src='res/images/tensors/clash-of-cultures.png' width='70%vw'>

Preface, Tensors: Geometry and Applications,

J. M. Landsberg

---
exclude: true
### Processed traffic density (1 hour x 1km x 1km)

<img src='res/paper_figures/rawdata.png' width='90%vw'>
>>> >>> $X \times Y \times T$ tensors

---
exclude: true
### Processed traffic density visualizations
<img src='res/images/gm_ppt_figures/tensor.png' width='50%vw' style="float:right">
<img src='res/paper_figures/rawdata.png' width='50%vw' style="float:right">
$\hspace{20em} X \times Y \times T$

**Spatial plot: **
Contract time dim. using vector $\mathbf{1_T} \in \mathbb{R}^T$

**Temporal plot:**
Contract spatial dims. using vectors $\mathbf{1_X} \in \mathbb{R}^X$ and $\mathbf{1_Y} \in \mathbb{R}^Y$

Same as contraction with matrix dot/inner product on spatial dimensions using
matrix $\mathbf{1_X1_Y'} \in \mathbb{R}^{X \times Y}$ as $\mathbf{u^TBv} = \langle \mathbf{B},\mathbf{vu^T} \rangle$


---

### Prior work : Low Rank Structure in Traffic Density
<img src='res/images/gm_ppt_figures/missing-matrix.png' width='45%vw'>
<img src='res/images/gm_ppt_figures/pca-variance.png' width='45%vw'>
<img src='res/images/gm_ppt_figures/pca-paper-time-pattern.png' width='100%vw'>
<small><a href="https://anrg.usc.edu/www/papers/Revealing.pdf">F. Bai and B. Krishnamachari, “Revealing a Hidden, Stable Spectral Structure of Urban Vehicular Traffic,” in Proc. IEEE Vehicular Networking Conf. (VNC), 2021</a></small>

---
exclude: true
### Prior work @ USC-ANRG + GM : Imputation method
<img src='res/images/gm_ppt_figures/pca-paper-imputation-performance.png' width='100%vw'>

---
exclude: true
### Atoms using (outer) products

<img src='res/images/gm_ppt_figures/tensor-rank-1-approx.png' width='70%vw'>

>>> >>> Atoms or "Simple tensors"

---
exclude: true
### Some other decompositions
<img src='res/images/gm_ppt_figures/tucker-decomp.png' width='100%vw'>

$$\text{Tucker vs CP Decompositions}$$

---
### Matrix vs Tensor decomposition

<img src='res/images/tensors/p-np.png' width='40%vw'>

|Factorization | | Time complexity | | Notes |
|--------------|-|---------------|---|------|
|$\;$|$\;$|$\;$|$\;$|
| Cholesky,QR | | $O(n^3), O(mn^2)$ | | |
| SVD | | $O(mn^2)$ | |  $\hspace{4em} m \geq n$|
|EVD| | $O(n^3)$ | |  |
| CP rank $\leq$ k? | | NP Complete | | ||
| Exact CP | | NP Hard | | $\because$ finding rank is NP Hard||

---
exclude: true
### Other peculiarities of Matrix vs Tensor decomposition

1. If A is a matrix of rank r over a field F then it has rank r over any extension field of F.
Matrices have same ranks under $\mathbb{R}$ and $\mathbb{C}$ as the later extends the former. $^{**}$

2. If A is a matrix of rank r over a field K then its rank over any sub-field of K is at least $r$ (could be more). $^{**}$

3. The rank of a tensor(order $\geq$ 3) could be different over $\mathbb{R}$ and $\mathbb{C}$; under $\mathbb{C}$, it can be smaller.

** see [math.stackexchange](https://math.stackexchange.com/questions/2571197/a-problem-on-rank-of-a-matrix-over-two-fields)

---
exclude: true
### Other peculiarities of Matrix vs Tensor decomposition
<img src='res/images/tensors/more-tensor-vs-matrix.png' width='80%vw'>

Chapter 1, Tensors: Geometry and Applications, J. M. Landsberg

$\mathbf{M = AB} = \boldsymbol{\alpha \beta}$

if $\boldsymbol{\alpha} = \frac{1}{\gamma} \mathbf{AU^*}$, $\boldsymbol{\beta} = \gamma \mathbf{UB}$ for any unitary matrix $\mathbf{U}$ and
any scalar $\gamma \neq 0$.

Unique upto rotation/reflection/permutation and scaling.
---
exclude: true
### Other peculiarities of Matrix vs Tensor decomposition

Krushkal Rank  (also called spark of a matrix) vs Rank
---
### Notations

<img src="res/images/gm_ppt_figures/tensor.png" width="30%vw" style="margin-bottom:-3.5em">
$\circ$
<img src="res/images/gm_ppt_figures/missing-tensor.png" width="30%vw" style="margin-bottom:-3.5em">
$=$
<img src="res/images/gm_ppt_figures/missing-tensor.png" width="30%vw" style="margin-bottom:-3.5em">

<div style="margin-top:5em"></div>

$\hspace{3em}\mathbf{T(t)} \hspace{4.5em}\circ\hspace{4em} \boldsymbol{\Omega(t)} \hspace{3em}=\hspace{4em}\mathbf{D(t)}$


Where,

$\mathbf{T} \in \mathbb{R}^{X \times Y \times Z}$

$\boldsymbol{\Omega} \in  \set{0,1}^{X \times Y \times Z}$, observed locations marked as $1$.

$\boldsymbol{\bar \Omega} = \boldsymbol{1 - \Omega}$, missing locations marked as $1$.

$\mathbf{D} \in \mathbb{R}^{X \times Y \times Z}$

---
exclude: true
### Imputation

<img src="res/images/gm_ppt_figures/missing-tensor.png" width="30%vw" style="margin-bottom:-3.5em">
$\overset{\phi}{\longrightarrow}$
<img src="res/images/gm_ppt_figures/tensor.png" width="30%vw" style="margin-bottom:-3.5em">
<div style="margin-top:5em"></div>
$\hspace{3em}\underbrace{\mathbf{D}}_{\mathbf{T} \odot \boldsymbol{\Omega}} \hspace{5em} \overset{\phi}{\longrightarrow} \hspace{4em} \mathbf{\tilde T}$


$$\phi_{\boldsymbol{\theta}} : \mathbb{R}^{X \times Y \times Z} \times \\{0,1\\}^{X \times Y \times Z} \rightarrow \mathbb{R}^{X \times Y \times Z}$$

$$ \phi_{\boldsymbol{\theta}}(\mathbf{D},\boldsymbol{\Omega}) \rightarrow \mathbf{\tilde T}$$

$$\;$$

<!---latent parameters: $\mathbf{R}^{p} \ni \boldsymbol{\theta} = [\boldsymbol{\theta_1}, \boldsymbol{\theta_2}]$--->

<!-- time invariant component: $\boldsymbol{\theta_1} \in \mathbf{R}^{p_1}$ -->

<!-- time variant component: $\boldsymbol{\theta_2} \in \mathbf{R}^{p_2}$ -->
---
### Metrics: Completion Score and Reconstruction error

<!---img src="res/paper_equations/maskednorm.png" width="75%vw"--->

<img src="res/paper_equations/error_metrics.png" width="95%vw" style="margin-left:-2.5em">

- TRE  = Training Error 
- TCS  = Test Error.

- Others: RMSE, MAE


<small><a href=https://arxiv.org/pdf/1005.2197> Acar, E., Kolda, T. G., Dunlavy, D. M., & Mørup, M. (2010, May 12). Scalable tensor factorizations for incomplete data (arXiv:1005.2197). arXiv</a></small>
---


### Hypothesis and Assumptions


##### Hypothesis
Partition of latent factors explain traffic patterns
- time invariant (stable) latent factors
- time varying latent factors


##### Assumptions

1. Observed density =  linearly combination of the time invariant factors

2. Weights of linear combination = time varying factors.

2. The rank-1 matrix/tensor atoms =  time invariant.

3. The decomposition weights =  time variant

**Assumptions are empirically validated on traffic density datasets.**

---
### Decomposition into sum of rank-1 atoms
<img src='res/images/gm_ppt_figures/matrix-decomp-view.png' width='100%vw'>

$$\text{Matrix Decomposition}$$

<img src='res/images/gm_ppt_figures/tensor-decomp-view.png' width='100%vw'>

$$\text{Tensor Decomposition}$$

---
### Average atomic subspace angles, 3 consecutive days (tensor vs matrix)
<img src=res/paper_equations/ssa.png width=100%vw/>


---
exclude: true
### Latent Parameters


<!---$$ \mathbf{\tilde T}(t) = \phi(\mathbf{D}(t),\boldsymbol{\Omega}(t); \boldsymbol{\theta}(t), \boldsymbol{\psi}(t_0))$$--->


<!--$\phi$ may additionally depend on optional auxiliary information $\boldsymbol{\psi}(t_0)$
where $|t_0 - t| \leq \epsilon$ for some $\epsilon \geq 0$--->

---
### Singular Value and Tensor Weight Regression
<img src="res/images/gm_ppt_figures/svr-twr-theta1-estimation.png" width="75%vw">


<img src="res/images/gm_ppt_figures/svr-twr-theta2-estimation.png" width="75%vw">


---
### Data Generative Model

<img src=res/paper_equations/generator.png width=45%vw />
<img src=res/paper_equations/data_plus_noise.png width=50%vw />

$$\;$$
time invariant : $\boldsymbol{\theta_s} \in \mathbf{R}^{p_s}$ (singular subspaces, tensor factor subspaces, atomic subspaces)


time variant : $\boldsymbol{\theta_v} \in \mathbf{R}^{p_v}$ (singular values, tensor factor weights)

latent parameters: $\mathbf{R}^{p} \ni \boldsymbol{\theta} = [\boldsymbol{\theta_s}; \boldsymbol{\theta_v}]$


$p_s + p_v = p$

Typically, $p_s >> p_v$

---
exclude: true
### Parameters

<img src=res/paper_equations/params_table.png width=90%vw />

---
### Estimators

<img src=res/paper_equations/estimator_full.png width=37%vw />
<img src=res/paper_equations/estimator_v.png width=41.5%vw />
<img src=res/paper_equations/estimator_c.png width=80%vw />


<h5 style="color:orange"> Note: </h5>


The estimation is not perfect and depends on the following -

- missing data percentage / sparsity of $\boldsymbol{\Omega}$
- Noise in the observed entries
- estimator efficiency (qualitative, non CRLB, local optimia from ALS)
- estimator robustness (qualitative, e.g Davis-Kahan type theorems)


---
exclude: true
### Quality of reconstruction
How good can the reconstruction be?

<h5 style="color:orange"> Note A: </h5>

The estimation is not perfect and depends on the following -

- missing data percentage or equivalently sparsity of $\boldsymbol{\Omega}$
- Noise in the observed entries in the data
- estimator efficiency as the estimators are approximate algorithms

<h5 style="color:green"> Note B: </h5>
- How good the assumption on time invariance of $\boldsymbol{\theta_1}(t)$ holds
between times $t$ and $t_0$.

---
### Temporal Stability/Continuity of paramters

<img src=res/paper_equations/temporal_stability.png width=70%vw />

$$\;$$
Under some suitable metrics $d_1: \mathbb{R} \times \mathbb{R} \rightarrow \mathbb{R}$ and  $d_2 : \mathbb{R^s} \times \mathbb{R^s} \rightarrow \mathbb{R}$, this is close in spirit to continuity.

$  \forall \epsilon > 0 \; \exists \delta > 0$ such that $d_1\big(t_1,t_2 \big) < \delta \implies d_2 \big(\boldsymbol{\hat \theta_s}[t_1],\; \boldsymbol{\hat \theta_s}[t_2]\big) < \epsilon$


---
exclude: true
### Estimator Quality

- $D[t_1]$ and $D[t_2]$ are observations from two days where $t_1$,$t_2$ are close. $$\;$$
- Noise and occlusion @$t_2$ is not as severe as @$t_1$ => quality of estimated parameters $\boldsymbol{\theta}[t_2]$ superior to $\boldsymbol{\theta}[t_1]$.
$$\;$$

---
### Imputation (KSV/KTF)

<img src=res/paper_equations/d2_estimate.png width=40% />

<img src=res/paper_equations/d1_estimate.png width=42%/>

<img src=res/paper_equations/d2_generate.png width=43% />

<!---<img src=res/paper_equations/ktf.png />-->

---
### Imputation (USV/UTF)


<img src=res/paper_equations/estimator_c.png />
<img src=res/paper_equations/utf_gen.png />

- $ \boldsymbol{\theta_s} \in \mathbb{R}^{p_s}\;\;\;$ and $\;\;\; \boldsymbol{\theta_v} \in \mathbb{R}^{p_v}$

- $p_s =(30+30+24)r $ and $p_v = r$

---
### SATORIS: Unified Framework
<img src=res/paper_equations/params_table_detailed.png />


---
### Experiment Setup

<img src="res/paper_figures/exp-days.png" width="90%vw">



---
### Results: 1 Day
<img src="res/paper_figures/1day.png" width="90%vw">


---
### Results: 3 Day (Explicit injection is better @ high mp)
<img src="res/paper_figures/3days.png" width="90%vw">

---
### Results: 5 Days (MAE, RMSE)
<img src="res/paper_figures/5days.png" width="73%vw" height=auto>

---
class: center middle

<h3 style="color:darkturquoise">POST QUALS</h3>

---
### PART 1: Closer look at Temporal Stability

1. The generating process discussed prior seemed too specific to traffic density data. 
>>> - Are there other datasets/phenomena that also display the same behavior?
>>>
>>> -  If so, is there a general model can simultaneously capture the phenomena while also displaying tempora stability?
2. Can we better vizualize the stability of parameters?

---
### Revisit: Spectrum of covariance of density data

<img src=res/paperplots/bei-covariance-spectrum.png width=48%vw/>
<img src=res/paperplots/shang-covariance-spectrum.png width=48%vw />

- Complete observations per day are vectorized (shape = 900x24)
- 7 Consecutive days
- 7x7 Covariance matrix
- Spectrums of covariance matrices shown above

---
### A General Model: Shifted, Low Rank Linear, additive noise

$$\mathbf{x} = \mathbf{V} \mathbf{r} + \boldsymbol \mu +  \boldsymbol{\epsilon}$$


- $\mathbf{r} \sim N(0,(1-a) \; \mathbf{I})$ is latent, $\boldsymbol \mu$ is a latent constant,$\;\boldsymbol{\epsilon} \sim N(0,a \; \mathbf{I})$ is additive noise.

- $\mathbf x\;$ is shifted sum of two Gaussians ($\mathbf{Vr}$ and $\boldsymbol \epsilon$), hence itself Gaussian.

- $E[\mathbf{x}] = \mathbf{V} \; \underbrace{E[\mathbf{r}]}_{\mathbf{0}} + E[\boldsymbol \mu]+ \overbrace{E[\boldsymbol{\epsilon}]}^{\mathbf{0}} = \mathbf{0} + \boldsymbol \mu + \mathbf{0} = \boldsymbol \mu$

$\color{blue}\text{Cov}(\mathbf{x}) \color{black} = E[\big( \mathbf{x} - E[\mathbf{x}]\big)  \big( \mathbf{x} - E[\mathbf{x}]\big)^T]  \\\\ = E[(\mathbf{Vr} + \boldsymbol{\epsilon})(\mathbf{r^TV^T} + \boldsymbol{\epsilon^T})] \\\\ = \mathbf{V}E[\mathbf{rr^T}]\mathbf{V^T} +\mathbf{V}E[\mathbf{r}]E[\boldsymbol{\epsilon^T}]+  E[\boldsymbol{\epsilon}]E[\mathbf{r^T}]\mathbf{V^T} + E[\boldsymbol{\epsilon \epsilon^T}]\\\\ = (1 - a) \mathbf{I\;\;VV^T} + \mathbf{0} + \mathbf{0} + a\mathbf{I}  = \;\; \color{blue} (1 - a) \mathbf{VV^T} + a\mathbf{I}$

- For rank = 1, $\mathbf{V} = \mathbf{v}$, $\text{Cov}(\mathbf{x}) = (1-a) \mathbf{vv^T} + a \mathbf{I} $

- In general (and in real world), $\mathbf{V}$ is low rank.

---
### Vizualizing stable subspaces with Synthetic data

$$\mathbf{x} \sim N(\boldsymbol{\mu, \Sigma}) $$

===================================================================
$$ \boldsymbol{\mu} \in \mathbb{R}^n , \text{ const. }$$
$$\mathbf{\Sigma} := a\mathbf{I} + (1-a)\mathbf{vv^T} \in \mathbb{R}^{n \times n}$$
$$\mathbf{v} \sim N(\mathbf{0, I}_{n \times n})$$
$$a \in (0,1)$$

- Sample 1000 vectors
- Reshape into matrix/tensor
- Take SVD/CP
- Plot 1000 singular vectors / tensor factors

---
### stability of parameters (matrix)

<img src=res/paperplots/stability/matrix-0.6a.png width=32%vw />
<img src=res/paperplots/stability/matrix-0.7a.png width=32%vw />
<img src=res/paperplots/stability/matrix-0.8a.png width=32%vw />

---
### stability of parameters (tensor)

$\hspace{3.5em} a=0.6 \hspace{7em} a=0.7 \hspace{7em} a=0.8$


<div style="display: flex; gap: 1px;">

<div style="
    width: 33%;        /* final width you want to see */
    overflow: hidden;    /* hide everything outside */
    position: relative;
">
  <img src="res/paperplots/stability/tensor-0.6a.png" alt=""
       style="
         display: block;   /* remove inline gaps */
         width: 150%;      /* 100/66 ≈ 1.5 → scales full image so 66% fits exactly */
         height: auto;     /* keep aspect ratio */
         /* object-fit/object-position are NOT needed here */
       ">
</div>


<div style="
    width: 33%;        /* final width you want to see */
    overflow: hidden;    /* hide everything outside */
    position: relative;
">
  <img src="res/paperplots/stability/tensor-0.7a.png" alt=""
       style="
         display: block;   /* remove inline gaps */
         width: 150%;      /* 100/66 ≈ 1.5 → scales full image so 66% fits exactly */
         height: auto;     /* keep aspect ratio */
         /* object-fit/object-position are NOT needed here */
       ">
</div>



<div style="
    width: 33%;        /* final width you want to see */
    overflow: hidden;    /* hide everything outside */
    position: relative;
">
  <img src="res/paperplots/stability/tensor-0.8a.png" alt=""
       style="
         display: block;   /* remove inline gaps */
         width: 150%;      /* 100/66 ≈ 1.5 → scales full image so 66% fits exactly */
         height: auto;     /* keep aspect ratio */
         /* object-fit/object-position are NOT needed here */
       ">
</div>


</div>

---
### Justifications from Matrix Perturbation Theory

- Under certain qualifications, eigenvectors are continuous with respect to matrix entries. Davis-Kahan theorem bounds angle between corresponding eigenspaces before and after perturbation to matrix.

- Similar result holds for singularspace via Wedin's theorem.

- Not as many results in tensor domain


<small> <a href="https://users.math.msu.edu/users/iwenmark/Teaching/MTH995/Papers/SVD_Stewart.pdf"> G. W. Stewart, Perturbation Theory for the Singular Value Decomposition, UMIACS-TR-90-124 / CS-TR 2539, University of Maryland, September 1990. </a>

<small> <a href="https://arxiv.org/pdf/2008.02437">Anru R. Zhang, “A Sharp Blockwise Tensor Perturbation Bound for Orthogonal Iteration” (and related perturbation analysis for HOOI), Annals / preprint 2021</a></small>
---
class: middle center
## PART 2: Imputation via Subspace Aware Semidefinite Programming

---
### Rank
- Rank is subadditive; Rank(A+B) $\leq$ Rank(A) + Rank(B)
- Rank(AB) $\leq$ min(Rank(A), Rank(B))
$$\;$$
- Rank is not convex;
$$\;$$
 Rank$\bigg( \frac{1}{2} \underbrace{\begin{bmatrix}1 &  0 \\\\ 0 & 0\end{bmatrix}}_{A} + \frac{1}{2}  \underbrace{ \begin{bmatrix} 0 & 0 \\\\ 0 & 1 \end{bmatrix}}_B \bigg)$ = 2 $\color{red} \boldsymbol{>}$ 1 =  $\frac{1}{2}$ Rank(A) +  $\frac{1}{2}$ Rank(B)
$$\;$$
- $L_0$ pseudo-norm of the singular values.
---
### Nuclear Norm
- Convex surrogate of Rank (tightest relaxation)
$$\;$$
- $L_1$ norm of singular values
$$\;$$
- Yeilds low rank solutions if used as objective
$$\;$$
- Analogous to use of $L_1$ as surrogate for $L_0$ in sparse regression.

---
### Formulations of Nuclear Norm

Let $X$ be a $m \times n$ matrix and $X = U\Sigma V$ be its SVD. Let $\vec \sigma := diag(\Sigma)$

The nuclear norm of $X$ is represented as $|X|_*$ and it equals

- $|\vec \sigma|_1 \hspace{8.6em} \text{compared to rank}(X) = |\vec \sigma|_0 $

- $Tr(\sqrt{X^TX}) \hspace{5em} \text{compared to } |X|_F^2 = Tr(X^TX)$

-  $\underset{U,V}{\min}{\frac{1}{2} \bigg( |U|_F^2 + |V|_F^2} \bigg) \hspace{2em}$ s.t. $\;\;\;X = UV^T$

- $\underset{|B|_2 \leq 1}{\sup} \; \langle X,B \rangle$

- $\color{brown} \underset{A \in S^p ,B \in S^q}{\min} \; \frac{1}{2} \; \bigg( Tr(A) + Tr(B) \bigg)$ s.t $\color{brown}\begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$

$S^p,S^q$ are spaces of symmetric $p \times p$ and $q \times q$ matrices respectively. Due to PSD constraint on the block matrix $\implies$ leading principal submatrices need to PSD $\implies$ $A,B \succeq 0$

---
### Mean Width Interpretation (roughly)

- Matrix $A$ transforms unit ball to an ellipsoid. $|A|_* = a + b$

$\hspace{8em}$<img src=res/web_images/ellipse.png width=30%vw>

- Let $X \in \mathbb{R}^{n+1}$ be any convex set.

- $S_{n}$ be the unit sphere in the same space.

- $h(u) := \underset{x \in X}{\max} \; \langle x, u \rangle $

- $\sigma_{max}(A)$ = $|A|_2$ = $\frac{1}{2} \; \underset{u \in S_n}{\max} \;\;\; h(u) - h(-u)$

- $|A|_* = \frac{1}{|S_n|} \;\; \underset{S_n}{\int} h(u) - h(-u)$

---
### Imputation via Low Rank: Formulation

#### Original, Hard Reconstruction
$\hspace{5em}\underset{X \in \mathbb{R}^{m \times n}}{\arg \min} \;\;\; \text{ rank}(X) \;\;\; $
s.t.
$
   \;\;\; X \circ \Omega = Y \circ \Omega
$

#### Soft reconstruction, Explicit Regularization 

$\hspace{5em}\underset{X}{\arg \min} \;\;\; \text{ rank}(X) + \lambda || \Omega \circ (X - Y) ||_F$

#### Soft reconstruction, explicit rank by construction, bruteforce search over rank 
$\hspace{5em}\underset{U\in \mathbb{R}^{m \times k},V \in \mathbb{R}^{n \times k}}{\arg \min} \;\;\;|| \Omega \circ (X - Y) ||_F\;\;\;$ s.t $\;\;\;X = UV^T$


---
### Imputation via Minimum Nuclear Norm

- $\underset{X}{\arg\min} |X|_*\;\;\;$ s.t. $\;\;\; \Omega \circ X = \Omega \circ Y$


 - Since nuclear norm is a surrogate for the rank, it yields a low rank solution almost surely.

- Analogous to solutions of $L1$ minimization producing sparse (low $L_0$ pseudo-norm) solution

---
### Geometry : L1 Ball

<img src=res/proposed_future_work/l1_regression.gif>

---
### Geometry : Nuclear Norm Ball

<img src=res/proposed_future_work/nnorm_geometry.png  width=100%vw />

<small><a href="https://people.eecs.berkeley.edu/~brecht/cs294docs/week8/crpw_focm.pdf" >  Chandrasekaran, V., Recht, B., Parrilo, P. A., & Willsky, A. S., The convex geometry of linear inverse problems, Foundations of Computational Mathematics, 12(6):805–849, 2012. DOI: 10.1007/s10208-012-9135-7.  </a>

---
### Another look at the SDP formulation  (nnsdp)

- $\underset{A,B \succeq 0}{\min} \; \frac{1}{2} \; \bigg( Tr(A) + Tr(B) \bigg)\;\;\;$ s.t $\;\;\;\begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$

- A = $U \Sigma U^T = \sqrt{XX^T}$ and $B = V \Sigma V^T = \sqrt{X^TX}$ are minimizers.

- $U$ and $V$ are the singular vectors from SVD of $X = U\Sigma V^T$

- A and B carry the left and right singular subspace information.

<p style="color:brown"> Can we repurpose this PSD formulation to inject the singular subspace information via A and B where $X$ is partially observed and is the decision variable instead?</p>

---
### Imputation with prior via inverse formulation (innsdp)

- Assuming $Y$ is fully observed.

- Obtain $A$ and $B$ as the solutions for the SDP formulation of the nuclear norm such that $c = \frac{1}{2} Tr(A) + \frac{1}{2} Tr(B)$ is $|Y|_*$, then


$$\underset{X}{\arg\min} \;\;\;c \text{ (const.) }$$

s.t.

$$ \begin{bmatrix} A & X \\\\ X^T & B\end{bmatrix} \succeq 0 $$
$$ X[i,j] = Y[i,j] \;\;\;\;\; \text{if} \;\;\;\;\; \Omega[i,j] = 1$$


$$\;$$
- Could be multiple feasible X but almost surely all of them are low rank.

---
### Mathematical jugglery? POC on images

<img src=res/sdp_paper/image_impute/flower_mp_90.0%.png />
<img src=res/sdp_paper/image_impute/china_mp_90.0%.png />

---
### When $Y$ isn't fully observed

-  We don't know $A$ and $B$ apriori

- <p style=color:brown>Could we use $A$ and $B$ from a neighbor ? </p>

#### Algorithm

1. Require: $Y_1, \Omega_1, Y_2$
2. $A,B$ $\gets$ nnsdp($Y_2$)
3. $X_1$ $\gets$ innsdp($Y_1, \Omega_1, A, B$)
4. Return: $X_1$

---
### Soft reconstruction, Exact Injection

$$ \underset{X}{\arg\min} || \Omega \circ (X - Y)||_F  $$

s.t.

$$ \begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$$

$$A = U\Sigma U^T$$

$$B = V \Sigma V^T$$


---
### Soft reconstruciton, Nonexact (Soft) Injection

$$ \underset{X,A,B}{\arg\min} || \Omega \circ (X - Y)||_F + \alpha ||A - U\Sigma U^T|| + \beta ||B - V \Sigma V^T|| $$

s.t.

$$ \begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$$

$$A \succeq 0$$

$$B \succeq 0$$

---
### Even relax $\Sigma$ !

- Let $D = diag(\vec{d})$

$$ \underset{X,\vec{d}}{\arg\min} || \Omega \circ (X - Y)||_F $$

s.t.

$$ \begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$$

$$A =  UDU^T$$

$$B = VDV^T$$

$$\vec{d} \succeq 0 $$


---
### Relax $\Sigma$ and stay close to prior variant params !!!

- Let $D = diag(\vec{d})$
- Let $\vec \sigma$ be the vector of singular values.

$$ \underset{X,\vec{d}}{\arg\min} || \Omega \circ (X - Y)||_F + \gamma \; |\vec d - \vec \sigma|_2$$

s.t.

$$ \begin{bmatrix} A & X \\\\ X^T & B \end{bmatrix} \succeq 0$$

$$A =  UDU^T$$

$$B = VDV^T$$

$$\vec{d} \succeq 0 $$



---
### Proposed Methods

<img src=res/sdp_paper/methods.png width=100%vw />

---
### Results


<img src=res/sdp_paper/results/plots/shang_next.png width=100%vw />

$$\;$$

<img src=res/sdp_paper/results/plots/shang_prev.png width=100%vw />

---
class: center middle


<h3 style="color:darkturquoise">PROPOSED WORK</h3>


---
### Proposed extensions 1: Imputation Methods

Short-term -
1. Beyond CP: Tucker Decomposition

2. Subspace injection via Tensor Nuclear Norm



Medium-term -
4. Online/streaming imputation with slowly evolving subspace.

3. Imputing via KAN/Deep-learning with Subspace priors/regularization


---
### Possible extension 2: Low Rank and Subspace similarity in LLMs

Short-term -
5. Low Rank structures and overlapping subspaces in LLM Safety

Medium-term -
6. Exploring Average Gradient Outer Product in Recursive Feature Machines.

---
### 1. Beyond CP: Tucker Decomposition

<img src=res/proposed_future_work/tucker.png width=100%vw/>

- Generalizes CP decomposition

- Recovers Linear Model more efficiently at lower rank from higher moment tensors (3rd order moments/kurtosis) [Ruhui Jin, Joe Kileel, Tamara G. Kolda, and Rachel Ward. “Scalable symmetric Tucker tensor decomposition.”](https://arxiv.org/abs/2204.10824)

- More expressive than CP: CP is a special case when core tensor $G$ is superdiagonal

---
### Tucker Decomposition Intuition

- $\\{a_1,...,a_n\\}$, $\\{ b_1, ..., b_n\\}$ and $\\{ c_1, ..., c_n \\}$ be bases for the three spaces involved of the tensor (row, column and tube fiber spaces)

- CP : $T \approx \sum_i \gamma_i \;\; a_i \otimes b_i \otimes c_i$

- Tucker : $T \approx \gamma_1 \; a_1 \otimes b_1 \otimes c_1 + \gamma_2 \; a_1 \otimes b_4 \otimes c_5 + ...  $

<img src=res/proposed_future_work/tucker_intuition.png width=63%vw >

---
exclude: true
### Tucker Decomposition: Proposed Method

- Recover the (possibly invariant) factors from CP/Tucker decomposition of neighbors

- Use Tucker format for fitting a full core tensor $G$ using the invariant factors and partial observation on the target.

- In the prior method using CP, $G$ was implicitly restricted to be superdiagonal.

- This model more expressive

- Might need to impose additional structural constraints on the core tensor $G$ for bias-variance / sample complexity-occlusion tradeoff.


---
### 2. Subspace injection via Tensor Nuclear Norm

- CP based nuclear norm is NP hard to compute.

$$||X||_* = \inf \bigg\\{ \sum|\lambda_r| \; : \; X = \sum_r \lambda_r \; u_r^{(1)} \otimes u_r^{(2)} \otimes u_r^{(3)}: |u_k^{(i)}| = 1   \bigg\\} $$

- Matricization Based Nuclear Norm $ \hspace{1em} = \hspace{1em} \overset{3}{\underset{k=1}{\sum}} |X^{(k)}|_* \hspace{2em}$
where $X^{(k)}$ is the matricization along the $k^{th}$ mode.

- Subspaces recovered from the matricization along different modes can be injected via the above norm.



---
### 2. Subspace injection via Tensor Nuclear Norm

- $X$ is the tensor

- $X^{(i)}$ are matricization of $X$ along the column, row and tube modes/fibers.

- $U_i \Sigma_i V_i^T \gets X^{(i)}$ is SVD of the matricized tensor $X$ for $i = 1,2,3$, the three modes.

$$ \underset{X}{\arg\min} || \Omega \circ (X - Y)||_F  $$


s.t.

$$ \begin{bmatrix} A_i & X^{(i)} \\\\ X^{(i)T} & B_i \end{bmatrix} \succeq 0$$

$$A_i = U_i\Sigma_i U_i^T$$

$$B = V_i \Sigma_i V_i^T$$

- Note: There are more constraints than the matrix version. This checks out as the tensor format has more structure/high-bias.

---
exclude: true
### 2. Deep learning methods with subspace regularization

- As already seen, deep learning methods struggle at high occlusion.

- Can we use subspace regularization to improve these deep learning models at high occlusion?

---
exclude: true
### 3. Streaming scenarios

- Observations are obtained with various occlusion levels in a streaming fashion.

- The stable subspace may evolve slowly

- Learn subspace evoution over time?

---
### 3. Low Rank Structures and Stable Subspaces in LLMs

<img src=res/proposed_future_work/safety-neurons.png width=100%vw>

Key Idea -

- There are neurons that are responsible for safety!

- These neurons are sparse, only 3%  !!

- There are subspaces in the pretrained weight space that correspond to safety.

<small><a href=https://arxiv.org/pdf/2402.05162v1> Wei, B., Huang, K., Huang, Y., Xie, T., Qi, X., Xia, M., Mittal, P., Wang, M., & Henderson, P. (2024). Assessing the Brittleness of Safety Alignment via Pruning and Low‑Rank Modifications] </a></small>

---
### Key Idea: Neuron Saliency


<img src=res/proposed_future_work/neuron-saliency.png width=100%vw>

$$L(w + \Delta w) = L(w) + \nabla_w L \odot \Delta w $$

Setting $\Delta w = - w$,

$$L(0) = L(w) - \nabla_w L \odot w $$

$$\underbrace{| L(0) - L(w) |}_{change\;if\;suppressed} = | w \odot \nabla_w L| $$

---
### ActSVD : Key Idea

$$\hat W = \underset{rank \; \hat W < r}{\arg \min} || WX - \hat W X||_F^2 $$

Solution: 

$$\hat W = UU^T W$$

where $$U\Sigma V^T \gets WX$$

---
### ActSVD: Proof


<img src=res/proposed_future_work/actSVD-proof.png width=100%vw>

---
### Key Idea

- Identify neurons/subspace $U$ responsible for utility via utility Dataset

- Do the same for safety Dataset $S$

- For neurons, take $ U - S$

- For subspace, project weights

$$
\Pi \;\;\; = \underbrace{(I - UU^T)}_{\text{proj. onto subspace not important for utility}} \overbrace{SS^T}^{\text{proj. onto safety subspace}}
$$

$$\Delta W  = \Pi \; W$$

- Use LoRa adapter to introduce the $\Delta W$ as $AB$ where $A = I - UU^T$ and $B = SS^T W$

---
### Low Rank Safety Neurons and Subspaces

<img src=res/proposed_future_work/ASR.png width=100%vw>


---
### Low Rank Safety Neurons and Subspaces

<img src=res/proposed_future_work/subspace-similarity.png width=100%vw>

- Subspace similarity in multiple matrices can be exploited using tensor decomposition methods and via subspace injections.

---
### Timeline

|Month |Work|
|:----|:------------------------------|
| Now-Aug 25 | Submit work on NNorm Subspace Injection for Matrix version |
|Sep-Oct 25 | Subspace injection via Tensor Nuclear Norm |
|Oct-Nov 25| Subspace injection via Tucker Decomposition|
|Nov-Jan 25 | LLM Safety with low rank/subspace similarity |
|Feb-Mar 26 | DL/KAN/AGOP-RFM imputation |
|Mar 26 | Defend |

---
### Acknowledgement

Possible in part due to the unwavering suppport from
[Prof. Bhaskar Krishnamachair](https://viterbi.usc.edu/directory/faculty/Krishnamachari/Bhaskar) and [Dr. Fan Bai](https://scholar.google.com/citations?user=ZDRy6_EAAAAJ&hl=en) from General Motors.

<img src="res/logos/viterbi.jpg" height='50%vh' width='45%vh'/>
<img src="res/logos/gm.png" height='50%vh' width='45%vh'/>


Also all my [teachers and mentors](https://sampadbm.github.io/#Teachers%20and%20Mentors)


To the committee:

Thank you so very much for your valuable time and guidance.



---
exclude: true
### Segue

- Watch Adit's Talk again - lots of insights and can cite his paper for the poor Deepnetworks performance for lower number of observed entries in matrix completion.

- Use Linear Deep NN as another baseline for the nuclear norm subspace injection.

- Use RFM package from Adit's repo and see if it can be used as a baseline too.


---
class: middle center

# THANK YOU

<!---More results in the <a href="SATORIS.pdf" target="_blank"> paper </a>.--->

<style>
table{
  border: 1px dotted blue;
    width: 100%;
}
th{
    border-bottom: 1px dotted blue;
}
td{
    padding-bottom: 0.5em;
}
td,th:first-child{
    padding-right: 1em;
    border-right: 1px dotted blue;
}
</style
