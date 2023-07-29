from pylab import *
from jax import grad
import jax.numpy as jnp
import jax

jax.config.update("jax_platform_name", "cpu")

# from tqdm import tqdm
import sympy as sp
from sympy.abc import x
from scipy.optimize import fsolve

from matplotlib import pyplot as plt
import seaborn as sns

sns.set_style("whitegrid")


def bisection_method(f, a, b, epsilon, return_no_of_iters=False):
    """
    f = function

    a,b are initial estimates for the location of the roots
    such that f(a)f(b) < 0

    epsilon = error in found root and actual root must be less than epsilon
    """
    try:
        fa, fb = f(a), f(b)
    except:  # function couldn't be evaluated, maybe we are out of domain
        if not return_no_of_iters:
            return None
        else:
            return None, None

    if fa * fb > 0:
        if not return_no_of_iters:
            return None
        else:
            return None, None
    # if f(a)==0: return a
    # elif f(b)==0: return b

    iters = ceil((log2(b - a) - log2(2 * epsilon)) / log2(2))
    # print(iters)
    iters = int(iters)

    for it in range(iters):
        c = (a + b) / 2
        fa, fb, fc = f(a), f(b), f(c)

        # found root
        if abs(fc) < 1e-16:
            if not return_no_of_iters:
                return c
            else:
                return c, iters
        if fa * fc < 0:
            b = c
        else:
            a = c
        # print(c,f(c))
    if not return_no_of_iters:
        return c
    else:
        return c, iters


def regula_falsi(f, a, b, epsilon, error_tolerance=1e-10, return_no_of_iters=False):
    """
    f = function
    a,b = initial interval to search
    error_tolerance = if x is a root, then we want |f(x) - 0| < error_tolerance
    """

    # In regula false, we need f(a) and f(b) opposite in sign, just like in bisection method
    try:
        fa, fb = f(a), f(b)
    except:  # function couldn't be evaluated, maybe we are out of domain
        if not return_no_of_iters:
            return None
        else:
            return None, None

    if fa * fb > 0:
        if not return_no_of_iters:
            return None
        else:
            return None, None
    iters = 0

    lastc = -inf
    convergence_counter = 0
    while True:
        # In regula falsi, we approximate the funtion to be a straight line passing via (a,f(a)) and (b,f(b)).
        # Then we find the x-intercept of this linear approximation which is our c ( instead of the midpoint of a-b interval as in bisection method)
        # eq of the line => y - fb = [(fb - fa)/(b - a)] * (x - b)
        # setting y=0 and x=c in the above eq, we get
        # => -fb [(b - a)/(fb - fa)] + b = c
        # => c = b - fb [(b - a)/(fb - fa)] = [b(fb - fa) - bfb + afb]/(fb - fa) = [afb - bfa]/(fb - fa)
        # => c = (a*fb - b*fa)/ (fb - fa)

        c = (a * fa - b * fb) / (fb - fa)

        fc = f(c)

        if abs(lastc - c) < epsilon:
            convergence_counter+=1
            # print(c)
        else:
            convergence_counter=0

        if convergence_counter==10:
            if not return_no_of_iters:
                return c
            else:
                if abs(fc) < error_tolerance: # check if converged c is actually a root
                    return c, iters
                else:
                    return c, inf # iters = inf means did not converge    

        if fc * fa < 0:
            b = c
        else:
            a = c

        iters += 1
        lastc = c
        # print(c)

def search_for_roots(
    fn,
    a,
    b,
    partitions=1e2 + 7,
    epsilon=1e-8,
    error_tolerance=1e-7,
    numerical_method="bisection",
    return_no_of_iters = False
):
    intervalsize = (b - a) / partitions
    intervals = arange(a, b + 2 * intervalsize, intervalsize)

    zeros = []

    # see if the partition boundaries are themselves roots
    for point in intervals:
        try:
            fnvalue = fn(point, return_no_of_iters=return_no_of_iters)
        except:
            continue  # maybe we are out of domain and are not able to evaluate the funtion, skip in this case

        if return_no_of_iters:
            if fnvalue[0]!=None and abs(fnvalue[0]) < 1e-16: boundary_zero_candidates += [fnvalue]
        else:
            if fnvalue!=None and abs(fnvalue) < 1e-16: boundary_zero_candidates += [fnvalue]
            
    # zeros = [zero for zero in boundary_zero_candidates if abs(zero) < 1e-16]
    # zeros = []
    for i in range(len(intervals) - 1):
        a = intervals[i]
        b = intervals[i + 1]

        if numerical_method == "bisection":
            root = bisection_method(fn, a, b, epsilon=epsilon, return_no_of_iters=return_no_of_iters)
        elif numerical_method == "regula_falsi":
            root = regula_falsi(fn, a, b, epsilon=epsilon,  error_tolerance=error_tolerance, return_no_of_iters=return_no_of_iters)

        if return_no_of_iters:
             if root[0] != None: zeros.append(root)
        else:
            if root != None: zeros.append(root)

    return zeros


