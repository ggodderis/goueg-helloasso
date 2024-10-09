<?php

class getClients {

    public static function g( $month = '' , $year = '' ):array{

        global $wpdb;

        $return = [];
        $table_name = 'wp_clients';

        /**
         * Gestion des dates
         */
        if( empty($month) && empty($year) ){

            $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
            $month = (clone $date)->format('m');
            $year = (clone $date)->format('Y');
        }

        // SELECT * FROM Project WHERE MONTH(DueDate) = 1 AND YEAR(DueDate) = 2010
        // SELECT DISTINCT(DATE_FORMAT(date_create,'%Y')) as annees FROM wp_clients;
        // SELECT DISTINCT DATE_FORMAT(date_create,'%Y') as annees , DATE_FORMAT(date_create,'%m') as mois FROM wp_clients ORDER BY date_create DESC;

        $requete = "SELECT * FROM {$table_name} WHERE MONTH(date_create) = {$month} AND YEAR(date_create) = {$year}";
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
            array_push($return, ['id'=>$retour[$key]->id,'date_create' => $retour[$key]->date_create,'statut'=>$retour[$key]->statut,'metas'=>$cache]);
        }

        return $return;
    }

}

?>