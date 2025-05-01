<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function()
{
    include "get.php";
});

onPOST(function()
{
    include "perform/post.php";
});