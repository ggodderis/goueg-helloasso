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

/**
 * @param helloasso_settings []
 * client_id
 * client_secret
 * url pour obenir le token
 * url pour intéroger le checkout-intents
 */
$helloasso_settings = get_option('helloasso_settings');

if( isset($helloasso_settings['mode']) && !empty($helloasso_settings['mode']) ){

    switch( $helloasso_settings['mode'] ){

        case 'dev':
            define('CLIENT_ID',$helloasso_settings['test_client_id']);
            define('CLIENT_SECRET',$helloasso_settings['test_client_secret']);
            define('URL_TOKEN',$helloasso_settings['test_url_token']);
            define('URL_CHECKOUT_INTENTS',$helloasso_settings['test_checkout_intents']);
        break;

        case 'prod':
            define('CLIENT_ID',$helloasso_settings['client_id']);
            define('CLIENT_SECRET',$helloasso_settings['client_secret']);
            define('URL_TOKEN',$helloasso_settings['url_token']);
            define('URL_CHECKOUT_INTENTS',$helloasso_settings['checkout_intents']);
        break;
    }

}

define('HELLOASSO_ROOT', plugin_dir_path( __FILE__ ) );
define('HELLOASSO_URL', plugin_dir_url( __FILE__ ) );


require 'vendor/autoload.php';


/**
 * Les rest routes en admin ne doivent pas être déclarer dans is_admin()
 * ça marche pas...
 */
if( class_exists('back_rest_route_helloasso')){
    $pluginInitBack = new back_rest_route_helloasso();
}

if( is_admin() ){
    if (class_exists('back_helloasso')) {
        $initback = new back_helloasso();
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

    // add_rewrite_rule(
    //     '^mon-test$',
    //     'index.php?custom=1',
    //     'top'
    //   );

    add_rewrite_rule(
        'hello_return',
        'index.php?custom=1',
        'top'
      );

    // add_rewrite_rule(
    //     'hello_return',
    //     'wp-content/plugins/goueg-helloasso/templates/retour.php',
    //     'top'
    //   );

    add_rewrite_rule(
        'wp-admin/hello_asso',
        'wp-admin/admin.php?page=hello_asso',
        'top'
      );

    add_rewrite_rule(
        'wp-admin/tarifs',
        'wp-admin/admin.php?page=hello_asso',
        'top'
      );

    add_rewrite_rule(
        'wp-admin/adhesions',
        'wp-admin/admin.php?page=hello_asso',
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