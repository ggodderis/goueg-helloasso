<?php

$saison_date = self::annee_saison_en_cours();

$body_mail = "<h1>Adhésion au Club Grimpeurs des Alpes</h1>".
        "<p>Bonjour, {$payer['lastName']}</p>".
        "<p>Votre adhésion au Club Grimpeurs des Alpes est validée pour la saison {$saison_date}</p>".
        '<table style="border-collapse: collapse;border: 1px solid #e9e9e9">
           <thead>
            <tr>
                <th style="padding: 0.5rem">Récapitulatif de l\'adhésion</th>
            </tr>
            </thead>    
            <tbody style="background-color: aliceblue;">
                <tr>
                    <td style="padding: 0.5rem">Cotisation au club</td>
                    <td style="padding: 0.5rem">A</td>
                    <td style="padding: 0.5rem">35€</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem">Licence / Assurance</td>
                    <td style="padding: 0.5rem">A</td>
                    <td style="padding: 0.5rem">35€</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem">Total</td>
                    <td style="padding: 0.5rem"></td>
                    <td style="padding: 0.5rem">35€</td>
                </tr>
            </tbody>
        </table>';              

echo $body_mail;

?>