<?php

class getAllTarifs {

    public static function g( $table = 'wp_cotisations_club' ):array {

        $array = array();

        $conn = new mysqli( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME );
        // Check connection
        if ($conn->connect_error) {
            array_push($array,die("Connection failed: " . $conn->connect_error));
        }

        $sql = "SELECT * FROM {$table}";
        $result = $conn->query($sql);

        if (!$result) {
            $message  = 'Invalid query: ' . mysqli_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        while($obj = $result->fetch_object()){
            array_push($array,$obj);
        }

        return $array;

    }

}


?>