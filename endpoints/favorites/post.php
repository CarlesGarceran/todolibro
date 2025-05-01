<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "INSERT INTO Favorites
VALUES (:userId, :ISBN);");

try {
    INIT_BACKEND_CALL();
    session_start();
    
    $user = GetUser(true);
    $userData = getUserData();

    if(!IsA::Libro($userData))
        NOP_WRAP(new RuntimeError(400, "Bad Request, body is not a libro."));

    $sqlHandler = getSQLHandler();

    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":userId", $user['id']);
    $statement->bindValue(":ISBN", $userData['ISBN']);

    try 
    {
        $statement->execute();
    } 
    catch (PDOException $ex) 
    {
        NOP_WRAP(new RuntimeError(500, "Failed to perform query"));
    }

    $data = $statement->fetchAll();

    NOP_WRAP($data);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
