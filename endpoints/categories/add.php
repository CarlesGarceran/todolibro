<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "INSERT INTO Categories (Name)
VALUES (:categoryName);
");

try {

    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    if($user == null)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    if(!(HasRole((int)$user['id'], 130)))
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    $userData = getUserData();
    $sqlHandler = getSQLHandler();

    if ($userData == null)
        NOP_WRAP(new RuntimeError(400, "Bad Request - No content found in body"));

    if (IsA::Category($userData) == false)
        NOP_WRAP(new RuntimeError(400, "Bad Request - Not a category instance"));

    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":categoryName", $userData['Name']);
    $sqlStatement->execute();

    NOP_WRAP([]);
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
