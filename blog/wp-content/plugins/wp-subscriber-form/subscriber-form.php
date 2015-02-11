<?php
/*
Plugin Name: WP Subscriber Form
Version: 1.1
Description: Automatically adds Feedburner Subscriber Form at the end of post content. 
Author: Anas Mir
Author URI: http://sharp-coders.com/author/anasmir
Plugin URI: http://sharp-coders.com/plugins/wp-plugins/wp-subscriber-form/
*/

/*Check Version*/
global $wp_version;
$exit_msg="WP Requires Latest version, Your version is old";
if(version_compare($wp_version, "3.0", "<"))
{
	exit($exit_msg);
}

$sc_subscriber_form_path = plugins_url()."/".plugin_basename( dirname(__FILE__));

function subscriber_after_content($content) {
	if (is_single()) {
		$options = get_options();
		$content .= "<div id='singlesubscribe'><span class='headline'>".$options['heading']."</span><span class='arrow'></span>";
	$content .='<form onsubmit="window.open('."'http://feedburner.google.com/fb/a/mailverify?uri=".$options['feedurl']."', 'popupwindow', 'scrollbars=yes,width=550,height=520'".');return true"'."target='popupwindow' method='post' action='http://feedburner.google.com/fb/a/mailverify'><input type='hidden' name='uri' value='".$options['feedurl']."'><input type='hidden' value='en_US' name='loc'><input type='text' class='txt sc-subscriber-name' style='' name='name' onfocus='this.value=".'""'." value='Your Name' placeholder='Your Name'><input type='text' class='txt sc-subscriber-email' id='email' style='' name='email' onfocus='this.value=".'""'." value='Your Email' placeholder='Your Email'><input type='submit' value='Sign Up' class='btn' id='submit' name='submit' style='margin:0;'></form></div>";
	}
	return $content;
}
function subscriber_HeadAction()
{
	global $sc_subscriber_form_path;
	echo '<link rel="stylesheet" type="text/css" href="'.$sc_subscriber_form_path.'/subscriber-form.css" />';
	$options = get_options();
	if ($options['btncss'] != "" || $options['btncss'] != null)
	{
		$css = '<style type="text/css">div#singlesubscribe form input.btn{';
		$css .= $options['btncss'];
		$css .= '}</style>';
		echo $css;
	}
}
register_activation_hook(__FILE__, 'WP_Subscriber_Form_install');
add_filter('wp_head', 'subscriber_HeadAction');
add_filter ('the_content', 'subscriber_after_content', 0);
add_action('admin_menu', 'admin_menu');
add_action( 'admin_notices', 'WP_Subscriber_Form_Notice' );
define('DB_Option', 'sc_subscriber_form');
//get plugin options
function get_options()
{
	$options = array();
	//get saved options
	$options['feedurl'] = stripslashes(get_option(DB_Option));
	$options['btncss'] = stripslashes(get_option(DB_Option."_btncss"));
	$options['heading'] = stripslashes(get_option(DB_Option."_heading"));
	return $options;
	
}

function handle_options()
{
	$options = get_options();
	
	if (isset($_POST['submitted']))
	{
		//check security
		check_admin_referer('sc-subscriber-form');
		$option = htmlspecialchars($_POST['feedurl']);
		$bcss = $_POST['buttoncss'];
		$heading = $_POST['heading'];
		update_option(DB_Option, $option);
		update_option(DB_Option."_btncss", $bcss);
		update_option(DB_Option."_heading", $heading);
		echo '<div class="updated fade"><p>Setting Updated!</p></div>';
	}
	$feedurl = stripslashes($options['feedurl']);
	$buttoncss = stripslashes($options['btncss']);
	$heading_text = stripslashes($options['heading']);
	$action_url = $_SERVER['REQUEST_URI'];
	include 'wp-subscriber-options.php';
}

function admin_menu()
{
	add_options_page('WP Subscriber Form', 'WP Subsriber Form', 8, basename(__FILE__), 'handle_options');
}

function WP_Subscriber_Form_install()
{
	$option = array(
		'feedurl' => 'sharp-coders',
		'buttoncss' => ''
	);
	add_option(DB_Option, $option['feedurl']);
	add_option(DB_Option."_btncss", '');
	add_option(DB_Option."_heading", addslashes("If you enjoyed this article, Get email updates (It's Free)"));
}
function WP_Subscriber_Form_Notice()
{
	$options = get_options();
	if($options['feedurl'] == "sharp-coders" || $options['feedurl'] == "" || $options['feedurl'] == "sharpcoders"){
		echo '<div class="updated" style="padding: 10px 10px;color: red;"><strong>Notice:</strong> Go to Settings -> Subscriber Form and Set your Feedburner Feed Name</div>';
	}
}
?>