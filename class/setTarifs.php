<?php

class setTarifs {

    public static function g( $data = '' ){

        global $wpdb;
        $table = '';

        if( !empty($data) ){
            switch( $data->secteur ){
                case 'cotisation':
                    $table = 'wp_cotisations_club';
                    break;
                case 'ffme':
                    $table = 'wp_licences_ffme';
                    break;
                case 'ffr':
                    $table = 'wp_licences_ffr';
                    break;
            }
        }else{
            return false;
        }

        $wpdb->update(
            $table ,
            array(
                'descriptif' => $data->descriptif,
                'plein_tarif' => $data->plein_tarif,
                'demi_tarif' => $data->demi_tarif
            ),
            array(
                'id' => $data->id,
            )
        );

        $wpdb->close();

    }
}
?>