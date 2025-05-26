<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
include_once "../../src/Publisher.php";

define("QUERY", "SELECT * FROM Publishers WHERE (PublisherId = :in_publisherid);");

try
{
    INIT_BACKEND_CALL();

    if(!isset($_GET['publisherId']))
        NOP_WRAP(new RuntimeError(400, "Request does not contain an id of a publisher."));

    $publisherId = (int)$_GET['publisherId'];

    $sqlHandler =  getSQLHandler();
    
    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":in_publisherid", $publisherId);
    $sqlStatement->execute();

    $ex = $sqlStatement->fetch();

    $auth = new Publisher((int)$ex['PublisherId'], $ex['Name'], $ex['Image']);

    NOP_WRAP($auth);
}
catch(Exception $exception)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_WRAP($error);
    }
}