import jax.numpy as jnp
import numpy as np
from jax import jit, grad
from fire import Fire


def f(R):
    D = jnp.array(np.diag(range(1, 5)))
    loss = jnp.trace(R @ D)**2  # +  jnp.linalg.norm((R.T @ R) - jnp.eye(4))
    return -loss


def project2orthonormal(A):
    # A = 0.5*(A+A.T)
    u, s, vT = jnp.linalg.svd(A)
    # print(s)
    s = np.array(s)
    # s[s<0]=0
    s[s>1]=1
    # s/=sum(s)
    return u @ np.diag(s) @ vT
    # return u  @ vT


f = jit(f)
gradf = jit(grad(f))
# project2orthonormal = jit(project2orthonormal)


def gd(iters=1*10**4, lr=1e-4):
    # R = np.diag([1,1,1,-1])
    R = np.random.rand(4,4)
    R[:,:]=0
    for i in range(4):R[i,i] = 1 if i<1 else -1
    R = jnp.array(R)
    for i in range(iters):
        R = R - lr * gradf(R)
        R = project2orthonormal(R)
        print(f(R), end="")
        if i < iters-1:
            print("\r", end="")
        else:
            print("\n", R, "\n", f(R), "\n")


if __name__ == "__main__":
    Fire(gd)
