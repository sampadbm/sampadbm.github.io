import numpy as np

for n in range(100):
    threshold = np.log10(np.e) + 15
    val = np.log10(np.math.factorial(n))
    if val >= threshold:
        print("n =", n, "\t", "val =", val)
        break
