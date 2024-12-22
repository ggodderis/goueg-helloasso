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
                    return current_user_can('delete_posts');
            },
        ]);

        register_rest_route('back-helloasso/v1', '/set_tarifs',  [
                'methods' => ['POST'] ,
                'callback' => [$this,'goueg_set_tarifs'],
                'permission_callback' => function () {
                    return current_user_can('delete_posts');
                },
            ]);

        register_rest_route('back-helloasso/v1', '/get_clients',  [
                'methods' => ['POST'] ,
                'callback' => [$this,'goueg_get_clients'],
                'permission_callback' => function () {
                    return current_user_can('delete_posts');
            },
        ]);

        register_rest_route('back-pdf-helloasso/v1', '/get_pdf_famille',  [
            'methods' => ['POST'] ,
            'callback' => [$this,'goueg_get_pdf_famille'],
            'permission_callback' => function () {
                return current_user_can('delete_posts');
            },
        ]);
      
    }

    public function goueg_get_tarifs( WP_REST_REQUEST $request ) {
        $datas = $request->get_params();

        $cotisations = getAllTarifs::g('wp_cotisations_club');
        $ffr = getAllTarifs::g('wp_licences_ffr');
        $ffme = getAllTarifs::g('wp_licences_ffme');
        $ffme_options = getAllTarifs::g('wp_options_ffme');

        return rest_ensure_response(['cotisations' => $cotisations,'ffr' => $ffr, 'ffme' => $ffme, 'ffme_options' => $ffme_options]);
    }

    public function goueg_set_tarifs( WP_REST_REQUEST $request ) {
        $datas = $request->get_params();
        $data = json_decode($datas['data']);
        $set = setTarifs::g($data);

        return rest_ensure_response([$data->descriptif]);
    }

    public function goueg_get_clients( WP_REST_REQUEST $request ) {
        $datas = $request->get_params();
        $clients = getClients::g( $datas['year'], $datas['month'] );

        // $retour = [];
        // $cache = [];
        
       /* foreach( $clients as $key => $value ){
          $cache = unserialize($clients[$key]->array);
          array_push($retour, ['id'=>$clients[$key]->id,'code'=>$clients[$key]->code,'metas'=>$cache]);
        }
        

        return rest_ensure_response($retour);*/
        return rest_ensure_response($clients);
    }

    public function goueg_get_pdf_famille( WP_REST_REQUEST $request ){

        $datas = $request->get_params();
        $payer          = json_decode($datas['payer']);
        $famille_adulte = json_decode($datas['famille_adulte']);
        $famille_enfant = json_decode($datas['famille_enfant']);
        $famille_supp   = json_decode($datas['famille_supp']);

        ob_start();
        require( HELLOASSO_ROOT.'/templates/famillePDF.php' );
        $contenu = ob_get_clean();

        
        $mpdf = new \Mpdf\Mpdf();
        $mpdf->WriteHTML($contenu);
        $pdfContent = $mpdf->Output('monsuperpdf.pdf','D'); //I
        

        return rest_ensure_response($pdfContent);

        //return rest_ensure_response([$famille_adulte,$famille_enfant,$famille_supp]);
    }

}


?>