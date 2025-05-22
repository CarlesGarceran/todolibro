<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

try
{
    INIT_BACKEND_CALL();

    $arg = [];
    $arg['payload'] = is_in_testing_site();
    
    echo toJson($arg);
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}
