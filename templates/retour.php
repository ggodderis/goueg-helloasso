<?php
/** The name of the database for WordPress */
define( 'DB_NAME', '' );

/** Database username */
define( 'DB_USER', '' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', '' );

// checkoutIntentId 29104 ok

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
 */
    if( isset($retour_hello['order']['items'][0]['state']) && $retour_hello['order']['items'][0]['state'] == 'Processed' &&
        isset($retour_hello['order']['payments'][0]['state']) && $retour_hello['order']['payments'][0]['state'] == 'Authorized' ){
        
        /**
         * Conversion du retour hello asso en array serializé pour mysql
         */
        $retour_hello = serialize($retour_hello);

        echo '<h3>Paiement accepté</h3>'.
                '<p>Insert des informations dans la table</p>'.
                '<button type="button">retour au site</button>';

        $conn = new mysqli( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME );
        // Check connection
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
        if( !empty($retour) ){

            $date = new DateTime('now',new DateTimeZone('Europe/Paris'));
            $date = (clone $date)->format('Y-m-d H:i:s');

            $query_insert = "UPDATE {$table_name} SET `array`='".$retour_hello."' , `date_update`='".$date."' WHERE `hello_id`={$checkoutIntentId} ";
            $conn->query($query_insert);

        }
        $conn->close();

    }else{
        echo '<h3>Paiement Refusé</h3>';
    }


}

?>
