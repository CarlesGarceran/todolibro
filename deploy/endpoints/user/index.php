<?php

include "../../functions.php";

INIT_BACKEND_CALL();

onGET(function() {
    include "getUserInfo.php";
});

onPUT(function() {
    include "putUserInfo.php";
});