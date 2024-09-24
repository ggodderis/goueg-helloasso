<?php
    echo '<h1>page de retour hello asso...</h1>';

    if( isset($asso['order']['items'][0]['state']) && $asso['order']['items'][0]['state'] == 'Processed' &&
    isset($asso['order']['payments'][0]['state']) && $asso['order']['payments'][0]['state'] == 'Authorized' ){

        echo '<h3>Paiement accepter</h3>';

    }else{
            echo '<h3>Paiement Refuser</h3>';
    }

    echo '<pre>';
    print_r( $_POST );
    echo '</pre>';

    echo '<pre>';
    print_r( $_GET );
    echo '</pre>';

    
?>