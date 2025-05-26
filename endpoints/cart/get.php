<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "SELECT * FROM Cart WHERE Users_userId = :userId;");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":userId", $user['id']);
    $statement->execute();

    $categories = $statement->fetchAll();
    NOP_WRAP($categories);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_WRAP($error);
    }
}
