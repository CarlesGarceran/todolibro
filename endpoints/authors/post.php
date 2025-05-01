<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "INSERT INTO Authors (Name, Image) VALUES (:Name, :Image);");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser();

    if(!HasRole($user['id'], 130))
        NOP_WRAP(new RuntimeError(401, "Unauthorized access"));

    $body = getUserData();

    if(!IsA::Author($body))
        NOP_WRAP(new RuntimeError(400, "Bad request, body is not an Author"));

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":Name", $body['Name']);
    $statement->bindValue(":Image", $body['Image']);
    $statement->execute();

    $authors = $statement->fetchAll();
    NOP_WRAP($authors);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
