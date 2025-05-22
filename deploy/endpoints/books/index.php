<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function() {
    include "getAllLibros.php";
    return;
});

onPUT(function() {
    include "update.php";
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