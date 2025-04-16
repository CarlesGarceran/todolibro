<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "SELECT * FROM Authors;");

try {
    INIT_BACKEND_CALL();

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->execute();

    $authors = $statement->fetchAll();
    NOP_WRAP($authors);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
