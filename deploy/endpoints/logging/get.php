<?php

include_once "../shared_funcs.php";
include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("GET_ALL_LOGS", "SELECT * FROM Log ORDER BY Time DESC;");

try {
    INIT_BACKEND_CALL();
    session_start();

    if(!isset($_COOKIE['sessionId']))
        NOP_OBJ(new RuntimeError(400, "User not logged in"));

    $sessionId = $_COOKIE['sessionId'];

    if(!isset($_SESSION))
        NOP_OBJ(new RuntimeError(500, "Failed to initialize session"));

    if(!isset($_SESSION[$sessionId]))
        NOP_OBJ(new RuntimeError(500, "Failed to obtain user data"));

    $tmp_user = fromJson($_SESSION[$sessionId]['User']);
    $userId =  (int)$tmp_user['id'];

    if(!HasRole($userId, 254))
        NOP_OBJ(new RuntimeError(404, "Unauthorized access, insufficient permissons"));

    $handler = getSQLHandler();
    $statement = $handler->prepare(GET_ALL_LOGS);
    $statement->execute();

    $vardmp = [];

    foreach ($statement->fetchAll() as $key => $value) {
        if($value != null)
        {
            array_push($vardmp, $value);
        }
    }


    NOP_OBJ($vardmp);

} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}

?>