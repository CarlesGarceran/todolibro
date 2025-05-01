<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

define("QUERY", "SELECT
    b.* 
FROM
    Books as b JOIN 
    Favorites as f ON (b.ISBN = f.ISBN)
WHERE
    f.User = :userId;");

try {
    INIT_BACKEND_CALL();
    session_start();

    $user = GetUser(true);
    $sqlHandler = getSQLHandler();

    $statement = $sqlHandler->prepare(QUERY);
    $statement->bindValue(":userId", $user['id'], PDO::PARAM_INT);

    $statement->execute();
    $data = $statement->fetchAll();

    NOP_WRAP($data);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
