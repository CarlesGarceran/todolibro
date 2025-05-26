<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
include_once "../../src/Author.php";

define("QUERY", "SELECT * FROM Authors WHERE (AuthorId = :in_authorid);");

try
{
    INIT_BACKEND_CALL();

    if(!isset($_GET['authorId']))
        NOP_WRAP(new RuntimeError(400, "Request does not contain an id of an author."));

    $authorId = (int)$_GET['authorId'];

    $sqlHandler =  getSQLHandler();
    
    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":in_authorid", $authorId);
    $sqlStatement->execute();

    $ex = $sqlStatement->fetch();

    $auth = new Author((int)$ex['AuthorId'], $ex['Name'], $ex['Image']);

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