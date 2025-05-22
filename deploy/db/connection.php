<?php

// create sql db connection
function gethandler(): PDO
{
    require_once $_SERVER['DOCUMENT_ROOT'] . "/src/config.php";
    require_once $_SERVER['DOCUMENT_ROOT'] . "/db/configwrap.php";
    
    try {
        if (isset($sql_state) && $sql_state == true) {
            $host = "mysql:host=" . getDBHostName() . ";dbname=" . getDBName();
            $sql_connection = new PDO($host,  getDBUsername(),  getDBPassword());
            return $sql_connection;
        }
    } catch (Exception $ex) {
        if (!is_in_production()) {
            $error = new RuntimeError(500, $ex->getMessage());
            $var = toJson($error);
            echo $var;
            die();
        }
    }

    return null;
}
