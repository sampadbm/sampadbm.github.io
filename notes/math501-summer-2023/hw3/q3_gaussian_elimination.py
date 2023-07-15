from pylab import *


def gaussian_elimination(A, b, mode="naive"):
    assert mode in ["naive", "partial_pivoting", "scaled_partial_pivoting"]

    b = array(b, dtype=float)
    A = array(A, dtype=float)
    m, n = A.shape
    assert m == n == b.shape[0]

    if m == 1:
        return array([b[0] / A[0, 0]])

    # print(A)

    if mode == "naive":
        pivot = 0
    if mode == "partial_pivoting":
        pivot = argmax(A[:, 0])
    if mode == "scaled_partial_pivoting":
        pivot = argmax(A[:, 0] / abs(A).max(axis=1))

    nonpivots = list(set(range(n)) - set([pivot]))
    for i in nonpivots:
        multiplier = A[i, 0] / A[pivot, 0]
        # print(i,multiplier)
        A[i, :] = A[i, :] - multiplier * A[pivot, :]
        b[i] = b[i] - multiplier * b[pivot]

    # exit()
    Anext = A[nonpivots, 1:]
    bnext = b[nonpivots]
    partial_solution = gaussian_elimination(Anext, bnext).tolist()

    this_var = (b[pivot] - A[pivot, 1:] @ partial_solution) / A[pivot, 0]

    return array([this_var] + partial_solution)


def test(AA, bb, thresh, mode="naive"):
    my_sol = gaussian_elimination(AA, bb, mode=mode)
    # print(sol, AA@sol)

    official_sol = lstsq(AA, bb, rcond=None)[0]
    # print(sol2, AA@sol2)

    error = official_sol - my_sol
    error_norm = norm(error)

    return True if error_norm < thresh else False


def run_tests(threshold=1e-9, runs=100):
    # AA = array([ [1,1,1], [5,-1,-1], [1,1,-1] ])
    # AA = rand(3, 3)
    bb = array([3, 3, 1])

    if all([test(rand(3, 3), bb, threshold) for _ in range(runs)]):
        print("Test Passed !!!")
    else:
        print("Test Failed !!!")


if __name__ == "__main__":
    run_tests()

    print()
    
    # Book Computer Exercise Q2, page 101
    AA = array(
        [
            [0.4096, 0.1234, 0.3678, 0.2943],
            [0.2246, 0.3872, 0.4015, 0.1129],
            [0.3645, 0.1920, 0.3781, 0.0643],
            [0.1784, 0.4002, 0.2786, 0.3927],
        ]
    )

    bb = array([0.4043, 0.1550, 0.4240, 0.2557])

    assert test(AA, bb, 1e-9)

    solQ2 = gaussian_elimination(AA, bb)
    print("solQ2:", solQ2)

    # Book Computer Exercise Q3, page 101

    AA[2, 0] = 0.3345

    assert test(AA, bb, 1e-9)

    solQ3 = gaussian_elimination(AA, bb)
    print("solQ3:", solQ3)

    print("norm (solQ3 - solQ2):", norm(solQ3 - solQ2))

    print()

    # Book Computer Exercise Q4, page 101
    samples_for_n = choice(range(2, 16), 7, replace=False)

    def hilbert_matrix_test(n):
        H = rand(n, n)
        for i in range(n):
            for j in range(n):
                H[i, j] = 1 / ((i + 1) + (j + 1) - 1)
        bh = H.sum(axis=1)

        numpy_sol = lstsq(H, bh, rcond=None)[0]
        my_sol = gaussian_elimination(H, bh, mode="scaled_partial_pivoting")

        # print("Q4_numpy_sol:", numpy_sol)
        # print("Q4_my_sol:", my_sol)

        error_numpy_sol = norm(numpy_sol - ones(n))
        error_my_sol = norm(my_sol - ones(n))

        print(f"Q4 -> n:{n} \t numpy_error: {error_numpy_sol} \t my_error: {error_my_sol}")

    # test
    [   hilbert_matrix_test(n) for n in samples_for_n   ]

    print()
    
    # Book Computer Exercise Q5, page 101
    def q5_matrix_test(n):
        H = rand(n, n)
        for i in range(n):
            for j in range(n):
                H[i, j] = -1 + 2 * max(i,j)
        bh = H.sum(axis=1)

        numpy_sol = lstsq(H, bh, rcond=None)[0]
        my_sol = gaussian_elimination(H, bh, mode="scaled_partial_pivoting")

        # print("Q4_numpy_sol:", numpy_sol)
        # print("Q4_my_sol:", my_sol)

        error_numpy_sol = norm(numpy_sol - ones(n))
        error_my_sol = norm(my_sol - ones(n))
        # print(my_sol)
        print(f"Q5 -> n:{n} \t numpy_error: {error_numpy_sol} \t my_error: {error_my_sol}")

    q5_matrix_test(n=30)
    print()

    # Book Computer Exercise Q9, page 101

    AA = array(
        [
            [0.0001, -5.0300, 5.8090, 7.8320],

            [2.2660, 1.9950, 1.2120, 8.0080],

            [8.8500, 5.6810, 4.5520, 1.3020],

            [6.7750, -2.2530, 2.9080, 3.9700]
        ]
    )    

    bb = array([ 9.5740, 7.2190, 5.7300, 6.2910  ])

    naive_sol = gaussian_elimination(AA, bb)
    spp_sol = gaussian_elimination(AA, bb, "scaled_partial_pivoting")
    set_printoptions(precision=12)
    print("Q9: with naive:", naive_sol)
    print("Q9: with scaled partial pivoting:", spp_sol)

    diff = naive_sol - spp_sol
    print("Q9: norm of diff:", norm(diff))
