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


function getUserData() : object | array
{
    $fileContents = file_get_contents("php://input");

    if($fileContents == null)
        $fileContents = "";

    return fromJson($fileContents);
}


class IsA
{
    static function Libro(mixed $any): bool
    {
        if (!isset($any['ISBN']))
            return false;

        if (!isset($any['Name']))
            return false;

        if (!isset($any['Publisher']))
            return false;

        if (!isset($any['Author']))
            return false;

        if (!isset($any['Image']))
            return false;

        if (!isset($any['LaunchDate']))
            return false;

        if (!isset($any['Price']))
            return false;

        if (!isset($any['Synopsis']))
            return false;

        if (!isset($any['Stock']))
            return false;

        return true;
    }

    static function Category(mixed $any) : bool
    {
        if(!isset($any['CategoryId']))
            return false;
        
        if(!isset($any['Name']))
            return false;
        
        return true;
    }

    static function CartEntry(mixed $any) : bool
    {
        if(!isset($any['Users_userId']))
            return false;
        
        if(!isset($any['Books_ISBN']))
            return false;
        
        if(!isset($any['Quantity']))
            return false;

        return true;
    }
};

?>