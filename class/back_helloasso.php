<?php

class back_helloasso {

    public function __construct() {
        add_action( 'admin_menu', array(&$this,'init_my_menu') );
        add_action('admin_enqueue_scripts',array(&$this,'load_admin_css_js'));
        add_action('admin_init', array(&$this,'helloasso_register_settings') );
        // add_action('admin_menu', array(&$this,'google_admin_settings') );
    }

    public function init_my_menu() {

        add_menu_page(
            'Hello Asso', 
            'Hello Asso', 
            'delete_posts',
            'hello_asso',
            array(&$this,'gda_helloasso'),
            'dashicons-cart',
            99
        );
       
        add_submenu_page(
            'hello_asso',
            'Paramétres',
            'Paramétres',
            'manage_options',
            'helloasso_parametres',
            array(&$this,'helloasso_render_options_page'),
        );

        //remove_submenu_page('hello_asso','hello_asso');

    }

    public function helloasso_register_settings(){
        register_setting('helloasso_settings_group', 'helloasso_settings');
    }

    public function helloasso_render_options_page() {

        global $helloasso_settings;

        echo '<div class="wrap">

                <form method="post" action="options.php">';

                settings_fields('helloasso_settings_group');

        echo '

            <h1>Réglages des paramétres Hello Asso Checkout</h1>

            <table class="form-table">
                <tbody>

                    <tr valign="top">
                        <th scope="row" valign="top">
                            MODE DEV OU PROD ?
                        </th>
                        <td>
                        <label class="description"> Dev
                            <input id="helloasso_settings[mode]" '.( $helloasso_settings['mode'] == "dev" ? 'checked' : '' ).' name="helloasso_settings[mode]" type="radio" class="regular-text" value="dev"/>
                        </label>
                        &nbsp;&nbsp;
                        <label class="description"> Prod
                            <input id="helloasso_settings[mode]" '.( $helloasso_settings['mode'] == "prod" ? 'checked' : '' ).'name="helloasso_settings[mode]" type="radio" class="regular-text" value="prod"/>
                        </label>
                        </td>
                    </tr>

                    <tr valign="top">
                        <th scope="row" valign="top">
                            <h2>Paramétres de DEV</h2>
                        </th>
                        <td style="width:100">
                        <hr />
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row" valign="top">
                            TEST client_id
                        </th>
                        <td>
                            <input id="helloasso_settings[test_client_id]" name="helloasso_settings[test_client_id]" type="text" class="regular-text" value="'.$helloasso_settings['test_client_id'].'"/>
                            <label class="description" for="helloasso_settings[test_client_id]">Renseigner le client_id</label>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row" valign="top">
                            TEST client_secret
                        </th>
                        <td>
                            <input id="helloasso_settings[test_client_secret]" name="helloasso_settings[test_client_secret]" type="text" class="regular-text" value="'.$helloasso_settings['test_client_secret'].'"/>
                            <label class="description" for="helloasso_settings[test_client_secret]">Renseigner le client_secret</label>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row" valign="top">
                            TEST url token
                        </th>
                        <td>
                            <input id="helloasso_settings[test_url_token]" name="helloasso_settings[test_url_token]" type="text" class="regular-text" value="'.$helloasso_settings['test_url_token'].'"/>
                            <label class="description" for="helloasso_settings[test_url_token]">Renseigner url_token</label>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row" valign="top">
                            TEST url checkout intents
                        </th>
                        <td>
                            <input id="helloasso_settings[test_checkout_intents]" name="helloasso_settings[test_checkout_intents]" type="text" class="regular-text" value="'.$helloasso_settings['test_checkout_intents'].'"/>
                            <label class="description" for="helloasso_settings[test_checkout_intents]">Renseigner l\'url checkout_intents</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <p class="submit">
				<input type="submit" class="button-primary" value="Valider" />
			</p>';

        echo    '</form>
            </div>';
    }

    public function gda_helloasso(){
        echo '<div id="admin_hello">Hello Asso administration</div>';
    }

    /**
 * Load des fichiers JS et CSS
 */
    public function load_admin_css_js( $hook ){


        if( $hook !='toplevel_page_hello_asso' ) return false;

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

        wp_localize_script( 'admin-helloasso-js' , 'REACT_VARS', 
        array( 
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'wp_attachment_mail' ),
            'rootUrl' => esc_url_raw( rest_url() ),
            'rootNonce' => wp_create_nonce( 'wp_rest' ),
            'client_id' => CLIENT_ID,
            'client_secret' => CLIENT_SECRET,
            'url_token' => URL_TOKEN,
            'url_checkout_intents' => URL_CHECKOUT_INTENTS
            )
        );
        
    }
}

?>