from pylab import *
from print_color import print


def secant_method(f, a, b, iters=100, tolerance=1e-7, debug=False):
    lastb = b + 10 * tolerance
    for it in range(iters):
        fa, fb = f(a), f(b)
        df = (fb - fa) / (b - a)

        if isclose(df, 0):
            if debug: print(f"[INFO] Slope approached zero, returning current estimate.", color="red")
            return b  # no change from last iteration

        a = b # update a
        b = b - fb / df
    

        if isclose(b - lastb, 0, atol=tolerance, rtol=0):
            if debug: print(f"[INFO] converged with tolerance {tolerance} at iteration {it}!", color="green")
            return b
        lastb = b

    if debug: print(f"Concluded max iters of {iters}! Returning current estimate.", color="yellow")
    return b


if __name__ == "__main__":
    f = lambda x: x**3 - 5*x + 3

    a,b = -3,-1
    root = secant_method(f, a, b, debug=True, iters=100000)
    print(f"a={a}, b={b} | root = {root}")


    a,b = 0,1
    root = secant_method(f, a, b, debug=True, iters=100000)
    print(f"a={a}, b={b} | root = {root}")


    a,b = 1,2
    root = secant_method(f, a, b, debug=True, iters=100000)
    print(f"a={a}, b={b} | root = {root}")
