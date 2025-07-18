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

**Bhaskar Krishnamachari | Jyotirmoy V. Deshmukh |Satish Kumar Thittamaranahalli | Jiapeng Zhang | Robert Guralnick | Gary Rosen**

##### Presenter: Sampad Bhusan Mohanty
###### 25th July, 2025
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
### Processed traffic density (1 hour x 1km x 1km)

<img src='res/paper_figures/rawdata.png' width='90%vw'>
>>> >>> $X \times Y \times T$ tensors 

---
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

### Prior work @ USC-ANRG + GM : Unexplained variance
<img src='res/images/gm_ppt_figures/pca-paper-imputation-performance.png' width='100%vw'>

---
### Atoms using (outer) products

<img src='res/images/gm_ppt_figures/tensor-rank-1-approx.png' width='70%vw'>

>>> >>> Atoms or "Simple tensors"

---

### Decomposition into sum of rank-1 atoms
<img src='res/images/gm_ppt_figures/matrix-decomp-view.png' width='100%vw'>

$$\text{Matrix Decomposition}$$

<img src='res/images/gm_ppt_figures/tensor-decomp-view.png' width='100%vw'>

$$\text{Tensor Decomposition}$$

---
### Some other decompositions
<img src='res/images/gm_ppt_figures/tucker-decomp.png' width='100%vw'>

$$\text{Tucker vs CP Decompositions}$$

---
### Matrix vs Tensor decomposition

<img src='res/images/tensors/p-np.png' width='50%vw'>

|Factorization | | Time complexity | | Notes |
|--------------|-|---------------|---|------|
|$\;$|$\;$|$\;$|$\;$|
| Cholesky,QR | | $O(n^3), O(mn^2)$ | | |
| SVD | | $O(mn^2)$ | |  $\hspace{4em} m \geq n$|
|EVD| | $O(n^3)$ | |  |
| CP rank $\leq$ k | | NP Complete | | ||
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
$\odot$
<img src="res/images/gm_ppt_figures/missing-tensor.png" width="30%vw" style="margin-bottom:-3.5em">
$=$
<img src="res/images/gm_ppt_figures/missing-tensor.png" width="30%vw" style="margin-bottom:-3.5em">

<div style="margin-top:5em"></div>

$\hspace{3em}\mathbf{T(t)} \hspace{4.5em}\odot\hspace{4em} \boldsymbol{\Omega(t)} \hspace{3em}=\hspace{4em}\mathbf{D(t)}$


Where,

$\mathbf{T} \in \mathbb{R}^{X \times Y \times Z}$

$\boldsymbol{\Omega} \in  \set{0,1}^{X \times Y \times Z}$, observed locations marked as $1$.

$\boldsymbol{\bar \Omega} = \boldsymbol{1 - \Omega}$, missing locations marked as $1$.

$\mathbf{D} \in \mathbb{R}^{X \times Y \times Z}$

---
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

- Others: RMSE, MAE
---


### Hypothesis and Assumptions


##### Hypothesis 
There exist two kinds of latent factors that completely explain traffic patters
- time invariant latent factors and 
- time varying latent factors


##### Assumptions 

1. Observed density of a particular day can be explained by linearly weighted combination of the time invariant factors where the weights are precisely the time varying factors. 

2. The rank-1 matrix/tensor atoms obtained by decomposition of the data representation are time invariant.

3. The decomposition weights on the rank one atoms are time variant

**Assumptions are empirically validated on traffic density datasets.**

---
exclude: true
### Latent Parameters


<!---$$ \mathbf{\tilde T}(t) = \phi(\mathbf{D}(t),\boldsymbol{\Omega}(t); \boldsymbol{\theta}(t), \boldsymbol{\psi}(t_0))$$--->





<!--$\phi$ may additionally depend on optional auxiliary information $\boldsymbol{\psi}(t_0)$
where $|t_0 - t| \leq \epsilon$ for some $\epsilon \geq 0$--->

---
### Data Generative Model

<img src=res/paper_equations/generator.png width=45%vw />
<img src=res/paper_equations/data_plus_noise.png width=50%vw />

