import numpy as np

def gaussian_elimination(A, b):
    n = len(b)
    # Augmented matrix
    augmented = np.column_stack((A, b))

    for i in range(n):
        # Find pivot row
        pivot_row = i
        for j in range(i + 1, n):
            if abs(augmented[j, i]) > abs(augmented[pivot_row, i]):
                pivot_row = j

        # Swap current row with pivot row
        augmented[[i, pivot_row]] = augmented[[pivot_row, i]]

        # Elimination
        for j in range(i + 1, n):
            factor = augmented[j, i] / augmented[i, i]
            augmented[j, i:] -= factor * augmented[i, i:]

    # Back substitution
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (augmented[i, n] - np.dot(augmented[i, i+1:n], x[i+1:])) / augmented[i, i]

    return x

# Example usage
A = np.array([[2, 3, -2], [4, 7, 1], [1, -2, 2]], dtype=float)
b = np.array([1, -2, 0], dtype=float)

solution = gaussian_elimination(A, b)
print(solution)
