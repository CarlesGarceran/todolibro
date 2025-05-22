<?php

include_once "../functions.php";
include_once "../src/RuntimeError.php";

try
{
    INIT_BACKEND_CALL();
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError($error_code, $ex->getMessage());
        $var = toJson($error);
        echo $var;
        die();
    }
}