---
themes: ["muted","colorful"]
category: science
---

# 1-Bit-Problems-of-the-Day

### Mango Classification

There are images of mangoes from three different different species and they are, say species A,B and C.

![sample_mango](images/Mango_Maya.jpg)
*Sample Mango of type/species A*

These are RGB images (values range from 0-255) and an image processing script has already 
extracted the maximum red and green values from each of the mango images.

Here are the plot of the maximum red and green values of the three species plotted.


<script type="py" src="./main.py" ></script>

These values for the 3 species are given in the code snippet below. 

<script type="py">
	from pyscript import current_target
	from pyscript.web import page
	target = page.find(f"#{current_target()}")
	text = f"<pre style='height:30vh'><code class='python'>A = {A}\nB = {B}\nC = {C}</code></pre>"
	target[0].innerHTML += text

	from pyscript import window
	window.hljs.highlightAll()
</script>

Now, you are given five new mangoes whose maximum red and green values
have been extracted as given below and shown in the plot

<pre><code class="python">X = [[130,70],[70,70],[100,170],[30,100],[70,210]]
</code></pre>

<py-script>
  X = np.array([[130,70],[70,70],[100,170],[30,100],[70,210]])
  sns.scatterplot(x=X[:,0],y=X[:,1], color="black", marker='D')
  display(plt, "*5 unkown mangoes*")
</py-script>


>Your task is to classify the 5 mangoes using a program (python/julia).
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
<pre><code class="python">
def centroid(points):
	return ... # <- fill this

def distance(x,y):
	return ... # <- fill this 

def classify(x):
	# x is the position of a single mango

	distA, distB, distC = [distance(x,c) for c in [cA,cB,cC]]

	if distA < distB and distA < distC: return 'A'
	elif distB < distA and distB < distC: return 'B'
	else return 'C'
	 	

### MAIN ALGORIGHTM ###

# get centroids
cA = centroid(A);cB = centroid(B);cC = centroid(C)

# classify
colors = {'A':'red', 'B':'green', 'C':'blue'}

for mango in X:
	closest_species = classify(mango)
	print(mango, '--->', closest_species)
    sns.scatterplot(x=[mango[0]], y=[mango[1]], marker='d', color=colors[closest_species])
</code></pre>


The solution is plotted below.
<script type='py' src="./sol.py"></script>
