/** 
 * File holds actions and methods used in the contact form. Validation,
 * captcha generation and success and fail messages are generated here.
 * @Copywrite 2015 - Craig Heptinstall
 */

/**
 * Holds the google captcha code for generating the validation keys.
 * @var {String} recaptcha_id
 */
var recaptcha_id;

setupInputListeners();

/**
 * Called on load of google captcha. Generates the unique captcha id.
 * @name Contact#onloadCallback
 * @function
 *
 */
function onloadCallback() {
        recaptcha_id = grecaptcha.render('html_element', {
            'sitekey': '6Lef-QYTAAAAADthPqJAQwL6DdHJrOGfamA9iPH8'
        });
}

/**
 * Resets the captcha and thankyou message for new form inserts.
 * @name Contact#writeNew
 * @function
 *
 */
function writeNew() {
        grecaptcha.reset(recaptcha_id);
        $("#contact").show();
        $("#thanks").hide();
        reset();
}

/**
 * Resets the form values, and hides any warning messages.
 * @name Contact#reset
 * @function
 *
 */
function reset() {
        document.getElementById("email").value = '';
        document.getElementById("author").value = '';
        document.getElementById("text").value = '';
        $('#author').removeClass( "valid" );
        $('#email').removeClass( "valid" );
        $('#text').removeClass( "valid" );
        $('#replaceme').hide();
        return false;
}

/**
 * Shows success or error messages after sending of data from user.
 * @name Contact#showMessage
 * @function
 *
 * @param {String} text  Result message from server.
 */
function showMessage(text) {
    var element_id = "contact_form";
    var fail = "replaceme";

    if (text == "Thanks for getting in touch") {
        $("#thanks").show();
        $("#contact").hide();
        var el = document.getElementById('newlink');
        el.onclick = writeNew;
    } else if (text == "Spam") {
        $('#replaceme').show();
        document.getElementById(fail).style.display = 'block';
        document.getElementById(fail).style.color = 'red';
        document.getElementById("replaceme").innerHTML = "<label class='col-sm-4 control-label' for='email'></label>" +
            "<div class='col-sm-4'>" +
            "Get away spammer!</div>"
    } else if (text.indexOf("error") === 0) {
        $('#replaceme').show();
        document.getElementById(fail).style.display = 'block';
        document.getElementById(fail).style.color = 'red';
        document.getElementById("replaceme").innerHTML = "<label class='col-sm-4 control-label' for='email'></label>" +
            "<div class='col-sm-4'>" +
            "Please enter a valid " + text.substring(5).toLowerCase() + "!</div>"
    } else {
        $('#replaceme').show();
        document.getElementById(fail).style.display = 'block';
        document.getElementById(fail).style.color = 'red';
        document.getElementById("replaceme").innerHTML = "<label class='col-sm-4 control-label' for='email'></label>" +
            "<div class='col-sm-4'>" +
            "Please verify you're real!</div>"
    }
}

/**
 * Sends form data to server side, and gets status.
 * @name Contact#loadXMLDoc
 * @function
 *
 */
function loadXMLDoc() {
    var googleCode = grecaptcha.getResponse(recaptcha_id);
    var xmlhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var the_data = 'email=' + document.getElementById("email").value +
        '&author=' + document.getElementById("author").value +
        '&text=' + document.getElementById("text").value +
        '&code=' + googleCode;

    xmlhttp.open("POST", "sendMail.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(the_data); // form data here!

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var text = xmlhttp.responseText;
            showMessage(text);
        }
    }
    return false;
}

/**
 * Creates listeners on buttons and input for dynamic validation checking
 * and for resetting the form.
 * @name Contact#setupInputListeners
 * @function
 *
 */
function setupInputListeners() {
	var el = document.getElementById('reset');
	el.onclick = reset;

	$('#author').bind('propertychange change click keyup input paste', function() {
		if($('#author').val() != "")
    		$('#author').addClass( "valid" );
    	else
    		$('#author').removeClass( "valid" );
	});

	$('#email').bind('propertychange change click keyup input paste', function() {
    	if(validateEmail( $('#email').val() ) )
    		$('#email').addClass( "valid" );
    	else
    		$('#email').removeClass( "valid" );
	});

	$('#text').bind('propertychange change click keyup input paste', function() {
    	if($('#text').val() != "")
    		$('#text').addClass( "valid" );
    	else
    		$('#text').removeClass( "valid" );
	});
}

/**
 * Validates email addresses on typing to a standard form example@eg.eg...
 * @name Contact#validateEmail
 * @function
 *
 * @param {String} email  Email address entered by user.
 */
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}