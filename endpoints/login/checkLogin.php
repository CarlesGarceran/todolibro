<?php

include_once "../../functions.php";
include_once "../../src/RuntimeError.php";
include_once "../shared_funcs.php";
try
{
    INIT_BACKEND_CALL();

    $userData = fromJson(file_get_contents("php://input"), true);
    session_start();

    $email = $userData['email'];
    $password = $userData['password'];
    $hashPassword = SHA256($password . getSalt());
    $handler = getSQLHandler();

    {  // CHECK EMAIL
        $sql = "SELECT COUNT(userId) as users FROM Users WHERE (Email = :email)";
    
        $statement = $handler->prepare($sql);
        $statement->bindValue(":email", $email);
    
        $statement->execute();
    
        $result = $statement->fetch();
    
        if($result['users'] <= 0) // LT 0 (no idea why it should be a negative number, but you know, just in case.)
            NOP_OBJ(new RuntimeError(800, "User Not Found"));
    }


    {  // CHECK EMAIL AND PASSWORD
        $sql = "SELECT COUNT(userId) as users FROM Users WHERE (Email = :email AND PasswordHash = :pswd_hash)";
    
        $statement = $handler->prepare($sql);
        $statement->bindValue(":email", $email);
        $statement->bindValue(":pswd_hash", $hashPassword);
    
        $statement->execute();
    
        $result = $statement->fetch();
    
        if($result['users'] <= 0) // LT 0 (no idea why it should be a negative number, but you know, just in case.)
            NOP_OBJ(new RuntimeError(801, "User Not Found"));
    }

    $sql = "SELECT * FROM Users WHERE (Email = :email AND PasswordHash = :pswd_hash) LIMIT 1;";
    $statement = $handler->prepare($sql);
    $statement->bindValue(":email", $email);
    $statement->bindValue(":pswd_hash", $hashPassword);

    $statement->execute();

    $result = $statement->fetch();

    $sessionCookie = SHA256($password . "-COOKIE");

    setcookie(
        "sessionId",
        $sessionCookie,
        [
            'expires' => strtotime("+30 days"),
            'path' => '/'
        ]
    );
    
    $_SESSION[$sessionCookie] = [];

    SESSION_SetUser((int)$result[0], $result[1], $result[2], $result[3], $hashPassword, $sessionCookie);

    NOP();
}
catch(Exception $ex)
{
    if(!is_in_production())
    {
        $error = new RuntimeError(500, $ex->getMessage());
        $var = toJson($error);
        echo $var;
        die();
    }
    else
    {
        $error = new RuntimeError(500, "Internal Server Error");
        NOP_OBJ($error);
    }
}