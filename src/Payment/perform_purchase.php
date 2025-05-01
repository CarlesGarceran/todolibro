<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";

function onPurchasePerformed(array $books, User $user, PurchaseDetails $purchaseDetails, mixed $callback) : bool
{
    // DO THE PURCHASE PROCESS, THIS IS A STUB BACKPOINT, IMPLEMENT PAYMENT OR WHATEVER HERE.

    (float)$totalPrice = 0;

    foreach ($books as $book) {
       $totalPrice += $book['Price'];
    }


    $callback($user->id, $totalPrice, $books);

    return true;
}