<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";

define("QUERY", "SELECT Books.*
FROM Books
    JOIN Sale_has_Books shb ON (Books.ISBN = shb.ISBN)
GROUP BY shb.ISBN
ORDER BY shb.ISBN ASC
LIMIT 20;");

try {
    INIT_BACKEND_CALL();

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);

    $statement->execute();

    $libros = $statement->fetchAll();
    NOP_WRAP($libros);
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
