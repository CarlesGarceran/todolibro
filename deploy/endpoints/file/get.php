<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

try {
    CORS();

    function NOP_JSON(mixed $arg)
    {
        JSON_CALL();
        NOP_WRAP($arg);
    }

    function sanetizeName(string $arg): string
    {
        return str_replace('..', "", $arg);
    }

    function setFileExtension(string $arg)
    {
        if (strpos($arg, ".") === false)
            header("Content-Type", "plain/text");

        $fileExt = substr($arg, strpos($arg, ".") + 1);

        switch ($fileExt) {
            case "png":
                header("Content-Type", "image/png");
                break;
            case "jpg":
            case "jpeg":
                header("Content-Type", "image/jpg");
                break;
            case "bmp":
                header("Content-Type", "image/bmp");
                break;
            case "gif":
                header("Content-Type", "image/gif");
                break;
            default:
                header("Content-Type", "plain/text");
                break;
        }
    }

    if (!isset($_GET['name']))
        return NOP_JSON(new RuntimeError(400, "Bad request, missing file name"));

    $sanetizedName = sanetizeName($_GET['name']);

    $assetsPath = getAssetsPath();
    $resPath = $assetsPath . "/" . $sanetizedName;

    if (!file_exists($resPath))
        return NOP_JSON(new RuntimeError(500, "File not found"));

    if(is_dir($resPath))
        return NOP_JSON(new RuntimeError(500, "Inputted file its not a file, its a directory."));

    setFileExtension($sanetizedName);

    header('Content-Disposition: inline; filename="' . $resPath . '"');
    readfile($resPath);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
