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
        <link href="../css/docs.min.css" rel="stylesheet">
        <link href="../css/portfolio.css" rel="stylesheet">
        <link rel="stylesheet" href="../css/icon/font-mfizz.css" type="text/css" />
        <link href="../css/footer.css" rel="stylesheet">
        <title>Craig Heptinstall | Portfolio</title>
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
                        <li class="active"><a href="">Portfolio</a></li>
                        <li><a href="../contact">Contact</a></li>
                    </ul>
                </div>
                <!-- /.nav-collapse -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /.navbar -->
        <div class="bs-docs-header" id="content">
        <?php
            $string = file_get_contents("../json/works.json");
            $json_a = json_decode($string, true);
            $projects = array_reverse($json_a['works']);
            echo '<div id="inner'.count($projects).'"></div>';
        ?>
            <div class="container">
                <h1>Project Portfolio</h1>
                <p>Please take a look at this page of my site to see any past pieces of work I have worked on
                    before ( Web and Software ).
                </p>
            </div>
        </div>
        <div class="container bs-docs-container">
            <div class="row">
                <div class="col-md-9" role="main">
                    <div class="row" id="innerWorks">
                    <?php
                        $i = count($projects);
                        $htmlNav = "";
                        foreach ($projects as $work => $project) {
                            $score = "N/A";
                            if( $project["score"] != "" )
                                $score = $project["score"];
                            $html = "hi";
                            $html = '<div class="col-sm-12">'.
                                            '<div class="brdr bgc-fff pad-10 box-shad btm-mrg-20">'.
                                                '<div class="media">'.
                                                    '<div class="clearfix visible-sm"></div>'.
                                                    '<a href="#" target="_parent"></a>'.
                                                    '<h4><small class="pull-right">'.$project["module"].'</small></h4><br>'.
                                                    '<h4 class="media-heading">'.$project["name"].'</h4>'.
                                                    '<ul class="list-inline mrg-0 btm-mrg-10 clr-535353">'.
                                                        '<li>Date: '.$project["date"].'</li>'.
                                                        '<li style="list-style: none">|</li>'.
                                                        '<li><b>Score: '.$score.'</b></li></ul>'.  
                                                    '<div id="inner'.--$i.'"></div>'.
                                                    '<p>'.$project["description"].'</p>';   
                            if($project["link"] == ""){
                                if($project["links"] == "")
                                    $html .= '<p><em>Sorry! Nothing to prove it here...</em>';
                                else{
                                    $html .= '<p>';
                                    foreach ($project["links"] as $l => $linkText){
                                        $html .= '<a class="btn btn-default" href="'.$linkText["link"].'" target="_blank" role="button">'.$linkText["text"].' »</a>';
                                    }
                                }
                            }
                            else
                                $html .= '<p><a class="btn btn-default" href="'.$project["link"].'" target="_blank" role="button">Take a look »</a>';
                            foreach($project["languages"] as $language){    
                                $html .= '<i class="step icon-'.$language.' size-72"></i>';
                            } 
                            $html .= '</p></div></div></div>';
                            echo $html;
                            $link = $i + 1;
                            $htmlNav .= '<li><a href="#inner'.$link.'">';
                            $htmlNav .= $project["short"] . '</a></li>';
                        }
                    ?>
                    </div>
                </div>
                <!-- NAVIGATION BAR -->
                <div class="col-md-3">
                    <div class="bs-docs-sidebar hidden-print" role="complementary">
                        <ul class="nav bs-docs-sidenav" id="worksNav">
                        <?php
                            echo $htmlNav;
                        ?>
                        </ul>
                    </div>
                </div>
                <!--/navigation-->
            </div>
            <!--/row-->
        </div>
        <hr>
        <div id="separator"></div>
        <div id="footer">
            <div class="container">
                <p class="pull-right text-muted">
                    <a target="_blank" href="http://validator.w3.org/check?uri=http%3A%2F%2Fwww.craighep.co.uk%2Fportfolio&amp;charset=%28detect+automatically%29&amp;doctype=HTML5&amp;group=0&amp;user-agent=W3C_Validator%2F1.3+http%3A%2F%2Fvalidator.w3.org%2Fservices"><img style=
                        "border:0;width:50px;height:60px" src="../images/html.png" alt=
                        "Valid HTML5!" /></a>&nbsp;&amp;
                    <a target="_blank" href="http://jigsaw.w3.org/css-validator/validator?uri=www.craighep.co.uk%2Fcss%2Fportfolio.css&amp;profile=css3&amp;usermedium=all&amp;warning=1&amp;vextwarning=&amp;lang=en"><img style=
                        "border:0;width:50px;height:60px" src=
                        "../images/css.png" alt="Valid CSS!" />
                    </a>
                <p class="text-muted">
                    Copyright &copy;
                    <script type="text/javascript">
                        document.write(new Date().getFullYear());
                    </script>
                    <a href="../">Craig Mathew Heptinstall</a>
                </p>
            </div>
        </div>
        <!-- Bootstrap core JavaScript
            ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="../js/jquery.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/docs.min.js"></script>
        <script src="../js/offcanvas.js"></script>
        <script src="..js/jquery.scrollNav.min.js"></script>
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