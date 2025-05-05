<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onPUT(function()
{
    include "force_update.php";
});