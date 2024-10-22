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
        $array_statut = ['attente','validé','échec','remboursé'];

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

            /*
            $query_test = "SELECT * FROM {$table_name} WHERE `hello_id`={$checkoutIntentId}";
            $retour_test = $conn->query($query_test);
            $row = $retour_test->fetch_array(MYSQLI_ASSOC);
            echo '<pre>';
            print_r(unserialize($row['array']));
            echo '<pre>';
            */

            $conn->close();

        }else{
            echo '<h3>id client inexistant !</h3>';
        }

    }

    private function createAndUpdateAdherent( $create, $statut ){
        /**
         * Si le champs create de la table wp_client
         * est en "attente" on fait le travail si non on fait rien..
         */
        $metadata = $this->datas['metadata'];

        if( $create == "attente" && intval($statut) == 2 ){

            echo '<pre>';
            print_r($metadata['payer']);
            echo '</pre>';

            update_user_meta( $metadata['payer']['id'], 'gda_type_cotisation', 'A');
            update_user_meta( $metadata['payer']['id'], 'gda_licence', 'FFR_FRA');
            update_user_meta( $metadata['payer']['id'], 'gda_licence_speciale', ['BASE+']);
            update_user_meta( $metadata['payer']['id'], 'gda_lieu_naissance', 'Croix');
            update_user_meta( $metadata['payer']['id'], 'gda_saison', '2025');
            
            $password = wp_generate_password(6, false);

            $user_datas = array(
                "first_name" => 'Jojo',
                "last_name" => 'le gros jojo',
                "user_pass" => $password,
                "user_email" => 'goueg4@gmail.com',
                "role" => 'subscriber',
                "user_login" => str_replace(' ','',mb_strtolower('Jojo')).' '.str_replace(' ','',mb_strtolower('le gros jojo')),
                "display_name" => str_replace(' ','',mb_strtolower('Jojo')).' '.str_replace(' ','',mb_strtolower('le gros jojo'))
                // "user_login", CONCAT( LOWER(first_name)," ",LOWER(last_name)),
                // "display_name", CONCAT(first_name ," ",last_name ) )
            );

            //$user_id = wp_insert_user($user_datas);

            // if (!is_wp_error($user_id)) { 
            //     //echo $i.'we have Created an account for you.<br>';
            //     //wp_new_user_notification( $user_id, null, 'both' );
            // }

            //"création du user et envoie email facture et email mot de passe";
        }
    }

}


$initRetour = new retourHello();

// get_footer();


exit();


// if( isset($_GET['checkoutIntentId']) && !empty($_GET['checkoutIntentId']) ){

//     $table_name = 'wp_clients';
//     $checkoutIntentId = $_GET['checkoutIntentId'];

//     /**
//      * Demande de token
//      * à modifier pour la prod !!
//      */
//     $url = 'https://api.helloasso-sandbox.com/oauth2/token';

//     $payload =  array( 
//         "client_id" => "a0fead5a1ba4404eacf4b9de755fb3b9",
//         "client_secret" => "NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr",
//         "grant_type" => "client_credentials"
//     );


//     $curl = curl_init($url);
//             curl_setopt($curl, CURLOPT_POST, true );
//             curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded'] );
//             curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//             curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($payload) );

//     $data = curl_exec($curl);
//     $data = json_decode($data);
//     $access_token = $data->access_token;

//     /**
//      * Demande d'infos grace au token
//      * à modifier pour la prod !!
//      */  
//     $url2 = "https://api.helloasso-sandbox.com/v5/organizations/goueg/checkout-intents/$checkoutIntentId";
//     $curl2 = curl_init($url2);
            
//             curl_setopt($curl2, CURLOPT_HTTPHEADER, ["Authorization: Bearer $access_token"] );
//             curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);

//     $retour_hello = curl_exec($curl2);
//     $retour_hello = json_decode($retour_hello,true);

// /**
//  *  On test si items[0[state] et order[0][state] existe est si ils ont les bonnes valeurs
//  *  pour savoir si on déclare la vente comme validée..
//  *  statut
//  *  1 - attente
//  *  2 - validée
//  *  3 - échec
//  *  4 - remboursée
//  */
// $array_statut = ['attente','validé','échec','remboursé'];

//     if( isset($retour_hello['order']['items'][0]['state']) &&
//         isset($retour_hello['order']['payments'][0]['state']) ){

//             $statut = 1;

//             echo $retour_hello['order']['items'][0]['state'];
//             echo '<br>';
//             echo $retour_hello['order']['payments'][0]['state'];


//             if( $retour_hello['order']['items'][0]['state'] == 'Processed' &&
//                 $retour_hello['order']['payments'][0]['state'] == 'Authorized' ){

//                 $statut = 2;

//             }
//             if( $retour_hello['order']['items'][0]['state'] == 'Canceled' &&
//                 $retour_hello['order']['payments'][0]['state'] == 'Refunded' ){

//                 $statut = 4;
                
//             }

//     }else{
//         $statut = 3;
//     }

//         /**
//          * Conversion du retour hello asso en array serializé pour mysql
//          */
//         $conn = new mysqli( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME );
//         /**
//          * Connection à la base ou error
//          */
//         if ($conn->connect_error) {
//             echo die("Connection failed: " . $conn->connect_error);
//         }
//         /**
//          * Test pour voir si $checkoutIntentId existe dans les tables wp_clients
//          */
//         $query = "SELECT * FROM {$table_name} WHERE `hello_id`={$checkoutIntentId}";
//         $retour = $conn->query($query);

//         /**
//          * Si $checkoutIntentId existe on l'update avec le retour d'infos hello asso
//          */
//          if( $retour->num_rows ){

//             /**
//              * Serialization des metas et traitement pour les quotes avec mysqli_real_escape_string 
//              */
//             $retour_hello = serialize($retour_hello);
//             $retour_hello = mysqli_real_escape_string($conn,$retour_hello);

//             $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
//             $date = (clone $date)->format('Y-m-d H:i:s');

//             $query_insert = "UPDATE {$table_name} SET `array`='{$retour_hello}' , `statut`='{$statut}' ,`date_update`='{$date}' WHERE `hello_id`={$checkoutIntentId} ";
//             $conn->query($query_insert);


//             echo '<img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
//                     <h3>Paiement '.$array_statut[$statut-1].'</h3>'.
//                     '<button type="button" class="button button-primary">retour au site</button>';

//             /*
//             $query_test = "SELECT * FROM {$table_name} WHERE `hello_id`={$checkoutIntentId}";
//             $retour_test = $conn->query($query_test);
//             $row = $retour_test->fetch_array(MYSQLI_ASSOC);
//             echo '<pre>';
//             print_r(unserialize($row['array']));
//             echo '<pre>';
//             */

//             $conn->close();

//         }else{
//             echo '<h3>id client inexistant !</h3>';
//         }

//     }else{
//         echo '<h3>Paiement Refusé</h3>';
//         // echo '<pre>';
//         // print_r($retour_hello);
//         // echo '</pre>';
//     }


?>
