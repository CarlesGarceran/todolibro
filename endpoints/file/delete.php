<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

try {
    INIT_BACKEND_CALL();
    session_start();

    function sanetizeName(string $arg): string
    {
        $newStr = $arg;
        $newStr = str_replace(" ", "-", $newStr);
        $newStr = str_replace("..", "", $newStr);
        $newStr = str_replace(".php", "", $newStr);
        $newStr = str_replace(".js", "", $newStr);
        $newStr = str_replace(".py", "", $newStr);

        return $newStr;
    }

    function getUserId($fileName, string $numLen)
    {
        return substr($fileName, strrpos($fileName, "/")+1, strlen($numLen));
    }

    $user = GetUser(true);

    $userId = $user['id'];

    $userData = getUserData();

    $userFile = getAssetsPath() . "/" . sanetizeName($userData['fileName']);

    if(!file_exists($userFile))
        NOP_WRAP(new RuntimeError(500, "File not found."));

    if(getUserId($userData['fileName'], $userId) != $userId)
        NOP_WRAP(new RuntimeError(500, "Attempt to remove a file not owned by user."));

    unlink($userFile);

    NOP_WRAP([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_WRAP($error);
    }
}
