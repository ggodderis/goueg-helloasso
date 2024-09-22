<?php

class getSession {

    public static function g() :array {

        if( !isset($_SESSION["session_id"]) ){
            $_SESSION["session_id"] = uniqid();
        }

        return [$_SESSION["session_id"]];
    }
    
}

?>