<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function () {
    $arg = rand(0, 3);

    switch ($arg) {
        case 0:
            include "by/author/index.php";
            break;
        case 1:
            include "by/publisher/index.php";
        default:
            include "by/author/index.php";
            break;
    }
});
