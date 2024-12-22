<?php
/**
 * Affiche le resultat de la commande dur la page retour
 * aprés la commande
 */

$array_statut = ['attente','validée','échec','remboursée'];

switch( $array_statut[$statut-1] ){

    case 'attente':

        echo '<div class="content_checkout">
                <div class="checkout_logo">
                    <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
                </div>
                <h1>Bienvenue dans notre club de montagne!</h1>
                <h4>Votre commande est : <b>'.$array_statut[$statut-1].'</b></h4>
                <br>
                <div class="checkout_details">'.self::getResumer().'</div>
            </div>';

        break;

    case 'validée':

        echo '<div class="content_checkout">
                <div class="checkout_logo">
                    <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
                </div>
                <h1>Bienvenue dans notre club de montagne!</h1>
                <h4>Votre commande est : <b>'.$array_statut[$statut-1].'</b></h4>
                <br>
                <div class="checkout_details">'.self::getResumer().'</div>
            </div>';

         break;

    case 'échec':

        echo '<div class="content_checkout">
            <div class="checkout_logo">
                <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ko.svg" />
            </div>
            <h1>Désolé votre paiement a été refusé..</h1>
            <h4>état du paiement : <b>'.$array_statut[$statut-1].'</b></h4>
            </div>';

        break;

    case 'remboursé':

        echo '<div class="content_checkout">
            <div class="checkout_logo">
                <img src="'.HELLOASSO_URL.'/templates/assets/checkout_refunded.svg" />
            </div>
            <h1>Remboursement..</h1>
            <h4>état du paiement : <b>'.$array_statut[$statut-1].'</b></h4>
            </div>';

        break;
}

?>