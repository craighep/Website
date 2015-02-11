<?php
	if(isset($_POST['email']) && isset($_POST['password']) && $_POST['password'] == "f1f2f3"  )
	{
		$data = $_POST['email'] . "\n";
		$ret = file_put_contents('../contact/listofspammy.txt', $data, FILE_APPEND);
		if($ret === false) 
		{
			echo '0';
		}
		else 
		{
			dataToHtml();
		}
	}
	else
	{
		dataToHtml();
	}
	
	function dataToHtml()
	{
		$myFile = "../contact/listofspammy.txt";
		$fh = fopen($myFile, 'r');
		$theData = fread($fh, filesize($myFile)); 
		fclose($fh);
		if ( $theData != "" )
		{
			echo "<ul>";
			$spamList = explode("\n", $theData);
			foreach ( $spamList as $key => $emailSpam)
			{
				if ($emailSpam != "")
				echo "<li>" . $emailSpam . "</li>";
			}
			echo "</ul>";
		}
		if ( ( !isset($_POST['password']) || $_POST['password'] != "f1f2f3" )&& isset($_POST['email']) )
		{
			echo "<span style='color:red'>Password Incorrect! Permission to edit denied.</span>";
		}
	}
?>