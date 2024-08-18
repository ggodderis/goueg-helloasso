<?php


class rest_route_helloasso {

    public $today;
    public $birthday;
    public $annee_derniere;
    public $annee_en_cours;

    /**
     * @param datas [] contient toutes les informations de tarifs
     */
    public $general;
    public $temporaire;

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
        $params = getUserInfos::g();
        //$tarifs = getAllTarifs::g();
        $tarifs = self::test();
        //$tarifs = new adhesionInfos('1970-09-03');
        
        //$metas = json_decode($datas['metadata'],true);

        //file_put_contents(HELLOASSO_ROOT.'filename.txt', print_r($metas, true));
        //file_put_contents(HELLOASSO_ROOT.'filename.txt', 'toto');

        return rest_ensure_response([$params,$tarifs]);
    }

    public function test():array {

        $date_de_naissance = '1970-09-03';

        $this->today = new DateTime('now', new DateTimeZone('Europe/Paris') );
        $this->birthday = (clone $this->today)->modify("{$date_de_naissance}");

        $this->annee_en_cours = intval ( (clone $this->today)->format('Y') );
        $this->annee_derniere = ($this->annee_en_cours - 1);
        

        $this->general['club'] = getAllTarifs::g('wp_cotisations_club');
        $this->general['ffme']['licences'] = getAllTarifs::g('wp_licences_ffme');
        $this->general['ffme']['options'] = getAllTarifs::g('wp_options_ffme');
        $this->general['ffr']['licences'] = getAllTarifs::g('wp_licences_ffr');

        self::get_cotisation_club();


        return $this->temporaire;

    }

    /**
     * Si aujourd'hui est plus petit que le mois d'août de l'année en cours
     * on prend le mois d'août de l'année dernière...
     */
    private function get_age_mois_septembre():int {

        if( $this->today < (clone $this->today)->modify("{$this->annee_en_cours}-09-01") ){
            // echo 'il faut prendre le mois d\'août de l\'année précédente <br>';
            $age = (clone $this->today)->modify('last year')->diff($this->birthday)->y;
        }else{
            // echo 'On compare avec le mois d\'août de cette année <br>';
            $age = $this->today->diff($this->birthday)->y;
        }

        return $age;

    }

    /**
    * Si aujourd'hui est plus petit que le mois d'août de l'année en cours
    * on prend le mois d'août de l'année dernière...
    */
    private function get_age_fin_aout():int {
        
        if( $this->today < (clone $this->today)->modify("{$this->annee_en_cours}-08-31") ){
            // echo 'il faut prendre le mois d\'août de l\'année précédente <br>';
            $age = (clone $this->today)->modify('last year')->diff($this->birthday)->y;
        }else{
            // echo 'On compare avec le mois d\'août de cette année <br>';
            $age = $this->today->diff($this->birthday)->y;
        }
        return $age;
    }

    /**
     * POUR LES LICENCES / ASSURANCES
     * Si on est entre mai et fin août demi tarif 
     * si il existe...
     */
    private function get_reduction_mai():string {

        if( $this->today >= (clone $this->today)->modify("{$this->annee_en_cours}-05-01")
            &&
            $this->today < (clone $this->today)->modify("{$this->annee_en_cours}-09-01")
        ){
            return 'demi_tarif';
        }else{
            return 'plein_tarif';
        }

    }

    /**
     *  COTISATION AU CLUB SELON DATE DE NAISSANCE
     */
    public function get_cotisation_club(){

        if( self::get_age_mois_septembre() < 25 ){

            $array = array_filter($this->general['club'], function ($element) {
                return $element->titre !== "A";
                //                   ↑
                // Array value which you want to delete
            });

            $this->temporaire['club'] = $array;

        }else{

            $array = array_filter($this->general['club'], function ($element) {
                return $element->titre !== "J";
                //                   ↑
                // Array value which you want to delete
            });

            $this->temporaire['club'] = $array;
        }

        self::get_licence_ffme();
    }

    private function get_licence_ffme(){

        if( self::get_age_fin_aout() < 18 ){

            $array = array_filter($this->general['ffme']['licences'], function ($element) {
                return $element->titre !== "FA";
                //                   ↑
                // Array value which you want to delete
            });
            $this->temporaire['ffme']['licences'] = $array;

        }else{

            $array = array_filter($this->general['ffme']['licences'], function ($element) {
                return $element->titre !== "FJ";
                //                   ↑
                // Array value which you want to delete
            });
            $this->temporaire['ffme']['licences'] = $array;

        }

        $this->temporaire['ffme']['options'] = $this->general['ffme']['options'];

        self::get_licence_ffr();
    }   


    private function get_licence_ffr(){

        if( self::get_age_fin_aout() < 26 ){

            $array = array_filter($this->general['ffr']['licences'], function ($element) {
                return $element->titre !== "IMPN";
                //                   ↑
                // Array value which you want to delete
            });
            $this->temporaire['ffre']['licences'] = $array;

        }else{

            $array = array_filter($this->general['ffr']['licences'], function ($element) {
                return $element->titre !== "IMPNJ";
                //                   ↑
                // Array value which you want to delete
            });
            $this->temporaire['ffre']['licences'] = $array;
        }

        return $this->temporaire;
    }

}

?>