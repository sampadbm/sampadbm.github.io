---
themes: ["muted","colorful"]
category: science
---


### PROBLEM STATEMENT
You would like to design an efficient algorithm to take exponents of objects (numbers, matrices, etc.) on a machine.
The machine only supports looping and multiplication of two objects.
Write an efficient algorithm to raise an object A to the power x.


### SOLUTION
1. Naive Method

```python
def power(A, x):
	acc = I # I is the multiplicative identity object such that I*B = B*I = B
	for i in range(x):
		acc = acc * A
	return acc
```

2. Efficient Method (repeated squaring)

```python
def power(A, x):
	xbin = bin(x) # binary representation of x in ascii with an '0b' prepended
	xbin = map(int, xbin[2:]) # get rid of '0b' and convert to integers
	xbin = list(xbin) # change map object to list
	xbin.reverse()  # least significant bit first

	temp = A # holds A^1, A^2, A^4, A^8, ... (A raised to successive powers of 2)
	acc = I # multiplicative identity
	for bit in xbin:
		if bit == 1:
			acc = acc * temp # include this power of 2 in the product
		temp = temp * temp # square: A^(2^k) -> A^(2^(k+1))
	return acc
```

** One may ask how we got the binary representation if we only had multiplication and loop
operations to work with. The bits of x can be peeled off by repeatedly halving x and checking
whether it is odd. This needs comparison (and halving) in addition to multiplication, but a for loop
is itself implemented using comparisons, so we assume those are available. Try implementing the bin function yourself.


> If A is a matrix, we reduce the number of matrix multiplications from O(x) to O(log x).

> Here is an example:
> Let x = 7. In the naive method, we need A\*A\*A\*A\*A\*A\*A, which is 6 matrix multiplications.
> In the efficient method, we use $A^7 = A^{4 + 2 + 1} = A^4 \cdot A^2 \cdot A^1$ with 7 = 0b111.
> We need 2 squarings to build $A^2$ and $A^4$, and 2 multiplications to combine $A^4 \cdot A^2 \cdot A$.
> That is 4 matrix multiplications instead of 6. (The code above also does a trivial $I \cdot A$ and one final unused squaring; both are easy to skip.)

> Now consider x = 15 = 0b1111. The naive method needs 14 multiplications.
> The efficient method needs 3 squarings ($A^2, A^4, A^8$) and 3 multiplications to combine $A^8 \cdot A^4 \cdot A^2 \cdot A$,
> so 6 matrix multiplications in total for $A^{15}$.

> In general, x has $\lfloor \log_2 x \rfloor + 1$ bits. The efficient method needs $\lfloor \log_2 x \rfloor$ squarings and
> at most $\lfloor \log_2 x \rfloor$ combining multiplications, so at most $2\log_2 x$ matrix multiplications. This is O(log x), which is
> much more efficient than the naive method's O(x) matrix multiplications.
