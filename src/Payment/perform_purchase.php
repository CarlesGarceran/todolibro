<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";

function onPurchasePerformed(array $books, User | array $user, PurchaseDetails $purchaseDetails, mixed $callback) : bool
{
    $query = "UPDATE Books SET Stock = Stock - 1 WHERE ISBN = :inISBN;";

    // DO THE PURCHASE PROCESS, THIS IS A STUB BACKPOINT, IMPLEMENT PAYMENT OR WHATEVER HERE.

    (float)$totalPrice = 0;

    foreach ($books as $book) {
        $totalPrice += $book['Price'];

        $sqlHandler = getSQLHandler();
        $statement = $sqlHandler->prepare($query);
        $statement->bindValue(":inISBN", $book['ISBN']);

        $statement->execute();
    }

    $callback($user['id'], $totalPrice, $books);

    return true;
}