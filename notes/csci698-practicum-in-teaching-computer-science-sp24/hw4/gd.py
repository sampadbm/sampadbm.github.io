import numpy as np
from matplotlib import pyplot as plt

def f(x):
    return (x-5)**2 - 10

def df(x):
    return 2*(x-5)

print(df(1))

x  = 1
store = [1]
for i in range(30):
    x = x - df(x)/10
    store.append(x)
print("found approximate minima:",x)
store = np.array(store)

xx = np.linspace(0,10,100)
yy = f(xx)
plt.plot(xx,yy,)

plt.scatter(store,f(store),color='r')
plt.grid()
plt.savefig('quad2.png')
