<?php

class front_helloasso {

    public function __construct() {
        // add_action('admin_menu', array(&$this,'create_admin_menu') );
        $rest_route = new rest_route_helloasso();
        add_action('wp_enqueue_scripts',array(&$this,'load_css_js'));
        add_shortcode('checkout_helloasso', array(&$this,'helloasso_shortcode') );
    }

/**
 * Load des fichiers JS et CSS
 */
    public function load_css_js(){

        if( !is_page(['page-d-exemple']) ) return false;

        $asset_file = HELLOASSO_ROOT.'build/index.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_style( 'helloasso-css', HELLOASSO_URL . 'build/index.css',array(),$asset['version'],'all' );

        wp_enqueue_script(
            'helloasso-js',
            HELLOASSO_URL.'build/index.js',
            $asset['dependencies'],
            $asset['version'],
            array(
                'in_footer' => true,
            )
        );

        wp_localize_script( 'helloasso-js' , 'the_ajax_script', 
        array( 
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'wp_attachment_mail' ),
            'rootUrl' => esc_url_raw( rest_url() ),
            'rootNonce' => wp_create_nonce( 'wp_rest' ),
            'logoutNonce' => wp_create_nonce('log-out'),
            'infosUser' => getUserInfos::g(),
            'options_ffme' => getAllTarifs::g('wp_options_ffme'),
            'session_id' => getSession::g()
        ) );
        
    }

/**
 * Shortcode du Checkout Hello Asso
 */
    public function helloasso_shortcode( $attributes = null ){
        return '<div id="rootHelloAsso">Loading...</div>';
    }


}


?>