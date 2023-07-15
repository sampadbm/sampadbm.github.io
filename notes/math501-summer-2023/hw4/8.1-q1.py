from pylab import *
from scipy.linalg import lu

def tridiagonal_to_lu(A, unitdiagonal='L'):
    assert unitdiagonal in ['L','U']

    n = A.shape[0]
    mask = ones((n,n))
    for i in range(n):
        mask[i,i] = 0
        if i>0: 
            mask[i,i-1] = 0
        if i < n-1:
            mask[i,i+1] = 0

    assert any(mask*A)==False

    L = zeros(A.shape)
    U = zeros(A.shape)

    if unitdiagonal == 'U':
        # unit diagonal U
        for i in range(n):
            U[i,i] = 1
            
        L[0,0] = A[0,0]
        for i in range(1,n):
            L[i,i-1] = A[i,i-1]
            U[i-1,i] = A[i-1,i]/L[i-1,i-1]
            L[i,i] = A[i,i] - L[i,i-1] * U[i-1,i]

    else:
        # unit diagonal L
        for i in range(n):
            L[i,i] = 1
            
        U[0,0] = A[0,0]
        for i in range(1,n):
            U[i-1,i] = A[i-1,i]
            L[i,i-1] = A[i,i-1]/U[i-1,i-1]
            U[i,i] = A[i,i] - L[i,i-1] * U[i-1,i]

    return L,U


def test(A):
    print("our algo - U unit diagonal:")
    l,u = tridiagonal_to_lu(A, unitdiagonal='U')
    print(l)
    print()
    print(u);print()
    print(l@u)
    print()
    
    
    print("our algo - L unit diagonal:")
    l,u = tridiagonal_to_lu(A, unitdiagonal='L')
    print(l)
    print()
    print(u)
    print()
    print(l@u)
    
    print("scipy.linalg.lu:")
    p, l, u = lu(A, permute_l=False)
    print(l)
    print()
    print(u)
    print()
    print(p@l@u)

if __name__ == "__main__":
    A = array([
        [1, 2, 0, 0],
        [2, 1, 2, 0],
        [0, 2, 1, 2],
        [0, 0, 2, 1]
    ])


    test(A)
    
