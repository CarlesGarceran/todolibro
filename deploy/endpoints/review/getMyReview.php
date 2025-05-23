<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
include_once "../../src/Author.php";

define("QUERY", "SELECT * FROM `Reviews` WHERE `ISBN` = :inISBN AND `UserId` = :inUserId;");

try
{
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser();

    if(!isset($_GET['isbn']))
        NOP_WRAP(new RuntimeError(400, "Request does not contain an isbn."));

    $isbn = (int)$_GET['isbn'];

    $sqlHandler =  getSQLHandler();
    
    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":inISBN", $isbn);
    $sqlStatement->bindValue(":inUserId", $user['id']);
    $sqlStatement->execute();

    $ex = $sqlStatement->fetch();

    if($ex == false)
        NOP_WRAP(new RuntimeError(500), "Failed to obtain the review");

    NOP_WRAP($ex);
}
catch(Exception $exception)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $exception->getMessage());
        $var = toJson($error);
        echo $var;
        die();
    }
    else
    {
        die();
    }
}