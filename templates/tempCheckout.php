<?php

$total_price        = isset($this->datas['order']['payments'][0]['amount']) ? intval($this->datas['order']['payments'][0]['amount'])/100 : '';
$cotisation         = $this->datas['metadata']['cotisation'];
$prix_cotisation    = intval($this->datas['metadata']['tarif_cotisation'])/100;
$licence            = $this->datas['metadata']['licence'];
$prix_licence       = intval($this->datas['metadata']['tarif_licence'])/100;
$liste_membres      = '';
$soutien            = '';
$options            = '';
$mur                = '';
$adherent           = $this->datas['metadata']['payer']['firstName'].' '.$this->datas['metadata']['payer']['lastName'];

/**
 * Liste des membre de la famille si famille
 */
if( isset($this->datas['metadata']['cotisation_famille']) && 
    $this->datas['metadata']['cotisation_famille'] == "famille" ){
    
    foreach( $this->datas['metadata'] as $key => $value ){
        // echo '<pre>';
        // print_r($key);
        // echo '</pre>';
        if( $key == 'famille_adulte' ){
            $liste_membres .= '<span>'.$value['firstName'].' '.$value['lastName'].'</span>';
        }
        if( $key == 'famille_enfant' ){
            $liste_membres .= '<span>'.$value['firstName'].' '.$value['lastName'].'</span>';
        }
        if( $key == 'famille_supp' ){
            for( $i = 0; $i < count($value); $i++ ){
                $liste_membres .= '<span>'.$value[$i]['firstName'].' '.$value[$i]['lastName'].'</span>';
            }
        }

    }
    $liste_membres = '<br /><u>Membres de la famille</u><br />'.
                    '<span>'.$adherent.'</span>'.
                    $liste_membres;

}
/**
 * Cotisation de soutien si pas vide
 */
if( isset($this->datas['metadata']['soutien']) &&
    intval($this->datas['metadata']['soutien']) > 0  ){
    $soutien = '<span>Soutien au club: <b>'.( intval($this->datas['metadata']['soutien'])/100 ).'€</b> </span>';
}
/**
 * Options FFME
 */
$boucle_options = isset( $this->datas['metadata']['options_ffme'] ) ? $this->datas['metadata']['options_ffme'] : [];

foreach( $boucle_options as $key => $value ){
    // echo '<pre>';
    // print_r($value['checked']);
    // echo '</pre>';
    if( $value['checked'] ){
        $options .='<span>Option '.$value['titre'].': <b>'.( intval($value['plein_tarif'])/100).'€</b></span>';
    }
}

/**
 * Mur d'escalade
 */
if( isset($this->datas['metadata']['mur']) &&  intval($this->datas['metadata']['mur']) > 0 ){
    $mur = '<span>Mur d\'escalade : <b>'.( intval($this->datas['metadata']['mur'])/100 ).'€</b> </span>';
}

$array_statut = ['attente','validée','échec','remboursée'];

switch( $array_statut[$statut-1] ){

    case 'attente':

        echo '<div class="content_checkout">
                <div class="checkout_logo">
                    <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
                </div>
                <h1>Bienvenue dans notre club de montagne!</h1>
                <h4>Votre paiement est : <b>'.$array_statut[$statut-1].'</b></h4>
                <div class="checkout_details">
                    <u>Voici le résumé de votre adhésion :</u>
                    <br />
                    <span>Adhésion de: <b>'.$adherent.'</b></span>
                    <span>Cotisation club '.$this->datas['metadata']['cotisation_famille'].': '.$cotisation.'  <b>'.$prix_cotisation .' €</b></span>
                    <span>Licence / Assurance: '.$licence.'  <b>'.$prix_licence.' €</b></span>
                    '.$soutien.'
                    '.$options.'
                    '.$mur.'
                    <span>Prix total: <b>'.$total_price .' €</b></span>
                    '.$liste_membres.'
                </div>
            </div>';

        break;

    case 'validée':

        echo '<div class="content_checkout">
                <div class="checkout_logo">
                    <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
                </div>
                <h1>Bienvenue dans notre club de montagne!</h1>
                <h4>Votre paiement est : <b>'.$array_statut[$statut-1].'</b></h4>
                <div class="checkout_details">
                    <u>Voici le résumé de votre adhésion :</u>
                    <br />
                    <span>Adhésion de: <b>'.$adherent.'</b></span>
                    <span>Cotisation club '.$this->datas['metadata']['cotisation_famille'].': '.$cotisation.'  <b>'.$prix_cotisation .' €</b></span>
                    <span>Licence / Assurance: '.$licence.'  <b>'.$prix_licence.' €</b></span>
                    '.$soutien.'
                    '.$options.'
                    '.$mur.'
                    <span>Prix total: <b>'.$total_price .' €</b></span>
                    '.$liste_membres.'
                </div>
            </div>';

         break;

    case 'échec':

        echo '<div class="content_checkout">
            <div class="checkout_logo">
                <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ko.svg" />
            </div>
            <h1>Désolé votre paiement a été refusé..</h1>
            <h4>état du paiement : <b>'.$array_statut[$statut-1].'</b></h4>
                <div class="checkout_details">
                    <span>Adhésion de: <b>'.$adherent.'</b></span>
                </div>
            </div>';

        break;

    case 'remboursé':

        echo '<div class="content_checkout">
            <div class="checkout_logo">
                <img src="'.HELLOASSO_URL.'/templates/assets/checkout_refunded.svg" />
            </div>
            <h1>Remboursement..</h1>
            <h4>état du paiement : <b>'.$array_statut[$statut-1].'</b></h4>
                <div class="checkout_details">
                    <span>Adhésion de: <b>'.$adherent.'</b></span>
                </div>
            </div>';

        break;
}



    // echo '<pre>';
    // print_r( $this->datas );
    // echo '<pre>';



?>