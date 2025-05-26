<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";

define("GET_SALES", "SELECT * FROM Sales WHERE UserId = :userId;");
define("GET_SALES_BOOKS", "SELECT ISBN FROM Sale_has_Books WHERE SaleId = :saleId;");
define("GET_BOOKS", "SELECT * FROM Books WHERE ISBN = :ISBN;");

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

    $finalData = [];

    foreach ($sales as $sale) {
        $sale['books'] = invoke(function($saleId)
        {
            $books = [];

            $sqlHandler = getSQLHandler();
            $statement = $sqlHandler->prepare(GET_SALES_BOOKS);
            $statement->bindValue(":saleId", $saleId);
            $statement->execute();

            $isbns = $statement->fetchAll();
            
            foreach($isbns as $entry)
            {
                $statement = $sqlHandler->prepare(GET_BOOKS);
                $statement->bindValue(":ISBN", $entry['ISBN']);

                $statement->execute();

                foreach($statement->fetchAll() as $book)
                {
                    if(!in_array($book, $books))
                    {
                        array_push($books, $book);
                    }
                }
            }

            return $books;
        }, $sale['SaleId']);

        array_push($finalData, $sale);
    }

    NOP_WRAP($finalData);
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
