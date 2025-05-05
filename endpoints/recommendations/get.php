<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Payment/perform_purchase.php";

define("GET_SALES", "SELECT * FROM Sales WHERE UserId = :userId;");
define("GET_SALE_BOOKS", "SELECT * FROM Sale_has_Books WHERE SaleId = :saleId");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);
    
    $sales = invoke(function ($user) {
        $sqlHandler = getSQLHandler();
        $sqlStatement = $sqlHandler->prepare(GET_BOOK_BY_ISBN);
        $sqlStatement->bindValue(":ISBN", $user['id']);

        $sqlStatement->execute();

        return $sqlStatement->fetch();
    }, $user);

    NOP_WRAP($sales);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
