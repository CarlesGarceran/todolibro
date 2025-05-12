<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function()
{
    include "by/author/get.php";
});