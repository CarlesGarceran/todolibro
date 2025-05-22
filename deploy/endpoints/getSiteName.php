<?php

include_once "../functions.php";
include_once "../src/RuntimeError.php";

try
{
    INIT_BACKEND_CALL();

    $array = [];
    $array["payload"] = getPageName();

    echo toJson($array);
    exit();
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError($error_code, $ex->getMessage());
        NOP_OBJ($error);
    }
}