#!/bin/bash

ORIGINAL="{\"seed\":\"12345\",\"password\":\"abcde\"}"

printf "Original plain text string:\n"
printf "${ORIGINAL}\n\n"

printf "Encrypting in Java using the server public key:\n"
JAVA_ENCRYPTED="$(java JavaEncrypt ${ORIGINAL})"
printf "${JAVA_ENCRYPTED}\n\n"

printf "Decrypting in PHP using the server private key:\n"
PHP_DECRYPTED="$(php PHPDecrypt.php ${JAVA_ENCRYPTED})"
printf "${PHP_DECRYPTED}\n\n"

if [ "$ORIGINAL" = "$PHP_DECRYPTED" ]
then
	printf "SUCCESS!\n\n\n\n"
else
	printf "FAILURE...\n\n\n\n"
fi
	
	

printf "Encrypting in PHP using the app public key:\n"
PHP_ENCRYPTED="$(php PHPEncrypt.php ${ORIGINAL})"
printf "${PHP_ENCRYPTED}\n\n"

printf "Decrypting in Java using the app private key:\n"
JAVA_DECRYPTED="$(java JavaDecrypt ${PHP_ENCRYPTED})"
printf "${JAVA_DECRYPTED}\n\n"

if [ "$ORIGINAL" = "$JAVA_DECRYPTED" ]
then
	printf "SUCCESS!\n\n"
else
	printf "FAILURE...\n\n"
fi