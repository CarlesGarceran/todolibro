<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
include_once "../../src/Author.php";

define("QUERY", "SELECT * FROM `Reviews` WHERE `ISBN` = :inISBN ORDER BY Timestamp;");

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

    NOP_WRAP($ex);
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