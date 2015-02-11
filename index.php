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
    <link rel="shortcut icon" href="favicon.ico">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/index.css" rel="stylesheet">
	<link href="css/footer.css" rel="stylesheet">

	<title>Craig Heptinstall</title>
	
	<script type="text/javascript">
	  var ref = document.referrer;
	if (ref.match(/^https?:\/\/([^\/]+\.)?craighep\.co.uk(\/|$)/i)) {
		
	}
	else{
		// redirect 
		window.location.replace("http://www.craighep.co.uk/landing");
	}
	</script>
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
					<img class="logo navbar-brand" alt="logo" src="images/logo.png"/>
				  <a class="navbar-brand" href="">Craig Mathew Heptinstall</a>
				</div>
				<div class="collapse navbar-collapse">
				  <ul class="nav navbar-nav">
					<li class="active"><a href="">Home</a></li>
					<li><a href="about">About</a></li>
					<li><a href="professional">Professional</a></li>
					<li><a href="portfolio">Portfolio</a></li>
					<li><a href="contact">Contact</a></li>
				  </ul>
				</div><!-- /.nav-collapse -->
			</div><!-- /.container -->
		</div><!-- /.navbar -->
		
		<!-- ============= Carousel ============ -->
		<div id="myCarousel" class="carousel slide" data-ride="carousel">
		  <!-- Indicators -->
		  <ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
			<li data-target="#myCarousel" data-slide-to="3"></li>
		  </ol>
		  <div class="carousel-inner">
		    <div class="item active">
			  <img src="images/home0.jpg" alt="First slide">
			  <div class="container">
				<div class="carousel-caption">
				  <h1>The dissertation has begun.</h1>
				  <p>Since starting my major project, I decided to start a new daily blog to keep track of as well as show progress!</p>
				  <?php
					$jsonurl = "http://www.craighep.co.uk/blog/?json=get_recent_posts";
					$json = file_get_contents($jsonurl);
					$posts = json_decode($json, true);

					foreach($posts as $key => $value)
					{
							if ($key == "posts")
							{
								foreach($value as $postk => $valuepost)
								{
									if($postk == "title_plain")
									{
										$tags = array("<p>", "</p>");
										$myExcerpt = str_replace($tags, "", $valuepost["title_plain"]);
										echo '<p><b class="carousel_bold">Latest Post: </b>'.$myExcerpt.' - ';
									}
									if($postk == "excerpt")
									{
										$content = $valuepost["excerpt"];
										$tags = array("<p class=\"excerpt\">", "</p>");
										$content = str_replace($tags, "", $content);
										$textLength = strlen($content);
										$postContent = substr_replace($content, '...', 130, $textLength-200);
										echo $postContent.'</p>';
									}
								}
							}
					}
				  ?>
				  <p><a class="btn btn-lg btn-primary" href="blog" role="button">Check out the blog</a></p>
				</div>
			  </div>
			</div>
			<div class="item">
			  <img src="images/home1.jpg" alt="Second slide">
			  <div class="container">
				<div class="carousel-caption">
				  <h1>I'm not just another <code>//coder.</code></h1>
				  <p>To see, check out my past projects on my portfolio page where appropriate links will 
				  be available to see a first hand view of what I've worked on previously.</p>
				  <p><a class="btn btn-lg btn-primary" href="portfolio" role="button">Jump to portfolio</a></p>
				</div>
			  </div>
			</div>
			<div class="item">
			  <img src="images/home2.jpg" alt="Third slide">
			  <div class="container">
				<div class="carousel-caption">
				  <h1>Hey there traveller.</h1>
				  <p>Welcome to my personal site, with the intention of allowing you to learn a little bit more about me. The short version is: My name is Craig and I write <code>//code.</code></p>
				  <p><a class="btn btn-lg btn-primary" href="about" role="button">More about me</a></p>
				</div>
			  </div>
			</div>
			<div class="item">
			  <img src="images/home3.jpg" alt="Fourth slide">
			  <div class="container">
				<div class="carousel-caption">
				  <h1>Living abroad for one year...</h1>
				  <p>I've just completed my year in industry in Germany! I've tried to keep a log of some
				  of the days I had there in the form of a blog, which you can view on my site :)</p>
				  <p><a class="btn btn-lg btn-primary" href="../blog" role="button">Go to my IY blog</a></p>
				</div>
			  </div>
			</div>
		  </div>
		  <a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
		  <a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
		</div><!-- /.carousel -->

		<div class="container marketing">
		  <div class="row">
			<div class="col-lg-4">
			<div class="grow_me pic_me img-circle">
			  <a href="about">
			    <img class=" grow_me" height="140" width="140" src="images/me.png" alt="Generic placeholder image"/>
			  </a>
			  </div>
			  <h2>Hello!</h2>
			  <p>My name is Craig Mathew Heptinstall, a student at Aberystwyth
				University, currently pursuing a Master's Degree in Software Engineering
				which will give me the pleasure of staying a student in sunny Aberystwyth
				for a lengthy 5 years, of which I am currently in my 
				<script type="text/javascript">
					//-------------------------------------------------------------------
					// 	Method to auto calculate year on course :P
					//-------------------------------------------------------------------
					var year = new Date().getFullYear();
					var temp = 2016 - year;
					var current = 5 - temp;
					var month = new Date().getMonth();
					if ( month > 8)
						current++;
					var stringYear = "third";
					if ( current == 4 )
						stringYear = "fourth";
					else if ( current == 5 )
						stringYear = "final";
					document.write(stringYear);
				</script>
				year.</p>
			  <p><a class="btn btn-default" href="about" role="button">More about me &raquo;</a></p>
			</div><!-- /.col-lg-4 -->
			<div class="col-lg-4">
			  <div class="grow_git pic_git img-circle">
			  <a href="professional">
				<img class=" grow_git" height="140" width="140" src="images/github.png" alt="Generic placeholder image"/>
			  </a>
			  </div>
			  <script type="text/javascript">
			//-------------------------------------------------------------------
			// 	Method to auto calculate months worked (I'm too lazy to do it myself)
			//-------------------------------------------------------------------
			var months = 0;
			var startingMonth = 6;
			var hasJob = false;
			var year = new Date().getFullYear();
			var month = new Date().getMonth();
			var day = new Date().getDay();
			if ( !hasJob )
			{
				months = month - startingMonth;
				document.write("<h2>Interested?</h2><p>");
				document.write("I've just completed my 14 month placement, gained " +
				"experience in Software Engineering and ");
			}
			else
			{
				document.write("<h2>I'm Hired.</h2><p>");
				document.write("I have been working at <Job> now for ");
				document.write(months);
				document.write(" Months and loving every second.");
			}
				document.write("I would like to thank my employers at <a href="+
				"'plunet.com'>Plunet</a>!</p>");
			
			if( !hasJob )
			{
				document.write("<p>If you would like to get a more indepth version of me, feel free to view my CV. ");
			}
			else
			{
				document.write("<p>Although I'm not looking for other work now, feel free to view my CV. ");
			}
			//-------------------------------------------------------------------
			</script>
			  <p><br><a class="btn btn-default" href="professional" role="button">My skills &amp; CV &raquo;</a></p>
			</div><!-- /.col-lg-4 -->
			<div class="col-lg-4">
			  <div class="grow_town pic_town img-circle">
			  <a href="blog/?cat=2">
			    <img class=" grow_town" height="140" width="220" src="images/blog.png" alt="Generic placeholder image"/>
			  </a>
			  </div>
			  <h2>Germany Blog</h2>
			  <p>Click the image or link below to check out my brand new blog about my job! I hope it 
			  gives you the sense of how it was for me not only moving abroad, but actually getting a 
			  taste for life in the industry, putting to test where I learnt before hand.</p><br><p><a class="btn btn-default" href="blog/?cat=2" target="_blank" role="button">Check out my blog &raquo;</a></p>
			</div><!-- /.col-lg-4 -->
		  </div><!-- /.row -->
		</div><!-- /.container -->
		  <!-- FOOTER -->
		  
	<div id="separator"></div>	  
    <div id="footer">
      <div class="container">
	  <p class="pull-right text-muted">
			<a target="_blank" href="http://validator.w3.org/check?uri=http%3A%2F%2Fwww.craighep.co.uk%2F&amp;charset=%28detect+automatically%29&amp;doctype=HTML5&amp;group=0&amp;user-agent=W3C_Validator%2F1.3+http%3A%2F%2Fvalidator.w3.org%2Fservices"><img style=
			"border:0;width:50px;height:60px" src="../images/html.png" alt=
			"Valid HTML5!" /></a>&nbsp;&amp;
			<a target="_blank" href="http://jigsaw.w3.org/css-validator/validator?uri=www.craighep.co.uk%2Fcss%2Findex.css&amp;profile=css3&amp;usermedium=all&amp;warning=1&amp;vextwarning=&amp;lang=en"><img style=
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
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/docs.min.js"></script>
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
