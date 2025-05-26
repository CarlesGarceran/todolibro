<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "SELECT * FROM Categories;");

try {
    INIT_BACKEND_CALL();

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->execute();

    $categories = $statement->fetchAll();
    NOP_WRAP($categories);
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
