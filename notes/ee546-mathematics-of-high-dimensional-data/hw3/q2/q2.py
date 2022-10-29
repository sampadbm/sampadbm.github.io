import scipy
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.sparse.linalg import svds
from fire import Fire
from tqdm import tqdm
from types import SimpleNamespace
 
def randomizedSVD(A, c=10, rank=10):
    # Drineas et. al
    m, n = A.shape
    fnorm = np.linalg.norm(A)

    colprobs = np.array([np.linalg.norm(col)**2 / fnorm**2 for col in A.T])
    colidx = np.random.choice(range(n), c, p=colprobs)

    B = A[:, colidx]
    for i in range(c):
        B[:,i] = B[:,i]/np.sqrt(colprobs[i]*c)
        
    U, Sigma, Vt = svds(B, k=rank)

    # get the V for svd of A
    V = A.T @ U[:,:rank] # (V Sigma U^T) @ U = V @ Sigma
    # normalize
    for i in range(V.shape[1]):
        V[:,i] = V[:,i]/np.linalg.norm(V[:,i])
        
    return U, Sigma, V

def relerr(Mrhat,Mr,niters=1000):
    # power method for ||Mrhat Mrhat.T - Mr Mr.T|| and ||Mr Mr.T||
    x = np.random.rand(Mrhat.shape[0])
    x = x/np.linalg.norm(x)

    t = np.random.rand(Mr.shape[0])
    t = t/np.linalg.norm(t)
    
    for i in range(niters):
        # for ||Mrhat Mrhat.T - Mr Mr.T||
        y = Mr.T @ x
        y = Mr @ y

        z = Mrhat.T @ x
        z = Mrhat @ z

        x = z - y
        x = x/np.linalg.norm(x) # for || Mrhat Mrhat.T - Mr Mr.T ||

        # for ||Mr Mr.T||
        t = Mr.T @ t
        t = Mr @ t
        t = t / np.linalg.norm(t)
        
    return np.linalg.norm(Mrhat @ (Mrhat.T @ x) - Mr @ (Mr.T @ x)) / np.linalg.norm( Mr @ (Mr.T @ t) )

        

def approximate():
    m = 1000
    n = 100000
    r = 10

    X = scipy.linalg.orth(np.random.rand(m, m))
    Y = scipy.linalg.orth(np.random.rand(n, m))
    D = np.zeros((m, m))
    for i in range(m):
        D[i, i] = r - i + 1 if i <= r else 4e-3

    A = X @ D @ Y.T


    res = SimpleNamespace(**{"cU":[],"cV":[],'eU':[], 'eV':[]})
    ntrials = 10


    # for V
    pbar = tqdm( range(25,975,25), colour="GREEN")
    for c in pbar:
        avg = 0
        for _ in tqdm(range(ntrials), colour="RED", leave=False):
            V,S,U = randomizedSVD(A.T,c=c)
            Vr = Y[:,:r]
            Vrhat = V
            avg += relerr(Vrhat,Vr)
                       
        e = avg/ntrials
        res.cV.append(c)
        res.eV.append(e)

        pbar.set_postfix({"cV":c,"eV":e})
        sns.lineplot(x=res.cV, y=res.eV)
        plt.xlabel("cV")
        plt.ylabel("eV")
        plt.savefig("v.png")
        



    # for U
    pbar = tqdm( range(250,15000,250), colour="GREEN")
    for c in pbar:
        avg = 0
        for _ in tqdm(range(ntrials), colour="RED", leave=False):
            U,S,V = randomizedSVD(A,c=c)
            Urhat = U
            Ur = X[:,:r]
            avg += relerr(Urhat,Ur)

        e = avg/ntrials
        res.cU.append(c)
        res.eU.append(e)

        pbar.set_postfix({"cU":c,"eU":e})
        plt.clf()
        sns.lineplot(x=res.cU, y=res.eU)
        plt.xlabel("cU")
        plt.ylabel("eU")
        plt.savefig("u.png")

        
if __name__ == "__main__":
    sns.set_theme()
    Fire(approximate)
