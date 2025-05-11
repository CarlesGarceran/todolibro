<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("QUERY", "SELECT Categories.* FROM Category_has_Book JOIN Categories ON (Category_CategoryId = CategoryId)
WHERE (Book_ISBN = :ISBN);");

try {

    INIT_BACKEND_CALL();
    session_start();
    $sqlHandler = getSQLHandler();

    if (isset($_GET['isbn'])) {

        $arg = [];

        $sqlStatement = $sqlHandler->prepare(QUERY);
        $sqlStatement->bindValue(":ISBN", $_GET['isbn']);
        $sqlStatement->execute();

        $categories = $sqlStatement->fetchAll();

        $arg['ISBN'] = $_GET['isbn'];
        $arg['categories'] = $categories;

        NOP_WRAP($arg);
    } else {
        $sqlStatement = $sqlHandler->prepare("SELECT ISBN as ISBN FROM Books;");
        $sqlStatement->execute();

        $isbns = $sqlStatement->fetchAll();

        $books = [];

        foreach ($isbns as $isbn) {
            $arg = [];

            $sqlStatement = $sqlHandler->prepare(QUERY);
            $sqlStatement->bindValue(":ISBN", $isbn['ISBN']);
            $sqlStatement->execute();

            $categories = $sqlStatement->fetchAll();

            $arg['isbn'] = $isbn['ISBN'];
            $arg['categories'] = $categories;

            array_push($books, $arg);
        }

        NOP_WRAP($books);
    }
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
