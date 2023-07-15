from pylab import *
from tqdm import tqdm


# General solution -> Qx = (Q - A)x + b


# For Jacobi, Q = diag(diag(A))
def Jacobi(A, b, xtrue=[], maxiters=2000, x0=[], tol=1e-4, showpbar=True):
    if not len(x0):
        x0 = zeros(A.shape[1])

    Q = diag(diag(A))
    I = eye(*A.shape)
    x = x0
    if showpbar: pbar = tqdm(range(maxiters))
    else: pbar = range(maxiters)
    
    for i in pbar:
        lastx = copy(x)
        # uses inverse of diagonal which is alright
        # x = (I - inv(Q) @ A) @ x + inv(Q) @ b

        # alternatively, we avoid inverse by the following
        rhs = (Q - A) @ x + b
        x, *_ = lstsq(Q, rhs, rcond=None)

        if showpbar: pbar.set_postfix({"x": x})

        if len(xtrue):
            if all(abs(x - xtrue) < tol):
                return i,x
        else:
            if norm(x - lastx) < tol:
                return i,x

    return inf,x


# For Gauss-Seidel, Q  = D - Cl and Q - A = Cu
# where A = D - Cu - Cl
# See Summary 8.4 on pg421 (Kincaid)


def GaussSeidel(A, b, xtrue=[], maxiters=2000, x0=[], tol=1e-4):
    if not len(x0):
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
                return i,x
        else:
            if norm(x - lastx) < tol:
                return i,x

    return inf,x


def SuccessiveOverApproximation(
    A, b, xtrue=[], maxiters=2000, w=0.9, x0=[], tol=1e-4
):
    if not len(x0):
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
                return i,x
        else:
            if norm(x - lastx) < tol:
                return i,x

    return inf,x


def compare(A, b, xtrue, tol=1e-4):
    jaciters = Jacobi(A, b, xtrue, tol=tol)[0]
    print("jacobi_iters:", jaciters)

    gsiters = GaussSeidel(A, b, xtrue, tol=tol)[0]
    print("Gauss-Seidel_iters:", gsiters)

    soriters = SuccessiveOverApproximation(A, b, xtrue, tol=tol)[0]
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


    # Q11
    print("\nRunning Q11")
    print("---" * 4)
    def get_A_and_b_and_xtrue(n):
        assert n%2==1

        A = zeros((n,n))
        for i in range(n):
            if i<n-1:
                A[i+1,i] = -1.0 
                A[i,i+1] = -1.0 
            A[i,n-1-i] = 0.5
            A[i,i] = 3.0
        

        b = zeros(n)
        b[:] = 1.5
        b[0] = b[-1] = 2.5
        b[n//2] = 1.0

        xtrue = ones(n)
        
        return A,b,xtrue

    for n in range(3,15,2):
        A, b, xtrue = get_A_and_b_and_xtrue(n)
        # A = array([ [3.0,-1,0.5],[-1,3,-1],[0.5,-1,3] ])
        # b = [2.5, 1, 2.5]
        # print(A)
        # print(b)
        # exit()
        iters, x = Jacobi(A,b,xtrue=xtrue, showpbar=False)
        print(f"n:{n} \t x: {x} \t took {iters} iters\n")
