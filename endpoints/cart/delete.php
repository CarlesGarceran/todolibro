<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "DELETE FROM Cart 
WHERE (Users_userId = :userId AND Books_ISBN = :ISBN);");

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
    $sqlStatement->bindValue(":ISBN", $userData['Books_ISBN']);

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
