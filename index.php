<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#E8F1F2">
    <meta name="keywords" content="marie marcy medium voyante numerologue tarot crolles grenoble isere 38 Rhone,Alpes">
    <meta name="description" content="Réponse précise à toutes vos questions. Consultation en cabinet ou par téléphone. Amour – Travail – Finance – Santé. Etude numérologique par mail. Aide et conseil dans tous les domaines. Sur rdv. Contact : 06.87.24.41.33 ou 04.76.71.99.57 Adresse cabinet : Le Trèfle Blanc - 389 rue des Sources – 38920 Crolles">
    <meta name="language" content="French">
    <link rel="shortcut icon" href="img/icon.ico">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="google-site-verification" content="YNTmfPsj0b0yjOLyW1v_uKu29WeU9WAIVXxay6Pniwc"/>

    <title>Marie MARCY - Médium – Voyante – Numérologue – Hypnose à Crolles</title>

    <link rel="stylesheet" href="css/style.css?v=0032">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <script>
        function showMenu() {

            var x = document.getElementById("menu");

            // console.log(x.className);
            if (x.className == "show") {

                x.className = "hide";
            } else {
                x.className = "show";
            }
        }
    </script>


    <!-- Google tag (gtag.js) 
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NCY9YY4WXL"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-NCY9YY4WXL');
    </script>-->

    <base href="https://www.marie-marcy.com/">

</head>
<body>

<?php


function addBr($string)
{

    return str_replace('&lt;br /&gt;', "<br/>", $string);
}


if (isset($_POST['nom']) && isset($_POST['sujet']) && isset($_POST['email']) && isset($_POST['message']) && $_POST['sujet'] != "") {


    //$to = 'marie.marcy@orange.fr';
    $to = 'marie@marie-marcy.com';
    $subject = 'Contact Web - ' . htmlspecialchars($_POST['sujet']);
    $message = $_POST['message'];
    $entetes= 'From: '.$_POST['email'].'';
    $entetes.= 'Reply-To: '.$_POST['email'].'';
    $entetes.= 'X-Mailer: PHP/' . phpversion();
    // $message = addBr(htmlspecialchars(nl2br($_POST['message'])));
    // $headers = 'From: ' . $_POST["email"] . '' . "\r\n" .
    //     'Reply-To: ' . $_POST["email"] . '' . "\r\n" .
    //     'X-Mailer: PHP/' . phpversion() . "\r\n";

    // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
    // $headers .= 'MIME-Version: 1.0' . "\r\n";
    // $headers .= 'Content-type: text/html; charset=utf-8';

    //'=?UTF-8?B?' . base64_encode($subject) . '?='

    if( mail($to, $subject, $message, $entetes) ){
        echo 'Message envoyer';
    }else{
        echo 'Erreur ...';
    }


}
?>


