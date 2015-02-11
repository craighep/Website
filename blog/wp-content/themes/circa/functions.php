<?php
/*
 * @package Circa
 */
 
/*
 * Override custom background defaults
 */
function circa_custom_background_args() {
	$args = array(
		'default-color'    => 'f2f1ef',
		'default-image'    => '',
		'wp-head-callback' => 'hexa_custom_background_cb'
	);
	return $args;
}
add_filter( 'hexa_custom_background_args', 'circa_custom_background_args' );

/**
 * Register Google Font
 */
function circa_google_fonts() {

	$protocol = is_ssl() ? 'https' : 'http';

	/*	translators: If there are characters in your language that are not supported
		by Gabriela, translate this to 'off'. Do not translate into your own language. */

	if ( 'off' !== _x( 'on', 'Gabriela font: on or off', 'circa' ) ) {

		wp_register_style( 'circa-gabriela', "$protocol://fonts.googleapis.com/css?family=Gabriela&subset=latin,latin-ext" );

	}

	/*	translators: If there are characters in your language that are not supported
		by Lato, translate this to 'off'. Do not translate into your own language. */

	if ( 'off' !== _x( 'on', 'Lato font: on or off', 'circa' ) ) {

		wp_register_style( 'circa-lato', "$protocol://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" );

	}

}
add_action( 'init', 'circa_google_fonts' );

/**
 * Enqueue Google Fonts for custom headers
 */
function circa_admin_scripts( $hook_suffix ) {

	if ( 'appearance_page_custom-header' != $hook_suffix )
		return;

	wp_enqueue_style( 'circa-gabriela' );
	wp_enqueue_style( 'circa-lato' );
	wp_dequeue_style( 'hexa-source-sans-pro' );

}
add_action( 'admin_enqueue_scripts', 'circa_admin_scripts' );

/**
 * Enqueue scripts and styles.
 */
function circa_scripts() {

	wp_enqueue_style( 'circa-gabriela' );
	wp_enqueue_style( 'circa-lato' );
	wp_dequeue_style( 'hexa-source-sans-pro' );

}
add_action( 'wp_enqueue_scripts', 'circa_scripts' );

/*
 * Override parent theme's header setup and styling
 */

function circa_header_args( $args ) {
	$args = array(
		'default-image'          => '',
		'default-text-color'     => 'aec26b',
		'width'                  => 2000,
		'height'                 => 200,
		'flex-height'            => true,
		'flex-width'             => true,
		'wp-head-callback'       => 'hexa_header_style',
		'admin-head-callback'    => 'circa_admin_header_style',
		'admin-preview-callback' => 'hexa_admin_header_image',
	);
	return $args;
}
add_filter( 'hexa_custom_header_args', 'circa_header_args' );

function circa_admin_header_style() {
?>
	<style type="text/css">
		.appearance_page_custom-header #headimg {
			background: #f2f1ef;
			border: 0
		}
		#headimg h1,
		#desc {
		}
		#headimg h1 {
			font-family: "Gabriela", Georgia, Times, serif;
			font-size: 26px;
			line-height: 1;
			margin: 0;
		}
		#headimg h1 a {
			text-decoration: none;
		}
		#desc {
			font-family: "Lato", Arial, Helvetica, sans-serif;
			color: #ada79b;
			font-size: 14px;
			font-weight: bold;
			letter-spacing: 1px;
			margin: 7.2px 0;
			text-transform: uppercase;
		}
		#headimg img {
			display: block;
			margin: 0 auto;
			max-width: 100%;
		}
		.site-branding {
			border-left: 8px solid #aec26b;
			box-sizing: border-box;
			max-width: 448px;
			padding: 57.6px 0 28.8px 57.6px;
		}
	</style>
<?php
}

/**
 * Adds additional stylesheets to the TinyMCE editor if needed.
 *
 * @param string $mce_css CSS path to load in TinyMCE.
 * @return string
 */
function circa_mce_css( $mce_css ) {

	$protocol = is_ssl() ? 'https' : 'http';

	$font = "$protocol://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic|Gabriela&subset=latin,latin-ext";

	if ( empty( $font ) )
		return $mce_css;

	if ( ! empty( $mce_css ) )
		$mce_css .= ',';

	$font = str_replace( ',', '%2C', $font );
	$font = esc_url_raw( str_replace( '|', '%7C', $font ) );

	return $mce_css . $font;
}
add_filter( 'mce_css', 'circa_mce_css' );