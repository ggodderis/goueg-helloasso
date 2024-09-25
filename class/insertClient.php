<?php

class insertClient {

    public static function g( $id = "" ):array{

        global $wpdb;
        $table_name = 'wp_clients';
        $return = ['insert'];

        /**
         * Si l'id est vide on ne fait rien !
         */
        if( $id === "" ) return false;

       $retour = $wpdb->get_results( "SELECT `hello_id` FROM {$table_name} WHERE id={$id}" );

        if( empty($retour) ){
            
        $wpdb->insert(
            $table_name,
            array(
                'hello_id' => $id
            )
        );

        $wpdb->close();
        
        }else{
            $return = ['existe déjà'];
        }

        return $return;
    }
}

?>