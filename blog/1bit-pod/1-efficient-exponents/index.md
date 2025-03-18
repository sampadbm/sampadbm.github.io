---
themes: ["muted","colorful"]
category: science
---


### PROBLEM STATEMENT
You would like to design an efficient algorithm to take exponents of objects(numbers, matrices, etc) on a machine
The machine only supports looping and multiplication of two objects. 
Write an efficient algoriithm to raise an object A to the power x. 


### SOLUTION
1. Naive Method

```python
def power(A,x)
	accumulator = I # I is the multiplicative identity object such that I*B = B*I = B
	for i in range(x):
		accumulator *= A
	return accumulator
``` 

2. Efficient Method

```python
def power(A,x):
	xbin = bin(x) # binary representation of x in ascii with an '0b' prepended
	xbin = map(int,xbin[2:]) # get rid of '0b' and convert to integers
	xbin = list(xbin) # change map object to list
	xbin.reverse()  # reverse xbin

	temp = I # multiplicative identity
	acc = 0 # additive identity such that B + 0 = 0 + B = B
	for bit in xbin:
		if bit==1:
			acc *= temp
		temp = temp * A # update temp
	return acc
```

** One may ask how did we get the binary representation if we had only multiplication and loop
operations to do with. Well one can get binary prepresentation of a decimal number using
those two operations easily. Maybe try to implement the bin function. Ofcourse one would 
have to allow for the comparision operations and that is assumed as a for loop itself is implemented
using comparision operations - one can say that for loops are equivalent to comparision operations.
			

> If A is a matrix, we reduce the number of matrix multiplicaitons from O(x) to O(ln(x))

> Here is an example:
> Let x = 7. In the naive method, we need A*A*A*A*A*A*A which is 6 matrix multiplicaitons.
> In the more efficient method, we have $A^7 = A^{4 + 2 + 1} = A^4 * A^2 * A^1$
> 7 = 0b111. Hence the loop runs 3 times and we have 3 multiplicaitons for temp and 3 for acc. Hence a total of 6 matrix multiplicaitons.
> So there is not much gain from the naive method.

> However, consider x = 15. Now, in the naive method we need 14 multiplications. 
> 15 = 0b1111. So here, we need 4 iterations fo the loop, hence 4 multiplications for temp and 4 multiplications for acc.
> In general, there will be less multiplicaitons for acc as it will always be less than that of the muctliplications for temp.
> Hence we have 8 matrix mulitplicaitions in total for $A^15$.

> In general, for the efficient process, we need 2*ln(x) matrix multiplicaitons which is O(ln(x)) which is 
> much more efficient than the naive method which has O(x) matric multiplications.
