---
themes: ["colorful"]
---

# CSCI670 Theoretical Thinking - I
<p style="text-align:center; color:#7A306C"> <b>26th November, 2021</b> </p>

<p style='text-align:center;color:green'><b> 
Theoretical Thinking II assignment for CSCI670 Fall2021 | Prof. Teng Shang-Hua
</b></p>

---

> Init: 23rd November, 2021 ->  Using tensors for finding patterns in urban traffic data.

![](q.png)


&nbsp;


1. What is the practical background of your problem?

In this assignment, I will be reporting on the data analysis of urban traffic data. Broadly, analysis of data and subsequent interventions using algorithmic and computing methods is known as urban computing. The motivation behind analyzing traffic data is to reduce congestion by traffic prediction and adapting routing of vehicle. The overall goal is motivated by General Motor's idea of zero congestion, zero crashes an zero emission. In particular, we will be looking at the traffic patterns of about 4000 taxis in Shanghai collected in 2007 for over a month. Our goal is to see if we can identify any traffic pattern from the dataset which can help us estimate traffic in the places in the city where might have sparse datapoints, or where might have missing data, or if we wanted to predict the traffic a few hours ahead in time. 

To find patterns in the data, we look at different statistics of the raw data and try to represent them in various mathematical/programming structures.

The key contents of the dataset that we are using are - 

| Latitude 	| Longitude | Date		| Time	|
|----------	|-----------|-----------|-------|
|22.3		|24.1		|8th Feb 07	| 7:00	|
|25.7		|24.3		|8th Feb 07	| 7:15	|
|21.9		|24.5		|8th Feb 07	| 15:30	|	


2. What is the mathematical definition of your problem?

The formulation of the problem is parallel to that of the completing the incomplete matrix in the collaborative filtering of partially reviewed movies in the [Netflix Prize](https://en.wikipedia.org/wiki/Netflix_Prize).

We try to find if there exist any pattern in the various statistics/aggregations of the data when put into matrix and tensor structures. We start with the density of taxi, i.e we divide the map into a grid of shape 20x20 and take the aggregated number of taxis passing over 24 hours in those 20x20 grids. Now, we can create a 400x24 matrix with grid identified using GridIDs in the range 1 to 400 in the columns and time in the rows. Similarly we can also construct a 20x20x24 tensor of 3 dimensions using the same data, which feels like a more natural representation as it also capture the relative spatial correlation/closeness between the GridIDs. The question we are asking is if there is any underlying pattern in the data when represented in the matrix and the tensor formats. 

Assuming that there is a low rank linear subspace in which the data lies, we can use low rank decomposition methods line Singular Value Decomposition and Candecomp/Parafac (abbrv. CP) decomposition on the matrix and the tensor representations respectively. 

Additionally, if there are such low rank subspaces which can capture the pattern in the traffic data matrix/tensor, can we use this structure to complete missing data (imputation) or predict traffic density in the near future, a few hours ahead of time. - i.e given a matrix/tensor with incomplete data (due to sensor/netowork failure), can we reconstruct the data fairly accurately using the known/available data points.


3. What are the interesting algorithmic questions concering your problem?

For the matrix case with no missing data, we already have good decomposition algorithms which are pretty good at what they do and hence we can easily say if a low rank matrix can explain a large amount of the variance present in the data to answer the 1st question. However, for the case of tensors, there has been a lot of work in the last decade to make tensor decomposition libraries but we are still far away from being fast and efficient. Unlike
 
