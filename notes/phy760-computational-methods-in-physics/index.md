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

In many applications, we have wireless nodes which need to deployed in adhoc manner. In these scenarios, there are some nodes which spend energy in accurately 

##### Formalized problem statement 

Let $C$ be a set of nodes where $C = B \cap A$ and $B \cup A = \phi$ i.e $A$ and $B$ form a partition of $C$. $A$ is a set of anchor nodes whose positions are known completely.  $B$ is a set of nodes whose positions are unknown. The symmetric distance matrix $D[i,j] = |C[i] - C[j]|$ is observed with noise as $O = D + S$ where $S$ is a sparse noise matrix. Can we recover distance matrix $D$ from the observation matrix $O$?

