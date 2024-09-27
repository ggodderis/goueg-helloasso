<?php

class back_rest_route_helloasso {
    

    public function __construct() {
        add_action('rest_api_init', array(&$this,'create_rest_route') );
    }

    public function create_rest_route(){

        register_rest_route('back-helloasso/v1', '/get_tarifs',  [
            'methods' => ['POST'] ,
            'callback' => [$this,'goueg_get_tarifs'],
            'permission_callback' => function () {
            return is_user_logged_in();
          },
      ]);
      
    }

    public function goueg_get_tarifs( WP_REST_REQUEST $request ) {
        $datas = $request->get_params();
        $cotisations = getAllTarifs::g('wp_cotisations_club');
        $ffr = getAllTarifs::g('wp_licences_ffr');
        $ffme = getAllTarifs::g('wp_licences_ffme');

        return rest_ensure_response(['cotisations' => $cotisations,'ffr' => $ffr, 'ffme' => $ffme]);
    }

}


?>