<?php

if (isset($_POST['answer'])) 
{
    $spam_answer = $_POST['answer'];  
	$spam_test=$_POST['question'];
	$first_num = substr($spam_test, 8, 1);
	$operator = substr($spam_test, 10, 1);
	$second_num = substr($spam_test, 12, 1);
	$answer = 500;
	
	switch ($operator)
	{
	case "+" :
		$answer = $first_num + $second_num; break;
	case "-" :
		$answer = $first_num - $second_num; break;
	default:  $answer = $first_num + $second_num; 
	}
	
	if ($answer != $spam_answer)
	{
		
	}
	else
	{
		$name=$_POST['author'];
		$email=$_POST['email'];
		// SPAM WHITELIST //--------------------
		$filename = "listofspammy.txt";
		$arr = file($filename, FILE_IGNORE_NEW_LINES);
		$spam = false;
		foreach ($arr as $key => $value) 
		{
			if (strcmp($email, $value) === 0) 
			{
				$spam = true;
				echo"Spam";
				break;
			}
		}
		//---------------------------------------
		if ( !$spam )
		{
			$message=$_POST['text'];
			$from="From: $name<$email>\r\nReturn-path: $email";
			$subject="Message sent from craighep.co.uk";
			mail("crh13@aber.ac.uk", $subject, $message, $from);
			echo "Thanks for getting in touch";
		}
	}
}
        
?>