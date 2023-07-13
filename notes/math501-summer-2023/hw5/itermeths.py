from pylab import *
from tqdm import tqdm


# General solution -> Qx = (Q - A)x + b


# For Jacobi, Q = diag(diag(A))
def Jacobi(A, b, xtrue=[], maxiters=2000, x0=None, tol=1e-4):
    if x0 == None:
        x0 = zeros(A.shape[1])

    Q = diag(diag(A))
    I = eye(*A.shape)
    x = x0
    pbar = tqdm(range(maxiters))
    for i in pbar:
        lastx = copy(x)
        # uses inverse of diagonal which is alright
        # x = (I - inv(Q) @ A) @ x + inv(Q) @ b

        # alternatively, we avoid inverse by the following
        rhs = (Q - A) @ x + b
        x, *_ = lstsq(Q, rhs, rcond=None)

        pbar.set_postfix({"x": x})

        if len(xtrue):
            if all(abs(x - xtrue) < tol):
                return i
        else:
            if norm(x - lastx) < tol:
                return i

    return inf


# For Gauss-Seidel, Q  = D - Cl and Q - A = Cu
# where A = D - Cu - Cl
# See Summary 8.4 on pg421 (Kincaid)


def GaussSeidel(A, b, xtrue=[], maxiters=2000, x0=None, tol=1e-4):
    if x0 == None:
        x0 = zeros(A.shape[1])

    D = diag(diag(A))
    Cu = zeros(A.shape)
    Cl = zeros(A.shape)
    for i in range(A.shape[0]):
        Cu[i, i + 1 :] = -A[i, i + 1 :]
        Cl[i, :i] = -A[i, :i]

    # for Gauss-Seidel, Q = D - Cl
    Q = D - Cl

    x = x0
    pbar = tqdm(range(maxiters))
    for i in pbar:
        lastx = copy(x)
        rhs = (Q - A) @ x + b  # also equal to Cu @ x as A = D - Cu - Cl
        x, *_ = lstsq(Q, rhs, rcond=None)

        pbar.set_postfix({"x": x})

        if len(xtrue):
            if all(abs(x - xtrue) < tol):
                return i
        else:
            if norm(x - lastx) < tol:
                return i

    return inf


def SuccessiveOverApproximation(
    A, b, xtrue=[], maxiters=2000, w=0.9, x0=None, tol=1e-4
):
    if x0 == None:
        x0 = zeros(A.shape[1])

    D = diag(diag(A))
    Cu = zeros(A.shape)
    Cl = zeros(A.shape)
    for i in range(A.shape[0]):
        Cu[i, i + 1 :] = -A[i, i + 1 :]
        Cl[i, :i] = -A[i, :i]

    x = x0

    pbar = tqdm(range(maxiters))
    for i in pbar:
        lastx = copy(x)
        rhs = (w * Cu + (1 - w) * D) @ x + w * b
        x, *_ = lstsq(D - w * Cl, rhs, rcond=None)

        pbar.set_postfix({"x": x})

        if len(xtrue):
            if all(abs(x - xtrue) < tol):
                return i
        else:
            if norm(x - lastx) < tol:
                return i

    return inf


def compare(A, b, xtrue, tol=1e-4):
    jaciters = Jacobi(A, b, xtrue, tol=tol)
    print("jacobi_iters:", jaciters)

    gsiters = GaussSeidel(A, b, xtrue, tol=tol)
    print("Gauss-Seidel_iters:", gsiters)

    soriters = SuccessiveOverApproximation(A, b, xtrue, tol=tol)
    print("SuccessiveOverApproximation_iters:", soriters)


if __name__ == "__main__":
    # Q2
    print("\nRunning Q2")
    print("---" * 4)
    A = array([[7, 1, -1, 2], [1, 8, 0, -2], [-1, 0, 4, -1], [2, -2, -1, 6]])
    b = array([3, -5, 4, -3])
    xtrue = [1, -1, 1, -1]
    compare(A, b, xtrue)

    # Q3
    print("\nRunning Q3")
    print("---" * 4)
    A = array([[7, 3, -1, 2], [3, 8, 1, -4], [-1, 1, 4, -1], [2, -4, -1, 6]])
    b = array([-1, 0, -3, 1])
    xtrue = [-1, 1, -1, 1]
    compare(A, b, xtrue)

    # Q7
    print("\nRunning Q7")
    print("---" * 4)
    A = array([[9, -3], [-2, 8]])
    b = array([6, -4])
    xtrue = [-1, 1, -1, 1]
    compare(A, b, xtrue=[], tol=1e-7)
