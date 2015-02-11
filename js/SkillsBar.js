if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET","../xml/skills.xml",false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML; 

		var x=xmlDoc.getElementsByTagName("SKILL");
		var html = "";
		for (i=0;i<x.length;i++)
		{ 
			var perc = x[i].getElementsByTagName("PERCENTAGE")[0].childNodes[0].nodeValue;
			var lang = x[i].getElementsByTagName("LANGUAGE")[0].childNodes[0].nodeValue;
			var year_from = x[i].getElementsByTagName("YEAR-FROM")[0].childNodes[0].nodeValue;
			var d = new Date();
			var n = d.getFullYear();
			var years = n - year_from;
			var year_str = '';
			if (years == 0)
				year_str = '< 1 Year';
			else if (years == 1)
				year_str = '1 Year';
			else
				year_str = years + ' Years';
			
			html = html + "<div class='skillbar clearfix ' data-percent='" + perc+ "'>";
			var randomColor = Math.floor(Math.random()*16777215).toString(16);
			html = html + "<div class='skillbar-title' style='background: #"+randomColor +";'><span>"+ lang + "</span></div>";
			html = html + "<div class='skillbar-title' style='background: #"+randomColor +";'></div>";
			html = html + "<div class='skillbar-bar' style='width:"+perc+"%;background: #"+randomColor +";'><b>"+year_str+"</b></div>";
			html = html + "<div class='skill-bar-percent'>"+ perc + "&#37;</div></div>";						
		}
		document.getElementById("service_ratings").innerHTML = html; 