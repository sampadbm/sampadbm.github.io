---
themes: ["muted","colorful"]
category: science
---



# Convex Programming and Extreme Points
<p style="text-align:center; color:#7A306C"> <b>13th Nov, 2024</b> </p>

<p style='text-align:center;color:green'><b> 
Extreme Points - only solutions of maximizing convex programs
</b></p> 

### Problem Statement
Prove that there exists an extreme point (of the feasible set) as a solution for maximizing the objective of any convex problem.

#### Solution

##### Concepts

> CONVEX FUNCTION  
Any function $f$ that satisfies
$$
    f(\alpha x_1 + (1-\alpha)x_2) \leq \alpha f(x_1) + (1-\alpha) f(x_2) \text{ for some } \alpha \in [0,1] 
$$

> CONVEX SETS  
Any set $S$ such that 
$$
    s_1,s_2 \in S, \alpha \in [0,1] \implies s = \alpha s_1 + (1 - \alpha)s_2 \in S 
$$
>
> Alternate Definition
> Any set $S$ is convex set if $\exist g$ such that is a 


> EXTREME POINTS  
If $C$ is a convex set, $x$ is an extreme point of $C$ iff  
$$
    \nexists \; x_0,x_2,\alpha \in [0,1] \in C \text{ such that }  x = \alpha x_1 + (1 - \alpha)x_2  
$$


> CONVEX PROBLEMS  
Any optimization problem of the form 
$$
    \underset{\vec{x}}{min} \; f(\vec{x}) \\
    \text{s.t }  g_i(\vec{x}) \leq c_i 
$$
where $f$ and $g_i$ are convex functions and $c_i$ are constants.


> MAXIMIZING THE OBJECTIVE  
If the minimization of the convex function is switched to a maxmization like below
$$
    \underset{\vec{x}}{max} \; f(\vec{x}) \\
    \text{s.t } g_i(\vec{x}) \leq c_i
$$

Can we do it on a linear function $f$ which ofcourse is convex?
Well, let's see. Let $S = \{ \vec{x} | g_i(\vec{x} \leq c_i \}$ be the feasible set which is convex. Let $M$

$$
   f(s) = f(\alpha s_1 + (1 - \alpha)s_2) = \alpha f(s_1) + (1 - \alpha)f(s_2) \;\;\; \because \text{ $f$ is linear} \\
   f(s) = 
$$
