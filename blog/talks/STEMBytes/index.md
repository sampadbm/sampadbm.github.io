---
category: talk
---

class: center middle

## Matrix And Tensor Factorization
### Approximations for understanding Spatiotemporal Data


<img height=100em src=https://anrg.usc.edu/www/wp-content/uploads/2013/02/anrgLogo.png />
<img height=100em src=https://identity.usc.edu/wp-content/uploads/2024/05/Marks_ApprovedColors_GoldWhiteonCard.png />


Sampad Mohanty  
Autonomous Networks Research Group, USC

24th September, 2025

---

#### About me
 
    - Advisor : Prof. Bhaskar Krishnamachari

    - Interests : 
        - Generalized Low Rank Models 
        - Interpretability / Safety in ML/LLMs, 
        - Physics + ML 
        - Technologies for Teaching/Learning

    - Other Interests :
            - Measures of inequality in access to quality of education.
            - Philosophy


    - Come say hi after the talk if you find these topics interesting

    - Would like to get involved/collaborate/propose via project(s)  


---
### Tensors in disguise

<img width=100%vw src=https://raw.githubusercontent.com/adhiraiyan/DeepLearningWithTF2.0/master/notebooks/figures/fig0201a.png />


---

### Examples : 1D Tensor


<img width=100%vw src=https://ars.els-cdn.com/content/image/3-s2.0-B9780323917728000090-f03-01-9780323917728.gif />

---
### Examples: 2D Tensor

<img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmAYcwYqfR2QIKMEqcICqgvxYPZpPdLt60Lw&s />

<img src=https://tbhaxor.com/content/images/2021/10/image-3.png />

---
### Example: 3D Tensors

<img width=100%vw src="https://tbhaxor.com/content/images/2021/10/image-2.png" />
<img width=100%vw src=https://dmicz.github.io/assets/img/svd_compression/svd_compression_25_1.png />

---
### Matrix And Tensor Factorization / Decomposition


$\;$ 

<img width=100%vw src=https://sampadbm.github.io/blog/quals/res/images/gm_ppt_figures/matrix-decomp-view.png />

$\;$

<img width=100%vw src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKL8LuwaALSq2DYEtVIuQ5iPymG6FX2-xl-A&s />

---
## Some Factorizations:

- Matrix:
    - Eigenvalue Decomposition (EVD) | $M = PDP^{-1}$
    - Singular Value Decomposition (SVD) | $M = U\Sigma V^T$
    - Principal Components Analysis ( Special case of EVD/SVD)
    - QR Factorization | $M = QR $
    - LU Decomposition | $M = LU$
    - Cholesky Factorization | $M = LL^T$
    - CUR Factorization | $M = CUR$
    - Non-negative Matrix Factorization (NMF) | $M = AB$


- Tensor:
    - Canonical Polyadic (CP) / Parallel Factors (PARAFAC)
    - Tucker Decomposition
    - Hierarchical Tucker
    - Higher Order SVD (HOSVD)
    - Tensor Train (TT) / Matrix Product State (MPS)
    - Tensor Networks
    - Tensor CUR 

---
## Tensor Factorization: CP vs Tucker Decomposition

<img width=70%vw src=https://sampadbm.github.io/blog/proposal/res/proposed_future_work/tucker_intuition.png />

---
## SVD for Image Compression

