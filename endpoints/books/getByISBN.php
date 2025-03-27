<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";

define("QUERY", "SELECT * FROM Books WHERE (ISBN = :in_isbn);");

try
{
    INIT_BACKEND_CALL();

    $userData = fromJson(file_get_contents("php://input"), true);

    $sqlHandler =  getSQLHandler();
    
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        $var = toJson($error);
        echo $var;
        die();
    }
}