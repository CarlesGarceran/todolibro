<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "UPDATE Books
SET ISBN = :newISBN, Name = :newName, Publisher = :newPublisher, Author = :newAuthor, Image = :newImage, LaunchDate = :newLaunchDate, Price = :newPrice, Synopsis = :newSynopsis, Stock = :newStock
WHERE ISBN = :inISBN;
");

try {

    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);

    if($user == null)
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    if(!(HasRole((int)$user['id'], 130)))
        NOP_WRAP(new RuntimeError(401, "Unauthorized to perform this request"));

    if (!isset($_GET['ISBN']))
        NOP_WRAP(new RuntimeError(400, "Bad Request - Failed to GET ISBN."));

    $ISBN = $_GET['ISBN'];

    $userData = getUserData();
    $sqlHandler = getSQLHandler();

    if ($userData == null)
        NOP_WRAP(new RuntimeError(400, "Bad Request - No content found in body"));

    if (IsA::Libro($userData) == false)
        NOP_WRAP(new RuntimeError(400, "Bad Request - Not a book instance"));

    $sqlStatement = $sqlHandler->prepare(QUERY);
    $sqlStatement->bindValue(":inISBN", $ISBN);
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

    NOP_WRAP([]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