<iframe width=100%vw height=80%vh style="border:none" src="https://marimo.app/?embed=true#code/MQAg9BIM4MYE4EsAOAXAUKA2ig9jgNgHQC2AhosToXAK4B2KCxApgLoYik24D6CdUFKQYJSKZiAC8IAGal8UZhwhg0aJkhxwUIMhRxqePAObM6zOGOYATHgHcEKABZSQAIlII3aUkiSu9JioAQT8ACgdrZ0k3FmsEGmI3AEo1AAFfJEIYZnx8NGtmGRAeMOSALjQQapANLR1Ayk4oXQMa2uJNbRA6RKQAT2aepCqauu6yFCR8HBR8BAAjQgHp2aHp9HaZOBxiaABrJlJTDq6dazFSABoQGAItUert3YOj00IUSwEZLT3xnTgzCgCAAXkp2o8QKAADI4UjWTh0BFIQEonA5KAtN4SMLGSz9WDyZg3QHAsGyLTQJDMGypdpaBDGfjyPhkE7SO4zODUYwLABMeNI-TCFyEhFIgh2dC4KDKdJqUDIeVZxwk0lJoOYYQZTOl+BVphuYQAjHyABw3U1m5I3YSMHjyUTAujGSQAFVozHl1Uhivk+uxkMBKBocDo6Uy2Vy+UKxVKFUhlBI1jCbjTkJhODsIAASsJ9iBQmiAB5HRg4OggHDFYQgACSbPBNUhbqcCBadFmzAWeALhUoAk+VhaTizIFwnD8O1LkwktexIBozuMnBAMzsAFovgXJohiyBCndOjhgeXK2EAMoANQAIslCJC0ykg8wQ2GI34o3kCkUSmVKu0oAAKp1uU0DzIUcAUlB27QLkzAwGeQb5jwUAQRYARUDQCCEGhCCQSalrmjcABu8g0Mwkh8gADDc+CkAsuQxHmdAFtWk4lmWCAVs+7Tbqh6FwC+b7hmgGSfjk36xn+CaASAADCuxINwEjXjeiIIoCdyDrQiEdKqnA6Io+AIeImn5pCQE3BeNxXm6rh0Fk8x6sYuEkSmfrKtiNwyDQyq7ggGKSAAYvIijeiAsHqiheGQYQZH4BRkIZiAsKbrBmTTlxFaQplODFgaaogGEQGYOUNzlNurAgGkwyEPExyXmVVXJDVIB2c1+YVawEUpQACjMOg6sy+AaRxWWTNxlbAoUIALIMM1Nk8jK2sWQKuBsuE0AsqwoFAhEgHyPmMmSlFhBaIAACzJBFpBrVAmDUawhBMFAo52GEnkBo2NwwGQSCSAA5IK-SA7d92Pc9igoDwjBzFqgMAPKILq8hg7lENPeKpb7YD1YyOj7R3UCmDGs9r3vWEeUFd5tz-UDIOEzUxMPWTuGvrDjgmWEBMsQWADe24AL6FlO+XZXQTPVCzpPPXd7ZhHjMgExFm2MMYTgw-R-Q4NwZSQptxgwKQ+t8a+oaieJWSSTGv7xgBNRJsQKZPpZijjk4EixRhDE4CREgTjATjCCczgSLB7Fh+N4uTRWhCpVmGHbi0pJ+To-CtICtxKaSwIVmNMyYlWxSFEICD4DcdhtiZIBthrSf5i0-QILkCKkJnc4wDAoZWJFCEVpKNCIVND7tE+EXBhbagIHGPDSiwRhSNIbhGGQ-BGG4DvS5+tB0PrQA"> </iframe>

---
## Principal Components Analysis

