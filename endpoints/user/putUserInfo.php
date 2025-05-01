<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include "../../src/User.php";
include_once "../shared_funcs.php";

define("QUERY_UPDATE_PASSWORD", "UPDATE 
    Users 
SET 
    Email = :inEmail, 
    Name = :inName, 
    PasswordHash = :inPasswordHash, 
    ProfilePicture = :inProfilePicture
WHERE
    userId = :localId;
");

define("QUERY_NO_PASSWORD", "UPDATE 
    Users 
SET 
    Email = :inEmail, 
    Name = :inName,
    ProfilePicture = :inProfilePicture
WHERE
    userId = :localId;
");

try
{
    INIT_BACKEND_CALL();
    session_start();
    
    $user = GetUser(true);
    $id = $user['id'];

    $userData = fromJson(file_get_contents("php://input"), true);

    if(!IsA::User($userData))
        NOP_WRAP(new RuntimeError(400, "Inputted data is not an user"));

    $sqlHandler = getSQLHandler();
    $statement = null;

    if (filter_var($userData['email'], FILTER_VALIDATE_EMAIL) == false) {
        NOP_WRAP(new RuntimeError(400, "La dirección de correo electronico no es valida."));
        return;
    }

    $sql = "SELECT userId FROM `Users` WHERE (Email = :mail)";
    $statement = $sqlHandler->prepare($sql);
    $statement->bindValue(":mail", $userData['email']);
    $statement->execute();

    $array = $statement->fetchAll();

    if (sizeof($array) > 0 && $array[0][0] != $id) {
        NOP_WRAP(new RuntimeError(400, "La dirección de correo electronico ya esta en uso."));
        return;
    }

    if(strlen($userData['password']) <= 0)
    {
        $statement = $sqlHandler->prepare(QUERY_NO_PASSWORD);
    }
    else
    {
        $statement = $sqlHandler->prepare(QUERY_UPDATE_PASSWORD);
        $hashPassword = SHA256($userData['password'] . getSalt());
        $statement->bindValue(":inPasswordHash", $hashPassword);
    }

    $statement->bindValue(":inName", $userData['username']);
    $statement->bindValue(":inEmail", $userData['email']);
    $statement->bindValue(":inProfilePicture", $userData['profile_picture']);
    $statement->bindValue(":localId", $id);
    $statement->execute();

    $tmp_user = $statement->fetchAll();

    $updatedUser = GetUserFromDatabase($id);

    SESSION_SetUser((int)$id, $updatedUser['Name'], $updatedUser['Email'], $updatedUser['ProfilePicture'], $updatedUser['PasswordHash'], GetSessionCookie());

    NOP_WRAP([]);
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}