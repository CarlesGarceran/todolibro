<?php
/* Common functions that will be repeated often */

include $_SERVER['DOCUMENT_ROOT'] . "/src/User.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/functions.php";

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

function GetUser()
{
    if(!isset($_COOKIE['sessionId']))
        NOP_OBJ(new RuntimeError(400, "User not logged in"));

    $sessionId = $_COOKIE['sessionId'];

    if(!isset($_SESSION))
        NOP_OBJ(new RuntimeError(500, "Failed to initialize session"));

    if(!isset($_SESSION[$sessionId]))
        NOP_OBJ(new RuntimeError(500, "Failed to obtain user profile"));

    return fromJson($_SESSION[$sessionId]['User']);
}

?>