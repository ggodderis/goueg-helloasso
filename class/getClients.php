<?php

class getClients {

    public static function g(){

        global $wpdb;

        $table_name = 'wp_clients';
        $requete = "SELECT * FROM {$table_name}";
        $retour = $wpdb->get_results( $requete );
        $wpdb->close();

        return $retour;
    }

}

?>