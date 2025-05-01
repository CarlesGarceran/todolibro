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

    $user = GetUser(true);

    $userId = $user['id'];

    if(!isset($_FILES['file']))
        NOP_WRAP(new RuntimeError(400, "Bad request, missing file."));
    
    if($_FILES['file']['error'] != UPLOAD_ERR_OK)
        NOP_WRAP(new RuntimeError(400, "Failed to upload file to server."));

    $assetsPath = getAssetsPath();
    $uploadPath = "";

    if(!isset($_GET['admin']))
    {    
        $uploadPath .= "/" . "uploads/";
    }
    else
    {
        if(isset($_GET['path']))
        {
            $uploadPath .= "/" . $_GET['path'];
        }
    }
    
    $fileName = basename($userId . "_" . time() . "-" . sanetizeName($_FILES['file']['name']));
    $uploadFile = $uploadPath . $fileName;

    if(!move_uploaded_file($_FILES['file']['tmp_name'], getAssetsPath() . $uploadFile))
        NOP_WRAP(new RuntimeError(500, "Failed to move uploaded file."));

    $isHttps = 
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
        $_SERVER['SERVER_PORT'] == 443 ||
        (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    

    NOP_WRAP(["fileName" => ($isHttps ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . "/endpoints/file/?name=" . substr($uploadPath, 1) . $fileName]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
