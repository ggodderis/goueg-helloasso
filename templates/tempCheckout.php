<?php

$total_price        = intval($template_infos['order']['payments'][0]['amount'])/100;
$cotisation         = $template_infos['metadata']['cotisation'];
$prix_cotisation    = intval($template_infos['metadata']['tarif_cotisation'])/100;
$licence            = $template_infos['metadata']['licence'];
$prix_licence       = intval($template_infos['metadata']['tarif_licence'])/100;

echo '<div class="content_checkout">
        <div class="checkout_logo">
            <img src="'.HELLOASSO_URL.'/templates/assets/checkout_ok.svg" />
        </div>
        <h1>Bienvenue dans notre club de montage!</h1>
        <h4>Votre paiement est : <b>'.$array_statut[$statut-1].'</b></h4>
        <u>Voici le résumé de votre adhésion :</u>
        <ul>
            <li>Cotisation club : '.$cotisation.' prix: '.$prix_cotisation .' €</li>
            <li>Licence / Assurance : '.$licence.' prix: '.$prix_licence.' €</li>
        </ul>
        <div>Prix total: '.$total_price .' €</div>
    </div>';

    echo '<pre>';
    print_r( $template_infos );
    echo '<pre>';



?>