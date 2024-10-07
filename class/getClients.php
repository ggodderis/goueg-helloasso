<?php

class getClients {

    public static function g():array{

        global $wpdb;

        $return = [];
        $table_name = 'wp_clients';

        $requete = "SELECT * FROM {$table_name}";
        $retour = $wpdb->get_results( $requete );
        $wpdb->close();
        /**
         * On regarde si le champs array est plein ou vide
         * et on l'unserialize pour pouvoir le lire dans React
         */
        foreach( $retour as $key => $value ){
            $cache = [];
            if( !empty($retour[$key]->array) ){
                $cache = unserialize( $retour[$key]->array );
            }
            array_push($return, ['id'=>$retour[$key]->id,'statut'=>$retour[$key]->statut,'metas'=>$cache]);
        }

        return $return;
    }

}

?>