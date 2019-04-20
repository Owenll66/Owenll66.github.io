import random
#encryption the code according to this random number
ran = random.randint(6666,9999)

#Find all the prime numbers less than or equal to the input number
#INPUT:    maximum -- a random integer
#OUTPUT:   primes -- the largest 200 primes less than or equal to the input
def findPrime(maximum):
    primes = []
    count = 1
    #find primes from the largest to the smallest
    for i in range(maximum+1, 2, -1):
        isPrime = True
        for j in range(2, i//2+1):
            if i%j == 0:
                isPrime = False
                break
        if isPrime:
            primes.append(i)
            if(count == 128):
                return primes
            count += 1
    return primes

keys = findPrime(ran)

#generate mapping for ascii table
d = {}
#mapping
for i in range(128):
    d.update({i : keys[i]})

#Decode the encrypted text
#INPUT:    plainText -- the decrypted text
#OUTPUT:   ciphertext -- the encrypted text
def encode(plainText):
    if plainText == "":
        return ""
    #convert string to a list of chars
    charlist = list(plainText)
    #the first number is the largest key's square
    ciphertext = str(keys[0] ** 2)
    #the second number is the square of the key of the first letter
    ciphertext = ciphertext + " " + str(d.get(ord(charlist[0])) ** 2)
    for i in range(len(charlist)-1):
        ciphertext = ciphertext + " " + str(d.get(ord(charlist[i])) * d.get(ord(charlist[i+1])))
    return ciphertext

#read file
print("Which text file do you wannt to encrypt?")
print("TIP: File type must be in .txt format")
choose = True
while(choose == True):
    try:
        filename = input()
        with open(filename, 'r') as rfile:
            data = rfile.read()
            rfile.close()
            choose = False
    except IOError:
        print("Read File error, Please retry\n")

#write file
print("\nPlease type output encrypted file name:")
print("TIP: Please include \".txt\" at the end")
choose = True
while(choose == True):
    try:
        filename = input()
        with open(filename, 'w+') as rfile:
            rfile.write(encode(str(data)))
            print("data has been successfully encoded")
            choose = False
    except IOError:
        print("Write File error, Please retry\n")
