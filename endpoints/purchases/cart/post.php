<?php

include_once $_SERVER['DOCUMENT_ROOT'] . "functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "endpoints/shared_funcs.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/RuntimeError.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Libro.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/PurchaseDetails.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "src/Payment/perform_purchase.php";

define("INSERT_SALE_QUERY", "INSERT INTO Sales (UserId, Price, created_at)
VALUES (:userId, :price, current_timestamp());");
define("INSERT_SALE_BOOKS_QUERY", "INSERT INTO Sale_has_Books (SaleId, ISBN)
VALUES (:saleId, :ISBN);");

define("GET_CART_ENTRIES", "SELECT * FROM Cart
WHERE Users_userId = :userId");

define("GET_BOOKS_BY_ISBN", "SELECT * FROM Books WHERE ISBN = :IN_ISBN");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);
    $userData = getUserData();

    if(!isset($userData['purchaseData']))
        NOP_WRAP(new RuntimeError(400, "Bad Request, no purchase details."));

    if (!IsA::PurchaseDetail($userData['purchaseData']))
        NOP_WRAP(new RuntimeError(400, "Bad Request, purchaseData is not a PurchaseDetail."));

    $cartData = null;
    $bookData = null;

    $cartData = invoke(function ($user) {
        $sqlHandler = getSQLHandler();
        $sqlStatement = $sqlHandler->prepare(GET_CART_ENTRIES);
        $sqlStatement->bindValue(":userId", $user['id']);

        $sqlStatement->execute();

        return $sqlStatement->fetchAll();
    }, $user);

    $bookData = invoke(function($cart_entries)
    {
        $entries = [];

        foreach ($cart_entries as $entry) 
        {
            $sqlHandler = getSQLHandler();
            $sqlStatement = $sqlHandler->prepare(GET_BOOKS_BY_ISBN);
            $sqlStatement->bindValue(":IN_ISBN", $entry['Books_ISBN']);

            $sqlStatement->execute();

            $res = $sqlStatement->fetch();

            for ($i=0; $i < $entry['Quantity']; $i++) 
            { 
                array_push($entries, $res);
            }
        }

        return $entries;
    }, $cartData);

    $purchaseDetails = new PurchaseDetails(
        $userData['purchaseData']['cardDetails'], 
        $userData['purchaseData']['cardOwner'], 
        $userData['purchaseData']['cardCVV'], 
        date_create($userData['purchaseData']['cardExpirationDate'])
    );

    onPurchasePerformed(
        $bookData,
        $user,
        $purchaseDetails,
        function ($userId, $price, $bookArray) 
        {

            // Create the Sale entry in the DB
            $saleId = invoke(function($userId, $price)
            {
                $sqlHandler = getSQLHandler();
                $sqlStatement = $sqlHandler->prepare(INSERT_SALE_QUERY);

                $sqlStatement->bindValue(":userId", $userId);
                $sqlStatement->bindValue(":price", $price);
                
                try 
                {
                    $sqlStatement->execute();
                } 
                catch (Exception $e) 
                {
                    NOP_WRAP(new RuntimeError(500, "Internal server error"));
                }

                return $sqlHandler->lastInsertId();
            }, $userId, $price);

            if ($saleId === false)
                NOP_WRAP(new RuntimeError(500, "Failed to insert sale into database."));

            // Add the purchased books to the sale M-T-M table.
            $success = invoke(
                function($saleId, $books)
                {
                    foreach($books as $book)
                    {
                        $sqlHandler = getSQLHandler();
                        $sqlStatement = $sqlHandler->prepare(INSERT_SALE_BOOKS_QUERY);

                        $sqlStatement->bindValue(":saleId", $saleId);
                        $sqlStatement->bindValue(":ISBN", $book['ISBN']);

                        try 
                        {
                            $sqlStatement->execute();
                        } 
                        catch (Exception $e) 
                        {
                            NOP_WRAP(new RuntimeError(500, "Internal server error"));
                        }        
                    }

                    return true;
                }, 
                $saleId,
                $bookArray
            );

            // Normalize the purchase data (This is the data that will be sent to the user)
            $purchaseData = invoke(
                function ($userId, $price, $saleId) {
                    $arr = [];
                    $arr['saleId'] = $saleId;
                    $arr['userId'] = $userId;
                    $arr['price'] = $price;

                    return $arr;
                },
                $userId,
                $price,
                $saleId
            );


            if($success)
                NOP_WRAP($purchaseData);

        }
    );

    NOP_WRAP(new RuntimeError(500, "Failed to perform purchase"));
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
