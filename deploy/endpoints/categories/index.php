<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function() {
    include "get.php";
    return;
});

onPOST(function() {
    include "add.php";
    return;
});

onDELETE(function() {
    include "delete.php";
    return;
});

onPUT(function() {
    include "update.php";
    return;
});