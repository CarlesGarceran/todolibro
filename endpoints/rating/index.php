<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function()
{
    include "get.php";
});

onPUT(function()
{
    include "put.php";
});