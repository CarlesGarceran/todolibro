<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "UPDATE Authors SET Name = :name, Image = :image WHERE AuthorId = :authorId;");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser();

    if(!HasRole($user['id'], 130))
        NOP_WRAP(new RuntimeError(401, "Unauthorized access."));

    if(!isset($_GET['id']))
        NOP_WRAP(new RuntimeError(400, "Bad request, missing AuthorId."));

    $body = getUserData();
    $id =  (int)$_GET['id'];

    if(!IsA::Author($body))
        NOP_WRAP(new RuntimeError(400, "Bad request, body is not an Author."));

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":name", $body['Name']);
    $statement->bindValue(":image", $body['Image']);
    $statement->bindValue(":authorId", $id);
    $statement->execute();

    $authors = $statement->fetchAll();
    NOP_WRAP($authors);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
