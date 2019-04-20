import sys
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

#Decode the encrypted text
#INPUT:    ciphertext -- the encrypted text
#OUTPUT:   plainText -- the decrypted text
def decode(ciphertext):
    if ciphertext == "":
        return ""
    plainText = ""
    splited_text = ciphertext.split(" ")
    try:
        map_key = int(int(splited_text[0]) ** 0.5)
    except Exception as Exc:
        print("Error: Wrong file content, cannot be decoded!!")
        print("Terminating program!! and destory file content!!")
        sys.exit()
    keys = findPrime(map_key)
    try:
        firstLetter_key = int(int(splited_text[1]) ** 0.5)
    except Exception as Exc:
        print("Error: Wrong file content, cannot be decoded!!")
        print("Terminating program!! and destory file content!!")
        sys.exit()
    #generate mapping for ascii table
    d = {}
    #mapping
    for i in range(128):
        d.update({keys[i] : i})
    
    plainText = plainText + str(chr(d.get(firstLetter_key)))
    currentLetter_key = firstLetter_key
    for i in range(2, len(splited_text)):
        try:
            nextletter_key = int(splited_text[i]) // currentLetter_key
        except Exception as Exc:
            print("Error: Wrong file content, cannot be decoded!!")
            print("Terminating program!! and destory file content!!")
            sys.exit()
        plainText = plainText + str(chr(d.get(nextletter_key)))
        currentLetter_key = nextletter_key
    return plainText

#read file
print("Which text file do you wannt to decrypt?")
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
print("\nPlease type output decrypted file name:")
print("TIP: Please include \".txt\" at the end")
choose = True
while(choose == True): 
    try:
        filename = input()
        with open(filename, 'w+') as rfile:
            rfile.write(decode(data))
            print("data has been successfully decoded")
            choose = False
    except IOError:
        print("Write File error, Please retry\n")
