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
    <meta name="theme-color" content="#0F60E6">
	<!-- CSS -->
    <link rel="shortcut icon" href="../favicon.ico">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/professional.css" rel="stylesheet">
    <link href="../css/footer.css" rel="stylesheet">
	
	<title>Craig Heptinstall | Professional</title>
	
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
					<li class="active"><a href="">Professional</a></li>
					<li><a href="../portfolio">Portfolio</a></li>
					<li><a href="../contact">Contact</a></li>
				  </ul>
				</div><!-- /.nav-collapse -->
			</div><!-- /.container -->
		</div><!-- /.navbar -->
		
		<div class="jumbotron">
      <div class="container">
        <h1>Portfolio Overview</h1>
        <p>Interested to learn a little more? Check out my CV below, or look at my personal skills regarding the computer science 
		industry. You can also find a list of my projects on the <a href="../portfolio">portfolio page.</a><br>
		Also, don't forget to have a look at any of my social media links listed below!</p>
      </div>
    </div>
	
	<div class="container bs-docs-container">

      <div class="row">
        <div class="col-md-6" role="main">

			<h1>Portfolio Overview</h1>
								<p class="alignp">I have ensured that this site helps show what I can
								actually do. On this page, I have provided links to my CV, through the
								means of PDF. Click the icon below to view the CV as required.</p>
								<p class="alignp">You can also view a gallery of all my recent projects
								and work, with examples on the <a href="#projects">Project Page.</a> I
								update this page and the gallery page regularly to ensure you, the
								reader can see my passion for the industry.</p>
								<table>
									<tr>
										<td>
											<fieldset>
												<legend>CV PDF</legend> <div class="grow_cv pic_cv"><a href="CV.pdf"><img src=
												"../images/PDFoff.png" height="70" width="70"
												alt="image 04" class="image_wrapper image_fl_3 grown_cv" /></a></div>
											</fieldset>
										</td>
									</tr>
								</table>
		</div>
        <div class="col-md-6" role="main">
			<h1>Specialized Skills</h1>
				<p>Below this text, I have created a table of some of the languages that
				I am proficient in. Percentages have been based from portfolio scores (Hover for year experience).</p>
				<div id="service_box">
					<div id ="service_ratings">
					<?php
						function random_color_part() {
						    return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
						}

						function random_color() {
						    return random_color_part() . random_color_part() . random_color_part();
						}

						$string = file_get_contents("../json/works.json");
			            $json_a = json_decode($string, true);
			            $projects = array_reverse($json_a['works']);

						$string = file_get_contents("../json/skills.json");
			            $json_a = json_decode($string, true);
			            $skills = $json_a['skills'];

			            foreach ($skills as $language => $skill) {
			            	$randomColor = random_color();
							$years = date("Y") - $skill['year-from'];
							$year_str = '';
							if ($years == 0)
								$year_str = '< 1 Year';
							else if ($years == 1)
								$year_str = '1 Year';
							else
								$year_str = $years . ' Years';

							$percentage = 0;
							$aggregate = 0;
							foreach ($projects as $work => $project) {
								if(in_array($skill["mapping"],$project["languages"]) && $project["score"] != ""){
									$percentage += $project["score"];
									$aggregate++;
								}
							}
							if($aggregate == 0){
								$percentage = $skill['percentage'];
							}
							else{
								$percentage = $percentage / $aggregate;
							}
							$percentage = round($percentage);
							
							$html = "<div class='skillbar clearfix ' data-percent='".$percentage."'>".
									"<div class='skillbar-title' style='background: #".$randomColor.";'><span>".$skill['language']. "</span></div>".
									"<div class='skillbar-title' style='background: #".$randomColor.";'></div>".
									"<div class='skillbar-bar' style='width:".$percentage."%;background: #".$randomColor .";'><b>".$year_str."</b></div>".
									"<div class='skill-bar-percent'>".$percentage. "&#37;</div></div>";	
							echo $html;
						}
					?>
					</div>
				</div>
				<p><b>Scroll for more &#8595;</b></p>
			</div>
		</div>
		<div class="row">
        <div class="col-md-12" role="main">
			<ul id="social_box">			  
								<li>
									<div class="socialicon">
										<a href="http://about.me/craighep/"><img src=
										"../images/about_me.png" width="50" height="50" alt="See My about.me Page" />
										</a>
									</div>
								</li>			
								<li>
									<div class="socialicon">
										<a href="https://www.facebook.com/Craighep"><img src=
										"../images/facebow256.png" width="50" height="50" alt="facebook" />
										</a>
									</div>
								</li>
								<li>
									<div class="socialicon">
										<a href="https://twitter.com/craighepy"><img src=
										"../images/sweeter256.png" width="50" height="50" alt="twitter" />
										</a>
									</div>
								</li>

								<li>
									<div class="socialicon">
										<a href=
										"http://uk.linkedin.com/pub/craig-heptinstall/48/745/7"><img src=
										"../images/linkedin.png" width="50" height="50" alt="linkin" />
										</a>
									</div>
								</li>					
								<li>
									<div class="socialicon">
										<a href=
										"https://github.com/craighep"><img src=
										"../images/github.png" width="50" height="50" alt="linkin" />
										</a>
									</div>
								</li>
								<li>
									<div class="socialicon">
										<a href="http://users.aber.ac.uk/crh13/wordpress/"><img src=
										"../images/wordpress.png" width="50" height="50" alt="Wordpress" />
										</a>
									</div>
								</li>
								<li>
									<div class="socialicon">
										<a href=
										"https://plus.google.com/101158471703372714342/about"><img src=
										"../images/plusdrops256.png" width="50" height="50" alt=
										"Google+" />
										</a>
									</div>
								</li>
								<li>
									<div class="socialicon">
										<a href="http://www.youtube.com/user/craighep"><img src=
										"../images/yumtube256.png" width="50" height="50" alt="Youtube" />
										</a>
									</div>
								</li>		
								<li>
									<div class="socialicon">
										<a href="http://pinterest.com/craighep/"><img src=
										"../images/pin.png" width="50" height="50" alt="Follow Me on Pinterest" />
										</a>
									</div>
								</li>
								<li>
									<div class="socialicon">
										<a href="mailto:crh13@aber.ac.uk"><img src="../images/Mail-Icon.png"
										width="60" height="60" alt="Mail Me" />
										</a>
									</div>
								</li>
							</ul>
		</div></div>
	</div>
	<div id="separator"></div>	
    <div id="footer">
      <div class="container">
	  <p class="pull-right text-muted">
			<a target="_blank" href="http://validator.w3.org/check?uri=http%3A%2F%2Fwww.craighep.co.uk%2Fprofessional&amp;charset=%28detect+automatically%29&amp;doctype=HTML5&amp;group=0&amp;user-agent=W3C_Validator%2F1.3+http%3A%2F%2Fvalidator.w3.org%2Fservices"><img style=
			"border:0;width:50px;height:60px" src="../images/html.png" alt=
			"Valid HTML5!" /></a>&nbsp;&amp;
			<a target="_blank" href="http://jigsaw.w3.org/css-validator/validator?uri=www.craighep.co.uk%2Fcss%2Fprofessional.css&amp;profile=css3&amp;usermedium=all&amp;warning=1&amp;vextwarning=&amp;lang=en"><img style=
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