from pylab import *


def iterate(update_fn, x0, iters=11):
    x = x0
    for i in range(iters):
        print(f"x{i} = {x}")
        x = update_fn(x)


if __name__ == "__main__":
    v = 7
    r = v**3
    print(f"\npart a, r={r}")
    print("--------------")
    update_a = lambda x: 1 / 3 * (2 * x - r / x**2)
    iterate(update_a, 1)

    print(f"\npart b")
    print("--------------")
    update_a = lambda x: x / 2 + 1 / x

    print("\nwith x0 = 1")
    iterate(update_a, 1, iters=5)

    print("\nwith x0 = -1")
    iterate(update_a, -1, iters=5)
