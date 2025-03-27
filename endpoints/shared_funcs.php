<?php
/* Common functions that will be repeated often */

include $_SERVER['DOCUMENT_ROOT'] . "/src/User.php";

function SESSION_SetUser(int $id, $name, $email, $pfp, $password, $sessionid)
{
    $newUser = new User($id, $name, $email, $pfp, $password);

    $_SESSION[$sessionid] = [];
    $_SESSION[$sessionid]["User"] = toJson($newUser);
}

function HasRole(int $userId, int $expectedRole) : bool
{
    $sql = "SELECT MAX(r.RoleId)
    FROM Roles r 
    JOIN Roles_has_Users rhu 
    ON (r.idRole = rhu.Roles_idRole)
    JOIN Users u ON (rhu.Users_userId = u.userId)
    WHERE u.userId = :userId";

    $sqlHandler = getSQLHandler();
    
    $sqlBind = $sqlHandler->prepare($sql);
    $sqlBind->bindValue(":userId", $userId, PDO::PARAM_INT);

    $sqlBind->execute();

    return true;
}

?>