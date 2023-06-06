import numpy as np


def pn(n=1):
    assert n > 0
    if n == 1:
        return 1
    else:
        return np.e - n * pn(n - 1)


for i in range(1, 21):
    print(f"n={i} \t p_n = {pn(i)}")