$$\;$$
time invariant : $\boldsymbol{\theta_s} \in \mathbf{R}^{p_s}$ (singular subspaces, tensor factor subspaces, atomic subspaces)


time variant : $\boldsymbol{\theta_v} \in \mathbf{R}^{p_v}$ (singular values, tensor factor weights)

latent parameters: $\mathbf{R}^{p} \ni \boldsymbol{\theta} = [\boldsymbol{\theta_s}; \boldsymbol{\theta_v}]$


$p_s + p_v = p$

---
### Estimators

<img src=res/paper_equations/data_plus_noise.png width=50%vw />

<img src=res/paper_equations/estimator_full.png width=45%vw />
<img src=res/paper_equations/estimator_v.png width=50%vw />



<h5 style="color:orange"> Note A: </h5> 


The estimation is not perfect and depends on the following -

- missing data percentage / sparsity of $\boldsymbol{\Omega}$
- Noise in the observed entries
- estimator efficiency (qualitative, non CRLB, local optimia from ALS)
- estimator robustness (qualitative, e.g Davis-Kahan type theorems)


---
### Vectorized Latent Parameter Estimators

$$
	 \boldsymbol{\vec \theta} = [\boldsymbol{\theta_1, \vec \theta_2}] \leftarrow  E(\mathbf{\vec D}, \boldsymbol{\vec \Omega}, Null, Null)
$$

$$
	 \boldsymbol{\vec \theta_2} =  \leftarrow  E(\mathbf{\vec D}, \boldsymbol{\vec \Omega}, \boldsymbol{ \theta_1}, Null)
$$

<!-- $$ -->
<!-- 	 \boldsymbol{\theta_1} = \leftarrow  E(\mathbf{\vec D}, \boldsymbol{\vec \Omega}, Null, \boldsymbol{\vec \theta_2}) -->
<!-- $$ -->


<h5 style="color:orange"> Note A: </h5> 

The estimation is not perfect and depends on the following -

- missing data percentage or equivalently sparsity of $\boldsymbol{\Omega}$
- Noise in the observed entries in the data
- estimator efficiency as the estimators are approximate algorithms

---
### Data Generating Process

$$ G(\boldsymbol{\theta_1, \theta_2}) \rightarrow \mathbf{D} $$

**Intuition:**There is some physical process that generates the observed data $\mathbf{D}$ based on the 
latent parameters \boldsymbol{\theta}. 

**Non-convex parameter set:** This is because
the convex combination of two rank $k$ matrices $\mathbf{A,B}$ given by $\mathbf{C} = \alpha A + \beta B$ 
isn't necesarilly a rank $k$ matrix when $\alpha + \beta = 1$ and $\alpha, \beta \geq 1$ 

e.g
$\begin{bmatrix} 1 & 0 ,2 & 0\end{bmatrix}$ and $\begin{bmatrix} 0 & 7 ,0 & 11\end{bmatrix}$

---
### SATORIS: Unified Framework

- **Key Idea 1:**We can reconstruct the data on the low dimensional manifold rejecting the noise if we know  $\boldsymbol{\theta = [\theta_1, \theta_2]}$.

- **Key Idea 2:** Estimating the invariant parameter $\boldsymbol{\theta_1}(t)$ from highly noisy and sparse observation $\mathbf{D}(t)$ 
can be avoided and instead estimated from another better quality dataset from time $\mathbf{D}(t_0)$ where $t_0$ is close to $t$,
i.e $|t - t_0| \leq \epsilon$ where $\epsilon \geq 0$ is a hyperparameter to our model along with the
rank $r$ of the tensor.
---
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
### Two regimes 

##### Unknown invariant paramters $\boldsymbol{\theta_1}(t)$
$$
	\color{green}\mathbf{\tilde T}(t)\color{black} = G(\color{orange}\boldsymbol{\theta_1}(t), \color{blue} \boldsymbol{\theta_2}(t)\color{black}) 
$$

$$
	\color{orange}\boldsymbol{\theta_1}(t),\color{blue}\boldsymbol{\theta_2}(t)\color{black} \leftarrow E(\mathbf{D}(t), \boldsymbol{\Omega}(t), Null, Null)
