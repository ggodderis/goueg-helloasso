<?php

class rest_route_helloasso {

    public function __construct() {
        add_action('rest_api_init', array(&$this,'create_rest_route') );
    }
    /**
     * Création de la Rest Route pour communication avec React et PHP
     */
    public function create_rest_route(){

        register_rest_route('goueg-helloasso/v1', '/set_datas', [
            'methods' => ['POST'] ,
            'callback' => [$this,'goueg_set_datas'],
            'permission_callback' => '__return_true'
        ]);
    }

    public function goueg_set_datas( WP_REST_REQUEST $request ){
        $datas = $request->get_params();
        $params = self::get_users_infos();

        $metas = json_decode($datas['metadata'],true);

        file_put_contents(HELLOASSO_ROOT.'filename.txt', print_r($metas, true));
        //file_put_contents(HELLOASSO_ROOT.'filename.txt', 'toto');

        return rest_ensure_response([$params,$datas]);
    }

    /**
    * Récupération des informations de la personne connectée
    * @return Array
    */
    private function get_users_infos():array {

        $current_user = wp_get_current_user();

        if( $current_user->ID > 0 ){

            $array = array();

            foreach( $current_user->data as $key=>$value):
                $array[$key] = $value;
            endforeach;

            return $array;

        }else{
            return ['user'=>'empty'];
        }

    }
}

?>