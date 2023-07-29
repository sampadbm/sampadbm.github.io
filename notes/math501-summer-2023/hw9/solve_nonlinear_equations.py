from pylab import *
from jax import grad, jacfwd
import jax.numpy as jnp
import jax
from print_color import print


def newtons_nonlinear_solver(f, jacf, x0, iters=100, tolerance=1e-7, debug=False):
    # for a system of non-linear equations,
    # f1(a,b,c) = 0
    # f2(a,b,c) = 0
    # df1 = grad(f1) is the gradient of f1
    # df2 = grad(f2) is the gradient of f2

    # let x0 = [a0,b0,c0].T be a point in the domain of f1 and f2
    # A linear approximation to y=f1 at x0 is given by -> change_in_f1 = y - f1(x0) = < df1(x0) , x - x0 >
    # => y = f1(x0) + < df1(x0) , x - x0 >

    # similarly for a linear approximation of z=f2, we have
    # z = f2(x0) + < df2(x0) , x - x0 >

    # we can define f(x1,x2,x3) = [f1(x1,x2,x3), f2(x1,x2,x3)].T
    # then jacf = matrix([f1, f2])
    # Then the linearization of w=f at x0 is given as follows -
    # w = [y,z].T = [f1(x0) + <df1(x0), x-x0>, f2(x0) + <df2(x0),x-x0>].T
    # => w = [f1(x0),f2(x0)].T + matrix([df1(x0), df2(x0)]) @ (x - x0)
    # => w = f(x0) + jacf(x0) @ (x - x0)

    # so f(x) ~ w = f(x0) + jacf(x0) @ (x-x0)
    # if we want to find root of f(x), we would set it to the vector 0 = [0,0].T
    # f(x) = 0 ~ w = f(x0) + jacf(x0) @ (x-x0)
    # 0 ~ f(x0) + jacf(x0) @ (x-x0)
    # => jacf(x0) @ (x-x0) = -f(x0)
    # => x  = x0 - inv(jacf(x0)) @ f(x0)
    # => x = x0 - lstsq(jacf(x0), f(x0)) if jacf(x0) is invertible

    x = array(x0, dtype=float)
    lastx = x + 10 * tolerance  # just good enough for the first iteration

    for it in range(iters):
        fx0 = f(x)
        J = jacf(x)

        if isclose(det(J), 0):
            # non invertible jacobian, hence just return x0
            if debug:
                print(
                    f"[info] Jacobian found non-invertible at iteration: {it}!!! Returning current estimate.",
                    color="red",
                )
            return x

        a, *_ = jnp.linalg.lstsq(J, fx0)
        x = x - a

        if allclose(x, lastx, tolerance):
            if debug:
                print(
                    f"[info] Converged within tolerance of {tolerance} in {it} iterations! Returning current estimate.",
                    color="green",
                )
            break

        lastx = x

    return x


def get_jacobian(__fn):
    __jacf = jacfwd(__fn)

    matrixfied_jacf = lambda x: array(__jacf(x))

    return matrixfied_jacf


if __name__ == "__main__":
    jax.config.update("jax_platform_name", "cpu")

    print("\n################ Computer Exercise 3.2 | Q23 a ################")

    f1 = lambda x: x[0] ** 2 + x[1] ** 2 - 25
    f2 = lambda x: x[0] ** 2 - x[1] - 2
    f = lambda x: jnp.array([f1(x), f2(x)])
    jacf = get_jacobian(f)

    # initial estimate
    x0 = [1, 2]
    root = newtons_nonlinear_solver(f, jacf, x0, debug=True)
    print(f"x0 = {x0} | solution found = {root}")

    print("\n################ Computer Exercise 3.2 | Q23 b ################")
    f1 = lambda x: x[0]**3 - 2*x[0]*x[1] - x[1]**7 - 4*(x[0]**3)*x[1] - 5
    f2 = lambda x: x[1]*jnp.sin(x[0]) + 3*(x[0]**2)*x[1] + jnp.tan(x[0]) - 4

    f = lambda x: jnp.array([f1(x), f2(x)])
    jacf = get_jacobian(f)

    x0 = [1,0]
    root = newtons_nonlinear_solver(f, jacf, x0, debug=True)
    print(f"x0 = {x0} | solution found = {root}")

    print("\n################ Computer Exercise 3.2 | Q23 d ################")
    f1 = lambda x: jnp.sum(x)
    f2 = lambda x: jnp.sum(x**2) - 2
    f3 = lambda x: x[0]*(x[1] + x[2]) + 1

    f = lambda x: jnp.array([f1(x), f2(x), f3(x)])
    jacf = get_jacobian(f)


    x0 = [3/4, 1/2, -1/2]
    root = newtons_nonlinear_solver(f, jacf, x0, debug=True)
    print(f"x0 = {x0} | solution found = {root}")

    print("\n################ Computer Exercise 3.2 | Q23 e ################")
    f1 = lambda x: 4*x[1]**2 + 4*x[1] + 52*x[0] - 19
    f2 = lambda x: 169*x[0]**2 + 3*x[1]**2 + 111*x[0] - 10*x[1] - 10

    f = lambda x: jnp.array([f1(x), f2(x)])
    jacf = get_jacobian(f) 

    x0 = [-0.01, -0.01]

    root = newtons_nonlinear_solver(f, jacf, x0, debug=True)
    print(f"x0 = {x0} | solution found = {root}")

    print("\n################ Computer Exercise 3.2 | Q23 f ################")
    f1 = lambda x: jnp.sin(x[0]+x[1]) - e**(x[0]-x[1])
    f2 = lambda x: jnp.cos(x[0]+6) - (x[0]**2)*(x[1]**2)

    f = lambda x: jnp.array([f1(x), f2(x)])
    jacf = get_jacobian(f)

    x0 = [1.0,1.0]

    root = newtons_nonlinear_solver(f, jacf, x0, debug=True)
    print(f"x0 = {x0} | solution found = {root}")
        
    
