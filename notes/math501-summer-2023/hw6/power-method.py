from pylab import *

def power_method(A, maxiters=100, x0=[]):
    n = A.shape[0]
    x = x0 if len(x0) else rand(n)

    rhistory=[]
    for i in range(maxiters):
        y = A@x
        r = y[-1]/x[-1]
        x = y/max(y)

        # Aitken Acceleration
        if i>=2:
            nr = (r - rhistory[-1])**2
            dr = r - 2*rhistory[-1] + rhistory[-2]
            s = r - nr/dr

        rhistory.append(r)

    return r,s,x


def inverse_power_method(A, maxiters=1000,x0=[], use_actual_inverse=False):
    n = A.shape[0]
    x = x0 if len(x0) else rand(n)

    rhistory=[]
    for i in range(maxiters):
        if use_actual_inverse:
            y = inv(A) @ x
        else:
            y,*_ = lstsq(A,x,rcond=None) # solving y = A^-1 @x using lstsq for efficiency
        r = x[-1]/y[-1]  # note that we want 1/(y[0]/x[0]) since evalue(A^-1) = 1/evalue(A)
        x = y/max(y)

        # Aitken Acceleration
        if i>=2:
            nr = (r - rhistory[-1])**2
            dr = r - 2*rhistory[-1] + rhistory[-2]
            s = r - nr/dr

        rhistory.append(r)

    return r,s,x


def shifted_power_method(A, shift, **kwargs):
    B = A + shift*eye(*A.shape)
    val, aitken_val, vec = power_method(B, **kwargs)
    return val - shift, aitken_val - shift, vec

def shifted_inverse_power_method(A, shift, **kwargs):
    B = A + shift*eye(*A.shape)
    val,aitken_val, vec = inverse_power_method(B, **kwargs)
    return val - shift, aitken_val - shift, vec

def eigenvalue_closest_to(A, closest_to=0, **kwargs):
    shift = - closest_to
    return shifted_inverse_power_method(A, shift, **kwargs)

def eigenvalue_furthest_from(A, furthest_from=0, **kwargs):
    shift = - furthest_from
    return shifted_power_method(A, shift, **kwargs)


def print_eigenvalues(A, **kwargs):
    Val, aitken_Val, Vec = power_method(A,**kwargs)
    print("largest mag. eigenvalue:", Val)

    val, aitken_val, vec = inverse_power_method(A,**kwargs)
    print("smallest mag. eigenvalue:", val)
    print("numpy.linalg.eig:", eig(A)[0])

    print("eigenvector corr. to largest mag. eigenvalue:", Vec)
    print("eigenvector corr. to smallest mag. eigenvalue:", vec)
    
    print("\n\n")

if __name__ == "__main__":

    ###########################################
    print("===> Computer Exercise 8.3 -> Q1")
    print("\npart a)")
    A = array([
        [5,4,1,1],
        [4,5,1,1],
        [1,1,4,2],
        [1,1,2,4]
    ])
    print_eigenvalues(A, maxiters=100)
    
    print("\npart b)")
    A = array([
        [2,3,4],
        [7,-1,3],
        [1,-1,5]
    ])
    print_eigenvalues(A)

    print("\npart c)")

    A = array([
        [-2,1,0,0,0],
        [1,-2,1,0,0],
        [0,1,-2,1,0],
        [0,0,1,-2,1],
        [0,0,0,1,-2]
    ])
    print_eigenvalues(A)

    ############################################
    print("Computer Exercise 8.3 -> Q4\n")
    A = array([
        [-57, 192, 148],
        [20, -53, -44],
        [-48, 144, 115]
    ])
    for c_to in [-4, 2, 8]:
        print(f"eigenvalue closest to {c_to}:", eigenvalue_closest_to(A, c_to)[0])

    print()

    
    ############################################
    print("===> Computer Exercise 8.3 -> Q5\n")

    print("\nPart a)")
    A = array([
        [6, 5, -5],
        [2, 6, -2],
        [2, 5, -1]
    ])
    print("r13:",power_method(A, maxiters=14, x0=[-1,1,1])[0])
    print("s13:",power_method(A, maxiters=14, x0=[-1,1,1])[1])
    print("x14:",power_method(A, maxiters=14, x0=[-1,1,1])[2])
    print("numpy.linalg.eig:",eig(A)[0])        
    
    print("\nPart b)")
    A = array([
        [-154, 528, 407],
        [55, -144, -121],
        [-132, 396, 318]
    ])

    print("s80:",inverse_power_method(A, maxiters=81, x0=[1,2,3], use_actual_inverse=True)[0])
    print("x80:",inverse_power_method(A, maxiters=81, x0=[1,2,3], use_actual_inverse=True)[2])
    print("numpy.linalg.eig:",eig(A)[0])        
    
    print("\nPart c)")
    A = array([
        [6, 5, -5],
        [2, 6, 2],
        [2, 5, -1]
    ])

    print("r30:",inverse_power_method(A, maxiters=31, x0=[-1,1,1], use_actual_inverse=True)[0])
    print("x30:",inverse_power_method(A, maxiters=31, x0=[-1,1,1], use_actual_inverse=True)[2])
    print("numpy.linalg.eig:",eig(A)[0])        


    print("\nPart d)")
    A = array([
        [1, 3, 7],
        [2, -4, 5],
        [3, 4, -6]
    ])

    val,aitken_accel_val,vec = eigenvalue_closest_to(A,-6, maxiters=6)
    print("eigenvalue closest to -6:", val)
    print("numpy.linalg.eig:", eig(A)[0])
    print("corresponding eigenvector:", vec)
    print()

    ############################################
    print("===> Computer Exercise 8.3 -> Q10\n")

    print("\nPart a)")
    A = array([
        [0.9901, 0.002],
        [-0.0001, 0.9904]
    ])
    x0 = [1,0.9]
    print_eigenvalues(A,x0=x0)


    print("\nPart b)")
    A = array([
        [8, -1, -5],
        [-4, 4, -2],
        [18, -5, -7]
    ])
    x0 = [1,0.8,1]
    print_eigenvalues(A,x0=x0)

    print("\nPart c)")
    A = array([
        [1, 1, 3],
        [1, -2, 1],
        [3, 1, 3]
    ])
    x0 = [1, 1, 1]
    print_eigenvalues(A,x0=x0)

    print("\nPart d)")
    A = array([
        [-2, -1, 4],
        [2, 1, -2],
        [-1, -1, 3]
    ])
    x0 = [3, 1, 2]
    print_eigenvalues(A, x0=x0)


    ############################################
    print("===> Computer Exercise 8.3 -> Q11\n")

    print("\nPart a)")
    A = array([
        [2, 1],
        [4, 2]
    ])
    print_eigenvalues(A)


    print("\nPart b)")
    A = array([
        [0.4812, 0.0023],
        [-0.0024, 0.4810]
    ])
    print_eigenvalues(A)


    print("\nPart c)")
    A = array([
        [1, 1, 0],
        [-1+1e-8, 3, 0],
        [0, 1, 1]
    ])
    print_eigenvalues(A)

    
    print("\nPart d)")
    A = array([
        [5, -1, -2],
        [-1, 3, -2],
        [-2, -2, 5]
    ])
    print_eigenvalues(A)

    
    print("\nPart e)")
    A = array([
        [0.987, 0.400, -0.487],
        [-0.079, 0.500, -0.479],
        [0.082, 0.400, 0.418]
    ])
    print_eigenvalues(A)
        
