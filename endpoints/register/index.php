<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

define("defaultPfp", "/assets/default_pfp.png");

try 
{
    INIT_BACKEND_CALL();
    session_start();

    function createUser($userData, $hashData)
    {
        $sql = "INSERT INTO Users(Name, Email, ProfilePicture, PasswordHash) VALUES (:name, :mail, :pfp, :password)";

        $statement = getSQLHandler()->prepare($sql);
        $statement->bindValue(":name", $userData['name']);
        $statement->bindValue(":mail", $userData['email']);
        $statement->bindValue(":pfp", defaultPfp);
        $statement->bindValue(":password", $hashData);
        $statement->execute();
    }

    function authenticate($userData, $hashData) : mixed
    {
        $sql = "SELECT * FROM Users WHERE (Email = :email AND PasswordHash = :pswd_hash) LIMIT 1;";
        $statement = getSQLHandler()->prepare($sql);
        $statement->bindValue(":email", $userData['email']);
        $statement->bindValue(":pswd_hash", $hashData);

        $statement->execute();

        $result = $statement->fetch();

        if ($result == false) {
            NOP_WRAP(new RuntimeError(500, "Ha habido un error"));
            return null;
        }

        return $result;
    }

    $userData = fromJson(file_get_contents("php://input"), true);

    $password = $userData['password'];

    $hashData = SHA256($password . getSalt());

    $handler = getSQLHandler();

    // CHECK IF USER IS VALID

    if (filter_var($userData['email'], FILTER_VALIDATE_EMAIL) == false) {
        NOP_WRAP(new RuntimeError(400, "La dirección de correo electronico no es valida."));
        return;
    }

    // CHECK IF USER EXISTS

    $sql = "SELECT userId FROM `Users` WHERE (Email = :mail)";
    $statement = $handler->prepare($sql);
    $statement->bindValue(":mail", $userData['email']);
    $statement->execute();

    $array = $statement->fetchAll();

    if (sizeof($array) > 0) {
        NOP_WRAP(new RuntimeError(400, "El usuario ya ha sido registrado"));
        return;
    }

    // INSERTION

    createUser($userData, $hashData);
    
    $result = null;

    if(($result = authenticate($userData, $hashData)) != null)
    {
        $sessionCookie = SHA256($password . "-COOKIE-" . time());
        $_SESSION[$sessionCookie] = [];    

        setcookie(
            "sessionId",
            $sessionCookie,
            [
                'expires' => strtotime("+30 days"),
                'path' => '/'
            ]
        );

        SESSION_SetUser((int)$result["userId"], $result["Name"], $result["Email"], $result["ProfilePicture"], $hashData, $sessionCookie);
    }

    NOP_WRAP([]);
} 
catch (Exception $ex) 
{
    if (!is_in_production()) {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_WRAP($error);
    }
}
