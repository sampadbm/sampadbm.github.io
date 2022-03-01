---
themes: ["colorful"]
category: research
---






# Physics and AI


### Intro

In the last few years there has been a significant amount of interdisciplinary work at the intersection of physics and artificial intelligence and machine learning.
Right after the initial success of deep neural networks in tackling varied and wide ranging problems, it was realized that there many challenges to deep learning starting with the amount of data required to train and the inconsistency of predictions with many simple physical laws, constraints and general common sense. 
One such example is that of using Neural Networks to predict age (say, in bins/ranges of 10 years) from facial images. 
The probabilities of predicting the age range would not follow an order which has led to works such as rank consistent ordinal regression for neural networks [1].

 

 Similarly, other examples like predicting the height of a particle moving under the influence of gravity in a video can be predicted frame by frame but incorporating constraints on the class of hypothesis due to prior knowledge on the trajectory of projectiles being parabolic. 
This can significantly reduce the amount of data needed while making the model more robust to noise in training data. 
Challenges in obtaining labeled data have led to works in unsupervised learning such as in "Label-Free Supervision of Neural Networks with Physics and Domain Knowledge"[2] which uses both restriction on the class of hypothesis functions using regularization and at the same time impose constraints on the hypothesis based on the prior information about the physics of the system. Neural networks with loss functions incorporating constraints and penalties from physics is one of the most common ways in models that are now called Physics Guided Neural Networks (PGNNs). A lot of work has also been towards integrating differential equations and neural networks since almost all of physical phenomena in nature appear in the form of differential equations (ordinary and partial). Techniques like Neural Ordinary Differential Equations [3]  and Universal Differential Equations [4] have been two recently proposed models bring differential equations and neural networks together and also address to problems of training such hybrid networks and their numerical stability.


On the other side of the coin is a lot of work using machine learning to help making discoveries in physics. This closely resembles to the area of *System Identification* in field of systems and control theory. One of the earliest attempts in this area are symbolic regressions for learning the governing dynamics of a system from experiment data. For example, the form of governing equations of motion of a pendulum can be inferred from a video of a swinging pendulum. Many variations on symbolic regressions models have been proposed like “Discovering governing equations from data by sparse identification of nonlinear dynamical systems”[5]  and AI-Feynman [6]. Many symbolic regression tools like [PySINDy](https://github.com/dynamicslab/pysindy),  [GPlearn](https://gplearn.readthedocs.io/en/stable/) ,  [SymbolicRegression.jl](https://github.com/MilesCranmer/SymbolicRegression.jl) and [PySR](https://github.com/MilesCranmer/PySR) have appeared in recent years. Nvidia has recently released their neural network framework that blends physics and partial differential equations and is named [Nvidia Modulus](https://developer.nvidia.com/modulus).

In recent years, deep neural networks in the form of auto-encoders have made possible discovery of more complicated dynamics of systems by helping in learning the change of coordinates that facilitates in making the governing model simple in that frame of reference. This is done in the spirit of finding the simplest governing equations for the observed data inline with  philosophical assumptions like the Occam’s Razor. Other works that use neural networks for system identification are “Nonlinear Systems Identification Using Deep Dynamic Neural Networks” [7] and “Neural Networks in System Identification” [8].

Another interesting recent direction has been on using physics based machine learning in automated fault/anomaly detection and digital twin applications. Some of the works are [9] [10] and [11] . Here is a [presentation](https://michael.kapteyn.nz/uploads/Kapteyn_INFORMS2020.pdf) on the topic called "From Physics-based Models to Predictive Digital Twins via Interpretable Machine Learning" [10] from [informs2020](http://meetings.informs.org/wordpress/annual2020/).

> #### Figures


>#### References

>[1. Rank consistent ordinal regression for neural networks with application to age estimation](https://arxiv.org/abs/1901.07884)

>[2. Label-Free Supervision of Neural Networks with Physics and Domain Knowledge](https://arxiv.org/abs/1901.07884)

>[3. Neural Ordinary Differential Equations ](https://arxiv.org/abs/1806.07366)

>[4. Universal Differential Equations for Scientific Machine Learning ](https://arxiv.org/abs/2001.04385)

>[5. Discovering governing equations from data by sparse identification of nonlinear dynamical systems](https://www.pnas.org/content/113/15/3932](https://www.pnas.org/content/113/15/3932)

>[6. AI Feynman: a Physics-Inspired Method for Symbolic Regression](https://arxiv.org/pdf/1905.11481.pdf)

>[7. Nonlinear Systems Identification Using Deep Dynamic Neural Networks](https://arxiv.org/abs/1610.01439)

>[8. Neural Networks in System Identification ](https://www.sciencedirect.com/science/article/pii/S1474667017477378)

> [9. Digital twin, physics-based model, and machine learning applied to damage detection in structures](https://www.sciencedirect.com/science/article/pii/S0888327021000091)

>[10. From Physics-Based Models to Predictive Digital Twins via Interpretable Machine Learning](https://arxiv.org/abs/2004.11356)

> [11. Machine learning based digital twin for dynamical systems with multiple time-scales](https://arxiv.org/abs/2005.05862)
