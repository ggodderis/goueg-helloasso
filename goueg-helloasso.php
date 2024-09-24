<?php

/**
 * Plugin Name:       Goueg Hello Asso
 * Description:       Plugin de checkout Hello Asso
 * Requires at least: 0.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Grégory Godderis
 * License:           y'en a pas
 * License URI:       y'en a pas
 * Text Domain:       goueg-helloasso
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

session_start();


define('HELLOASSO_ROOT', plugin_dir_path( __FILE__ ) );
define('HELLOASSO_URL', plugin_dir_url( __FILE__ ) );

require 'vendor/autoload.php';

if( is_admin() ){

    if( class_exists('back_helloasso')){
        $pluginInitBack = new back_helloasso();
    }
}else{
    if (class_exists('front_helloasso')) {
        $pluginInitFront = new front_helloasso();
    }
}

/**
 * Ajouter des urls perso à l'activation du plugin
 */
/**
 * Attention bien penser à changer le page-d-exemple
 * par le slug de la page des grimpeurs
 */
 function myplugin_activate() {

    add_rewrite_rule(
      'page-d-exemple/(.+)?',
      '?pagename=page-d-exemple',
      'top'
    );

    add_rewrite_rule(
        'hello_return',
        'wp-content/plugins/goueg-helloasso/templates/retour.php',
        'top'
      );

    flush_rewrite_rules();

}
register_activation_hook( __FILE__, 'myplugin_activate' );

/**
 * Effacement des urls perso à la désactivation du plugin
 */
function myplugin_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'myplugin_deactivate' );


/*

function unadorned_announcement_bar_settings_page() {
    add_options_page(
        __( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
        __( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
        'manage_options',
        'unadorned-announcement-bar',
        'unadorned_announcement_bar_settings_page_html'
    );
}

add_action( 'admin_menu', 'unadorned_announcement_bar_settings_page' );

function unadorned_announcement_bar_settings_page_html() {
    printf(
        '<div class="wrap" id="rootHelloAsso">%s</div>',
        esc_html__( 'Loading…', 'unadorned-announcement-bar' )
    );
}

function unadorned_announcement_bar_settings_page_enqueue_style_script( $admin_page ) {

    if ( 'settings_page_unadorned-announcement-bar' !== $admin_page ) {
        return;
    }

    $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'unadorned-announcement-bar-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset['dependencies'],
        $asset['version'],
        array(
            'in_footer' => true,
        )
    );

}

//add_action( 'admin_enqueue_scripts', 'unadorned_announcement_bar_settings_page_enqueue_style_script' );
*/

?>