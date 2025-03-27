<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "INSERT INTO Log(userId, Action, Time) VALUES (:userId, :action, NOW());");

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


    $userData = fromJson(file_get_contents("php://input"), true);

    $action = $userData['payload'];
    $tmp_user = fromJson($_SESSION[$sessionId]['User']);
    $userId =  (int)$tmp_user['id'];

    $sqlHandler = getSQLHandler();

    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":userId", $userId, PDO::PARAM_INT);
    $sqlStatement->bindValue(":action", $action);

    $sqlStatement->execute();

    NOP_OBJ([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}

?>