<?php

require_once('config.php');

// checkoutIntentId 29104 ok

//sleep(4);

if( isset($_GET['checkoutIntentId']) && !empty($_GET['checkoutIntentId']) ){

    $table_name = 'wp_clients';
    $checkoutIntentId = $_GET['checkoutIntentId'];

    /**
     * Demande de token
     * à modifier pour la prod !!
     */
    $url = 'https://api.helloasso-sandbox.com/oauth2/token';

    $payload =  array( 
        "client_id" => "a0fead5a1ba4404eacf4b9de755fb3b9",
        "client_secret" => "NOfvEhtPEa4CBhrom8Q6nkBIwcZOapxr",
        "grant_type" => "client_credentials"
    );


    $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_POST, true );
            curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded'] );
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($payload) );

    $data = curl_exec($curl);
    $data = json_decode($data);
    $access_token = $data->access_token;

    /**
     * Demande d'infos grace au token
     * à modifier pour la prod !!
     */  
    $url2 = "https://api.helloasso-sandbox.com/v5/organizations/goueg/checkout-intents/$checkoutIntentId";
    $curl2 = curl_init($url2);
            
            curl_setopt($curl2, CURLOPT_HTTPHEADER, ["Authorization: Bearer $access_token"] );
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
$array_statut = ['attente','validée','échec','remboursée'];

    if( isset($retour_hello['order']['items'][0]['state']) &&
        isset($retour_hello['order']['payments'][0]['state']) ){

            $statut = 1;

            // echo $retour_hello['order']['items'][0]['state'];
            // echo '<br>';
            // echo $retour_hello['order']['payments'][0]['state'];


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

        /**
         * Conversion du retour hello asso en array serializé pour mysql
         */
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
        $query = "SELECT * FROM {$table_name} WHERE `hello_id`={$checkoutIntentId}";
        $retour = $conn->query($query);

        /**
         * Si $checkoutIntentId existe on l'update avec le retour d'infos hello asso
         */
         if( $retour->num_rows ){

            /**
             * Serialization des metas et traitement pour les quotes avec mysqli_real_escape_string 
             */
            $retour_hello = serialize($retour_hello);
            $retour_hello = mysqli_real_escape_string($conn,$retour_hello);

            $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
            $date = (clone $date)->format('Y-m-d H:i:s');

            $query_insert = "UPDATE {$table_name} SET `array`='{$retour_hello}' , `statut`='{$statut}' ,`date_update`='{$date}' WHERE `hello_id`={$checkoutIntentId} ";
            $conn->query($query_insert);

            echo '<h3>Paiement '.$array_statut[$statut-1].'</h3>'.
                    '<button type="button">retour au site</button>';

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

    }else{
        echo '<h3>Paiement Refusé</h3>';
        // echo '<pre>';
        // print_r($retour_hello);
        // echo '</pre>';
    }


?>
