Prof. Jyo asked about using the gradient descent approach.

So, the problem we have is linked to these other general ideas below 
I am using this opportunity to also organize and reflect on some of the things that I have learnt so far, so please pardon me for the long elementary details (hope it's interesting to a few)
(Professors, kindly correct me if I am missing something or something is wrong below or hallucinating)

Problem Types (Single objective)- 

A = Arbitrary optimisation problem (e.g - some Estimation Maximisation problems where we may not have a closed form solution and we still want to get a descent estimate of the parameters) 
B = Biconvex Problem (e.g KMeans, Gaussian Mixture Model -> both of them have local minimas and the solution reached depends on the initialization)
C = Convex Problem (Should reach global optimum unless there are some edge cases)


Approximate Solving methods with increasing order of information needed from the function- 

Heuristics -> Random Search, Guided Random Search methods, Simulated Annealing, Evolutionary algorithms (PSO, GA, CMA, CMA-ES, Novelty Search algorithms [mostly for multi objective] like NSGA, NSGA-II, Quality-Diversity algorithms)Merits      - Uses zeroth order information of the function - just the function values, no other information needed ( if there is auxiliary information, that can also be exploited but usually not necessary)     -  Can be easily programmed for constrained devices like microcontrollers. Needs no external libraries except math library to implement the function itself. 
     - Can be used on combinatorial problems as it assumes almost nothing about the functions.
     - Easily parallelizable for distributed computing across multiple compute nodes.
     - Multiple candidate solutions 

Possible Difficulties - 
     - Slow to converge, local extremas

GD -> gradient descent  
which uses first order information to approximate function as a line/plane at a given point and then descend along the slope, 
Merits 
             - simple and easy to implement as long as gradients can be evaluated              - can be easily implemented on constrained compute devices like microcontrollers if the gradient can be hand computed. If not, an Automatic Differentiation library might be required but if the function is fixed, one can crosscompile the gradient using an AutoDiff on a more powerful computer for the target  simpler compute platform (microcontroller for example)             - Invariant to coordinate change under rotation/reflection/permutation of the parameters/coordinates.

Possible difficulties 
             - evaluation of gradient function at a given point may be computationally expensive - may be mitigated if approximation to gradient is easier to compute. If evaluation of the function itself is much simpler in computation then  there are a few options 
              -  use Numerical derivative by finite difference for approximation to the gradient and then use GD on it.
              -  use Heuristic methods that only depend on function evaluation only like guided random search

CD -> Coordinate Descent
Like gradient descent but we only descend on one coordinate/variable/parameter at a time and fix the rest of the coordinates, i.e our movement is restricted to be aligned along the coordinate axes (and hence this method is not invariant to coordinate transformations like rotations but okay with scaling/stretching of axes transformation).Merits:
   - Do not need full gradient - just evaluate the partial of the function wrt the specific coordinate/variable/parameter. Does it make it better than GD computation wise? Umm, I am not sure because if one can evaluate the partials wrt all parameters, they effectively are finding the gradient. But maybe it is better in some cases. And probably a good method if the coordinates are aligned with the symmetries of the objective function wrt the parameters. 


NM ->Newton's method 
 which uses second order information to approximate a given function at a given point by a quadratic function and then directly jump to the min/max of this quadratic (assuming the hessian is PD/ND so it has a unique min/max or PSD/NSD in which it has a bunch of min/max along the degenerate direction(s) of the paraboloid)Merits - Faster convergence (wrt to number of iterations)Possible Difficulties 
     - Need a linear equation/least square or a matrix computation library solver to find the null space of the hessian (hope I am correct, Professors can correct me here). So its a little bit more complicated unless there is a BLAS or some LINALG library available for the target compute device (for example, implementing on a microcontroller might be challenging unless one is ready to implement a linear systems/ least squares solver)
     - Depends on how computationally easy/difficult it is to find gradients and hessians at a given point and how ill conditioned the Hessian matrix is. Maybe some similar ideas as mitigating GD above? 


BCD -> Block coordinate descent
Extension of coordinate descent where a set of coordinates are used for the gradient update and the rest are fixed. 
