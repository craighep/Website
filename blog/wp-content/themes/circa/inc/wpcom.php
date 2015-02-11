<?php
/**
 * WordPress.com-specific functions and definitions
 * This file is centrally included from `wp-content/mu-plugins/wpcom-theme-compat.php`.
 *
 * @package Circa
 */

function circa_theme_colors() {
	global $themecolors;

	/**
	 * Set a default theme color array for WP.com.
	 *
	 * @global array $themecolors
	 */
	if ( ! isset( $themecolors ) ) :
		$themecolors = array(
			'bg'     => 'f2f1ef',
			'border' => 'ada79b',
			'text'   => '7d7565',
			'link'   => 'aec26b',
			'url'    => 'aec26b',
		);
	endif;
}
add_action( 'after_setup_theme', 'circa_theme_colors' );

/*
 * De-queue Google fonts if custom fonts are being used instead
 */
function circa_dequeue_fonts() {
	if ( class_exists( 'TypekitData' ) && class_exists( 'CustomDesign' ) && CustomDesign::is_upgrade_active() ) {
		$customfonts = TypekitData::get( 'families' );
		if ( $customfonts && $customfonts['site-title']['id'] && $customfonts['headings']['id'] && $customfonts['body-text']['id'] ) {
			wp_dequeue_style( 'circa-gabriela' );
			wp_dequeue_style( 'circa-lato' );
		}
	}
}

add_action( 'wp_enqueue_scripts', 'circa_dequeue_fonts' );