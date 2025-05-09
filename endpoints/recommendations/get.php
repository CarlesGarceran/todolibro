<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";

define("GET_SALES", "SELECT * FROM Sales WHERE UserId = :userId;");
define("GET_SALE_BOOKS", "SELECT * FROM Sale_has_Books WHERE SaleId IN :saleId");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);
    
    $sales = invoke(function ($user) {
        $sqlHandler = getSQLHandler();
        $sqlStatement = $sqlHandler->prepare(GET_SALES);
        $sqlStatement->bindValue(":userId", $user['id']);

        $sqlStatement->execute();

        return $sqlStatement->fetchAll();
    }, $user);
    
    $saleBooks = invoke(function($sales)
    {
        $saleBooks = [];
        $sqlHandler = getSQLHandler();
        foreach ($sales as $sale) 
        {
            $statement = $sqlHandler->prepare(GET_SALE_BOOKS);
            $statement->bindValue(":saleId", $sale['SaleId']);
            $statement->execute();

            $books = $statement->fetchAll();

            foreach($books as $book)
            {
                array_push($saleBooks, $book);
            }
        }

        return $saleBooks;
    }, $sales);

    NOP_WRAP($sales);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
