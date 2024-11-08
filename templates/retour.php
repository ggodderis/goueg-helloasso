<?php

// require_once('config.php');

// checkoutIntentId 29104 ok

//sleep(4);

get_header();


class retourHello {

    private $urltoken = URL_TOKEN;
    private $urlinfos = URL_CHECKOUT_INTENTS;
    private $client_id = CLIENT_ID;
    private $client_secret = CLIENT_SECRET;
    private $grant_type = 'client_credentials';

    private $checkoutIntentId = '';
    private $table_name = 'wp_clients';
    private $datas = [];

    private $token = '';

    public function __construct(){
        self::getToken();
    }

    private function getToken(){

        $payload =  array( 
            "client_id" => $this->client_id,
            "client_secret" => $this->client_secret,
            "grant_type" => $this->grant_type
        );

        if( isset($_GET['checkoutIntentId']) && !empty($_GET['checkoutIntentId']) ){
        
            $this->checkoutIntentId = $_GET['checkoutIntentId'];

            $curl = curl_init( $this->urltoken );
                    curl_setopt($curl, CURLOPT_POST, true );
                    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded'] );
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($payload) );

            $data = curl_exec($curl);
            $data = json_decode($data);
            $this->token = $data->access_token;

            self::getCheckout();

        }else{
            /**
             * Appeler le template Paiement refusé...
             */
            echo '<h3>Paiement Refusé</h3>';
        }

    }

    private function getCheckout(){

        $curl2 = curl_init( $this->urlinfos.$this->checkoutIntentId );
            
        curl_setopt($curl2, CURLOPT_HTTPHEADER, ["Authorization: Bearer $this->token"] );
        curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);

        $retour_hello = curl_exec($curl2);
        $retour_hello = json_decode($retour_hello,true);
        /**
         *  On test si items[0[state] et order[0][state] existe est si ils ont les bonnes valeurs
         *  pour savoir si on déclare la vente comme validée..
         *  statut
         *  1 - attente
         *  2 - validée
         *  3 - échec
         *  4 - remboursée
         */

        if( isset($retour_hello['order']['items'][0]['state']) &&
            isset($retour_hello['order']['payments'][0]['state']) ){

            $statut = 1;


                if( $retour_hello['order']['items'][0]['state'] == 'Processed' &&
                    $retour_hello['order']['payments'][0]['state'] == 'Authorized' ){

                    $statut = 2;

                }
                if( $retour_hello['order']['items'][0]['state'] == 'Canceled' &&
                    $retour_hello['order']['payments'][0]['state'] == 'Refunded' ){

                    $statut = 4;
                    
                }

            }else{
                $statut = 3;
            }

        $conn = new mysqli( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME );
        /**
         * Connection à la base ou error
         */
        if ($conn->connect_error) {
            echo die("Connection failed: " . $conn->connect_error);
        }
        /**
         * Test pour voir si $checkoutIntentId existe dans les tables wp_clients
         */
        $query = "SELECT * FROM {$this->table_name} WHERE `hello_id`={$this->checkoutIntentId}";
        $retour = $conn->query($query);
        $infos_table = $retour->fetch_array(MYSQLI_ASSOC);

        /**
         * Si $checkoutIntentId existe on l'update avec le retour d'infos hello asso
         */
         if( $retour->num_rows ){
            /**
            * On stock les datas dans une Array
            */
            $this->datas = $retour_hello;
            /**
             * Serialization des metas et traitement pour les quotes avec mysqli_real_escape_string 
             */
            $retour_hello = serialize($retour_hello);
            $retour_hello = mysqli_real_escape_string($conn,$retour_hello);

            $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
            $date = (clone $date)->format('Y-m-d H:i:s');

            $query_insert = "UPDATE {$this->table_name} SET `array`='{$retour_hello}',
                            `statut`='{$statut}',
                            `date_update`='{$date}',
                            `create`= 2
                            WHERE `hello_id`={$this->checkoutIntentId} ";

            $conn->query($query_insert);

            /**
             * Affichage du template checkout avec le graphisme
             */
            require_once(HELLOASSO_ROOT.'templates/tempCheckout.php');
            /**
             * Création ou update de l'adhérent et envoie email facture
             * et email mot de passe inscription
             */
            self::createAndUpdateAdherent( $infos_table['create'], $statut );

            $conn->close();

        }else{
            echo '<h3>id client inexistant !</h3>';
        }

    }

    private function createAndUpdateAdherent( $create, $statut ){
        /**
         * Si le champs create de la table wp_client
         * est en "attente" et que le status est sur 2 = validée
         * on fait le travail si non on fait rien..
         */
        $metadata = $this->datas['metadata'];

        if( $create == "attente" && intval($statut) == 2 ){

            $options    = $metadata['options_ffme'];
            $payer      = $metadata['payer'];
            $options_liste = [];

            /**
             * On liste les options ffme si y'en a...
             */
                if( isset( $options ) &&  !empty( $options ) ){
                    foreach( $options as $key => $value ){
                        if( $value['checked'] ){
                            array_push( $options_liste, $value['name'] );
                        }
                    }
                }

            /**
             * Si c'est déjà un adhérent
             * update des ses infos et mail de facture
             */
                if( isset( $payer['id'] ) && !empty( $payer['id'] ) ){
                    // update_user_meta( $metadata['payer']['id'], 'gda_inscript_escalade', intval($metadata['mur]) > 0 ? 'oui' : '' );
                    // update_user_meta( $metadata['payer']['id'], 'gda_type_cotisation', $metadata['cotisation'] );
                    // update_user_meta( $metadata['payer']['id'], 'gda_licence', $metadata['type_licence'] );
                    // update_user_meta( $metadata['payer']['id'], 'gda_licence_speciale', $options_liste );
                    // update_user_meta( $metadata['payer']['id'], 'gda_saison', self::annee_saison_en_cours());
                }
            /**/
                $to = 'goueg4@gmail.com';
                $subject = "Adhésion au Club Grimpeurs des Alpes";

                // ob_start();
                // include(get_stylesheet_directory() . '/email-template.php');//Template File Path
                // $body = ob_get_contents();
                // ob_end_clean();
                $body = '<h1>Adhésion mise à jour...</h1>';

                $headers = array(
                        'Content-Type: text/html; charset=UTF-8',
                        'Reply-To: info@club-montagne.net',
                        'From: Grimpeurs des Alpes <info@club-montagne.net>');

                wp_mail( $to, $subject, $body, $headers );
            

            /**
             * Si c'est un nouvel adhérent
             * création de l'adhérent
             * mail de facture et mail mot de passe
             */

            echo '<pre>';
            print_r($metadata);
            echo '</pre>';
            
            $password = wp_generate_password(6, false);

            $user_datas = array(
                "first_name" => $payer['lastName'],
                "last_name" => $payer['firstName'],
                "user_pass" => $password,
                "user_email" => $payer['email'],
                "role" => 'subscriber',
                "user_login" => str_replace(' ','',mb_strtolower($payer['lastName'])).' '.str_replace(' ','',mb_strtolower($payer['firstName'])),
                "display_name" => str_replace(' ','',mb_strtolower($payer['lastName'])).' '.str_replace(' ','',mb_strtolower($payer['firstName']))
                // "user_login", CONCAT( LOWER(first_name)," ",LOWER(last_name)),
                // "display_name", CONCAT(first_name ," ",last_name ) )
            );

            $user_id = wp_insert_user($user_datas);

            if (!is_wp_error($user_id)) {

                update_user_meta( $user_id, 'gda_genre', $payer['gda_genre'] );
                update_user_meta( $user_id, 'gda_nee_le', $payer['dateOfBirth'] );
                update_user_meta( $user_id, 'billing_address_1', $payer['address'] );
                update_user_meta( $user_id, 'billing_postcode', $payer['zipCode'] );
                update_user_meta( $user_id, 'billing_city', $payer['city'] );
                update_user_meta( $user_id, 'billing_phone', $payer['billing_phone'] );
                update_user_meta( $user_id, 'gda_personne', $payer['gda_personne'] );
                update_user_meta( $user_id, 'gda_tel_personne', $payer['gda_tel_personne'] );
                update_user_meta( $user_id, 'gda_type_cotisation', $metadata['cotisation'] );
                update_user_meta( $user_id, 'gda_licence', $metadata['type_licence'] );
                update_user_meta( $user_id, 'gda_licence_speciale', $options_liste );
                /**
                 * date d'adhésion
                 */
                $date_adhesion = new DateTime('now',new DateTimeZone('Europe/Paris'));
                update_user_meta( $user_id, 'gda_date_adhesion', $date_adhesion->format('Y-m-d') );
                update_user_meta( $user_id, 'gda_lieu_naissance', $payer['gda_lieu'] );
                update_user_meta( $user_id, 'gda_saison', self::annee_saison_en_cours() );
                update_user_meta( $user_id, 'gda_annee_admission', $date_adhesion->format('Y') );
                /**
                 * TODO 
                 * Il faut créer une liste d'activitées pour l'adhérent !!!!
                 * Pareil pour les famille réfléchir à un systéme de stockage des membres de la famille
                 */

                echo 'we have Created an account for you.<br>';
                //wp_new_user_notification( $user_id, null, 'both' );
            }

            //"création du user et envoie email facture et email mot de passe";
        }
    }


    /**
    * Retourne l'année pour la zone compte et l'affichage de la saison en cours
    * à savoir que l'année d'adhésion commence le 1er septembre
    */
    private function annee_saison_en_cours():string {

        $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
        $mois = intval ( (clone $date)->format('m') );

        if( $mois >= 9 && $mois <= 12 ){

        $annee = (clone $date)->modify('next year')->format('Y');

        }else{
        $annee = (clone $date)->format('Y');
        }

        return $annee;
    }

}


$initRetour = new retourHello();


exit();


?>
