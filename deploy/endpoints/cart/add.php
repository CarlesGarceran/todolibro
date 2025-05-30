<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "INSERT INTO Cart (Users_userId, Books_ISBN, Quantity)
VALUES (:userId, :bookIsbn, :quantity);
");

try {

    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    if($user == null)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    $userData = getUserData();
    $sqlHandler = getSQLHandler();

    if ($userData == null)
        NOP_WRAP(new RuntimeError(400, "Bad Request - No content found in body"));

    if (IsA::CartEntry($userData) == false)
        NOP_WRAP(new RuntimeError(400, "Bad Request - Not a cart entry instance"));

    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":userId", $user['id']);
    $sqlStatement->bindValue(":bookIsbn", $userData['Books_ISBN']);
    $sqlStatement->bindValue(":quantity", $userData['Quantity']);
    $sqlStatement->execute();

    NOP_WRAP([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