$$


##### Known invariant paramters $\boldsymbol{\theta_1}(t) = \boldsymbol{\theta_1}(t_0)$
We  know $\mathbf{D}(t), \boldsymbol{\Omega}(t), \mathbf{D}(t_0),\boldsymbol{\Omega}(t_0), G, E$ and we want to find $\mathbf{\tilde T}(t)$

$$
	\color{green}\mathbf{\tilde T}(t)\color{black} = G(\color{orange}\boldsymbol{\theta_1}(t), \color{blue} \boldsymbol{\theta_2}(t)\color{black})  = G(\color{orange}\boldsymbol{\theta_1}(t_0), \color{blue} \boldsymbol{\theta_2}(t) \color{black}) 
$$

$$
	\color{orange}\boldsymbol{\theta_1}(t_0)\color{black} \leftarrow E(\mathbf{D}(t_0), \boldsymbol{\Omega}(t_0), Null, Null)
$$

$$
	\boldsymbol{\color{blue}\theta_2}(t) \leftarrow E(\mathbf{D}(t), \boldsymbol{\Omega}(t), \boldsymbol{\theta_1}(t_0), Null)
$$

---
### Two regimes (Vectorized) 

##### Unknown invariant paramters $\boldsymbol{\theta_1}(t)$
$$
	\color{green}\mathbf{ \vec {\tilde T}}(t)\color{black} = G(\color{orange}\boldsymbol{\theta_1}(t), \color{blue} \boldsymbol{\vec \theta_2}(t)\color{black}) 
$$

$$
	\color{orange}\boldsymbol{\theta_1}(t),\color{blue}\boldsymbol{\vec \theta_2}(t)\color{black} \leftarrow E(\mathbf{\vec D}(t), \boldsymbol{\vec \Omega}(t), Null, Null)
$$


##### Known invariant paramters $\boldsymbol{\theta_1}(t) = \boldsymbol{\theta_1}(t_0)$
We  know $\mathbf{\vec D}(t), \boldsymbol{\Omega}(t), \mathbf{\vec D}(t_0),\boldsymbol{\Omega}(t_0), G, E$ and we want to find $\mathbf{\vec{\tilde T}}(t)$

$$
	\color{green}\mathbf{\vec{\tilde T}}(t)\color{black} = G(\color{orange}\boldsymbol{\theta_1}(t), \color{blue} \boldsymbol{\vec \theta_2}(t)\color{black})  = G(\color{orange}\boldsymbol{\theta_1}(t_0), \color{blue} \boldsymbol{\vec \theta_2}(t) \color{black}) 
$$

$$
	\color{orange}\boldsymbol{\theta_1}(t_0)\color{black} \leftarrow E(\mathbf{\vec D}(t_0), \boldsymbol{\vec \Omega}(t_0), Null, Null)
$$

$$
	\color{blue} \boldsymbol{\vec \theta_2}(t) \color{black} \leftarrow E(\mathbf{D}(t), \boldsymbol{\Omega}(t), \boldsymbol{\theta_1}(t_0), Null)
$$


---
class: center middle
# PROPOSED METHODS

---
### Singular Value and Tensor Weight Regression
<img src="res/images/gm_ppt_figures/svr-twr-theta1-estimation.png" width="75%vw">


<img src="res/images/gm_ppt_figures/svr-twr-theta2-estimation.png" width="75%vw">


---
class: middle center
# EXPERIMENTAL SETUP

---
### Setup

<img src="res/paper_figures/exp-days.png" width="90%vw">


---
class: middle center
# RESULTS 

---
### 1 Day
<img src="res/paper_figures/1day.png" width="90%vw">


---
### 3 Day
<img src="res/paper_figures/3days.png" width="90%vw">

---
### 5 Days
<img src="res/paper_figures/5days.png" width="65%vw">

---
class: middle center
# THANK YOU VERY MUCH

More results in the <a href="SATORIS.pdf" target="_blank"> paper </a>. 

Also about verification of our assumptions of time invariance of the matrix/tensor atoms.


