try:
    from pyscript import display
except:
    display = print
    
from matplotlib import pyplot as plt

import numpy as np
np.random.seed(0)

import seaborn as sns
sns.set_style("darkgrid")


N = 10
Amean, Bmean, Cmean = map(np.array, [(80,200),(100,50),(50,150)])
A,B,C = map(lambda x: 20*np.random.randn(N,2)+x, [Amean, Bmean, Cmean])

marker = "+"
sns.scatterplot(x=A[:,0],y=A[:,1], label='A', marker=marker, color='red')
sns.scatterplot(x=B[:,0],y=B[:,1], label='B', marker=marker, color='green')
sns.scatterplot(x=C[:,0],y=C[:,1], label='C', marker=marker, color='blue')

display(plt)

