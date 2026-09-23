<?php

/**
 * Plugin Name:       Goueg PHPmailer
 * Description:       Plugin pour envoyer des emails aux adhérents
 * Requires at least: 1.0
 * Requires PHP:      7.0
 * Version:           2.0
 * Author:            Grégory Godderis
 * License:           To Kill !
 * License URI:       --
 * Text Domain:       goueg-phpmailer
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

define( 'MAILER_VERSION', '0.1');
define( 'DIR_ROOT_UPLOAD', plugin_dir_path( __FILE__ ).'images/' );
define( 'DIR_ROOT', plugin_dir_path( __FILE__ ) );

//require 'app/gouegApp.php';
require 'vendor/autoload.php';
//use App\gouegApp;
if (class_exists('gouegApp')) {
    $pluginInit = new gouegApp();
}


if( is_admin() ){
    
/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
    function goueg_phpmailer_css_js( $hook ) {

        if ( $hook !='toplevel_page_envoie_emails' ){
            return;
        }
        wp_enqueue_style( 'goueg-phpmailer-css', plugin_dir_url( __FILE__ ) . 'build/index.css',array(), MAILER_VERSION,'all' );
        wp_enqueue_script( 'goueg-phpmailer-js', plugin_dir_url( __FILE__ ) . 'build/index.js',
                            array( 'wp-plugins','wp-element' ), MAILER_VERSION , true );
        wp_localize_script( 'goueg-phpmailer-js' , 'the_ajax_script', 
                            array( 
                            'ajaxurl' => admin_url( 'admin-ajax.php' ),
                            'nonce' => wp_create_nonce( 'wp_attachment_mail' ),
                            'rootUrl' => esc_url_raw( rest_url() ),
                            'rootNonce' => wp_create_nonce( 'wp_rest' )
                            ) ); 
        // wp_localize_script( 'goueg-phpmailer-js', 'myvars', [
        //     'nonce' => wp_create_nonce( 'wp_rest' )
        //     ]);
        //require_once(plugin_dir_path( __FILE__ ).'ajaxphp/ajaxphp.php');
    }
    add_action( 'admin_enqueue_scripts', 'goueg_phpmailer_css_js' );

}    


?>