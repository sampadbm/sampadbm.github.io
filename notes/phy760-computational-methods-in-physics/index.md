---
themes: ["colorful"]
---

# PHY760-Computational Methods in Physics:
<p style="text-align:center; color:#7A306C"> <b>9th August, 2022</b> </p>
<p style='text-align:center;color:green'><b>
Project Report for PHY760 (Summer 2022): Applied Matrix Analysis (Prof. T Satish Kumar).</b></p>


---

>edits -\
init: 9th August, 2022


[Syllabus](syllabus.pdf)


#### Network localization with sparse noise
---

##### Motivation

In many applications, we have wireless nodes which need to be deployed in adhoc manner. In these scenarios, there are some nodes called anchor nodes which can localize themselves accurately using an external lozalization mechanism (like GPS). However, there are a lot of low power nodes which can not localize themselves using the external mechanism due to high energy costs of doing so. However, due to wireless radios on the nodes, the receive signal strength indicator (RSSI) values on the nodes can be used to estimate the pairwise distance. We might have noise in the estimated pairwise distances and sometimes we might not know all of the pairwise distances. 

##### Formalized problem statement 

Let $C$ be a set of nodes where $C = B \cap A$ and $B \cup A = \phi$ i.e $A$ and $B$ form a partition of $C$. $A$ is a set of anchor nodes whose positions are known completely.  $B$ is a set of nodes whose positions are unknown. The symmetric distance matrix $D[i,j] = |C[i] - C[j]|$ is observed with noise as $O = D + N + S$ where $S$ is a sparse noise matrix and N is a noise matrix which is not sparse. 

A) Can we recover distance matrix $D$ from the observation matrix $O$?

B) If we recover the distance matrix, can we estimate the positions of the low power nodes in $B$?

##### Background and Survey

The problem above is not new and many methods have been discovered over past few decades. We will survey some of the methods starting from a simpler version of the problem and then progressing towards the more complex versions. 

1) Noiseless complete distance matrix

In this case, we assume that the distance matrix estimate has no noise in it and that all the pairwise distances are known. Multidimensional Scaling (MDS) is a known technique that can address this case. First the distance matrix can be used to get the Gram (Grammian) matrix which captures the pairwise inner product between the positions of the nodes. There is a choice to be made here for picking one of the points as the origin since estimating the positions from a distance matrix is unique only upto rigid transformations like translations, rotations and reflections. The Gram matrix is of shape $(n-1) \times (n-1)$ if the distance matrix is of the shape $n \times n$. If we choose the first node as the origin, we have

$$
	G[i,j] = \frac{D[1,i]^2 + D[1,j]^2 - D[i,j]}{2}
$$

Let the postion vectors of the $n-1$ nodes with respect to the first node be arranged into the columns of the matrix $X$ of shape $d \times (n-1)$ where $d=2,3$ based on if the points lie in 2D/3D.

$$
	G = X^T X
$$

Since we have already recovered G, we want find a decomposition as $G = A^T A$ so that we can set $X = A$ which will recover a solution with the first node at origin and unique upto rotations and reflections. With three known anchor positions, the rigid transformation can be resolved and we can recover the absolute coordinates of all the nodes in $C$.

If the observed matrix $O$ is noiseless, then $O = D$.

$$
	G = \frac{O[1,i]^2 + O[1,j]^2 - O[i,j]}{2} = \frac{D[1,i]^2 + D[1,j]^2 - D[i,j]}{2}
$$
 is a perfect Gram matrix which is positive semidefinite(PSD) and has rank d unless the points actually lie in a lower dimensional space than their tru embedding space (for eg, maybe the points lie on a line in 2D or on a line/plane in 3D).

Singular Value Decomposition (SVD) of the symmetric positive-semidefinite $G$ can help us recover one such decomposition. 
$$
	G = U \Sigma U^T = (U \Sigma^{1/2}) (\Sigma^{1/2} U^T) = (U \Sigma^{1/2}) (U \Sigma^{1/2})^T = A A^T \\ \; \\
	A = U\Sigma^{1/2}
$$

where $ A \in \mathbb{R}^{ (n-1) \times d}$


2. Complete but noisy distance matrix

If the observed distance matrix $O$ is noisy, then the estimate
$$
	G = \frac{O[1,i]^2 + O[1,j]^2 - O[i,j]}{2}
$$

is a noisy estimate of the Gram matrix. However, we can still hope to recover the positions approximately by a truncated rank-2 SVD decomposition if the noise is negligible as compared to the true distances i.e high signal to noise ratio (SNR). 
$$
	G = (U \Sigma^{1/2}) (U \Sigma^{1/2})^T = A A^T \\ \; \\
$$

where $ A \in \mathbb{R}^{ (n-1) \times d}$ and we can set $X = A$.

3. No noise but incomplete distance matrix

In this case, we might not observe all pairwise distances between the nodes but some of them. In such a case, how much can be really said about the positions of the nodes. We take inspiration from the work in [Network Localization in Partially Localizable Networks][0]. Depending on which pairwise distances we know, the estimation of position might admit multiple solutions instead of a unique one. The [Laman condition](https://en.wikipedia.org/wiki/Laman_graph) is stated below - 

![](laman-condition.png)
*Laman Condition*

The above paper also provides the necessary and sufficient conditions for a graph of nodes to be unique localized - 


![](necessary-sufficient-for-localization.png)
*Necessary and Sufficient Conditions for Localization*


Here is a proposed solution to the incomplete but no noise observation matrix $O$. Find all the nodes in B for which pairwise distance is known to atleast 3 anchor nodes. Take the submatrix of size $4 \times 4$ which contains the pairwise distances to the three or more anchor nodes and the node itself. This $4 \times 4$ matrix can then be used to 


[0]: https://homes.cs.washington.edu/~arvind/papers/pln.pdf
[1]: https://dspace.mit.edu/bitstream/handle/1721.1/58946/Chandrasekaran-2009-Sparse%20and%20low-rank%20matrix%20decompositions.pdf
[2]: http://users.cms.caltech.edu/~venkatc/cspw_slr_sysid09.pdf



