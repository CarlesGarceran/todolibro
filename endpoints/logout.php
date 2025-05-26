<?php

include_once "../functions.php";
include_once "../src/RuntimeError.php";

try
{
    INIT_BACKEND_CALL();
    session_start();

    setcookie(
        "sessionId",
        "",
        time() - 3600,
        "/"
    );

    $arg = [];
    echo toJson($arg);

    session_destroy();
    exit();
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_OBJ($error);
    }
}