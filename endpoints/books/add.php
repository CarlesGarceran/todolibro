<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "INSERT INTO Books (ISBN, Name, Publisher, Author, Image, LaunchDate, Price, Synopsis, Stock)
VALUES (:newISBN, :newName, :newPublisher, :newAuthor, :newImage, :newLaunchDate, :newPrice, :newSynopsis, :newStock);
");

try {

    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    if($user == null)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    if(!(HasRole((int)$user['id'], 130)))
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    $userData = getUserData();
    $sqlHandler = getSQLHandler();

    if ($userData == null)
        NOP_WRAP(new RuntimeError(400, "Bad Request - No content found in body"));

    if (IsA::Libro($userData) == false)
        NOP_WRAP(new RuntimeError(400, "Bad Request - Not a book instance"));

    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":newISBN", $userData['ISBN']);
    $sqlStatement->bindValue(":newName", $userData['Name']);
    $sqlStatement->bindValue(":newPublisher", $userData['Publisher']);
    $sqlStatement->bindValue(":newAuthor", $userData['Author']);
    $sqlStatement->bindValue(":newImage", $userData['Image']);
    $sqlStatement->bindValue(":newLaunchDate", date('Y-m-d H:i:s', strtotime($userData['LaunchDate'])));
    $sqlStatement->bindValue(":newPrice", $userData['Price']);
    $sqlStatement->bindValue(":newSynopsis", $userData['Synopsis']);
    $sqlStatement->bindValue(":newStock", $userData['Stock']);

    $sqlStatement->execute();

    $insertId = $sqlHandler->lastInsertId();
    NOP_WRAP($insertId);
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
