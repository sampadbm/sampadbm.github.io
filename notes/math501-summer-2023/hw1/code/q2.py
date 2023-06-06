import math


def arithmetic_mean(array: list):
    n = len(array)
    s = 0
    for a in array:
        s += a
    return s / n


def variance(array: list):
    n = len(array)
    m = arithmetic_mean(array)
    v = 0
    for a in array:
        v += (a - m) ** 2
    return v / (n - 1)


def std(array: list):
    v = variance(array)
    return math.sqrt(v)


A = [1, 2, 3]
print("AM:", arithmetic_mean(A))
print("Var:", variance(A))
print("std:", std(A))
