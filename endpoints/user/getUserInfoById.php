<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include "../../src/User.php";

define("QUERY", "SELECT userId, Name, ProfilePicture FROM `Users` WHERE `userId` = :userId;");

try
{
    INIT_BACKEND_CALL();

    if(!isset($_GET['userId']))
        NOP_WRAP(new RuntimeError(400, "Bad request, missing userId."));

    $dataArray = [];
    $sqlHandler = getSQLHandler();

    $sqlQuery = $sqlHandler->prepare(QUERY);
    $sqlQuery->bindValue(":userId", $_GET['userId']);

    $sqlQuery->execute();

    $data = $sqlQuery->fetchAll();

    $dataArray = $data[0];
    $dataArray['Email'] = "";
    $dataArray['PasswordHash'] = "";

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