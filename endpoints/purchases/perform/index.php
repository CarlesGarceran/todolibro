<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onPOST(function()
{
    include "post.php";
});