<?php

//namespace App;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class gouegApp {


    public function __construct() {
        add_action('admin_menu', array(&$this,'create_admin_menu') );
        add_action('rest_api_init', array(&$this,'create_rest_route') );
    }

/**
 *  Création du menu dans l'admin et affichage de la div pour React
 */
    public function create_admin_menu(){
        self::delete_all_files();
        //self::create_upload_dir();
        add_menu_page( 'emails', 'Emails', 'create_posts', 'envoie_emails',
        array(&$this,'phpmailer_admin_page'), 'dashicons-email', 100 );
    }

    public function create_upload_dir(){
        if( ! is_dir(DIR_ROOT_UPLOAD) ){
            mkdir(DIR_ROOT_UPLOAD, 777);
        }
    }

/**
 *  Chargement du div cible pour l'appli react
 */
    public function phpmailer_admin_page(){
        require_once DIR_ROOT . 'templates/app.php';
    }

/**
 * Destruction de tous les fichiers du dossier ./images
 */
    public function delete_all_files(){
        array_map('unlink', array_filter((array) glob(DIR_ROOT_UPLOAD."*")));
    }

/**
 * Création de la Rest Route pour communication avec React
 */
    public function create_rest_route(){

        register_rest_route('goueg-phpmailer/v1', '/set_datas', [
            'methods' => ['POST'] ,
            'callback' => [$this,'goueg_set_datas'],
            'permission_callback' => function () {
            return is_user_logged_in();
          },
      ]);

    }

    public function goueg_set_datas( WP_REST_REQUEST $request ){

        $files = $request->get_file_params();
        $params = $request->get_params();

        $mode = filter_var($params['mode'], FILTER_VALIDATE_BOOLEAN);
        $year = filter_var($params['year'], FILTER_VALIDATE_BOOLEAN);

        $array_routes_files = self::load_files( $files );
        $array_liste_emails = self::get_liste_emails( $params['role'], $year );

        $objet = strip_tags($params['objet']);
        $message = $params['message'];


        if( $mode ){
            //return json_encode( 'test' );
            //self::get_template_html('role','my super message')
            //return json_encode( ['class php gouegApp', $mode, $objet, $message, $array_liste_emails, $array_routes_files ] );
            return json_encode( [$year,$array_liste_emails] );
            exit;
            //$array_liste_emails = ['bern.blanchet@wanadoo.fr'];
        }

        try {
            //Server settings
            /*
            $mail = new PHPMailer();
            $mail->SMTPDebug = SMTP::DEBUG_OFF;                      //Enable verbose debug output
            $mail->isSMTP();                                          //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                 //Enable SMTP authentication
            $mail->Username   = 'goueg4@gmail.com';                   //SMTP username
            $mail->Password   = GOOGLE_PASSWORD;                //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;          //Enable implicit TLS encryption
            $mail->Port       = 465;                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            */

            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = 'bulk.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 587;
            $mail->Username = 'api';
            $mail->Password = 'f142ff32f3a88b720240e4466e523844'; 
            // Recipients
            $mail->addReplyTo('info@club-montagne.net', 'Information');
            $mail->setFrom('webmaster@club-montagne.net', 'Infos Grimpeurs des Alpes');

            $mail->addAddress('webmaster@club-montagne.net', 'Infos Grimpeurs des Alpes');
            foreach( $array_liste_emails as $destinataire ):
                $mail->AddBCC($destinataire,'');
            endforeach;

            //Attachments
            foreach($array_routes_files as $file ):
                $mail->addAttachment( DIR_ROOT_UPLOAD.$file, $file );
            endforeach;

            //Content
            $mail->isHTML(true);
            //$mail->Subject = '=?UTF-8?B?' . base64_encode('Mail infos Adhérents'). '?=';
            $mail->Subject = $objet;
           // $mail->Body    = $message;
            $mail->Body    = self::get_template_html($params['role'],$message);
            $mail->CharSet = 'UTF-8';
            $mail->SetLanguage( "fr", "phpmailer/language" );
            $mail->Encoding = "base64";

            $mail->send();

            return json_encode( 'ok' );

        } catch (Exception $e) {

            return json_encode( 'error' );
        }

    }

