<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include "../../src/User.php";

define("QUERY", "SELECT 
userId as Id, 
Name as username 
FROM Users 
WHERE (userId = :userId);
");

try
{
    INIT_BACKEND_CALL();
    
    if(!isset($_GET['userId']))
        NOP_WRAP(new RuntimeError(400, "Failed to get userId"));

    $id = $_GET['userId'];

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);

    $statement->bindValue(":userId", $id);
    $statement->execute();

    $tmp_user = $statement->fetchAll();

    if(sizeof($tmp_user) > 0)
    {
        $tmp_user = $tmp_user[0];
    }
    else
    {
        NOP_WRAP(new RuntimeError(200, "Query returned no args"));
    }

    $dataArray = [];
    $dataArray['id'] = $tmp_user['Id'];
    $dataArray['username'] =  $tmp_user['username'];
    
    NOP_WRAP($dataArray);
}
catch(Exception $ex)
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