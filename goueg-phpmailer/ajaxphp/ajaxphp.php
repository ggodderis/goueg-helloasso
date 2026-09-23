<?php

/**
* Formulaire react
*/
function goueg_get_react(){

    if(  ! wp_verify_nonce($_POST['nonce'],'wp_attachment_mail') ){
        echo json_encode('Pirate !');
        exit;
    }
    
    $name = basename($_FILES['file']['name']);

    if( move_uploaded_file($_FILES['file']['tmp_name'], DIR_ROOT_PLUGIN.$name) ){
        echo json_encode('ok '.DIR_ROOT_PLUGIN.$name);
    }else{
        echo json_encode('non '.DIR_ROOT_PLUGIN.$name);
        }
    // echo json_encode( plugin_dir_path( __FILE__ ) );
    exit;
  }
add_action( 'wp_ajax_goueg_get_react', 'goueg_get_react' );
//add_action( 'wp_ajax_nopriv_goueg_get_react', 'goueg_get_react' );

?>