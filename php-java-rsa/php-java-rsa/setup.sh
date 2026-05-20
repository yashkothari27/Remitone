#!/bin/bash

printf "Generating the app key pair:\n"
openssl genrsa  -out app_privatekey.tmp 2048
openssl pkcs8 -topk8 -inform pem -in app_privatekey.tmp -outform pem -nocrypt -out app_privatekey
openssl rsa -pubout -in app_privatekey.tmp -out app_publickey
rm -f app_privatekey.tmp

printf "\nGenerating the server key pair:\n"
openssl genrsa  -out server_privatekey.tmp 2048
openssl pkcs8 -topk8 -inform pem -in server_privatekey.tmp -outform pem -nocrypt -out server_privatekey
openssl rsa -pubout -in server_privatekey.tmp -out server_publickey
rm -f server_privatekey.tmp

printf "\nCompiling the java classes\n"
javac JavaEncrypt.java
javac JavaDecrypt.java

printf "DONE!\n\n\n\n"
printf "Now testing if everything is working:\n\n\n"

/bin/bash test.sh