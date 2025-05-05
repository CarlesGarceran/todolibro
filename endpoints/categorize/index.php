<?php

include "../../functions.php";

INIT_BACKEND_CALL();

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