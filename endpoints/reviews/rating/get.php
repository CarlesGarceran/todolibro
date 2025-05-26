<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Author.php";

define("QUERY", "SELECT AVG(`Rating`) FROM `Reviews` WHERE `ISBN` = :inISBN;");

try
{
    INIT_BACKEND_CALL();

    if(!isset($_GET['isbn']))
        NOP_WRAP(new RuntimeError(400, "Request does not contain an isbn."));

    $isbn = (int)$_GET['isbn'];

    $sqlHandler =  getSQLHandler();
    
    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":inISBN", $isbn);
    $sqlStatement->execute();

    $ex = $sqlStatement->fetchAll();

    $auth = [];
    $auth['rating'] = $ex[0][0];

    NOP_WRAP($auth);
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
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_WRAP($error);
    }
}