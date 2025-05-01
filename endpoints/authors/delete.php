<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "DELETE FROM Authors WHERE (AuthorId = :AuthorId);");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser();

    if(!HasRole($user['id'], 130))
        NOP_WRAP(new RuntimeError(401, "Unauthorized access"));

    $userId = $_GET['id'];

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":AuthorId", $userId);
    $statement->execute();

    $authors = $statement->fetchAll();
    NOP_WRAP($authors);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
