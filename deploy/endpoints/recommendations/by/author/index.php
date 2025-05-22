<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";

define("GET_SALES", "SELECT * FROM Sales WHERE UserId = :userId;");
define("GET_SALE_BOOKS", "SELECT * FROM Sale_has_Books WHERE SaleId = :saleId;");
define("GET_AUTHOR_FROM_BOOK", "SELECT Author FROM Books WHERE ISBN = :inISBN;");
define("GET_BOOKS_BY_AUTHOR", "SELECT * FROM Books WHERE Author = :authorId GROUP BY ISBN;");

try {
    INIT_BACKEND_CALL();
    session_start();

    function isPurchased($ISBN, $userId): bool
    {
        $sales = invoke(function ($user) {
            $sqlHandler = getSQLHandler();
            $sqlStatement = $sqlHandler->prepare(GET_SALES);
            $sqlStatement->bindValue(":userId", $user);

            $sqlStatement->execute();

            return $sqlStatement->fetchAll();
        }, $userId);

        $saleBooks = invoke(function ($sales) {
            $saleBooks = [];
            $sqlHandler = getSQLHandler();
            foreach ($sales as $sale) {
                $saleId = (int)$sale['SaleId'];

                $statement = $sqlHandler->prepare(GET_SALE_BOOKS);
                $statement->bindValue(":saleId", $saleId, PDO::PARAM_INT);
                $statement->execute();

                $books = $statement->fetchAll();

                foreach ($books as $book) {
                    array_push($saleBooks, $book);
                }
            }

            return $saleBooks;
        }, $sales);

        foreach($saleBooks as $book)
        {
            if($book['ISBN'] == $ISBN)
                return true;
        }

        return false;
    }

    $user = GetUser(true);

    $sales = invoke(function ($user) {
        $sqlHandler = getSQLHandler();
        $sqlStatement = $sqlHandler->prepare(GET_SALES);
        $sqlStatement->bindValue(":userId", $user['id']);

        $sqlStatement->execute();

        return $sqlStatement->fetchAll();
    }, $user);

    $saleBooks = invoke(function ($sales) {
        $saleBooks = [];
        $sqlHandler = getSQLHandler();
        foreach ($sales as $sale) {
            $saleId = (int)$sale['SaleId'];

            $statement = $sqlHandler->prepare(GET_SALE_BOOKS);
            $statement->bindValue(":saleId", $saleId, PDO::PARAM_INT);
            $statement->execute();

            $books = $statement->fetchAll();

            foreach ($books as $book) {
                array_push($saleBooks, $book);
            }
        }

        return $saleBooks;
    }, $sales);

    $recommmandedBooks = invoke(function ($salesBooks, $userId) {
        $authors = [];
        $books = [];
        $sqlHandler = getSQLHandler();

        foreach($salesBooks as $sale)
        {
            $statement = $sqlHandler->prepare(GET_AUTHOR_FROM_BOOK);
            $statement->bindValue(":inISBN", $sale['ISBN']);

            $statement->execute();

            array_push($authors, $statement->fetch());
        }

        foreach($authors as $author)
        {
            $statement = $sqlHandler->prepare(GET_BOOKS_BY_AUTHOR);
            $statement->bindValue(":authorId", $author['Author']);

            $statement->execute();

            foreach($statement->fetchAll() as $book)
            {
                if(!in_array($book, $books) && !isPurchased($book['ISBN'], $userId))
                {
                    array_push($books, $book);
                }
            }
        }

        return $books;
    }, $saleBooks, $user['id']);

    NOP_WRAP($recommmandedBooks);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
