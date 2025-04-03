<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

try {
    INIT_BACKEND_CALL();

    $userData = null;

    if(file_get_contents("php://input") != null)
        $userData = fromJson(file_get_contents("php://input"), true);

    if(!isset($_GET['filterType']))
        NOP_WRAP(new RuntimeError(500, "Missing filterType"));

    $filterType = (string)$_GET['filterType'];
    $filterContents = (string)$userData['content'];

    $sqlHandler = getSQLHandler();
    $query = "";
    switch ($filterType) {
        case 'ISBN':
            $query = "SELECT * FROM Books WHERE Books.ISBN LIKE :filterContent;";
            break;
        case 'Autor':
            $query = "SELECT * FROM Books JOIN Authors ON (Books.Author = Authors.AuthorId) WHERE Authors.Name LIKE :filterContent;";
            break;
        case 'Nombre':
            $query = "SELECT * FROM Books WHERE Books.Name LIKE :filterContent;";
            break;
        case 'Editorial':
            $query = "SELECT * FROM Books JOIN Publishers ON (Books.Publisher = Publishers.PublisherId) WHERE Publishers.Name LIKE :filterContent;";
            break;
        default:
            NOP_WRAP(new RuntimeError(404, "No se pudo encontrar el tipo de filtro"));
            break;
    }

    $sqlStatement = $sqlHandler->prepare($query);
    $sqlStatement->bindValue(":filterContent", "%" . $filterContents . "%");

    $sqlStatement->execute();
    $libros = $sqlStatement->fetchAll();

    NOP_WRAP($libros);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}