<?php

use function PHPSTORM_META\sql_injection_subst;

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";

$error_code = 500;

try
{
    INIT_BACKEND_CALL();

    if(!isset($_GET['roleId']))
        NOP_OBJ(new RuntimeError(500, "RoleId missing"));

    $roleId = $_GET['roleId'];

    $sqlHandler = getSQLHandler();
    $sql = "SELECT RoleName from Roles where RoleId = :roleId;";

    $statement = $sqlHandler->prepare($sql);
    $statement->bindValue(":roleId", (int)$roleId);

    $statement->execute();
    $result = $statement->fetch();

    if(!isset($result[0]))
    {
        NOP_OBJ(['RoleName' => "None"]);
    }
    else
    {
        NOP_OBJ(['RoleName' => $result[0]]);
    }

}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError($error_code, $ex->getMessage());
        NOP_OBJ($error);
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_OBJ($error);
    }
}