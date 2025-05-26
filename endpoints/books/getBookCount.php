<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "SELECT COUNT(ISBN) FROM Books;");

try {
    INIT_BACKEND_CALL();

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->execute();

    $libros = $statement->fetch();

    NOP_WRAP(["payload" => $libros[0]]);
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
