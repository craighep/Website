<?php

if (isset($_POST['code']) && $_POST['code'] != "") 
{
	$name=$_POST['author'];
	$message=$_POST['text'];
	$email=$_POST['email'];
	// SPAM WHITELIST //--------------------
	$filename = "listofspammy.txt";
	$arr = file($filename, FILE_IGNORE_NEW_LINES);
	$fail = false;
	foreach ($arr as $key => $value) 
	{
		if (strcmp($email, $value) === 0) 
		{
			$fail = true;
			echo"Spam";
			break;
		}
	}
	if (!filter_var($email, FILTER_VALIDATE_EMAIL) === true || empty($email)) {
		echo "erroremail address";
		$fail = true;
	}
	if (empty($name)){
		echo "errorname";
		$fail = true;
	}
	if (empty($message)){
		echo "errormessage";
		$fail = true;
	}
	//---------------------------------------
	if ( !$fail )
	{
		$message=$_POST['text'];
		$from="From: $name<$email>\r\nReturn-path: $email";
		$subject="Message sent from craighep.co.uk";
		mail("crh13@aber.ac.uk", $subject, $message, $from);
		echo "Thanks for getting in touch";
	}
}
else 
{
	echo "credentialError";
}
        
?>