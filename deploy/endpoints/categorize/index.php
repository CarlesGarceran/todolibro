<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function()
{
    include "get.php";
    return;
});

onPOST(function() {
    include "modify.php";
    return;
});