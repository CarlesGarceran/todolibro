<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";
include_once "../shared_funcs.php";

define("QUERY", "INSERT INTO Log(userId, Action, Time) VALUES (:userId, :action, NOW());");

try {
    INIT_BACKEND_CALL();
    session_start();

    $tmp_user = GetUser(false);
    $userData = fromJson(file_get_contents("php://input"), true);

    $action = $userData['payload'];
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
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_OBJ($error);
    }
}

?>