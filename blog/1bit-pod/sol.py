#### TEST
X = [[130,70],[70,70],[100,170],[30,100],[70,210]]

def centroid(points):
    return np.mean(points, axis=0) # <- fill this

def distance(x,y):
    return np.linalg.norm(x-y) # <- fill this 

def classify(x):
    # x is the position of a single mango

    distA, distB, distC = [distance(x,c) for c in [cA,cB,cC]]

    if distA < distB and distA < distC: return 'A'
    elif distB < distA and distB < distC: return 'B'
    else: return 'C'
         

### MAIN ALGORIGHTM ###

# get centroids
cA = centroid(A);cB = centroid(B);cC = centroid(C)
# display("cA",cA,"cB",cB,"cC",cC)

# classify
colors = {'A':'red', 'B':'green', 'C':'blue'}

for mango in X:
    closest_species = classify(mango)
    # display(mango, '--->', closest_species)
    sns.scatterplot(x=[mango[0]], y=[mango[1]], marker='D', color=colors[closest_species])

display(plt)
