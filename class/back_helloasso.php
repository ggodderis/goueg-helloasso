<?php

class back_helloasso {

    public function __construct() {
        add_action( 'admin_menu', array(&$this,'init_my_menu') );
        add_action('admin_enqueue_scripts',array(&$this,'load_admin_css_js'));
        //$back_rest_route = new back_rest_route_helloasso();
    }

    public function init_my_menu() {

        add_menu_page(
            'Hello Asso', 
            'Hello Asso', 
            'manage_options',
            'hello-asso',
            array(&$this,'gda_helloasso'),
            'dashicons-cart',
            99
        );

    }

    public function gda_helloasso(){
        echo '<div id="admin_hello">Hello Asso administration</div>';
    }

    /**
 * Load des fichiers JS et CSS
 */
    public function load_admin_css_js( $hook ){


        if( $hook !='toplevel_page_hello-asso' ) return false;

        $asset_file = HELLOASSO_ROOT.'back/build/index.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_style( 'helloasso-css', HELLOASSO_URL . 'back/build/index.css',array(),$asset['version'],'all' );

        wp_enqueue_script(
            'admin-helloasso-js',
            HELLOASSO_URL.'back/build/index.js',
            $asset['dependencies'],
            $asset['version'],
            array(
                'in_footer' => true,
            )
        );

        wp_localize_script( 'admin-helloasso-js' , 'the_ajax_script', 
        array( 
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'wp_attachment_mail' ),
            'rootUrl' => esc_url_raw( rest_url() ),
            'rootNonce' => wp_create_nonce( 'wp_rest' )
            )
        );
        
    }
}

?>