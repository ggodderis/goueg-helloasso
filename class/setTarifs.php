<?php

class setTarifs {

    public static function g( $data = '' ){

        global $wpdb;
        $table = '';

        if( !empty($data) ){
            switch( $data->secteur ){
                case 'cotisation':
                case 'mur':
                case 'soutien':
                    $table = 'wp_cotisations_club';
                    break;
                case 'ffme':
                    $table = 'wp_licences_ffme';
                    break;
                case 'ffr':
                    $table = 'wp_licences_ffr';
                    break;
                case 'options':
                    $table = 'wp_options_ffme';
                    break;
            }
        }else{
            return false;
        }

        if( $table != 'wp_options_ffme') {

            $array = array(
                'descriptif' => $data->descriptif,
                'plein_tarif' => $data->plein_tarif,
                'demi_tarif' => $data->demi_tarif
            );

            if( isset($data->active) && $data->active == 'oui'){
                $array["active"] = 1;
            }else{
                $array["active"] = 2;
            }

            $wpdb->update(
                $table ,
                $array,
                array(
                    'id' => $data->id,
                )
            );
        }
        if( $table == 'wp_options_ffme' ){
            $wpdb->update(
                $table ,
                array(
                    'descriptif' => $data->descriptif,
                    'plein_tarif' => $data->plein_tarif
                ),
                array(
                    'id' => $data->id,
                )
            );

        }

        $wpdb->close();

    }
}
?>