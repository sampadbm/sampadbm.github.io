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
	return result
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
			acc += temp
		else:
			pass
		temp = temp * A # update temp
```

** One may ask how did we get the binary representation if we had only multiplication and loop
operations to do with. Well one can get binary prepresentation of a decimal number using
those two operations easily. Maybe try to implement the bin function. Ofcourse one would 
have to allow for the comparision operations and that is assumed as a for loop itself is implemented
using comparision operations - one can say that for loops are equivalent to comparision operations.
			


