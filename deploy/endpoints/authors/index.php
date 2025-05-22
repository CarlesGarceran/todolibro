<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function() {
    include "get.php";
    return;
});

onPOST(function()
{
    include "post.php";
});

onDELETE(function()
{
    include "delete.php";
});

onPUT(function()
{
    include "put.php";
});