import scipy
import numpy as np
import matplotlib.pyplot as plt


if __name__ == "__main__":
    m = 1000
    n = 100000
    r = 10

    X = scipy.linalg.orth(np.random.rand(m, m))
    Y = scipy.linalg.orth(np.random.rand(n, m))
    D = np.zeros((m,m))
    for i in range(m):
        D[i,i] = r - i + 1 if i <=r else 4e-3

    A = X D Y.T
    
    
