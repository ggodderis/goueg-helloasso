<?php

/**
 * Corps du PDF Famille pour télécharger tous les membre d'une famille
 * @param $payer = json_decode($datas['payer']);
 * @param $famille_adulte = json_decode($datas['famille_adulte']);
 * @param $famille_enfant = json_decode($datas['famille_enfant']);
 * @param $famille_supp   = json_decode($datas['famille_supp']);
 */


echo '<h2 style="font-family: Arial,sans-serif;color:#1e3b60">'.
        '<span style="font-weight:normal">Membres de la famille de:</span> '.$payer->lastName.' '.$payer->firstName.'</h2>
        '.tableauSimple($famille_adulte,'Deuxième Adulte').'
        '.tableauSimple($famille_enfant,'1 Enfant').'
        '.tableauMultiple($famille_supp,'Enfant');

function tableauSimple($liste,$titre) {

    return '<table width="100%" style="padding:1cm 0 1cm 0;border-bottom: 1px solid #cccccc;font-family: Arial,sans-serif;">
                <tr>
                    <td><h3 style="color:#1e3b60;">'.$titre.'</h3></td>
                </tr>
                <tr>
                    <td style="width:6cm">Nom:</td>
                    <td>'.$liste->firstName.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Prénom:</td>
                    <td>'.$liste->lastName.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">e-mail:</td>
                    <td>'.$liste->email.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Téléphone:</td>
                    <td>'.$liste->billing_phone.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Genre:</td>
                    <td>'.$liste->gda_genre.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Date de naissance:</td>
                    <td>'.$liste->dateOfBirth.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Lieu de naissance:</td>
                    <td>'.$liste->gda_lieu.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Nationalité:</td>
                    <td>'.$liste->country.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Personne à prévenir:</td>
                    <td>'.$liste->gda_personne.'</td>
                </tr>
                <tr>
                    <td style="width:6cm">Téléphone de la personne:</td>
                    <td>'.$liste->gda_tel_personne.'</td>
                </tr>
            </table>';

}

function tableauMultiple($liste,$titre) {

    $retour = '';
    $count = intval( 2 );

    if( count($liste) > 0 ):

    foreach( $liste as $key => $value ){

        $retour.='<table width="100%" style="padding:1cm 0 1cm 0;border-bottom: 1px solid #cccccc;font-family: Arial,sans-serif;">
                    <tr>
                        <td><h3 style="color:#1e3b60;">'.$count.' '.$titre.'</h3></td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Nom:</td>
                        <td>'.$liste[$key]->firstName.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Prénom:</td>
                        <td>'.$liste[$key]->lastName.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">e-mail:</td>
                        <td>'.$liste[$key]->email.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Téléphone:</td>
                        <td>'.$liste[$key]->billing_phone.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Genre:</td>
                        <td>'.$liste[$key]->gda_genre.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Date de naissance:</td>
                        <td>'.$liste[$key]->dateOfBirth.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Lieu de naissance:</td>
                        <td>'.$liste[$key]->gda_lieu.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Nationalité:</td>
                        <td>'.$liste[$key]->country.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Personne à prévenir:</td>
                        <td>'.$liste[$key]->gda_personne.'</td>
                    </tr>
                    <tr>
                        <td style="width:6cm">Téléphone de la personne:</td>
                        <td>'.$liste[$key]->gda_tel_personne.'</td>
                    </tr>
                </table>';

            $count++;
    }
    
    endif;

    return $retour;

}




?>