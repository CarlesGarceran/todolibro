<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
include_once "../../src/Author.php";

define("FIND_QUERY", "SELECT
    COUNT(ISBN)
FROM
    Reviews
WHERE
    UserId = :userId AND ISBN = :inISBN;");

define("INSERT_QUERY", "INSERT INTO Reviews
VALUES (:ISBN, :UserId, :Comment, :Rating);");

try
{
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser();
    $userData = getUserData();

    if(!IsA::Review($userData))
        NOP_WRAP(new RuntimeError(400, "Bad request, data is not a review"));

    $sqlHandler =  getSQLHandler();
    
    $sqlStatement = $sqlHandler->prepare(FIND_QUERY);
    $sqlStatement->bindValue(":inISBN", $userData['ISBN']);
    $sqlStatement->bindValue(":userId", $user['id']);
    $sqlStatement->execute();

    $ex = $sqlStatement->fetchAll();

    if($ex[0][0] > 0)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to create a new review, already exists."));

    $sqlStatement = $sqlHandler->prepare(INSERT_QUERY);
    $sqlStatement->bindValue(":ISBN", $userData['ISBN']);
    $sqlStatement->bindValue(":UserId", $user['id']);
    $sqlStatement->bindValue(":Comment", $userData['Comment']);
    $sqlStatement->bindValue(":Rating", $userData['Rating']);
    $sqlStatement->execute();

    NOP_WRAP(["success" => true]);
}
catch(Exception $exception)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $exception->getMessage());
        NOP_WRAP($error);
    }
    else
    {
        die();
    }
}