#-*- coding: utf-8 -*-
#!/usr/local/bin/python

# Auth: Hupeng
# Email: Danny.hupeng@gmail.com
# github: https://github.com/hupeng

import re

def FizzBuzzWhizz_1(x, y, z):
    pattern = re.compile(str(x))
    for index in range(1,101):
        if len(pattern.findall(str(index))) > 0:
            print 'Fizz'
        else:
            output = ''
            if index % x == 0: output += 'Fizz'
            if index % y == 0: output += 'Buzz'
            if index % z == 0: output += 'Whizz'

            if len(output) > 0:
                print output
            else:
                print str(index)

def FizzBuzzWhizz_2(x, y, z):
    pattern = re.compile(str(x))

    output = [(i+1, i+1) for i in range(100)]

    output_x = [(a, 'Fizz') if a % x == 0 else (a, b) for a, b in output]
    output_y = [(a, str(b) + 'Buzz') if a % y == 0 else (a, b) for a, b in output_x]
    output_z = [(a, str(b) + 'Whizz') if a % z == 0 else (a, b) for a, b in output_y]
    output_f = [(a, 'Fizz') if len(pattern.findall(str(a))) > 0 else (a, b) for a, b in output_z]

    print [b if type(b) == int else re.sub(re.compile(r'\d+'), '', b) for a, b in output_f]

if __name__ == '__main__':
    
    FizzBuzzWhizz_2(3,5,7)