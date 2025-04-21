<?php

include $_SERVER['DOCUMENT_ROOT'] . "functions.php";

INIT_BACKEND_CALL();

onGET(function()
{
    include "get.php";
});