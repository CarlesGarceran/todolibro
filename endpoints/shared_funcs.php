<?php
/* Common functions that will be repeated often */

include_once $_SERVER['DOCUMENT_ROOT'] . "/src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/functions.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/src/IsA.php";

function SESSION_SetUser(int $id, $name, $email, $pfp, $password, $sessionid)
{
    $newUser = new User($id, $name, $email, $pfp, $password);

    $_SESSION[$sessionid] = [];
    $_SESSION[$sessionid]["User"] = toJson($newUser);
}

function HasRole(int $userId, int $expectedRole) : bool
{
    $sql = "SELECT MAX(r.RoleId) as 'Level'
    FROM Roles r 
    JOIN Roles_has_Users rhu 
    ON (r.idRole = rhu.Roles_idRole)
    JOIN Users u ON (rhu.Users_userId = u.userId)
    WHERE u.userId = :userId LIMIT 1;";

    $sqlHandler = getSQLHandler();
    
    $sqlBind = $sqlHandler->prepare($sql);
    $sqlBind->bindValue(":userId", $userId, PDO::PARAM_INT);

    $sqlBind->execute();

    $data = $sqlBind->fetchAll();

    foreach ($data as $dmp) {
        if($dmp['Level'] < $expectedRole)
            return false;
    }

    return true;
}

function GetSessionCookie(bool $useNewAPI = false)
{
    if(!isset($_COOKIE['sessionId']))
        if($useNewAPI)
            NOP_WRAP(new RuntimeError(400, "User not logged in"));
        else
            NOP_OBJ(new RuntimeError(400, "User not logged in"));

    return $_COOKIE['sessionId'];
}

function GetUser(bool $useNewAPI = false)
{
    if(!isset($_COOKIE['sessionId']))
        if($useNewAPI)
            NOP_WRAP(new RuntimeError(400, "User not logged in"));
        else
            NOP_OBJ(new RuntimeError(400, "User not logged in"));

    $sessionId = $_COOKIE['sessionId'];

    if(!isset($_SESSION))
        if($useNewAPI)
            NOP_WRAP(new RuntimeError(500, "Failed to initialize session"));
        else
            NOP_OBJ(new RuntimeError(500, "Failed to initialize session"));

    if(!isset($_SESSION[$sessionId]))
        if ($useNewAPI)
            NOP_WRAP(new RuntimeError(500, "Failed to obtain user profile"));
        else
            NOP_OBJ(new RuntimeError(500, "Failed to obtain user profile"));

    return fromJson($_SESSION[$sessionId]['User']);
}

function GetUserFromDatabase($userId)
{
    $sql = "SELECT * FROM Users WHERE (userId = :userId) LIMIT 1;";

    $sqlHandler = getSQLHandler();
    
    $sqlBind = $sqlHandler->prepare($sql);
    $sqlBind->bindValue(":userId", $userId, PDO::PARAM_INT);

    $sqlBind->execute();

    return $sqlBind->fetch();
}

function getUserData() : object | array
{
    $fileContents = file_get_contents("php://input");

    if($fileContents == null)
        $fileContents = "";

    return fromJson($fileContents);
}

?>