<iframe width=100%vw height=90%vh style="border:none" src="https://marimo.app/?embed=true#code/JYWwDg9gTgLgBCAhlUEBQaD6mDmBTAOzykRjwBNMB3YGACzgF44AiAVwIGsCIqCW0iMGCYJkqAHQBBYQAoAlBjQABIWAkBjPABttacngBmcTAoBcaOFbihIsMShAQ4iAM4J01m+GjwwiAnI3F3cwcktrW184AjZwAE8QmLAIqyj7RG0YRGAoJMyYVLhDKAgQOFdObTxkAgkg7Nc8GHd0+G0IREpyYBxaVyKSsoqqmqg6gw0yyFdaYAgCbzt4AAUAYSkitrEYMA6YbWAAIwkweL2IeGC9wq8oZrZxuHWpABoXLPeOrswevpb3k53gQwO8wmCskpVMJNDptLI6MADJgpgZGAAVKBsPCKAzGUwvL6dbq9frA0FwcGUrLyCxeADEcAAMsS4PQ8HA-v1OaQ3M0XIFitpSGRFqBEPgBl5Kr9SS1RN8Sf9XAoigANUQyrkteq8orCo46dzMLVy1wSbJQfCFIqMgBKFDYWjZzgATAAROA0ejPDZFMAaRCiF6yAgo6YLQgtRiuxReNWYV3kUQBxASQy0TAwEgEVyGaAgWRqxS2uBre6kDlB928gBiJBAHPzeSkWRyUCK2tcv2MzDCEhr2XriEbsgA3kUvABydYARinZjgCaTAG0zO8AAwAXVek+sM7WroXS8T5DX71nO73Vin7rlx4NRokbhg5zwslc2bj1gAviX-Vk6a9I874ZjgswAF54IwsizhurwACzyN+VjNjYNiLDm+CyAA7LS15wAAHqIIISDm5BlGRAQ9AQMCwQArBuG4oV41IwBIrhsEcFx0bOrw4a8wAANSzixXg3BIoCuHQvBFiuhFbmReDSUI74AByvGpyEERJMC0NUsiPtorjyVuLESdJsksfcMCPIsarvF2PZQmosK6AiSJ4OGaKYtiuJGCYRbvBodDIDAEIwPhDJwAAyjJVBsnQHIhWFcAAG6ZNicCyGhTTVBoekLO8zQaBI5mAWBIE5b0kHQbIrqvLGLHAMYsgpbAEgZdo2IccAUFRaxVgiH2gFSfFcntexXU9cAgR4ApSkqWA6madpXhGngdKDZSogbkUNl2dloL-tC6haO5iLIqi0G+Ti+gBaYBSOWaPaAhAA1WIy5Y1GQLgVAAjmwyAcq22S5BUgYwGQUA8UUriQ9DogFBIayhbAshOeQhjyBISBQJwmCQLNdEZroFAYlieDvLVjAAGzMRIhDXbIBGEYwyNqrIB7ztTgbVOzgExXz75QaUjC1pkTTIbu21wPEAvsQAmlz6xHrzmTQcjQsa7IosQOLks4vIMvbVMHRQArKMQObXN3v8ZgAHJTl8eD4IEltMq7hDkLIekHNBLB27QLDSwRMAQNbelgIwK63ve7zc87cAHkeW5FDjYClMtsDAMpLOyzQ5D0DGTEm4NSW9HQMAl-BYf6QHAAS1FUCgUOEHAQfygAasAnGZH1FAYXAHrZS88gCF4JZeJNohOBIbDAM+ba5CiaN0fDIrECxjKTftDxPG1a+vCdrnnXoeKBZNYIfXAV8pHc+8EC5MJn-d+LmHvtnjEoLUmJgBAji8pgJgzAWDYCQLNbALAtpWFcliAgqogA"></iframe>

---
## K-Means as Constrained Matrix Factorization

<img src="./imgs/kmeans-as-cmf.png" />

---
## K-Means as Constrained Matrix Factorization

$X \in \mathbb{R}^{d \times n}$, the data matrix.

We want $X \approx CM$

$C \in \mathbb{R^{d \times k}}$ has columns as centroids.

$M \in \\{0,1\\}^{k \times n}$ is 0-1 hard membership.

Optimize: 

$$
    \argmin_{C,M}  || X - CM ||_F^2 
$$

Soft clustering: 
- $M \in [0,1]$, real valued, with $1^TM = 1$

---
## Image Imputation/Inpainting

- $X \in \mathbb{R}^{m \times n}$ is image matrix.

- $A \in \mathbb{R}^{m \times k}$, $B \in \mathbb{R}^{k \times n}$

- Want $X \approx AB$

$$
    \argmin_{A,B} || X - AB ||_F^2
$$

- What if some pixels of the image are corrupt?

$$
        \argmin_{A,B} || \Omega \circ ( X - AB ) ||_F^2
$$

---
## Image Inpainting

<img height=250px src="https://sampadbm.github.io/blog/proposal/res/sdp_paper/image_impute/flower_mp_90.0%25.png" />

<img height=250px src="https://sampadbm.github.io/blog/proposal/res/sdp_paper/image_impute/china_mp_90.0%25.png" />


---
## Inpainting Application: Restoration

<img width=100%vw src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Digital_Image_Restoration_and_Reconstraction.jpg" />

---
## Audio Inpainting for restoration

<img width=50%vw  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Corrupted_and_reconstructed_spectrogram.png/1280px-Corrupted_and_reconstructed_spectrogram.png" />

---
## Tensor Fact. Applications: Diagnosis

<img width=100%vw src="https://wires.onlinelibrary.wiley.com/cms/asset/dc6f4dfc-f24a-4850-be73-1e72cb124a9f/widm1197-toc-0001-m.png" />

---
## More Applications: Faster Imaging

<img src="https://www.frontiersin.org/files/Articles/581897/fninf-14-581897-HTML/image_m/fninf-14-581897-g001.jpg" />

---
## More Applications: Traffic Imputation/Prediction

<p><img width=400px src="https://sampadbm.github.io/blog/proposal/res/images/gm_ppt_figures/shanghai_grid.png" />

<img height=300px width=300px src=https://sampadbm.github.io/blog/proposal/res/images/gm_ppt_figures/missing-tensor.png /></p>
