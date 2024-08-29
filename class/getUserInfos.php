<?php

class getUserInfos {

    /**
    * Récupération des informations de la personne connectée
    * @return Array
    */

    public static function g():array {

        $array_user = array();

        $ID = get_current_user_id();
        $datas = get_userdata($ID);
        
        if( $ID > 0 ){

            $array_user = [
                'firstName' => get_user_meta($ID,'first_name', true ),
                'lastName' => get_user_meta($ID,'last_name', true ),
                'email' => $datas->data->user_email,
                'dateOfBirth' => get_user_meta($ID,'gda_nee_le', true),
                'address' => get_user_meta($ID,'billing_address_1', true),
                'city' => get_user_meta($ID,'billing_city', true),
                'zipCode' => get_user_meta($ID,'billing_postcode', true),
                'gda_genre' => get_user_meta($ID,'gda_genre', true),
                'gda_personne' => get_user_meta($ID,'gda_personne', true),
                'gda_tel_personne' => get_user_meta($ID,'gda_tel_personne', true),
                'country' => 'FRA',
                'companyName' => ''
            ];

        }else{
            $array_user = [];
        }

        return $array_user;

    }
}

?>