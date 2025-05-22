<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "SELECT * FROM Books WHERE Publisher = :publisher;");

try {
    INIT_BACKEND_CALL();

    if(!isset($_GET['publisherId']))
        NOP_WRAP(new RuntimeError(400, "Bad request, missing publisherId"));

    $publisherId = $_GET['publisherId'];

    $sqlHandler = getSQLHandler();
    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":publisher", $publisherId);
    $statement->execute();

    $libros = $statement->fetchAll();
    NOP_WRAP($libros);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