if __name__ == "__main__":
    print("\n############### Question 1 ##############\n")
    f = lambda x: x**3 - 2 * x + 1
    g = lambda x: x**2
    h = lambda x: f(x) - g(x)

    roots = search_for_roots(h, -10, 10)
    print("roots by bisection:")
    print(roots)
    print()

    sproots = list(sp.roots(x**3 - 2 * x + 1 - x**2))
    sproots = [sp.N(spr) for spr in sproots]
    print("roots using sympy:")
    print(sproots)

    print("\n############### Question 2 ##############\n")

    f = lambda x: 9 * x**4 + 18 * x**3 + 38 * x**2 - 57 * x + 14
    a, b = 0, 1
    roots = search_for_roots(f, a, b)
    print("root using bisection:", roots)

    sproots = sp.roots(9 * x**4 + 18 * x**3 + 38 * x**2 - 57 * x + 14)
    sproots = list(sproots)
    sproots = filter(lambda x: x.as_real_imag()[1] == 0, sproots)
    sproots = list(sproots)

    print("root(s) using sympy:", sproots)
    print()

    print("\n############### Question 3 ##############\n")
    f = lambda x: 6 * (e**x - x) - 6 - 3 * x**2 - 2 * x**3
    roots = search_for_roots(f, -1, +1)
    print("roots using bisection method:", roots)

    scipyroots = fsolve(f, (0, -1))
    print("using scipy:", scipyroots)

    print("\n############### Question 7 ##############\n")
    f = lambda x: x**3 + 3 * x - 1
    a, b = 0, 1
    froots = search_for_roots(f, a, b, epsilon=1e-20)

    g = lambda x: x**3 - 2 * sin(x)
    a, b = 0.5, 2
    groots = search_for_roots(g, a, b, epsilon=1e-20)

    h = lambda x: x + 10 - x * cosh(50 / x)
    a, b = 120, 130
    hroots = search_for_roots(h, a, b, epsilon=1e-20)

    print("froots:", froots)
    print("groots:", groots)
    print("hroots:", hroots)

    print("\n############### Question 9 ##############\n")
    f1 = "f1 = lambda x: (x-5)**3"
    f2 = "f2 = lambda x: (x-3)*(x-7)"
    f3 = "f3 = lambda x: (x-1)*(x-5)*(x-9)"
    f4 = "f4 = lambda x: e**(x-7) - 1"
    f5 = "f5 = lambda x: sin(pi*x)"
    f6 = "f6 = lambda x: log(x/5)"

    for f in [f1, f2, f3, f4, f5, f6]:
        print(f)
        fn_name = f.split("=")[0].strip()

        # set fi for i in 1,2,3,4,5
        exec(f)
        # print(f1)

        roots = search_for_roots(eval(fn_name), a=0, b=10, numerical_method="bisection")
        print("roots:", roots)
        print("----------------------\n")

    print("\n############### Question 13 ##############\n")
    func = lambda x: (1 / sqrt(2 * pi)) * e ** (-(x**2) / 2) + (1 / 10) * sin(pi * x)
    a, b = -3.5, 3.5
    xvals = arange(a, b + 1e-3, 1e-3)
    yvals = [func(x) for x in xvals]

    p = sns.lineplot(x=xvals, y=yvals)
    plt.savefig("x.png")

    zeros = search_for_roots(func, a, b, numerical_method="bisection")
    print("zeros using bisection method:", zeros)

    print("\n############### Question 18 ##############\n")
    # points are (0,0), (x,0), (x,cos(x)), (0,cos(x))
    # area of rectangle = A = x * cos(x)
    # to maximize, we set dA/dx = 0 => cos(x) - x*sin(x) = 0
    A = lambda x: x * jnp.cos(x)
    diffA = lambda x: cos(x) - x * sin(x)
    diffdiffA = lambda x: -sin(x) - x * cos(x) - sin(x)

    gradA = grad(A)
    gradgradA = grad(grad(A))

    roots = search_for_roots(diffA, -1, 1)
    print("roots using bisection method for diffA:", roots)

    roots = search_for_roots(gradA, -1, 1)
    print("roots using bisection method for gradA:", roots)

    # check if they are maxima or minima
    for r in roots:
        if gradgradA(r) < 0:
            # if diffdiffA(r) < 0:
            print(f"Maxima at x={r} with value A(x)={A(r)}")

    print("\n############### Question 19 ##############\n")

    f1 = "f1 = lambda x: x**3 - 3*x +1"
    f2 = "f2 = lambda x: x**3 - 2*sin(x)"

    for f in [f1, f2]:
        print(f)
        fn_name = f.split("=")[0].strip()
        print()
        # set fi for i in 1,2,3,4,5
        exec(f)
        # print(f1)

        roots = search_for_roots(eval(fn_name), a=0, b=2, numerical_method="bisection", return_no_of_iters=True)
        for r,it in roots:
            print(f"root using bisection:: {r} took iters:{it}")


        print()

        
        roots = search_for_roots(eval(fn_name), a=0, b=2, numerical_method="regula_falsi", return_no_of_iters=True)
        for r,it in roots:
            if it==inf:
                print(f"FAILED: regula_falsi converged to x={r} which is NOT a zero as f(x)={eval(fn_name)(r)}")
            else: print(f"root using regula_falsi: {r} took iters:{it}")
        print("----------------------\n")
