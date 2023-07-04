import struct
import fire

def binary(num):
    return ''.join('{:0>8b}'.format(c) for c in struct.pack('!f', num))


print(binary(1/3))
