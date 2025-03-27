<?php

include_once "../../functions.php";
include_once "../shared_funcs.php";
include_once "../../src/RuntimeError.php";

try
{
    INIT_BACKEND_CALL();
    
    $userData = fromJson(file_get_contents("php://input"), true);
    session_start();

    $password = $userData['password'];
    $defaultPfp = "/assets/default_pfp.png";

    $hashData = SHA256($password . getSalt());

    $handler = getSQLHandler();

    $sql = "INSERT INTO Users(Name, Email, ProfilePicture, PasswordHash) VALUES (:name, :mail, :pfp, :password)";

    $statement = $handler->prepare($sql);
    $statement->execute(array(
        ':name' => $userData['name'],
        ':mail' => $userData['email'],
        ':pfp' => $defaultPfp,
        ':password' => $hashData,
    ));

    $sql = "SELECT * FROM Users WHERE (Email = :email AND PasswordHash = :pswd_hash) LIMIT 1;";
    $statement = $handler->prepare($sql);
    $statement->bindValue(":email", $userData['email']);
    $statement->bindValue(":pswd_hash", $hashData);

    $statement->execute();

    $result = $statement->fetch();

    $sessionCookie = SHA256($password . "-COOKIE");
    $_SESSION[$sessionCookie] = [];

    setcookie(
        "sessionId",
        $sessionCookie,
        [
            'expires' => strtotime("+30 days"),
            'path' => '/'
        ]
    );
    
    SESSION_SetUser((int)$result[0], $result[1], $result[2], $result[3], $hashData, $sessionCookie);

    NOP(); // NO OPERAND (return empty object and kill the execution)
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        NOP_OBJ($error);
    }
}