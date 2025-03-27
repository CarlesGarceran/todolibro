<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include "../../src/User.php";

try
{
    INIT_BACKEND_CALL();
    session_start();

    if(!isset($_COOKIE['sessionId']))
        NOP_OBJ(new RuntimeError(400, "User not logged in"));

    $sessionId = $_COOKIE['sessionId'];

    if(!isset($_SESSION))
        NOP_OBJ(new RuntimeError(500, "Failed to initialize session"));

    if(!isset($_SESSION[$sessionId]))
        NOP_OBJ(new RuntimeError(500, "Failed to obtain user profile"));

    $tmp_user = fromJson($_SESSION[$sessionId]['User']);

    $dataArray = [];
    $dataArray['id'] = $tmp_user['id'];
    $dataArray['username'] =  $tmp_user['username'];
    $dataArray['email'] =  $tmp_user['email'];
    $dataArray['profile_picture'] = $tmp_user['profilePic'];
    
    NOP_OBJ($dataArray);
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}