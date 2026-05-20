<?php

	if(isset($argv) && isset($argv[1]) && !empty($argv[1])) {
		$data = trim($argv[1]);
	}
	else {
		exit('Please provide the encrypted string as a parameter'.PHP_EOL);
	}
	
	$key = file_get_contents('app_privatekey');
	$key = openssl_get_privatekey($key);
	openssl_private_decrypt(base64_decode($data), $decrypted , $key);
	
	echo $decrypted.PHP_EOL;
	
?>
