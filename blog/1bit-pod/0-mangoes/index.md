---
themes: ["muted","colorful"]
category: science
---

# Mango Classification
### Mango Classification
There are images of mangoes from three different species and they are, say species A,B and C.

![sample_mango](images/Mango_Maya.jpg)
*Sample Mango of type/species A*

These are RGB images (pixel values range from 0-255) and an image processing script has already 
extracted the maximum red and green values from each of the mango images.

Here is the plot of the maximum red and green values of the three species plotted along with the code snippet which list their values.

<script type="py">
	from pyscript import display,HTML
	from matplotlib import pyplot as plt
	import seaborn as sns
	import numpy as np
	############ 
	np.random.seed(0)
	N = 10
	Amean, Bmean, Cmean = map(np.array, [(80,200),(100,50),(50,150)])
	A,B,C = map(lambda x: 20*np.random.randn(N,2)+x, [Amean, Bmean, Cmean])
</script>

<script id="mango_data" type="py" terminal> 
	print(f"A = {A}")
	print(f"\n\nB = {B}")
	print(f"\n\nC = {C}")

</script>

<div id="mangoes"> <div class="loader"></div> </div>

<script type="py" target="mangoes">
	############
	sns.set_style("whitegrid")
	marker = "P"
	sns.scatterplot(x=A[:,0],y=A[:,1], label='A', marker=marker, color='red')
	sns.scatterplot(x=B[:,0],y=B[:,1], label='B', marker=marker, color='green')
	sns.scatterplot(x=C[:,0],y=C[:,1], label='C', marker=marker, color='blue')
	#############
	display(plt, append=False, target="mangoes")
	display(HTML("<em>Mangoes from 3 species</em>"))
	#from pyscript import window
	#window.alert("ok")
</script>


Now, you are given five new mangoes whose maximum red and green values
have been extracted as given below and shown in the plot

<pre><code class="python">X = [[130,70],[70,70],[100,170],[30,100],[70,210]]
</code></pre>

<div id="unknown_mangoes"> <div class="loader"></div> </div>
<script type='py' target="unknown_mangoes">
  X = np.array([[130,70],[70,70],[100,170],[30,100],[70,210]])
  display(X,append=0, target="unknown_mangoes")
  sns.scatterplot(x=X[:,0],y=X[:,1], color="black", marker='D')
  display(plt,append=False)
  display(HTML("<em>5 unkown mangoes</em>"))
</script>


>Your task is to classify the 5 mangoes into their species using a program (python/julia).
The idea being that an unknown mango will be similar to its species
and hence lie closer to its own species in the plot.

> Here is one way to implement such an algorithm
>1. Find the empirical average point representing the species in the plot. 
This can be done by taking the geometric centroid of the species.
>2. For any given mango of unkown species, calculate the distance of it
to the centroids of species A, B and C in the plot.
>3. Assign the species to the above mango whose centroid is 
closest to it in the plot


Complete the code below to implement the above alogrithm
<!-- SETUP NEW ENV FOR PY_EDITOR -->
<script type="py-editor" env="sampy1" config="./editor.toml" setup>
	import numpy as np
	np.random.seed(0)
	N = 10
	Amean, Bmean, Cmean = map(np.array, [(80,200),(100,50),(50,150)])
	A,B,C = map(lambda x: 20*np.random.randn(N,2)+x, [Amean, Bmean, Cmean])
	############
	X = np.array([[130,70],[70,70],[100,170],[30,100],[70,210]])
</script>

<script type="py-editor" env="sampy1">
def centroid(points):
	#points is nx2 numpy array where rows are 2D points/vectors, n is number of points 
	#you may use numpy functions
	#write code here to return the geometric centroid of the points
	return ... 

def distance(x,y):
    #x,y are 2D numpy arrays 
    #write code to return the distance between x and y
    #you may use numpy functions
	return ...  

def classify(x):
	# x is the position of a single mango

	distA, distB, distC = [distance(x,c) for c in [cA,cB,cC]]

	if distA < distB and distA < distC: return 'A'
	elif distB < distA and distB < distC: return 'B'
	else: return 'C'
	 	

### MAIN ALGORIGHTM ###

# get centroids
cA = centroid(A);cB = centroid(B);cC = centroid(C)

# classify
colors = {'A':'red', 'B':'green', 'C':'blue'}

for mango in X:
	closest_species = classify(mango)
	print(mango, '--->', closest_species)
</script>


>The solution is plotted below.
<div id='sol'><div class="loader"></div></div>
<script type='py' src="./sol.py" target="sol"></script>

