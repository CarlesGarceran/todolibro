<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("DROP_QUERY", "DELETE FROM Category_has_Book WHERE Book_ISBN = :ISBN");

define("QUERY", "INSERT INTO Category_has_Book
VALUES (:CategoryId, :ISBN);");

try {

    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    if ($user == null)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    if (!(HasRole((int)$user['id'], 130)))
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    $userData = getUserData();

    if ($userData == null)
        NOP_WRAP(new RuntimeError(400, "Bad Request - No content found in body"));

    if (!isset($userData['isbn']))
        NOP_WRAP(new RuntimeError(400, "Bad Request - Missing ISBN"));

    if (is_array($userData['categories']) && IsA::Category($userData['categories'][0]) == false)
        NOP_WRAP(new RuntimeError(400, "Bad Request - Categories aren't categories"));

    invoke(function ($isbn) {
        $sqlHandler = getSQLHandler();
        $sqlStatement = $sqlHandler->prepare(DROP_QUERY);
        $sqlStatement->bindValue(":ISBN", $isbn);

        $sqlStatement->execute();
    }, $userData['isbn']);

    invoke(function ($categories, $isbn) {

        foreach ($categories as $category) {
            $sqlHandler = getSQLHandler();
            $sqlStatement = $sqlHandler->prepare(QUERY);
            $sqlStatement->bindValue(":CategoryId", $category['CategoryId']);
            $sqlStatement->bindValue(":ISBN", $isbn);
            $sqlStatement->execute();
        }
    }, $userData['categories'], $userData['isbn']);

    NOP_WRAP([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
