<?php
	
	if(isset($argv) && isset($argv[1]) && !empty($argv[1])) {
		$data = trim($argv[1]);
	}
	else {
		$data = json_encode(array('seed'=>'12345', 'password'=>'abcde'));
	}
	
	$key = file_get_contents('server_publickey');
	$key = openssl_get_publickey($key);
	openssl_public_encrypt($data, $encrypted , $key);
	
	echo base64_encode($encrypted).PHP_EOL;
	
?>
