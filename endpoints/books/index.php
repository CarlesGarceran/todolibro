<?php

include "../../functions.php";

INIT_BACKEND_CALL();

if($_SERVER['REQUEST_METHOD'] === 'PUT')
{
    include "update.php";
    return;
}

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    include "add.php";
    return;
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE')
{
    include "delete.php";
    return;
}