import numpy as np
import sympy as sp
from sympy.abc import alpha
from scipy.linalg import null_space as nullspace


def charpoly_method(A):
    print("\nEigenvalues and vectors via Charcteristic Polynomial:\n")

    A = sp.Matrix(A)
    B = A - alpha * sp.eye(*A.shape)

    sp.init_printing(num_columns=10000)
    print("A - alpha I = ")
    sp.pprint(B)
    print("===" * 17)

    charpoly = sp.det(B)
    print("charpoly = ")
    sp.pprint(charpoly)
    print("===" * 17)

    # using sympy.roots
    sympyroots = sp.roots(charpoly)  # gives roots with multiplicities
    print("eigenvalues using sympy.roots (returns multiplicities):", sympyroots)

    # using sympy solve
    sympysolve = sp.solve(charpoly)  # solves the expression equated to zero
    print("eigenvalues using sympy.solve:", sympysolve)

    # using numpy.roots
    poly = sp.poly(charpoly)  # convert to sympy poly
    coeffs = poly.coeffs()
    numpyroots = sorted(np.roots(coeffs))
    print("eigenvalues using numpy.roots:", numpyroots)

    print("===" * 17)
    for nproot in numpyroots:
        print("root:", nproot)

        print("eigenvector using scipy.linalg.null_space:")
        scipyns = nullspace(np.array(A, dtype=float) - nproot * np.eye(*A.shape))
        print(scipyns)

        print("---" * 17)

    for sproot in sympysolve:
        print("root:", sproot)

        print("eigenvector using sympy.nullspace:")
        sympyns = B.subs(alpha, sproot).nullspace()
        sp.pprint(sympyns)

        print("---" * 17)


def using_library_functions(A, disable_sympy=False):
    print("\nUsing Library Functions:\n")

    # using numpy
    A = np.array(A, dtype=float)
    np_eigenvals, np_eigenvecs = np.linalg.eig(A)

    print("eigenvalues  using numpy.linagl.eig:", np_eigenvals)
    print("eigenvectors using numpy.linalg.eig:\n", np_eigenvecs)
    # print(A)

    print("---" * 17)

    # using sympy
    A = sp.Matrix(A)
    sp_eigvals = A.eigenvals()
    print("sympy.eigenvals (with multiplicities):", sp_eigvals)

    sp_eigenvecs = A.eigenvects()
    print("sympy.eigenvects:")
    sp.pprint(sp_eigenvecs)


if __name__ == "__main__":
    # Exercise 8.3 - Q7 on pg 396 Kincaid and Cheney

    print("\nPart a)")
    A = [[3, 2], [7, -1]]
    charpoly_method(A)
    using_library_functions(A)

    print()
    print("***" * 20)
    print()

    print("Part b)")
    A = [[1, 3, -7], [-3, 4, 1], [2, -5, 3]]
    charpoly_method(A)
    using_library_functions(A)
