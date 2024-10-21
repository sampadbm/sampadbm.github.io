---
themes: ["muted","colorful"]
category: science
---

# 1-Bit-Problems-of-the-Day

### Mango Classification

There are images of mangoes from three different different species and they are, say species A,B and C.

![sample_mango](images/Mango_Maya.jpg)
*Sample Mango of type A*

These are RGB images (values range from 0-255) and an image processing script has already 
extracted the maximum red and green values from each of the mango images.

Here are the plot of the maximum red and green values of the three species plotted.


<script type="py">
    from pyscript import display
    from matplotlib import pyplot as plt
    
    import numpy as np
    np.random.seed(0)
    
    import seaborn as sns
    sns.set_style("darkgrid")
    
    
    N = 10
    Amean, Bmean, Cmean = map(np.array, [(100,200),(100,50),(50,200)])
    A,B,C = map(lambda x: 20*np.random.randn(N,2)+x, [Amean, Bmean, Cmean])

    sns.scatterplot(x=A[:,0],y=A[:,1], label='A', marker='o', color='red')
    sns.scatterplot(x=B[:,0],y=B[:,1], label='B', marker='o', color='green')
    sns.scatterplot(x=C[:,0],y=C[:,1], label='C', marker='o', color='blue')

    display(plt)
    

</script>