/**
 * retourne le template html du mail
 */
    private function get_template_html( $role = '', $message = '' ):string {

        $template = file_get_contents(DIR_ROOT.'/templates/information.html');

        if( $role == 'gda_inscript_escalade' ) {
            $template = str_replace('[TYPE_EMAIL]', 'Information escalade' , $template );
        }else{
            $template = str_replace('[TYPE_EMAIL]', 'Information générale' , $template );
        }

        $template = str_replace('[SITE_URL]', get_site_url() , $template );
        $template = str_replace('[MESSAGE]', $message , $template );

        return $template;

    }

/**
 * retourne la liste des emails
 * return @param array $liste liste des emails
 */
    private function get_liste_emails( $role = '', $year = false ):array {

        $liste = [];

        if( empty($role) ){
             return $liste;
             exit;
        }

        $my_season = self::annee_saison_en_cours();
        $last_season = ( $year ? $my_season-1 : $my_season );

        if( $role == 'gda_inscript_escalade' ){

            $args = array(
                'role' => 'subscriber',
                'posts_per_page' => -1,
                'orderby' => 'meta_value',
                'meta_key' => 'last_name',
                'meta_query' => array(
                    'relation' => 'AND',
                        array(
                            'key' => 'gda_saison',
                            'value' => array($last_season,$my_season),
                            'type'    => 'numeric',
                            'compare' => 'BETWEEN',
                            //'value' => self::annee_saison_en_cours(),
                            //'compare' => '>='
                        ),
                        array(
                            'key' => 'gda_inscript_escalade',
                            'value' => 'oui',
                            'compare' => '='
                        ),
                        array(
                            'key' => 'gda_abo_email_escalade',
                            'value' => 'oui',
                            'compare' => '='
                        )
                      )
            );

        }else{

            $args = array(
                'role' => $role,
                'posts_per_page' => -1,
                'orderby' => 'meta_value',
                'meta_key' => 'last_name',
                'meta_query' => array(
                    'relation' => 'AND',
                        array(
                            'key' => 'gda_saison',
                            'value' => array($last_season,$my_season),
                            'compare' => 'BETWEEN'
                        ),
                        array(
                            'key' => 'gda_abo_email_general',
                            'value' => 'oui',
                            'compare' => '='
                        )
                    )
            );

        }

        $wp_user_query = new WP_User_Query($args);
        $authors = $wp_user_query->get_results();

        if( !empty($authors) ){

            foreach($authors as $author):
               /**
                 * Si l'email ne contient pas @defautgda.fr
                 * on l'ajoute à la liste ...
                 */
                if( empty( strpos($author->data->user_email,"@defautgda.fr") ) ):
                    array_push( $liste, $author->data->user_email );
                endif;
                
            endforeach;

        }

        return $liste;
    }

/**
 * Load des fichiers si il y en a..
 * return @param array $array_root_files liste des routes des fichiers
 */
    private function load_files( $liste = [] ):array {

        $array_root_files = [];

        if( count($liste) > 0 ){

            foreach( $liste as $key ):

                if( move_uploaded_file( $key['tmp_name'], DIR_ROOT_UPLOAD.basename($key['name']) ) ){
                    //array_push( $array_root_files,[ DIR_ROOT_UPLOAD.basename($key['name']) , basename($key['name']) ] );
                    array_push( $array_root_files,$key['name']);
                }

            endforeach;

        }

        return $array_root_files;
    }

/**
* Retourne l'année pour la zone compte et l'affichage de la saison en cours
* à savoir que l'année d'adhésion commence le 1er septembre
*/
  private function annee_saison_en_cours():string {

    $date = new DateTime('now');
    $mois = intval ( (clone $date)->format('m') );

    if( $mois >= 9 && $mois <= 12 ){

      $annee = (clone $date)->modify('next year')->format('Y');

    }else{
      $annee = (clone $date)->format('Y');
    }

    return $annee;
  }


}