<div id="menu-reponsive"><a href="https://www.marie-marcy.com/">Marie MARCY</a><span onclick="showMenu()">&#9776;</span></div>
<div id="corps">
    <div id="en-tete">
        <div id="flexhead">
            <div>
                <div id="titre">
                    <h1>Marie MARCY</h1>
                    <!--<picture>-->
                    <!--<source srcset="img/marie-marcy-mobile.png" media="(max-width: 700px)">-->
                    <!--<source srcset="img/marie-marcy.png">-->
                    <!--<img src="img/marie-marcy-mobile.png" alt="Marie Marcy">-->
                    <!--</picture>-->
                </div>
                <h2>Médium - Voyante - Numérologue</h2>
                <h3>
                    Réponse précise à toutes vos questions<br/>
                    Consultation en cabinet ou par téléphone<br/>
                    Grenoble – Crolles<br/>

                    Le Trèfle Blanc – 389 rue des Sources – 38920 Crolles<br/>
                    <a href="mailto:marie@marie-marcy.com"
                       style="color: black;  margin: auto; margin-top: 20px; text-decoration: none; width: 250px; font-size: 18px; line-height: 10%;">
                        <i class='material-icons' style="vertical-align: middle;">mail</i> marie@marie-marcy.com
                        <br/>
                    </a>
                    <a href="tel:0687244133"
                       style="color: black;  margin: auto; margin-top: 20px; text-decoration: none; width: 250px; font-size: larger; line-height: 10%;">
                        <i class='material-icons' style="vertical-align: middle;">smartphone</i> 06.87.24.41.33*
                        <br/>
                    </a>
                    <a href="tel:0476719957"
                       style="color: black;  margin: auto; margin-top: 20px; text-decoration: none; width: 250px; font-size: larger; line-height: 10%;">
                        <i class='material-icons' style="vertical-align: middle;">call</i> 04.76.71.99.57*
                        <br/>
                    </a>
                    <span class="alinea" style="display: block; text-decoration: none!important; line-height: 10%; margin-top: 5px;">* numéro non surtaxé</span>


                </h3>
            </div>
            <div>
                <div class="tooltip">
                    <img style="max-height: 300px; margin: 0; width: auto" src="img/marie-marcy-photo.png"
                         alt="marie marcy"/>
                    <span class="tooltiptext">Marie MARCY</span>
                </div>

            </div>
            <div>
                <img src="img/cabinet_new.jpg" alt="cabinet marie marcy" class="image img-resp img-special"
                     style="width: 225px; margin-top: 2px;margin-left: 7px; margin-bottom: 0px;"/>
                <img src="img/batiment_new.jpg" alt="batiment marie marcy" class="image img-resp img-special"
                     style="width: 225px; margin-left: 7px;"/>
            </div>

        </div>
    </div>
    <div id="en-tete2">
        <h3 style="margin: 0;">CABINET DE VOYANCE & MEDIUMNITE - GRENOBLE - CROLLES</h3>
    </div>

    <!--<audio autoplay>
        <source src="mp3/musique.mp3" type="audio/mpeg">
    </audio>-->

    <div id="start_stop_mp3" class='material-icons'>
        <span id="pm3_off">volume_off</span>
        <span id="pm3_on">volume_up</span>
    </div>

    <div ng-app="myApp">
        <div ng-view></div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>

    <script>

        var app = angular.module("myApp", ["ngRoute"]);
        app.config(function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true);

                  $routeProvider
                      .when("/", {
                          templateUrl: "presentation.php"
                      })
                      .when("/consultation", {
                          templateUrl: "consultation.php"
                      })
                      .when("/numerologie", {
                          templateUrl: "numerologie.php"
                      })
                      .when("/contact", {
                          templateUrl: "contact.php"
                      })
                      .when("/paiement", {
                          templateUrl: "paiement.php"
                      });


              });
    </script>


</div>

<?php 

if (!isset($_COOKIE['cookie_consent'])) {

echo '<div id="cookieConsentContainer" style="display:block">
        <p>Ce site Web utilise des cookies pour vous garantir la meilleure expérience sur notre site Web.</p> 
        <button id="acceptCookies">Accepter tout</button> <button id="declineCookies">Tout refuser</button>
    </div>';

}

if ( isset($_COOKIE['cookie_consent']) && $_COOKIE['cookie_consent'] == 'true' ) {

    echo " 
    <script async src='https://www.googletagmanager.com/gtag/js?id=G-NCY9YY4WXL'></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NCY9YY4WXL');
    </script>";
}

?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script>
    $(document).ready(
        () => {

            $('#acceptCookies').on('click','', function (){
                document.cookie = "cookie_consent=true";
                $('#cookieConsentContainer').css('display','none');
            })
            $('#declineCookies').on('click','', function (){
                document.cookie = "cookie_consent=false";
            })

            var audio = new Audio('mp3/musique.mp3');

            $('#pm3_off').on('click','', (event) => {
                audio.play();
                $('#pm3_off').hide();
                $('#pm3_on').show();
            } )
            $('#pm3_on').on('click','', (event) => {
                audio.pause();
                $('#pm3_off').show();
                $('#pm3_on').hide();
            } )
/*
            function audio_start(){
                clearInterval(interval);
                interval = null;
                $('#pm3_off').click();
            }
            var interval = setInterval( function (){ audio_start(); },3000);
*/
            
            // document.body.onclick = function(e) {
            //     audio.play();
            //     audio.volume = 0.8;
            // }
        }
    )
</script>


</body>
</html>
