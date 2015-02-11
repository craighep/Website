<!DOCTYPE html>
<html lang="en">
  <head>
	<!-- Meta Information -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="Craig Heptinstall">
    <meta name="keywords" content=
			"Craig heptinstall, heptinstall, craighep, software engineer, web developer, Aberystwyth university, Java, C, C++, HTML, CSS, Javascript, php, sql" />
	<meta name="description" content=
			"Online portfolio site for Craig Heptinstall, Software Engineering student at Aberystwyth University" />
	<!-- CSS -->
    <link rel="shortcut icon" href="../favicon.ico">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/contact.css" rel="stylesheet">
    <link href="../css/footer.css" rel="stylesheet">

	<title>Craig Heptinstall | Spam</title>
	
  </head>
<!-- ========= NAVBAR ========-->
	<body>
		<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<img class="logo navbar-brand" alt="logo" src="../images/logo.png"/>
				  <a class="navbar-brand" href="../">Craig Mathew Heptinstall</a>
				</div>
				<div class="collapse navbar-collapse">
				  <ul class="nav navbar-nav">
					<li><a href="../">Home</a></li>
					<li><a href="../about">About</a></li>
					<li><a href="../professional">Professional</a></li>
					<li><a href="../portfolio">Portfolio</a></li>
					<li><a href="../contact">Contact</a></li>
				  </ul>
				</div><!-- /.nav-collapse -->
			</div><!-- /.container -->
		</div><!-- /.navbar -->
		
    <div class="jumbotron">
      <div class="container">
        <h1>Let's add some spam contacts!</h1>
        <p>Just a quick page to keep track of annoying spammers...</p>
      </div>
    </div>
	
	<div class="container">
		<h1>Spam-email Blacklist</h1>
		<div id='blacklist'>
			<?php include('spam.php') ?>
		</div>
		<fieldset>	
			<div id="contact_form">
				<form onsubmit="return loadXMLDoc();" method="POST">
					<input placeholder='Email' id='email' name="email" required='required' type="email" />
					<input placeholder='password' id='password' name="password" required='required' type="password" />
					<button id="submit" name="submit" class="btn btn-success">Add to Blacklist</button>
				</form>
			</div>
		</fieldset>	
		<script type="text/javascript">										
			//-------------------------------------------------------------------------
			// Function for sending and receiving form stuff. (Look mum, Ajax!)
			//-------------------------------------------------------------------------
			function loadXMLDoc()
			{
				var xmlhttp;
				if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else
				{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				var the_data = 'email='+document.getElementById("email").value+'&password='+document.getElementById("password").value;
				xmlhttp.open("POST","spam.php",true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(the_data); // form data here!
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{						
						var text = xmlhttp.responseText;
						if (text == "0")
						{
							document.getElementById("blacklist").innerHTML='Something went wrong with adding the email!';
						}
						else if (text.match(/span>$/))
						{
							document.getElementById("blacklist").innerHTML=text;
						}
						else
						{
							document.getElementById("blacklist").innerHTML=text;
							resetForm();
						}
					}
				}
				return false;
			}
			function resetForm()
			{
				document.getElementById("email").value='';
			}
		</script>
	</div>

	<div id="separator"></div>	  
    <div id="footer">
      <div class="container">
	  <p class="pull-right text-muted">
			<a target="_blank" href="http://validator.w3.org/check?uri=http%3A%2F%2Fwww.craighep.co.uk%2Fcontact&amp;charset=%28detect+automatically%29&amp;doctype=HTML5&amp;group=0&amp;user-agent=W3C_Validator%2F1.3+http%3A%2F%2Fvalidator.w3.org%2Fservices"><img style=
			"border:0;width:50px;height:60px" src="../images/html.png" alt=
			"Valid HTML5!" /></a>&nbsp;&amp;
			<a target="_blank" href="http://jigsaw.w3.org/css-validator/validator?uri=www.craighep.co.uk%2Fcss%2Fcontact.css&amp;profile=css3&amp;usermedium=all&amp;warning=1&amp;vextwarning=&amp;lang=en"><img style=
			"border:0;width:50px;height:60px" src=
			"../images/css.png" alt="Valid CSS!" />
			</a>
		</p>	
        <p class="text-muted">Copyright &copy; 
			<script type="text/javascript">
				document.write(new Date().getFullYear());
			</script>
			<a href="../">Craig Mathew Heptinstall</a> </p>
      </div>
    </div>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
	<script src="../js/docs.min.js"></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-40243550-1', 'craighep.co.uk');
	  ga('send', 'pageview');
	</script>
  </body>
</html>