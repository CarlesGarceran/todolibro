<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";

define("QUERY", "SELECT Books.*
FROM Books
    JOIN Sale_has_Books shb ON (Books.ISBN = shb.ISBN)
WHERE Books.Author = :author
GROUP BY shb.ISBN
ORDER BY COUNT(shb.ISBN) ASC
LIMIT 20;
");

try {
    INIT_BACKEND_CALL();

    if(!isset($_GET['authorId']))
        NOP_WRAP(new RuntimeError(400, "Bad request, missing authorId"));

    $authorId = $_GET['authorId'];

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":author", $authorId);
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
