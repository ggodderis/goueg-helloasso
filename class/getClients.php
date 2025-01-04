<?php

class getClients {

    public static function g( $year = '', $month = '' ):array{

        global $wpdb;

        $return = [];
        $table_name = 'wp_clients';

         /**
         * Gestion des dates pour le select
         */

         $lesdates = "SELECT DISTINCT DATE_FORMAT(date_create,'%Y') as annees , DATE_FORMAT(date_create,'%m') as mois FROM wp_clients ORDER BY annees DESC,mois DESC";

         $retourdates = $wpdb->get_results( $lesdates );
 
         $mois = ['','janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
 
         foreach( $retourdates as $key => $value ){
             if( $retourdates[$key]->annees == $year && $retourdates[$key]->mois == $month ){
                 $retourdates[$key]->checked = true;
             }
             $retourdates[$key]->option = $mois[intval($retourdates[$key]->mois)].' '.$retourdates[$key]->annees;
             $retourdates[$key]->value = $retourdates[$key]->annees.'-'.$retourdates[$key]->mois;
         }
 
         $return['dates'] = $retourdates;

        /**
         * Gestion des dates
         */
        if( empty($month) && empty($year) ){

            //$date = new DateTime('now',new DateTimeZone('Europe/Paris'));
            //$month = (clone $date)->format('m');
            //$year = (clone $date)->format('Y');
            $month = $retourdates[0]->mois;
            $year = $retourdates[0]->annees;
        }

        // SELECT * FROM Project WHERE MONTH(DueDate) = 1 AND YEAR(DueDate) = 2010
        // SELECT DISTINCT(DATE_FORMAT(date_create,'%Y')) as annees FROM wp_clients;
        // SELECT DISTINCT DATE_FORMAT(date_create,'%Y') as annees , DATE_FORMAT(date_create,'%m') as mois FROM wp_clients ORDER BY date_create DESC;

        $requete = "SELECT * FROM {$table_name} WHERE MONTH(date_create) = {$month} AND YEAR(date_create) = {$year} AND statut = 'validée' ORDER BY date_create DESC";
        $retour = $wpdb->get_results( $requete );

        if( empty($retour) ) return ['table vide'];
        /**
         * On regarde si le champs array est plein ou vide
         * et on l'unserialize pour pouvoir le lire dans React
         */
        $clients = [];
        $date_create = new DateTime();

        foreach( $retour as $key => $value ){
            $cache = [];
            if( !empty($retour[$key]->array) ){
                $cache = unserialize( $retour[$key]->array );
            }
            $date_create = ( clone $date_create )->modify( "{$retour[$key]->date_create}" );
            $new_date_create = $date_create->format('Y-m-d');

            array_push($clients, ['id'=>$retour[$key]->id,'hello_id'=>$retour[$key]->hello_id ,'date_create' => $new_date_create,'statut'=>$retour[$key]->statut,'metas'=>$cache]);
        }

        $return['adherents'] = $clients;


        $wpdb->close();

        return $return;
    }

}

?>