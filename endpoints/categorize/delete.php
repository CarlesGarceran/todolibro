<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "DELETE FROM Categories_has_Book WHERE Category_CategoryId = :categoryId;");

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
    $sqlStatement->bindValue(":categoryId", $userData['CategoryId']);

    $sqlStatement->execute();

    NOP_WRAP([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
