from pylab import *
from jax import grad
import jax.numpy as jnp
import jax
from print_color import print

jax.config.update("jax_platform_name", "cpu")


def newtons_method(f, df, x0, iters=100, mod_factor=1, tolerance=0, debug=False):
    x = float(x0)

    lastx = x + 10 * tolerance  # just good enough for the 1st iteration.

    if debug:
        print(f"x0 = {x}")

    for it in range(iters):
        # by default, x = x - f(x)/df(x)
        # when mod_factor is not 1, we have modified newtons_method
        fval, dfval = f(x), df(x)

        if dfval == 0:
            return x  # cant find the intercept as it is infinity, so just return the current approximate solution.

        # update
        x = x - mod_factor * fval / dfval

        if debug:
            print(f"x{it+1} = {x}")

        if tolerance:
            if abs(lastx - x) < tolerance:
                return x
            lastx = x

    return x


if __name__ == "__main__":
    print("\n################## Exercise 3.2 Q6 #################")
    f = lambda x: (x - 1) ** 8
    df = lambda x: 8 * (x - 1) ** 7

    for xstart in [0, 5, 10]:
        print("\n----------------------")
        print(f"Starting point x0={xstart}")
        print("----------------------")

        text = "Regular Newton's Method"
        text2 = "Modified Newton's Method (mod_factor = 4)"
        text3 = "Modified Newton's Method (mod_factor = 8)"
        print(text, " " * (35 - len(text)), text2, " " * (35 - len(text2)), text3)

        for i in range(7):
            root = newtons_method(f, df, x0=xstart, iters=i)
            mod4_root = newtons_method(f, df, x0=xstart, iters=i, mod_factor=4)
            mod8_root = newtons_method(f, df, x0=xstart, iters=i, mod_factor=8)

            text = f"x{i} = {root}"
            text2 = f"x{i} = {mod4_root}"
            text3 = f"x{i} = {mod8_root}"

            print(text, " " * (35 - len(text)), text2, " " * (41 - len(text2)), text3)

    print("\n################## Computer Exercise 3.2 Q2 #################")

    f = lambda x: x**3 + 2 * x**2 + 10 * x - 20
    df = lambda x: 3 * x**2 + 4 * x + 10
    df = grad(f)  # we could also auto-differentiate

    root = newtons_method(f, df, x0=2, iters=10, tolerance=5e-6, debug=True)
    # print(root)

    print("\n################## Computer Exercise 3.2 Q4 #################")

    f = lambda x: 2 * x * (1 - x**2 + x) * jnp.log(x) - x**2 + 1
    df = grad(f)

    root = newtons_method(f, df, x0=1.5, iters=10, debug=True)

    print("\n################## Computer Exercise 3.2 Q10 #################")

    functions = [
        "x - 2*jnp.sin(x)",
        "x**3 - jnp.sin(x) - 7",
        "jnp.sin(x) - 1 + x",
        "x**5 + x**2 - 1 - 7*x**3",
    ]

    xstarts = [0.5, 0.5, 0.5, 3]

    for fn, xs in zip(functions, xstarts):
        print("function:", fn, " " * (30 - len(fn)), f"x0: {xs}", color="red")

        exec(f"func = lambda x: {fn}")
        dfunc = grad(func)
        root = newtons_method(func, dfunc, x0=xs, iters=8, debug=True)


    print("\n################## Computer Exercise 3.2 Q15 #################", color="red")

    g = lambda x: x**2/2 + x + 1 - e**x
    dg = lambda x: x + 1 - e**x

    print("Regular Newton's method (slow convergence to root = 0)", format="underline")
    root = newtons_method(g, dg, x0=1, iters=10, debug=True)

    print("Modified Newton's method with mod_factor=2 (faster convergence)", format="underline")
    root = newtons_method(g, dg, x0=1, iters=10, debug=True, mod_factor=2, )
    

    print("\n################## Computer Exercise 3.2 Q19 #################")
    f = lambda x: x*sin(x)
    df = lambda x: sin(x) + x*cos(x)
    print("\nf(x) = x.sin(x) [has double root at x=0]", color="green")
    print("----------------", color="green")
    for xstart in [1]:
        print("\n----------------------")
        print(f"Starting point x0={xstart}")
        print("----------------------")

        text = "Regular Newton's Method"
        text2 = "Modified Newton's Method (mod_factor = 2)"
        print(text, " " * (35 - len(text)), text2)

        for i in range(8):
            root = newtons_method(f, df, x0=xstart, iters=i)
            mod2_root = newtons_method(f, df, x0=xstart, iters=i, mod_factor=2)

            text = f"x{i} = {root}"
            text2 = f"x{i} = {mod2_root}"

            print(text, " " * (35 - len(text)), text2)

