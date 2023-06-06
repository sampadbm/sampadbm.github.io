def func():
    n = 0
    while True:
        if check := 1 + 2 ** (-n) == 1:
            print(
                f"n: {n} \t 1+2^-n==1 : {check} \t 2^-n==0:{2**(-n)==0} \t 2^-n = {2**(-n)}"
            )
            break
        n += 1


func()
