<?php

include_once "../../../functions.php";

INIT_BACKEND_CALL();

onPOST(function()
{
    include "post.php";
});