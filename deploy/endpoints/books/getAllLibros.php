<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../../src/Libro.php";

try {
    INIT_BACKEND_CALL();

    $limit = -1;

    if(isset($_GET['limit']))
        $limit = (int)$_GET['limit'];

    $sqlHandler = getSQLHandler();
    $statement = null;

    if($limit == -1)
    {
        $sql_query = "SELECT * FROM Books;";
        $statement = $sqlHandler->query($sql_query);
    }
    else
    {
        $sql_query = "SELECT * FROM Books LIMIT :book_limit;";
        $statement = $sqlHandler->prepare($sql_query);
        $statement->bindValue(":book_limit", $limit, PDO::PARAM_INT);

        $statement->execute();
    }

    $data = $statement->fetchAll();

    $libros = [];

    foreach ($data as $libro) {
        array_push(
            $libros,
            new Libro(
                (string)$libro["ISBN"],
                (string)$libro["Name"],
                (int)$libro["Publisher"],
                (int)$libro['Author'],
                (string)$libro['Image'],
                new DateTime((string)$libro['LaunchDate']),
                ((float)$libro['Price']),
                (string)$libro['Synopsis'],
                (int)$libro['Stock']
            )
        );
    }

    NOP_OBJ(["payload" => $libros]);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}
