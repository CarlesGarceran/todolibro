<?php

include_once "../functions.php";
include_once "../src/RuntimeError.php";
include_once "../src/Libro.php";

try {
    INIT_BACKEND_CALL();

    $sqlHandler = getSQLHandler();
    
    $libros = [];


    NOP_OBJ($libros);
} catch (Exception $ex) {
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}