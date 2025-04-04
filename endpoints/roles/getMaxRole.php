<?php

use function PHPSTORM_META\sql_injection_subst;

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

$error_code = 500;

try
{
    INIT_BACKEND_CALL();
    session_start();

    $sqlHandler = getSQLHandler();
    $sql = "SELECT MAX(r.RoleId) 
    FROM Roles r 
    JOIN Roles_has_Users rhu 
    ON (r.idRole = rhu.Roles_idRole)
    JOIN Users u ON (rhu.Users_userId = u.userId)
    WHERE u.userId = :userId";

    $tmp_user = GetUser();

    $statement = $sqlHandler->prepare($sql);
    $statement->bindValue(":userId", (int)$tmp_user['id']);

    $statement->execute();
    $result = $statement->fetch();

    NOP_OBJ(['RoleId' => $result[0]]);
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError($error_code, $ex->getMessage());
        NOP_OBJ($error);
    }
}